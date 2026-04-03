'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Sun, Lightbulb, Home, Phone, ArrowRight, Gauge, Cpu, CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { SparkConfig as config } from '@/configs/spark';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './spark.module.css';


const ACCENT = '#fbbf24';
const TESTIMONIALS = [
  { name: 'Neil H.', location: 'Homeowner', text: 'Had a complex rewiring job done and it was handled perfectly. Clean, efficient and passed all safety inspections first time.', stars: 5 },
  { name: 'Sue M.', location: 'Business Owner', text: 'Emergency call-out at 9pm and they arrived within the hour. Fixed the issue and gave clear advice. Absolute lifesavers.', stars: 5 },
  { name: 'Ian T.', location: 'Extension Project', text: 'Full electrical fit-out for our extension. Quality of work and attention to detail was outstanding throughout.', stars: 5 },
];
function SparkContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Volt Tech Solutions',
    niche: 'Electrical Specialist',
    location: 'Energy Hub',
    phone: '0000 000 000',
    rating: '4.9'
  });

  return (
    <div className={styles.wrapper}>
      {/* Electrical/Solar SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": config.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Elite ${niche} and energy solutions in ${location}. Safety-first certified installations.`
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={styles.logo}
            >
              <Zap size={28} style={{ color: '#fbbf24' }} />
              <div>{name.split(' ')[0]} <span>{name.split(' ').slice(1).join(' ')}</span></div>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.actionBtn}
            >
              Request Safety Check
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
            <div style={{ display: 'flex', gap: '15px', color: '#fbbf24', marginBottom: '30px' }}>
              <Gauge size={20} /> <Cpu size={20} /> <Lightbulb size={20} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: ai.heroTitle || t(config.hero.title).split('with')[0] + '<br/> <span>with ' + t(config.hero.title).split('with')[1] + '</span>' }} />
            <p>
              {ai.heroSubtitle || t(config.hero.subtitle)}
            </p>
            <motion.a 
              whileHover={{ gap: '15px', paddingRight: '45px' }}
              href="#book" 
              className={styles.actionBtn} 
              style={{ padding: '18px 45px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              {ai.heroCta || config.hero.cta} <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section style={{ padding: '100px 0', background: '#111' }}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase' }}>Technical Solutions</h2>
              <p style={{ color: '#94a3b8', marginTop: '10px' }}>Safety-first {niche} support for {location}</p>
            </div>
          </Reveal>
          
          <div className={styles.grid}>
            {config.solutions.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <div style={{ color: '#fbbf24', marginBottom: '20px' }}>
                    {i === 0 ? <ShieldCheck size={32} /> : i === 1 ? <Sun size={32} /> : <Home size={32} />}
                  </div>
                  <h3>{s.title}</h3>
                  <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>{t(s.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.safetySection}>
        <div className="container">
          <Reveal>
            <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Certified Safety Partner</h2>
          </Reveal>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginTop: '40px' }}>
            {config.safetyBar.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
                <CheckCircle2 size={24} /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks accentColor={ACCENT} />
      <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />

      <footer className={styles.footer}>
        <div className="container text-center">
          <Reveal>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>{ai.footerTitle || t(config.footer.title)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.7 }}>
                {ai.footerSubtitle || t(config.footer.subtitle)}
              </p>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(251, 191, 36, 0.3)", "0 0 40px rgba(251, 191, 36, 0.6)", "0 0 20px rgba(251, 191, 36, 0.3)"] }}
                transition={{ repeat: Infinity, duration: 2 }}
                href={`tel:${phone}`} 
                className={styles.actionBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL {name.toUpperCase()}: {phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.2, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | CERTIFIED {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </div>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function SparkPage() {
  return (
    <Suspense fallback={<div>Charging systems...</div>}>
      <SparkContent />
    </Suspense>
  );
}
