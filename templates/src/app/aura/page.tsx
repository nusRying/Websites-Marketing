'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from './aura.module.css';

function AuraContent() {
  const searchParams = useSearchParams();
  
  // Dynamic Data
  const name = searchParams.get('name') || 'The Wellness Atelier';
  const niche = searchParams.get('niche') || 'Skin & Beauty';
  const location = searchParams.get('location') || 'Local Area';
  const phone = searchParams.get('phone') || '0000 000 000';

  return (
    <div className={styles.wrapper}>
      {/* 1. Transparent Floating Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.logo}>{name}</div>
            <a href={`tel:${phone}`} className={styles.navAction}>Inquiry</a>
          </div>
        </div>
      </header>

      {/* 2. Editorial Hero */}
      <section className={styles.hero}>
        <div className="container">
          <p>Unveiling Your Natural Radiance</p>
          <h1>Expert {niche} <span>in {location}</span></h1>
          <div className={styles.divider}></div>
          <a href={`tel:${phone}`} className={styles.navAction} style={{padding: '15px 50px'}}>Reserve Your Session</a>
        </div>
      </section>

      {/* 3. The Boutique Menu */}
      <section className={styles.serviceMenu}>
        <div className="container">
          <div className="text-center">
            <p style={{letterSpacing: '2px', opacity: 0.6, fontSize: '0.8rem'}}>CURATED TREATMENTS</p>
            <h2 style={{fontFamily: 'serif', fontSize: '2.5rem', marginTop: '10px'}}>Our {niche} Menu</h2>
          </div>
          
          <div className={styles.menuGrid}>
            <div className={styles.menuGroup}>
              <div className={styles.menuItem}>
                <div>
                  <h3>Signature Facial</h3>
                  <p style={{fontSize: '0.9rem', color: '#666', marginTop: '5px'}}>Deep hydration & rejuvenation.</p>
                </div>
                <div className={styles.price}>£85</div>
              </div>
              <div className={styles.menuItem}>
                <div>
                  <h3>Aura Sculpt</h3>
                  <p style={{fontSize: '0.9rem', color: '#666', marginTop: '5px'}}>Non-invasive facial contouring.</p>
                </div>
                <div className={styles.price}>£120</div>
              </div>
            </div>
            <div className={styles.menuGroup}>
              <div className={styles.menuItem}>
                <div>
                  <h3>Revitalize Ritual</h3>
                  <p style={{fontSize: '0.9rem', color: '#666', marginTop: '5px'}}>Holistic body & mind therapy.</p>
                </div>
                <div className={styles.price}>£95</div>
              </div>
              <div className={styles.menuItem}>
                <div>
                  <h3>Advanced Peel</h3>
                  <p style={{fontSize: '0.9rem', color: '#666', marginTop: '5px'}}>Medical-grade skin resurfacing.</p>
                </div>
                <div className={styles.price}>£150</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Midnight Testimonial */}
      <section className={styles.testimonialSection}>
        <div className="container">
          <p style={{fontSize: '0.8rem', letterSpacing: '3px', marginBottom: '20px', opacity: 0.6}}>THE AURA EXPERIENCE</p>
          <div className={styles.quote}>
            "The level of detail and care at {name} is unmatched. I've never felt more confident in my skin. A true sanctuary in {location}."
          </div>
          <div className={styles.author}>— ELEANOR BENNETT, {location}</div>
        </div>
      </section>

      {/* 5. Minimal Booking */}
      <section className={styles.bookingSection}>
        <div className="container">
          <div className={styles.bookingCard}>
            <h2 style={{fontFamily: 'serif', fontSize: '2rem', marginBottom: '20px'}}>Join the Sanctuary</h2>
            <p style={{marginBottom: '40px', color: '#666'}}>Every treatment at {name} is bespoke. Let us tailor a journey specifically for your needs in {location}.</p>
            <a href={`tel:${phone}`} className={styles.navAction} style={{display: 'block', background: '#c5a059'}}>Book Consultation: {phone}</a>
          </div>
        </div>
      </section>

      <footer style={{padding: '60px 0', borderTop: '1px solid #f0f0f0', textAlign: 'center'}}>
        <div className="container">
          <div style={{fontFamily: 'serif', fontSize: '1.5rem', marginBottom: '20px'}}>{name}</div>
          <p style={{fontSize: '0.8rem', opacity: 0.5}}>© 2026 {name} | EXCELLENCE IN {niche.toUpperCase()} | {location.toUpperCase()}</p>
        </div>
      </footer>
    </div>
  );
}

export default function AuraPage() {
  return (
    <Suspense fallback={<div>Loading The Sanctuary...</div>}>
      <AuraContent />
    </Suspense>
  );
}
