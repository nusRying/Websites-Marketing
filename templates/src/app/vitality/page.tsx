'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Zap, MapPin, Calendar, Heart, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import { VitalityConfig } from '@/configs/vitality';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './vitality.module.css';

function VitalityContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Vitality Studio',
    niche: 'Wellness Expert',
    location: 'Local District'
  });

  return (
    <div className={styles.wrapper}>
      {/* Wellness SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": VitalityConfig.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.logo}
            >
              {name}
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.bookBtn}
            >
              Book Class
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div style={{ color: '#86efac', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <Leaf size={32} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: t(VitalityConfig.hero.title).replace('Balance', '<span>Balance</span>') }} />
            <p>{t(VitalityConfig.hero.subtitle)}</p>
            <motion.a 
              whileHover={{ gap: '15px' }}
              href="#book" 
              className={styles.bookBtn} 
              style={{ padding: '18px 45px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              {ai.niche_cta || t(VitalityConfig.hero.cta)} <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className={styles.scheduleSection}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 200 }}>{niche} Schedule</h2>
              <p style={{ opacity: 0.6, marginTop: '10px' }}>Designed for every level in {location}</p>
            </div>
          </Reveal>
          
          <div className={styles.classGrid}>
            {VitalityConfig.classes.map((c, i) => {
              const icons = [<Zap size={24} />, <Heart size={24} />, <Users size={24} />];
              return (
                <Reveal key={i} delay={0.1 * i}>
                  <div className={styles.classCard}>
                    <span className={styles.time}>{t(c.time)}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                      <div style={{ color: '#86efac' }}>{icons[i % icons.length]}</div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 400 }}>{t(c.name)}</h3>
                    </div>
                    <p style={{ marginTop: '20px', color: '#64748b' }}>A signature {niche.toLowerCase()} session focused on sustainable movement and breath.</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.community}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', alignItems: 'center' }}>
            <Reveal>
              <div className={styles.imageCircle}>
                {/* Visual placeholder for movement */}
                <div style={{ textAlign: 'center', color: '#64748b' }}>
                  <Users size={48} style={{ opacity: 0.3 }} />
                  <p>Community Moments</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 200, marginBottom: '20px' }}>A Space for {location}</h2>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#475569' }}>
                  We built {name} to be more than just a gym. It's a sanctuary in {location} where you can disconnect from the noise and reconnect with your potential.
                </p>
                <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.5rem', color: '#0f172a' }}>500+</strong>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Local Members</span>
                  </div>
                  <div style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '20px' }}>
                    <strong style={{ display: 'block', fontSize: '1.5rem', color: '#0f172a' }}>12+</strong>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Expert Coaches</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 200, marginBottom: '20px' }}>{t(VitalityConfig.footer.title)}</h2>
              <p style={{ opacity: 0.7, marginBottom: '40px' }}>{t(VitalityConfig.footer.subtitle)}</p>
              <motion.a 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                href={`tel:${phone}`} 
                className={styles.bookBtn} 
                style={{ padding: '25px 60px', fontSize: '1.2rem', display: 'inline-block' }}
              >
                Call to Book: {phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '80px', opacity: 0.4, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | {location.toUpperCase()} WELLNESS
          </div>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function VitalityPage() {
  return (
    <Suspense fallback={<div>Finding Balance...</div>}>
      <VitalityContent />
    </Suspense>
  );
}
