'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [formData, setFormData] = useState({
    name: 'Smith & Sons Locksmiths',
    phone: '07123 456 789',
    niche: 'Locksmith',
    location: 'London',
    rating: '4.9'
  });

  const generateUrl = (path: string) => {
    const params = new URLSearchParams(formData);
    return `${path}?${params.toString()}`;
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Website Template Dashboard</h1>
      <p style={{ color: '#64748b', marginBottom: '40px' }}>Test your lead previews with custom business data below.</p>

      <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.25rem' }}>1. Enter Business Data</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Business Name</label>
            <input 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Phone Number</label>
            <input 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Niche (e.g. Plumber)</label>
            <input 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              value={formData.niche}
              onChange={(e) => setFormData({...formData, niche: e.target.value})}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Location</label>
            <input 
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
        </div>
      </div>

      <h2 style={{ marginBottom: '20px', fontSize: '1.25rem' }}>2. Choose a Template Archetype</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <Link href={generateUrl('/preview')} style={{ 
          padding: '20px', border: '2px solid #dc2626', borderRadius: '12px', textAlign: 'center', color: '#dc2626', fontWeight: 700, textDecoration: 'none' 
        }}>
          🚀 THE LEAD MACHINE<br/>
          <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#64748b' }}>(Emergency focus)</span>
        </Link>
        
        <Link href={generateUrl('/showcase')} style={{ 
          padding: '20px', border: '2px solid #059669', borderRadius: '12px', textAlign: 'center', color: '#059669', fontWeight: 700, textDecoration: 'none' 
        }}>
          🖼️ THE SHOWCASE<br/>
          <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#64748b' }}>(Visual focus)</span>
        </Link>

        <Link href={generateUrl('/local-pro')} style={{ 
          padding: '20px', border: '2px solid #2563eb', borderRadius: '12px', textAlign: 'center', color: '#2563eb', fontWeight: 700, textDecoration: 'none' 
        }}>
          🏠 THE LOCAL PRO<br/>
          <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#64748b' }}>(Service focus)</span>
        </Link>

        <Link href={generateUrl('/industrial')} style={{ 
          padding: '20px', border: '2px solid #0f172a', borderRadius: '12px', textAlign: 'center', color: '#0f172a', fontWeight: 700, textDecoration: 'none' 
        }}>
          🏗️ INDUSTRIAL AUTHORITY<br/>
          <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#64748b' }}>(B2B/Safety focus)</span>
        </Link>

        <Link href={generateUrl('/aura')} style={{ 
          padding: '20px', border: '2px solid #c5a059', borderRadius: '12px', textAlign: 'center', color: '#c5a059', fontWeight: 700, textDecoration: 'none', background: '#fffafb' 
        }}>
          ✨ AURA AESTHETICS<br/>
          <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#64748b' }}>(Premium Beauty/Spa)</span>
        </Link>

        <Link href={generateUrl('/gusto')} style={{ 
          padding: '20px', border: '2px solid #ff7e33', borderRadius: '12px', textAlign: 'center', color: '#ff7e33', fontWeight: 700, textDecoration: 'none', background: '#121212' 
        }}>
          🍷 GUSTO & GRAIN<br/>
          <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#64748b' }}>(Restaurant/Cafe)</span>
        </Link>
      </div>
    </div>
  );
}
