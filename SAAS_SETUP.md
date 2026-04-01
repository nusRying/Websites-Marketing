# SaaS Production Setup Guide

Follow these steps to finalize your Lead Engine SaaS deployment.

## 1. Supabase Database Setup
1.  Open your **Supabase Dashboard**.
2.  Go to the **SQL Editor**.
3.  Click **New Query**.
4.  Copy and paste the contents of `supabase/migrations/20260401_init.sql` and run it.
5.  (Optional but Recommended) Run `supabase/migrations/20260401_optimization.sql` for high-performance indexing.
6.  (Optional) Run `supabase/migrations/20260401_security.sql` for audit logging.
7.  (Required for SaaS) Run `supabase/migrations/20260401_billing.sql` to add subscription columns.

## 2. Supabase Storage Setup
1.  Go to **Storage** in your Supabase Dashboard.
2.  Create a new bucket named `screenshots`.
3.  Set the bucket to **Public**.

## 3. Environment Variables
Ensure your `templates/.env.local` contains:
- `NEXT_PUBLIC_SUPABASE_URL`: Your project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your public anon key.
- `SUPABASE_SERVICE_ROLE_KEY`: Required for backend workers.
- `OPENAI_API_KEY`: Required for AI enrichment.
- `STRIPE_SECRET_KEY`: For billing.
- `STRIPE_PRICE_ID`: For subscriptions.
- `STRIPE_WEBHOOK_SECRET`: For syncing payment status.

## 4. Launching the App
1.  `cd templates`
2.  `npm install`
3.  `npm run dev`
4.  Open **http://localhost:3000** and sign up/login!
