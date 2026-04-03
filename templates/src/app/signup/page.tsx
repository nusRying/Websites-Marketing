'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, Loader2, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt started for:", email);
    
    // Key validation check
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseKey || (!supabaseKey.startsWith('eyJ') && !supabaseKey.startsWith('sb_'))) {
      console.error("Invalid Supabase Key format detected.");
      setError("CRITICAL: Your Supabase API Key is invalid. Please update .env.local with the correct 'anon' key from Supabase Settings > API.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("Calling supabase.auth.signUp...");
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Supabase Auth Error:", error.message);
        setError(error.message);
        setLoading(false);
      } else {
        console.log("Signup successful! User ID:", data.user?.id);
        
        // If email confirmation is required, usually data.session is null
        if (data.user && data.user.identities && data.user.identities.length === 0) {
           setError("This email is already registered. Please sign in instead.");
           setLoading(false);
           return;
        }

        if (!data.session) {
          setSuccess("Account created successfully! Please check your email to confirm your account before signing in.");
          setLoading(false);
        } else {
          console.log("Redirecting to dashboard...");
          router.push('/');
          router.refresh();
        }
      }
    } catch (err: any) {
      console.error("UNEXPECTED ERROR during signup flow:", err);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#0f172a',
      fontFamily: 'Inter, sans-serif'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          width: '100%', 
          maxWidth: '450px', 
          background: 'white', 
          padding: '50px', 
          borderRadius: '32px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            display: 'inline-flex', 
            background: '#eff6ff', 
            padding: '15px', 
            borderRadius: '20px', 
            color: '#3b82f6',
            marginBottom: '20px'
          }}>
            <UserPlus size={32} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#1e293b', letterSpacing: '-1px' }}>Create Account</h1>
          <p style={{ color: '#64748b', marginTop: '10px', fontWeight: 500 }}>Join the Lead Intelligence Command Center.</p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: '#ecfdf5', color: '#10b981', padding: '20px', borderRadius: '16px', fontSize: '0.95rem', fontWeight: 600, border: '1px solid #d1fae5', marginBottom: '20px' }}>
              {success}
            </div>
            <a href="/login" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#3b82f6', textDecoration: 'none' }}>
              Go to Sign In →
            </a>
          </div>
        ) : (
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem', fontWeight: 600, outline: 'none' }}
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e293b', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                <input 
                  type="password" 
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem', fontWeight: 600, outline: 'none' }}
                  placeholder="••••••••"
                />
              </div>
              <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '8px', fontWeight: 500 }}>Must be at least 6 characters.</p>
            </div>

            {error && (
              <div style={{ background: '#fef2f2', color: '#ef4444', padding: '15px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #fee2e2' }}>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                marginTop: '10px',
                padding: '18px', 
                background: '#3b82f6', 
                color: 'white', 
                border: 'none', 
                borderRadius: '16px', 
                fontWeight: 800, 
                fontSize: '1rem', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.2s'
              }}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'CREATE ACCOUNT'}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
                Already have an account?{' '}
                <a href="/login" style={{ color: '#3b82f6', fontWeight: 700, textDecoration: 'none' }}>Sign In</a>
              </p>
            </div>
          </form>
        )}

      </motion.div>
    </div>
  );
}
