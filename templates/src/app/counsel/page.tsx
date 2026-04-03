'use client';

import { Suspense, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Briefcase, TrendingUp, Scale, Users, Phone, ArrowRight, Gavel, Landmark } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { CounselConfig } from '@/configs/counsel';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './counsel.module.css';

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let totalMilisecondDur = 2000;
    let incrementTime = (totalMilisecondDur / end);
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}</span>;
}


const ACCENT = '#1e40af';
const TESTIMONIALS = [
  { name: 'Michael H.', location: 'Business Client', text: 'Responded quickly, explained everything clearly, and achieved a brilliant result. Truly outstanding legal representation.', stars: 5 },
  { name: 'Priya S.', location: 'Family Law', text: 'During a very difficult time they handled everything with professionalism and genuine care. Forever grateful.', stars: 5 },
  { name: 'David W.', location: 'Contract Review', text: 'Sharp, thorough, and highly strategic. The advice saved our business from a costly dispute. Worth every penny.', stars: 5 },
];
function CounselContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Elite Partners & Co',
    niche: 'Chartered Accountant',
    location: 'Financial District',
    phone: '0000 000 000',
    rating: '4.9'
  });

  return (
    <div className={styles.wrapper}>
      {/* Professional SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": CounselConfig.schemaType,
            "name": name,
            "telephone": phone,
            "address": { "@type": "PostalAddress", "addressLocality": location }
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
              <Landmark size={28} />
              <div>{name.split(' ')[0]} <span>{name.split(' ').slice(1).join(' ')}</span></div>
            </motion.div>
            <motion.a 
              whileHover={{ backgroundColor: '#1e3a8a', color: 'white' }}
              href={`tel:${phone}`} 
              className="btn" 
              style={{ background: 'transparent', border: '1px solid #1e3a8a', color: '#1e3a8a', fontSize: '0.85rem' }}
            >
              Secure Strategy Session
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p style={{ color: '#3b82f6', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
                Precision. Strategy. Integrity.
              </p>
              <h1 dangerouslySetInnerHTML={{ __html: t(CounselConfig.hero.title) }} />
              <p>{t(CounselConfig.hero.subtitle)}</p>
              <motion.a 
                whileHover={{ gap: '15px', x: 5 }}
                href="#book" 
                className="btn" 
                style={{ background: '#0f172a', padding: '20px 45px', display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}
              >
                {t(CounselConfig.hero.cta)} <ArrowRight size={20} />
              </motion.a>
            </motion.div>
          </div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {CounselConfig.stats.map((stat, i) => (
              <div key={i} className={styles.statItem}>
                <h3>
                  {stat.label.includes('£') && '£'}
                  <Counter value={stat.value} />
                  {stat.label.includes('%') ? '%' : (stat.label.includes('£') ? 'M+' : '+')}
                </h3>
                <p>{t(stat.label)}</p>
              </div>
            ))}
          </div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.expertise}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Core Expertise</h2>
              <p style={{ maxWidth: '600px', margin: '20px auto 0', opacity: 0.6 }}>
                Tailored {niche.toLowerCase()} solutions for high-net-worth individuals and corporate entities in {location}.
              </p>
            </div>
          </Reveal>
          
          <div className={styles.expertiseGrid}>
            {CounselConfig.expertise.map((item, i) => {
              const icons = [<Shield size={32} />, <TrendingUp size={32} />, <Gavel size={32} />];
              return (
                <Reveal key={i} delay={0.2 * i}>
                  <div className={styles.expertiseCard}>
                    <div style={{ color: '#3b82f6', marginBottom: '25px' }}>{icons[i % icons.length]}</div>
                    <h3>{t(item.title)}</h3>
                    <p style={{ color: '#64748b', lineHeight: 1.7 }}>{t(item.desc)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <HowItWorks accentColor={ACCENT} />
      <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />

      <footer className={styles.footer}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px' }}>
            <Reveal>
              <div>
                <div className={styles.logo} style={{ color: 'white', marginBottom: '20px' }}>
                  <Landmark size={24} /> {name}
                </div>
                <p style={{ opacity: 0.6, lineHeight: 1.8 }}>
                  The premier {niche.toLowerCase()} practice serving the {location} area. 
                  Committed to excellence in every consultation.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <h4 style={{ color: '#3b82f6', marginBottom: '20px', letterSpacing: '1px' }}>{t(CounselConfig.footer.title).toUpperCase()}</h4>
                <p>{t(CounselConfig.footer.subtitle)}</p>
                <p style={{ marginTop: '20px', fontWeight: 700 }}>{phone}</p>
              </div>
            </Reveal>
          </div>
          <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #1e293b', textAlign: 'center', opacity: 0.4, fontSize: '0.8rem' }}>
            © 2026 {name.toUpperCase()} | LICENSED {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </div>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function CounselPage() {
  return (
    <Suspense fallback={<div>Establishing Authority...</div>}>
      <CounselContent />
    </Suspense>
  );
}
