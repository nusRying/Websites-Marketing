'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Heart, Star, Phone, ArrowRight, Brush, Home, CheckCircle2, Zap } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import { CleaningConfig } from '@/configs/cleaning';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './sparkle-shine.module.css';

function CleaningContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Elite Sparkle Cleaners',
    niche: 'Cleaning Specialist',
    location: 'Central District',
    phone: '0000 000 000',
    rating: '5.0'
  });

  return (
    <div className={styles.wrapper}>
      {/* ... (SEO Schema) */}

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.logo}
            >
              <Sparkles size={28} />
              {name.split(' ')[0]} <span>{name.split(' ').slice(1).join(' ')}</span>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.sparkBtn}
            >
              Quick Estimate
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', color: '#0ea5e9', marginBottom: '30px' }}>
              <Home size={24} /> <Brush size={24} /> <Zap size={24} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: t(CleaningConfig.hero.title) }} />
            <p>{t(CleaningConfig.hero.subtitle)}</p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#book" 
              className={styles.sparkBtn} 
              style={{ padding: '18px 45px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              {ai.niche_cta || 'Start Fresh Today'} <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className={styles.purityBanner}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
              <ShieldCheck size={24} color="#fff" /> ECO-FRIENDLY
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
              <CheckCircle2 size={24} color="#fff" /> FULLY INSURED
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
              <Heart size={24} color="#fff" /> {location.toUpperCase()} HUB
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0', background: 'white' }}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a' }}>Signature Standards</h2>
              <p style={{ color: '#64748b', marginTop: '10px' }}>Clinical purity for your {location} property</p>
            </div>
          </Reveal>
          
          <div className={styles.grid}>
            {CleaningConfig.services.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <h3 style={{ marginBottom: '20px' }}>{s.title}</h3>
                  <p>{t(s.desc)}</p>
                  <motion.div 
                    whileHover={{ x: 10, color: '#0ea5e9' }}
                    style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}
                  >
                    SPECS <Sparkles size={14} />
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container text-center">
          <Reveal>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <Sparkles size={48} style={{ margin: '0 auto 30px', color: '#0ea5e9', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px', color: '#0f172a' }}>{t(CleaningConfig.footer.title)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.7 }}>
                {t(CleaningConfig.footer.subtitle)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#0ea5e9', marginBottom: '50px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(14, 165, 233, 0.2)", "0 0 40px rgba(14, 165, 233, 0.5)", "0 0 20px rgba(14, 165, 233, 0.2)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className={styles.sparkBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL TEAM: {phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | CERTIFIED {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </div>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function CleaningPage() {
  return (
    <Suspense fallback={<div>De-dusting the view...</div>}>
      <CleaningContent />
    </Suspense>
  );
}
