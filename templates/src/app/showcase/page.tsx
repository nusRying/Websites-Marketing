'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from './showcase.module.css';

function ShowcaseContent() {
  const searchParams = useSearchParams();
  
  // Dynamic Data
  const name = searchParams.get('name') || 'Your Craftsmanship Co.';
  const phone = searchParams.get('phone') || '0000 000 000';
  const niche = searchParams.get('niche') || 'Professional Contractor';
  const location = searchParams.get('location') || 'Local Area';

  return (
    <div className={styles.wrapper}>
      {/* 1. Elegant Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.logo}>{name}</div>
            <a href={`tel:${phone}`} className="btn">Get a Free Estimate</a>
          </div>
        </div>
      </header>

      {/* 2. Portfolio Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1>Expert {niche} in {location}</h1>
          <p style={{fontSize: '1.5rem', color: '#065f46', marginBottom: '40px'}}>
            Quality you can trust. Reliable service you can count on. 
            We transform homes across {location} with premium {niche.toLowerCase()} solutions.
          </p>
          <a href={`tel:${phone}`} className="btn btn-secondary" style={{backgroundColor: '#064e3b'}}>Call {phone}</a>
        </div>
      </section>

      {/* 3. The Process */}
      <section className={styles.process}>
        <div className="container">
          <h2 className="text-center">How We Work</h2>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '40px'}}>
            <div className={styles.step} style={{flex: '1 1 250px'}}>
              <div className={styles.stepNumber}>1</div>
              <h3>Free Consultation</h3>
              <p>We visit your property in {location} to discuss your needs and provide a fixed-price quote.</p>
            </div>
            <div className={styles.step} style={{flex: '1 1 250px'}}>
              <div className={styles.stepNumber}>2</div>
              <h3>Expert Work</h3>
              <p>Our fully certified {niche.toLowerCase()} team completes the job using only premium materials.</p>
            </div>
            <div className={styles.step} style={{flex: '1 1 250px'}}>
              <div className={styles.stepNumber}>3</div>
              <h3>Final Check</h3>
              <p>We don't leave until you are 100% happy with the transformation. No mess, no stress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Visual Gallery (Dynamic Placeholders) */}
      <section className={styles.gallery}>
        <div className="container">
          <h2 className="text-center">Our Recent Work in {location}</h2>
          <div className={styles.imageGrid}>
            <div className={styles.placeholderImage}>Recent {niche} Job #1</div>
            <div className={styles.placeholderImage}>Recent {niche} Job #2</div>
            <div className={styles.placeholderImage}>Recent {niche} Job #3</div>
            <div className={styles.placeholderImage}>Recent {niche} Job #4</div>
          </div>
        </div>
      </section>

      <footer style={{padding: '60px 0', background: '#064e3b', color: 'white', textAlign: 'center'}}>
        <div className="container">
          <h2>Ready to start your project?</h2>
          <p style={{margin: '20px 0 40px'}}>Join hundreds of happy customers in {location}.</p>
          <a href={`tel:${phone}`} className="btn" style={{backgroundColor: 'white', color: '#064e3b'}}>Call {name} at {phone}</a>
          <p style={{marginTop: '40px', opacity: 0.7}}>© 2026 {name} - High Quality {niche}.</p>
        </div>
      </footer>
    </div>
  );
}

export default function ShowcasePage() {
  return (
    <Suspense fallback={<div>Loading Portfolio...</div>}>
      <ShowcaseContent />
    </Suspense>
  );
}
