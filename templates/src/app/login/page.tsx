'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
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
            <Zap size={32} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#1e293b', letterSpacing: '-1px' }}>Welcome Back</h1>
          <p style={{ color: '#64748b', marginTop: '10px', fontWeight: 500 }}>Access your Lead Intelligence Command Center.</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem', fontWeight: 600, outline: 'none' }}
                placeholder="••••••••"
              />
            </div>
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
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'SIGN IN TO COMMAND CENTER'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>
          Protected by Enterprise-grade Security.
        </p>
      </motion.div>
    </div>
  );
}
