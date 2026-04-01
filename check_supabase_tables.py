import os
from supabase import create_client, Client

url = "https://wmwcuhrorrmvjzojjbyo.supabase.co"
key = "sb_publishable_mvuRPVqI-JchyU02wcMCsg_GH4dJgbO"

def check_tables():
    supabase: Client = create_client(url, key)
    
    tables = ["profiles", "batches", "leads", "crm_history"]
    results = {}

    print(f"--- Supabase Table Diagnostic ---")
    for table in tables:
        try:
            # Try to fetch one row from each table
            response = supabase.table(table).select("*").limit(1).execute()
            print(f"✅ Table '{table}': Accessible.")
            results[table] = "OK"
        except Exception as e:
            # Check for 404 (Table not found) vs 401/403 (RLS/Auth issue)
            error_msg = str(e)
            if "relation" in error_msg and "does not exist" in error_msg:
                print(f"❌ Table '{table}': MISSING (Not created yet).")
                results[table] = "MISSING"
            elif "401" in error_msg or "403" in error_msg or "row-level security" in error_msg.lower():
                print(f"⚠️  Table '{table}': Created, but RLS is blocking access (Expected for Anon key).")
                results[table] = "RLS_PROTECTED"
            else:
                print(f"❓ Table '{table}': Unexpected error: {error_msg}")
                results[table] = "ERROR"

    print("\n--- Summary ---")
    if all(v != "MISSING" for v in results.values()):
        print("All tables appear to exist! You are ready to go.")
    else:
        print("Some tables are missing. Please run the migration SQL in your Supabase SQL Editor.")

if __name__ == "__main__":
    check_tables()
