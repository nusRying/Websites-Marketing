'use client';
import { CheckCircle2, Star, ArrowRight, ShieldCheck, HardHat, CloudRain, Phone, Hammer, Home, Zap } from 'lucide-react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { RoofingConfig } from '@/configs/roofing';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './roofing-royale.module.css';
import PrestigeBadge from '@/components/PrestigeBadge';
import TrustBadgeStrip from '@/components/TrustBadgeStrip';
import FAQSection from '@/components/FAQSection';
import Image from 'next/image';

const ACCENT = '#dc2626';
const TESTIMONIALS = [
  { name: 'Brian T.', location: 'Homeowner', text: 'Replaced our entire roof in three days. Tidy, professional, and the quality of the work is absolutely excellent.', stars: 5 },
  { name: 'Carol F.', location: 'Insurance Claim', text: 'Handled storm damage with full insurance support. Documented everything, communicated clearly with insurers. Stress-free.', stars: 5 },
  { name: 'Dave M.', location: 'Extension Project', text: 'New extension roof was completed perfectly, matching the original exactly. Brilliant craftsmanship and a competitive quote.', stars: 5 },
];
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
            <PrestigeBadge niche={niche} location={location} accentColor={ACCENT} />
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

      
        <div style={{ position: 'relative', width: '100%', height: '400px', marginTop: '40px', borderRadius: '16px', overflow: 'hidden' }}>
          <Image src="https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1200&q=80" alt={`${niche} in ${location}`} fill style={{ objectFit: 'cover' }} priority />
        </div>
    
      <SocialProofBar accentColor={ACCENT} />

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
                  <p style={{ flex: 1 }}>{t(s.desc)}</p>
                  <ul style={{ marginTop: '20px', paddingLeft: '0', listStyle: 'none' }}>
                    {s.includes?.map((item: string, idx: number) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderTop: idx === 0 ? '1px solid #f1f5f9' : 'none', fontSize: '0.85rem', color: '#475569' }}>
                        <CheckCircle2 size={14} color={ACCENT} /> {item}
                      </li>
                    ))}
                  </ul>
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

      <FAQSection faqs={RoofingConfig.faqs} accentColor={ACCENT} />
      <HowItWorks accentColor={ACCENT} />
      <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />

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