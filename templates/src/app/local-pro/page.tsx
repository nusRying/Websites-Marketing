'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from './local-pro.module.css';

function LocalProContent() {
  const searchParams = useSearchParams();
  
  // Dynamic Data
  const name = searchParams.get('name') || 'Your Local Service';
  const phone = searchParams.get('phone') || '0000 000 000';
  const niche = searchParams.get('niche') || 'Professional Expert';
  const location = searchParams.get('location') || 'Local Area';

  return (
    <div className={styles.wrapper}>
      {/* 1. Friendly Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.logo}>{name}</div>
            <a href={`tel:${phone}`} className="btn" style={{backgroundColor: '#2563eb'}}>Call {phone}</a>
          </div>
        </div>
      </header>

      {/* 2. Hero with Local Badge */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.badge}>Now Serving {location}</div>
          <h1 style={{fontSize: '3rem', color: '#1e3a8a', marginBottom: '20px'}}>
            Your Trusted {niche} in {location}
          </h1>
          <p style={{fontSize: '1.25rem', color: '#475569', maxWidth: '800px', margin: '0 auto 30px'}}>
            High-quality, reliable, and friendly {niche.toLowerCase()} services tailored to your needs. 
            We take pride in our work and treat every home in {location} like our own.
          </p>
          <a href={`tel:${phone}`} className="btn btn-secondary" style={{backgroundColor: '#1e3a8a'}}>Check Availability</a>
        </div>
      </section>

      {/* 3. Service Packages */}
      <section className={styles.services}>
        <div className="container">
          <h2 className="text-center" style={{fontSize: '2.5rem', color: '#1e3a8a'}}>Our {niche} Packages</h2>
          <div className={styles.pricingGrid}>
            <div className={styles.priceCard}>
              <h3>Essential Care</h3>
              <div className={styles.price}>£29<span style={{fontSize: '1rem', color: '#64748b'}}>/start</span></div>
              <ul className={styles.featureList}>
                <li>Standard {niche} check</li>
                <li>Basic cleaning/maintenance</li>
                <li>Local {location} service</li>
              </ul>
              <a href={`tel:${phone}`} className="btn" style={{width: '100%', backgroundColor: '#2563eb'}}>Choose Plan</a>
            </div>
            <div className={styles.priceCard} style={{borderColor: '#2563eb', background: '#eff6ff'}}>
              <h3>Premium Pro</h3>
              <div className={styles.price}>£59<span style={{fontSize: '1rem', color: '#64748b'}}>/start</span></div>
              <ul className={styles.featureList}>
                <li>Full deep {niche} service</li>
                <li>Priority booking in {location}</li>
                <li>Extended warranty included</li>
              </ul>
              <a href={`tel:${phone}`} className="btn" style={{width: '100%', backgroundColor: '#2563eb'}}>Most Popular</a>
            </div>
            <div className={styles.priceCard}>
              <h3>Ultimate VIP</h3>
              <div className={styles.price}>£99<span style={{fontSize: '1rem', color: '#64748b'}}>/start</span></div>
              <ul className={styles.featureList}>
                <li>All-inclusive package</li>
                <li>Same-day response</li>
                <li>Ongoing monthly support</li>
              </ul>
              <a href={`tel:${phone}`} className="btn" style={{width: '100%', backgroundColor: '#2563eb'}}>Get Ultimate</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Local Trust Footer */}
      <footer style={{padding: '80px 0', background: '#1e3a8a', color: 'white', textAlign: 'center'}}>
        <div className="container">
          <h2>Support Your Local {location} {niche}</h2>
          <p style={{margin: '20px 0 40px'}}>We're just a phone call away. No call-out fees for {location} residents.</p>
          <a href={`tel:${phone}`} className="btn" style={{backgroundColor: '#10b981', padding: '20px 40px', fontSize: '1.25rem'}}>Call {name}: {phone}</a>
          <p style={{marginTop: '60px', opacity: 0.6}}>© 2026 {name} - Friendly {niche} Experts.</p>
        </div>
      </footer>
    </div>
  );
}

export default function LocalProPage() {
  return (
    <Suspense fallback={<div>Loading Local Pro...</div>}>
      <LocalProContent />
    </Suspense>
  );
}
