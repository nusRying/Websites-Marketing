'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Zap, Trophy, Timer, Users, Target, ShieldCheck, Flame } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import { FitConfig as config } from '@/configs/fit';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './fit.module.css';

function FitContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Fit Focus Elite',
    niche: 'Fitness Specialist',
    location: 'Performance Zone',
    phone: '0000 000 000',
    rating: '5.0'
  });

  return (
    <div className={styles.wrapper}>
      {/* Fitness SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": config.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Elite ${niche} and performance training in ${location}. Results-driven coaching for serious athletes.`
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <motion.div 
              initial={{ skewX: -15, opacity: 0 }}
              animate={{ skewX: -15, opacity: 1 }}
              className={styles.logo}
            >
              <Dumbbell size={28} />
              {name.toUpperCase()}
            </motion.div>
            <motion.a 
              whileHover={{ x: 10, color: '#adff2f' }}
              href={`tel:${phone}`} 
              style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-1px' }}
            >
              JOIN THE TEAM: {phone}
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', color: '#adff2f', marginBottom: '20px' }}>
              <Zap size={24} /> <Flame size={24} /> <Trophy size={24} />
            </div>
            <h1>{t(config.hero.title).split('Built in')[0]} <br/> <span>Built in {t(config.hero.title).split('Built in')[1]}</span></h1>
            <p>
              {t(config.hero.subtitle)}
            </p>
            <motion.a 
              whileHover={{ skewX: -10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#book" 
              className={styles.actionBtn} 
              style={{ padding: '20px 60px', fontSize: '1.25rem' }}
            >
              {config.hero.cta}
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className={styles.trainingSection}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic' }}>Training Disciplines</h2>
              <p style={{ color: '#64748b', marginTop: '10px', letterSpacing: '2px' }}>FORGED FOR SUCCESS IN {location.toUpperCase()}</p>
            </div>
          </Reveal>
          
          <div className={styles.trainingGrid}>
            {config.disciplines.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.trainingCard}>
                  <div style={{ color: '#adff2f', marginBottom: '25px' }}>
                    {i === 0 ? <Target size={32} /> : i === 1 ? <Users size={32} /> : <Timer size={32} />}
                  </div>
                  <h3>{s.title}</h3>
                  <p style={{ color: '#a3a3a3', lineHeight: 1.8 }}>{t(s.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.transformSection}>
        <div className="container">
          <Reveal>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 900, fontSize: '1.2rem' }}>
                <ShieldCheck size={28} /> RESULTS GUARANTEED
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 900, fontSize: '1.2rem' }}>
                <Zap size={28} /> ELITE EQUIPMENT
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 900, fontSize: '1.2rem' }}>
                <Trophy size={28} /> {location.toUpperCase()} HUB
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container text-center">
          <Reveal>
            <div style={{ maxWidth: '750px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '30px', fontStyle: 'italic' }}>{t(config.footer.title)}</h2>
              <p style={{ fontSize: '1.3rem', marginBottom: '50px', opacity: 0.7 }}>
                {t(config.footer.subtitle)}
              </p>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(173, 255, 47, 0.2)", "0 0 50px rgba(173, 255, 47, 0.5)", "0 0 20px rgba(173, 255, 47, 0.2)"] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                href={`tel:${phone}`} 
                className={styles.actionBtn} 
                style={{ padding: '25px 80px', fontSize: '1.5rem', borderRadius: '0' }}
              >
                CALL COACH: {phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.2, fontSize: '0.85rem', letterSpacing: '4px', fontStyle: 'italic' }}>
            © 2026 {name.toUpperCase()} | ELITE {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </div>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function FitPage() {
  return (
    <Suspense fallback={<div>Powering up...</div>}>
      <FitContent />
    </Suspense>
  );
}
