'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Sun, Leaf, Zap, ShieldCheck, Star, ArrowRight, Battery, Globe, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import { GreenGrowthConfig } from '@/configs/green-growth';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './green-growth.module.css';

function GreenContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Green Growth Renewables',
    niche: 'Solar Specialist',
    location: 'Sustainable District',
    phone: '0000 000 000',
    rating: '5.0'
  });

  return (
    <div className={styles.wrapper}>
      {/* Renewable SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": GreenGrowthConfig.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Premier ${niche} and renewable energy solutions in ${location}. Powering energy independence.`
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.logo}
            >
              <Leaf size={28} />
              {name.split(' ')[0]} <span>{name.split(' ').slice(1).join(' ')}</span>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.saveBtn}
            >
              Savings Report
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
            <div style={{ display: 'flex', gap: '15px', color: '#10b981', marginBottom: '30px' }}>
              <Sun size={24} /> <Zap size={24} /> <Globe size={24} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: t(GreenGrowthConfig.hero.title) }} />
            <p>{t(GreenGrowthConfig.hero.subtitle)}</p>
            <motion.a 
              whileHover={{ scale: 1.05, paddingRight: '50px' }}
              whileTap={{ scale: 0.95 }}
              href="#book" 
              className={styles.saveBtn} 
              style={{ padding: '18px 45px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              Start Saving <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className={styles.impactSection}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
              <ShieldCheck size={24} color="#fff" /> MCS CERTIFIED
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
              <CheckCircle2 size={24} color="#fff" /> OZEV APPROVED
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
              <Globe size={24} color="#fff" /> {location.toUpperCase()} HUB
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0', background: 'white' }}>
        <div className="container">
          <reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#064e3b' }}>High-Efficiency Solutions</h2>
              <p style={{ color: '#64748b', marginTop: '10px' }}>Future-proof energy for your {location} property</p>
            </div>
          </reveal>
          
          <div className={styles.grid}>
            {GreenGrowthConfig.solutions.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <h3 style={{ marginBottom: '20px' }}>{s.title}</h3>
                  <p>{t(s.desc)}</p>
                  <motion.div 
                    whileHover={{ x: 10, color: '#10b981' }}
                    style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}
                  >
                    SPECS <Battery size={14} />
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
              <Sun size={48} style={{ margin: '0 auto 30px', color: '#10b981', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px', color: '#064e3b' }}>{t(GreenGrowthConfig.footer.title)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.7 }}>
                {t(GreenGrowthConfig.footer.subtitle)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#10b981', marginBottom: '50px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(16, 185, 129, 0.2)", "0 0 40px rgba(16, 185, 129, 0.5)", "0 0 20px rgba(16, 185, 129, 0.2)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className={styles.saveBtn} 
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

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function GreenPage() {
  return (
    <Suspense fallback={<div>Charging the view...</div>}>
      <GreenContent />
    </Suspense>
  );
}
