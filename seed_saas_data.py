import os
from supabase import create_client, Client

url = os.getenv("SUPABASE_URL", "https://wmwcuhrorrmvjzojjbyo.supabase.co")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")  # Service role key to get user ID


def create_initial_data():
    supabase: Client = create_client(url, key)

    # 1. Get the user ID for engr.umairejaz@gmail.com
    # Note: Service role is needed to query auth.users indirectly or we check profiles
    try:
        # Check if profile exists
        user_email = "engr.umairejaz@gmail.com"
        print(f"Looking for user: {user_email}")

        # In a real app, the profile is created on sign up.
        # Since you added via dashboard, we might need to create the profile entry.
        # Let's try to find the user in auth.users (requires service role)
        auth_users = supabase.auth.admin.list_users()
        target_user = next((u for u in auth_users if u.email == user_email), None)

        if not target_user:
            print(
                f"❌ User {user_email} not found in Auth. Please ensure you created it in the Supabase Dashboard."
            )
            return

        user_id = target_user.id
        print(f"✅ Found User ID: {user_id}")

        # 2. Ensure Profile exists
        supabase.table("profiles").upsert(
            {
                "id": user_id,
                "email": user_email,
                "company_name": "Umair Marketing Elite",
                "subscription_status": "active",  # Unlocking the SaaS for you
            }
        ).execute()
        print("✅ Profile created/updated (Subscription set to ACTIVE).")

        # 3. Create a Sample Batch
        batch_res = (
            supabase.table("batches")
            .insert(
                {
                    "user_id": user_id,
                    "niche": "Elite Agencies",
                    "location": "Global",
                    "file_name": "Welcome_Batch_MASTER.xlsx",
                    "status": "COMPLETED",
                }
            )
            .execute()
        )
        batch_id = batch_res.data[0]["id"]
        print(f"✅ Sample Batch created: {batch_id}")

        # 4. Create a Sample "HOT" Lead
        supabase.table("leads").insert(
            {
                "user_id": user_id,
                "batch_id": batch_id,
                "name": "Gemini Sales HQ",
                "email": "hello@geminisales.ai",
                "phone": "+1 800 GEMINI",
                "address": "Silicon Valley, CA",
                "rating": "5.0 (1,000 reviews)",
                "category": "Marketing Automation",
                "quality": "ELITE",
                "status": "INTERESTED",
                "ai_copy": {
                    "ai_hero_title": "Scale Your Agency with <span>AI Precision</span>",
                    "ai_pain_point": "Manual lead generation is killing your margins",
                    "ai_solution": "Our automated engine finds and pitches no-website leads while you sleep.",
                    "ai_niche_cta": "Claim Your Territory",
                },
            }
        ).execute()
        print(
            "✅ Sample HOT Lead created. You will see a pulsing 'HOT' badge in the dashboard!"
        )

        print("\n--- SETUP COMPLETE ---")
        print(
            "Go to http://localhost:3000, log in, and enjoy your SaaS Command Center."
        )

    except Exception as e:
        print(f"❌ Error during initial data setup: {e}")


if __name__ == "__main__":
    create_initial_data()
