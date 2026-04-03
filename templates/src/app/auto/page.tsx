'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Gauge, ShieldAlert, Zap, Settings, Star, Phone, CheckCircle2, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { AutoConfig as Config } from '@/configs/auto';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './auto.module.css';


const ACCENT = '#ef4444';
const TESTIMONIALS = [
  { name: 'Mike D.', location: 'Car Owner', text: 'Trusted them with my classic car restoration and they delivered beyond imagination. True craftsmen who genuinely care.', stars: 5 },
  { name: 'Steve G.', location: 'Fleet Manager', text: 'Manage our entire company fleet efficiently and cost-effectively. Have never had a single complaint from drivers.', stars: 5 },
  { name: 'Phil T.', location: 'Diagnostics Customer', text: 'Diagnosed an issue three other garages missed. Fixed it first time, fairly priced and really took the time to explain.', stars: 5 },
];
function AutoContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Auto Armor Performance',
    niche: 'Auto Specialist',
    location: 'Local Area',
    phone: '0000 000 000',
    rating: '4.8'
  });

  const icons = [<Gauge size={32} key="gauge" />, <ShieldAlert size={32} key="shield" />, <Zap size={32} key="zap" />];

  return (
    <div className={styles.wrapper}>
      {/* Automotive SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": Config.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Elite ${niche} services in ${location}. Precision diagnostics and certified repairs.`
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <motion.div 
              initial={{ skewX: -10, opacity: 0 }}
              animate={{ skewX: -10, opacity: 1 }}
              className={styles.logo}
            >
              <Settings size={28} style={{ marginRight: 8 }} />
              {name.toUpperCase()}
            </motion.div>
            <motion.a 
              whileHover={{ x: 5 }}
              href={`tel:${phone}`} 
              style={{ color: '#ea580c', fontWeight: 900, fontSize: '1.1rem' }}
            >
              EMERGENCY: {phone}
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', color: '#ea580c', marginBottom: '20px' }}>
              <Gauge size={24} /> <Wrench size={24} /> <Zap size={24} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: t(Config.hero.title) }} />
            <p>
              {t(Config.hero.subtitle)}
            </p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#book" 
              className="btn" 
              style={{ backgroundColor: '#ea580c', padding: '20px 60px', fontWeight: 900, borderRadius: '0', fontSize: '1.2rem' }}
            >
              {Config.hero.cta}
            </motion.a>
          </motion.div>

          <div className={styles.specBar}>
            {Config.specs.map((spec, i) => (
              <div key={i} className={styles.specItem}>
                <CheckCircle2 size={18} /> {t(spec)}
              </div>
            ))}
          </div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.services}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase' }}>Workshop Capabilities</h2>
              <p style={{ color: '#94a3b8', marginTop: '10px' }}>Advanced technical support for {location} motorists</p>
            </div>
          </Reveal>
          
          <div className={styles.serviceGrid}>
            {Config.capabilities.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.serviceCard}>
                  <div style={{ color: '#ea580c', marginBottom: '20px' }}>{icons[i] || icons[0]}</div>
                  <h3>{t(s.title)}</h3>
                  <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>{t(s.desc)}</p>
                  <motion.div whileHover={{ x: 5 }} style={{ marginTop: '20px', color: '#ea580c', fontWeight: 700, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    Learn More <ChevronRight size={16} />
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.bookingSection}>
        <div className="container">
          <Reveal>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', color: '#fff', marginBottom: '30px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="currentColor" />)}
              </div>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '20px', textTransform: 'uppercase' }}>{t(Config.footer.title)}</h2>
              <p style={{ fontSize: '1.3rem', marginBottom: '50px', opacity: 0.9 }}>
                {t(Config.footer.subtitle)}
              </p>
              <motion.a 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                href={`tel:${phone}`} 
                className="btn" 
                style={{ backgroundColor: '#0f172a', color: 'white', padding: '25px 80px', fontSize: '1.4rem', fontWeight: 900, borderRadius: '0' }}
              >
                CALL {name.toUpperCase()}: {phone}
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      <HowItWorks accentColor={ACCENT} />
      <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />

      <footer className={styles.footer}>
        <div className="container">
          <div style={{ fontWeight: 900, fontSize: '1.5rem', marginBottom: '20px', letterSpacing: '2px', fontStyle: 'italic' }}>
            {name.toUpperCase()} <span>PERFORMANCE</span>
          </div>
          <p style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '2px' }}>
            © 2026 | CERTIFIED {niche.toUpperCase()} | {location.toUpperCase()} HUB
          </p>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function AutoPage() {
  return (
    <Suspense fallback={<div>Igniting engines...</div>}>
      <AutoContent />
    </Suspense>
  );
}
