from __future__ import annotations

import logging
import os
from datetime import datetime, timezone
from typing import Any

from supabase import Client, create_client

logger = logging.getLogger("JobStore")

TERMINAL_STATUSES = {"SUCCESS", "FAILED", "COMPLETED_NO_RESULTS"}


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


class JobStore:
    """
    Stores pipeline job state in Supabase when configured, with an in-memory
    fallback for local development and tests.
    """

    def __init__(self, client: Client | None = None, use_database: bool = True):
        self._memory: dict[str, dict[str, Any]] = {}
        self.client = client if client is not None else self._build_client(use_database)

    def _build_client(self, use_database: bool) -> Client | None:
        if not use_database:
            return None

        url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
        key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
        if not url or not key:
            logger.info("Supabase service credentials missing; using memory job store.")
            return None

        try:
            return create_client(url, key)
        except Exception as exc:
            logger.error("Failed to initialize Supabase job store: %s", exc)
            return None

    @property
    def using_database(self) -> bool:
        return self.client is not None

    def create(
        self,
        job_id: str,
        user_id: str,
        request_payload: dict[str, Any],
        message: str = "Pipeline job queued.",
    ) -> dict[str, Any]:
        now = utc_now()
        record = {
            "id": job_id,
            "user_id": user_id,
            "status": "PENDING",
            "message": message,
            "request": request_payload,
            "error": None,
            "output_file": None,
            "created_at": now,
            "updated_at": now,
            "completed_at": None,
        }
        self._memory[job_id] = record.copy()

        if self.client:
            try:
                self.client.table("pipeline_jobs").insert(record).execute()
            except Exception as exc:
                logger.error("Failed to persist pipeline job %s: %s", job_id, exc)

        return record.copy()

    def update(
        self,
        job_id: str,
        status: str,
        message: str | None = None,
        error: str | None = None,
        output_file: str | None = None,
    ) -> dict[str, Any]:
        now = utc_now()
        updates: dict[str, Any] = {"status": status, "updated_at": now}
        if message is not None:
            updates["message"] = message
        if error is not None:
            updates["error"] = error
        if output_file is not None:
            updates["output_file"] = output_file
        if status in TERMINAL_STATUSES:
            updates["completed_at"] = now

        record = self._memory.setdefault(job_id, {"id": job_id})
        record.update(updates)

        if self.client:
            try:
                self.client.table("pipeline_jobs").update(updates).eq(
                    "id", job_id
                ).execute()
            except Exception as exc:
                logger.error("Failed to update pipeline job %s: %s", job_id, exc)

        return record.copy()

    def get(self, job_id: str) -> dict[str, Any] | None:
        if self.client:
            try:
                result = (
                    self.client.table("pipeline_jobs")
                    .select("*")
                    .eq("id", job_id)
                    .limit(1)
                    .execute()
                )
                if result.data:
                    return dict(result.data[0])
            except Exception as exc:
                logger.error("Failed to read pipeline job %s: %s", job_id, exc)

        record = self._memory.get(job_id)
        return record.copy() if record else None
