'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from './industrial.module.css';

function IndustrialContent() {
  const searchParams = useSearchParams();
  
  // Dynamic Data
  const name = searchParams.get('name') || 'Industrial Solutions Ltd';
  const phone = searchParams.get('phone') || '0000 000 000';
  const niche = searchParams.get('niche') || 'Industrial Specialist';
  const location = searchParams.get('location') || 'Local Area';

  return (
    <div className={styles.wrapper}>
      {/* 1. Authoritative Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              {name.split(' ')[0]}<span className={styles.yellow}>{name.split(' ').slice(1).join(' ')}</span>
            </div>
            <a href={`tel:${phone}`} style={{fontWeight: 800, color: '#facc15'}}>DIRECT: {phone}</a>
          </div>
        </div>
      </header>

      {/* 2. Power Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1>Reliable {niche} <span>in {location}</span></h1>
          <p style={{fontSize: '1.25rem', maxWidth: '600px', marginBottom: '40px', opacity: 0.9}}>
            Providing industrial-strength {niche.toLowerCase()} solutions for over 15 years. 
            We specialize in large-scale projects, safety compliance, and rapid deployment across {location}.
          </p>
          <a href={`tel:${phone}`} className="btn" style={{backgroundColor: '#facc15', color: '#0f172a', padding: '15px 40px'}}>Request Technical Quote</a>
        </div>
      </section>

      {/* 3. Credentials Bar */}
      <section className={styles.credentials}>
        <div className="container">
          <div className={styles.credFlex}>
            <span>✓ FULLY INSURED</span>
            <span>✓ CHAS ACCREDITED</span>
            <span>✓ HEALTH & SAFETY COMPLIANT</span>
            <span>✓ {location.toUpperCase()} COVERAGE</span>
          </div>
        </div>
      </section>

      {/* 4. Service Grid */}
      <section className={styles.services}>
        <div className="container">
          <h2 className="text-center" style={{fontSize: '2.5rem', color: '#0f172a'}}>Professional {niche} Services</h2>
          <div className={styles.industrialGrid}>
            <div className={styles.industrialCard}>
              <h3>Commercial Contracts</h3>
              <p>Tailored {niche.toLowerCase()} support for developers and property managers in {location}. Reliable scheduling and dedicated account management.</p>
            </div>
            <div className={styles.industrialCard}>
              <h3>Emergency Response</h3>
              <p>Priority support for critical infrastructure and urgent industrial needs. We are on-call 24/7 to keep your project moving.</p>
            </div>
            <div className={styles.industrialCard}>
              <h3>Expert Consulting</h3>
              <p>Site surveys and technical assessments conducted by senior {niche.toLowerCase()} engineers with decades of industry experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Industrial CTA */}
      <section className={styles.quoteSection}>
        <div className="container">
          <h2>Secure Your Project in {location}</h2>
          <p style={{fontSize: '1.2rem', marginBottom: '40px'}}>Join the leading developers and contractors who trust {name}.</p>
          <a href={`tel:${phone}`} className="btn" style={{backgroundColor: '#0f172a', color: 'white', padding: '20px 50px', fontSize: '1.25rem'}}>Call Management: {phone}</a>
        </div>
      </section>

      <footer style={{padding: '40px 0', textAlign: 'center', background: '#f1f5f9', color: '#64748b'}}>
        <p>© 2026 {name} - Industrial {niche} Excellence in {location}.</p>
      </footer>
    </div>
  );
}

export default function IndustrialPage() {
  return (
    <Suspense fallback={<div>Loading Industrial Authority...</div>}>
      <IndustrialContent />
    </Suspense>
  );
}
