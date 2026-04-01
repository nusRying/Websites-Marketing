'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HardHat, CloudRain, Star, Phone, ArrowRight, Hammer, Home, CheckCircle2, Zap } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import { RoofingConfig } from '@/configs/roofing';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './roofing-royale.module.css';

function RoofingContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Royale Roofing Contractors',
    niche: 'Roofing Specialist',
    location: 'Metropolitan Hub',
    phone: '0000 000 000',
    rating: '5.0'
  });

  return (
    <div className={styles.wrapper}>
      {/* Roofing SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": RoofingConfig.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Premier ${niche} and weather-proofing in ${location}. Lifetime protection and structural excellence.`
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.logo}
            >
              <ShieldCheck size={28} />
              {name.split(' ')[0]} <span>{name.split(' ').slice(1).join(' ')}</span>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.surveyBtn}
            >
              Free Survey
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'flex', gap: '15px', color: '#38bdf8', marginBottom: '30px' }}>
              <Hammer size={24} /> <CloudRain size={24} /> <ShieldCheck size={24} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: ai.heroTitle || t(RoofingConfig.hero.title) }} />
            <p>{ai.heroSubtitle || t(RoofingConfig.hero.subtitle)}</p>
            <motion.a 
              whileHover={{ gap: '15px', paddingRight: '45px' }}
              href="#book" 
              className={styles.surveyBtn} 
              style={{ padding: '18px 45px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              {ai.heroCta || RoofingConfig.hero.cta} <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '100px 0', background: '#f1f5f9' }}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a' }}>Structural Capabilities</h2>
              <p style={{ color: '#64748b', marginTop: '10px' }}>High-performance protection for your {location} property</p>
            </div>
          </Reveal>
          
          <div className={styles.grid}>
            {RoofingConfig.services.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <h3 style={{ marginBottom: '20px' }}>{s.title}</h3>
                  <p>{t(s.desc)}</p>
                  <motion.div 
                    whileHover={{ x: 10, color: '#38bdf8' }}
                    style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}
                  >
                    SPECS <Zap size={14} />
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
              <HardHat size={48} style={{ margin: '0 auto 30px', color: '#38bdf8', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px', color: '#f8fafc' }}>{ai.footerTitle || t(RoofingConfig.footer.title)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.7 }}>
                {ai.footerSubtitle || t(RoofingConfig.footer.subtitle)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#38bdf8', marginBottom: '50px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(56, 189, 248, 0.2)", "0 0 40px rgba(56, 189, 248, 0.5)", "0 0 20px rgba(56, 189, 248, 0.2)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className={styles.surveyBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL OPERATIONS: {phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | CERTIFIED {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </div>
        </div>
      </footer>

      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function RoofingPage() {
  return (
    <Suspense fallback={<div>Assessing the structure...</div>}>
      <RoofingContent />
    </Suspense>
  );
}
 the structure...</div>}>
      <RoofingContent />
    </Suspense>
  );
}
