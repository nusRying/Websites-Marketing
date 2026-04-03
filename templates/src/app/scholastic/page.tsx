'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Users, Star, Award, Brain, Microscope, Music, Languages, Phone, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import { ScholasticConfig as Config } from '@/configs/scholastic';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './scholastic.module.css';

function ScholasticContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Scholastic Academy',
    niche: 'Private Tutor',
    location: 'Academic District',
    phone: '0000 000 000',
    rating: '5.0'
  });

  const disciplineIcons = [
    <Microscope size={32} key="micro" />,
    <Languages size={32} key="lang" />,
    <Music size={32} key="music" />
  ];

  return (
    <div className={styles.wrapper}>
      {/* Education SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": Config.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Expert ${niche} services in ${location}. Personalized learning for academic excellence.`
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.logo}
            >
              <GraduationCap size={32} />
              {name}
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.enrollBtn}
            >
              Book Assessment
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', color: '#0d9488', marginBottom: '20px' }}>
              <BookOpen size={24} /> <Brain size={24} /> <Star size={24} />
            </div>
            <h1>{ai.heroTitle || t(Config.hero.title)}</h1>
            <p>
              {ai.heroSubtitle || t(Config.hero.subtitle)}
            </p>
            <motion.a 
              whileHover={{ gap: '15px', paddingRight: '45px' }}
              href="#book" 
              className={styles.enrollBtn} 
              style={{ padding: '18px 45px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              {ai.heroCta || Config.hero.cta} <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontFamily: 'serif', color: '#1e3a8a' }}>Learning Disciplines</h2>
              <p style={{ opacity: 0.6, marginTop: '10px' }}>Expert guidance across core subjects in {location}</p>
            </div>
          </Reveal>
          
          <div className={styles.subjectGrid}>
            {Config.disciplines.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.subjectCard}>
                  <div style={{ color: '#0d9488', marginBottom: '20px' }}>{disciplineIcons[i] || disciplineIcons[0]}</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#1e3a8a' }}>{t(s.title)}</h3>
                  <p style={{ color: '#64748b', lineHeight: 1.7 }}>{t(s.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.resultsSection}>
        <div className="container">
          <Reveal>
            <h2 style={{ fontSize: '3rem', fontWeight: 200 }}>Proven Student Impact</h2>
          </Reveal>
          <div className={styles.statsGrid}>
            {Config.stats.map((item, i) => (
              <div key={i} className={styles.statItem}>
                <div className={styles.statValue}>{t(item.value)}</div>
                <p>{t(item.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <Award size={48} style={{ margin: '0 auto 30px', color: '#5eead4' }} />
              <h2 style={{ fontSize: '3.5rem', fontFamily: 'serif', marginBottom: '30px' }}>{ai.footerTitle || t(Config.footer.title)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.8 }}>
                {ai.footerSubtitle || t(Config.footer.subtitle)}
              </p>
              <motion.a 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className={styles.enrollBtn} 
                style={{ background: '#5eead4', color: '#0f172a', padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL {name.toUpperCase()}: {phone}
              </motion.a>
            </div>
          </Reveal>
          <p style={{ marginTop: '100px', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | CERTIFIED {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </p>
        </div>
      </footer>

      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function ScholasticPage() {
  return (
    <Suspense fallback={<div>Opening the classroom...</div>}>
      <ScholasticContent />
    </Suspense>
  );
}
