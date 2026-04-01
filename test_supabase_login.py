import os
from supabase import create_client, Client

url = "https://wmwcuhrorrmvjzojjbyo.supabase.co"
key = "sb_publishable_mvuRPVqI-JchyU02wcMCsg_GH4dJgbO"

def test_login():
    supabase: Client = create_client(url, key)
    
    email = "engr.umairejaz@gmail.com"
    password = "Umair@825"

    print(f"--- Supabase Auth Test ---")
    print(f"Attempting login for: {email}")
    
    try:
        res = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        print(f"✅ LOGIN SUCCESS!")
        print(f"User ID: {res.user.id}")
        print(f"Session: ACTIVE")
    except Exception as e:
        print(f"❌ LOGIN FAILED: {e}")

if __name__ == "__main__":
    test_login()
