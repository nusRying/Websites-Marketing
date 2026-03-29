'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from './gusto.module.css';

function GustoContent() {
  const searchParams = useSearchParams();
  
  // Dynamic Data
  const name = searchParams.get('name') || 'The Artisanal Kitchen';
  const niche = searchParams.get('niche') || 'Modern Eatery';
  const location = searchParams.get('location') || 'Local District';
  const phone = searchParams.get('phone') || '0000 000 000';

  return (
    <div className={styles.wrapper}>
      {/* 1. Sticky Night Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.logo}>{name}</div>
            <a href={`tel:${phone}`} className={styles.reserveBtn}>Book a Table</a>
          </div>
        </div>
      </header>

      {/* 2. Atmospheric Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1>Experience {niche} <br/> at its Finest in {location}</h1>
          <p>Hand-crafted flavors, locally sourced ingredients, and an atmosphere you'll never forget.</p>
          <a href={`tel:${phone}`} className="btn" style={{backgroundColor: '#ff7e33', borderRadius: '0', padding: '15px 40px'}}>View Full Menu</a>
        </div>
      </section>

      {/* 3. The Digital Menu */}
      <section className={styles.menuSection}>
        <div className="container">
          <div className="text-center">
            <h2 className={styles.categoryTitle}>Signature Selection</h2>
          </div>
          
          <div className={styles.menuGrid}>
            <div>
              <div className={styles.dish}>
                <div className={styles.dishHeader}>
                  <span className={styles.dishName}>The {location} Special</span>
                  <div className={styles.dishDots}></div>
                  <span className={styles.dishPrice}>£18.50</span>
                </div>
                <p className={styles.dishDesc}>Slow-roasted local selection served with seasonal greens and house-made glaze.</p>
              </div>
              <div className={styles.dish}>
                <div className={styles.dishHeader}>
                  <span className={styles.dishName}>Artisanal Starter</span>
                  <div className={styles.dishDots}></div>
                  <span className={styles.dishPrice}>£9.00</span>
                </div>
                <p className={styles.dishDesc}>Organic produce sourced directly from {location} farmers.</p>
              </div>
            </div>
            <div>
              <div className={styles.dish}>
                <div className={styles.dishHeader}>
                  <span className={styles.dishName}>Chef's {niche} Fusion</span>
                  <div className={styles.dishDots}></div>
                  <span className={styles.dishPrice}>£22.00</span>
                </div>
                <p className={styles.dishDesc}>A unique take on traditional {niche.toLowerCase()} techniques.</p>
              </div>
              <div className={styles.dish}>
                <div className={styles.dishHeader}>
                  <span className={styles.dishName}>Hand-Crafted Dessert</span>
                  <div className={styles.dishDots}></div>
                  <span className={styles.dishPrice}>£7.50</span>
                </div>
                <p className={styles.dishDesc}>Finished with a touch of sweetness and house-churned cream.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Ambiance & Social Proof */}
      <section className={styles.ambiance}>
        <div className="container">
          <h2 style={{fontFamily: 'serif', fontSize: '2.5rem', marginBottom: '20px'}}>The Atmosphere</h2>
          <p style={{opacity: 0.8, maxWidth: '700px', margin: '0 auto'}}>A sanctuary for food lovers in the heart of {location}. We believe every meal should be a celebration.</p>
          
          <div className={styles.imageMosaic}>
            <div className={styles.mosaicItem} style={{gridRow: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Visual Ambiance #1</div>
            <div className={styles.mosaicItem} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Local Vibes #2</div>
            <div className={styles.mosaicItem} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Craft Details #3</div>
          </div>
        </div>
      </section>

      {/* 5. Closing Reservation */}
      <footer className={styles.footer}>
        <div className="container">
          <h2 style={{fontFamily: 'serif', fontSize: '2.5rem', marginBottom: '20px'}}>Join Us Tonight</h2>
          <p style={{marginBottom: '40px', opacity: 0.7}}>Serving the {location} community with pride and passion.</p>
          <div style={{display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap'}}>
            <div style={{textAlign: 'left', padding: '20px', border: '1px solid #333'}}>
              <h4 style={{color: '#ff7e33'}}>ADDRESS</h4>
              <p>Oxford Rd, {location}</p>
            </div>
            <div style={{textAlign: 'left', padding: '20px', border: '1px solid #333'}}>
              <h4 style={{color: '#ff7e33'}}>OPENING HOURS</h4>
              <p>Mon-Sun: 12pm - 11pm</p>
            </div>
          </div>
          <div style={{marginTop: '60px'}}>
            <a href={`tel:${phone}`} className={styles.reserveBtn} style={{padding: '20px 60px', fontSize: '1.1rem'}}>Call to Book: {phone}</a>
          </div>
          <p style={{marginTop: '80px', opacity: 0.3, fontSize: '0.8rem'}}>© 2026 {name} | {niche.toUpperCase()} | {location.toUpperCase()}</p>
        </div>
      </footer>
    </div>
  );
}

export default function GustoPage() {
  return (
    <Suspense fallback={<div>Setting the table...</div>}>
      <GustoContent />
    </Suspense>
  );
}
