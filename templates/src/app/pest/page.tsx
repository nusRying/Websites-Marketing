'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Search, Star, ArrowRight, Bug, Ghost } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { PrimePestConfig } from '@/configs/prime-pest';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './prime-pest.module.css';


const ACCENT = '#f59e0b';
const TESTIMONIALS = [
  { name: 'Kevin M.', location: 'Homeowner', text: 'Had a serious rodent problem and they resolved it completely within one visit. Professional, discreet and highly effective.', stars: 5 },
  { name: 'Rachel T.', location: 'Restaurant Owner', text: 'Provide monthly pest prevention for our kitchen and we have passed every inspection with perfect scores. Essential service.', stars: 5 },
  { name: 'Brian S.', location: 'Property Manager', text: 'Use them across all our properties. Rapid response, thorough treatment and always explain what they find and why.', stars: 5 },
];
function PestContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Prime Pest Defense',
    niche: 'Pest Specialist',
    location: 'Local Area',
    phone: '0000 000 000',
    rating: '5.0'
  });

  return (
    <div className={styles.wrapper}>
      {/* Pest Control SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": PrimePestConfig.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Premier ${niche} and eradication services in ${location}. Professional, discreet, and effective protection.`
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
              <ShieldAlert size={28} style={{ marginRight: 10, color: '#f59e0b' }} />
              {name.split(' ')[0]} <span>{name.split(' ').slice(1).join(' ')}</span>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.actionBtn}
            >
              Emergency Call
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
            <div style={{ display: 'flex', gap: '15px', color: '#f59e0b', marginBottom: '30px' }}>
              <Bug size={24} /> <Ghost size={24} /> <ShieldCheck size={24} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: t(PrimePestConfig.hero.title) }} />
            <p>{t(PrimePestConfig.hero.subtitle)}</p>
            <motion.a 
              whileHover={{ gap: '20px', paddingRight: '50px' }}
              href={`tel:${phone}`} 
              className={styles.actionBtn} 
              style={{ padding: '20px 60px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              Book Site Survey <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.services}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase' }}>Defense Strategies</h2>
              <p style={{ color: '#64748b', marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                PROTECTING THE {location.toUpperCase()} REGION
              </p>
            </div>
          </Reveal>
          
          <div className={styles.grid}>
            {PrimePestConfig.services.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <h3 style={{ marginBottom: '20px' }}>{s.title}</h3>
                  <p>{t(s.desc)}</p>
                  <motion.div 
                    whileHover={{ x: 10, color: '#f59e0b' }}
                    style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', borderTop: '1px solid #eee', paddingTop: '20px' }}
                  >
                    SPECS <Search size={14} />
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks accentColor={ACCENT} />
      <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />

      <footer className={styles.footer}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <ShieldCheck size={48} style={{ margin: '0 auto 30px', color: '#f59e0b', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>{t(PrimePestConfig.footer.title)}</h2>
              <p style={{ fontSize: '1.25rem', marginBottom: '50px', opacity: 0.7 }}>
                {t(PrimePestConfig.footer.subtitle)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#f59e0b', marginBottom: '50px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(245, 158, 11, 0.1)", "0 0 40px rgba(245, 158, 11, 0.3)", "0 0 20px rgba(245, 158, 11, 0.1)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className={styles.actionBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL DISPATCH: {phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | BPCA CERTIFIED {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </div>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function PestPage() {
  return (
    <Suspense fallback={<div>Establishing the perimeter...</div>}>
      <PestContent />
    </Suspense>
  );
}
