'use client';
import { CheckCircle2, Star, ArrowRight, Truck, Box, Globe, ShieldCheck, Clock, Map, Package, Navigation } from 'lucide-react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { LogisticsConfig as config } from '@/configs/logistics';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './logistics.module.css';
import PrestigeBadge from '@/components/PrestigeBadge';
import TrustBadgeStrip from '@/components/TrustBadgeStrip';
import FAQSection from '@/components/FAQSection';
import Image from 'next/image';

const ACCENT = '#f97316';
const TESTIMONIALS = [
  { name: 'Carl B.', location: 'Supply Chain Director', text: 'Has completely transformed our distribution efficiency. On-time delivery rates are up 40 percent and the tracking is superb.', stars: 5 },
  { name: 'Helen A.', location: 'Operations Manager', text: 'Partnership has been seamless from day one. The account management team is responsive and deeply reliable.', stars: 5 },
  { name: 'John M.', location: 'Retail Client', text: 'Handling our peak season volumes was flawless. Communicated proactively throughout and delivered without a single delay.', stars: 5 },
];
function LogisticsContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Logic Logistics Group',
    niche: 'Delivery Specialist',
    location: 'Transport Hub',
    phone: '0000 000 000',
    rating: '4.8'
  });

  return (
    <div className={styles.wrapper}>
      {/* Logistics SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": config.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Elite ${niche} and logistics solutions in ${location}. Reliable, safe, and efficient transport.`
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
              <Truck size={28} />
              <div>{name.split(' ')[0]}<span>{name.split(' ').slice(1).join(' ')}</span></div>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.actionBtn}
            >
              Get a Quote
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
            <div style={{ display: 'flex', gap: '15px', color: '#f97316', marginBottom: '30px' }}>
              <Navigation size={24} /> <Package size={24} /> <Globe size={24} />
            </div>
            <PrestigeBadge niche={niche} location={location} accentColor={ACCENT} />
            <h1>{t(config.hero.title).split('Forward with')[0]} <br/> <span>Forward with {t(config.hero.title).split('Forward with')[1]}</span></h1>
            <p>
              {t(config.hero.subtitle)}
            </p>
            <motion.a 
              whileHover={{ gap: '15px', paddingRight: '45px' }}
              href={`tel:${phone}`} 
              className={styles.actionBtn} 
              style={{ padding: '18px 45px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              {config.hero.cta} <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>

      
        <div style={{ position: 'relative', width: '100%', height: '400px', marginTop: '40px', borderRadius: '16px', overflow: 'hidden' }}>
          <Image src="https://images.unsplash.com/photo-1586528116311-ad86d72af65c?auto=format&fit=crop&w=1200&q=80" alt={`${niche} in ${location}`} fill style={{ objectFit: 'cover' }} priority />
        </div>
    
      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <div className={styles.serviceGrid}>
            {config.services.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.serviceCard}>
                  <div style={{ color: '#f97316', marginBottom: '20px' }}>
                    {i === 0 ? <Box size={32} /> : i === 1 ? <Clock size={32} /> : <ShieldCheck size={32} />}
                  </div>
                  <h3>{s.title}</h3>
                  <p style={{ flex: 1 }}>{t(s.desc)}</p>
                  <ul style={{ marginTop: '20px', paddingLeft: '0', listStyle: 'none' }}>
                    {s.includes?.map((item: string, idx: number) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderTop: idx === 0 ? '1px solid #f1f5f9' : 'none', fontSize: '0.85rem', color: '#475569' }}>
                        <CheckCircle2 size={14} color={ACCENT} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.statsSection}>
        <div className="container">
          <Reveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
              {config.stats.map((item, i) => (
                <div key={i} className={styles.statItem}>
                  <h3>{item.value}</h3>
                  <p style={{ letterSpacing: '2px', opacity: 0.6, fontSize: '0.8rem', fontWeight: 700 }}>{item.label.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FAQSection faqs={config.faqs} accentColor={ACCENT} />
      <HowItWorks accentColor={ACCENT} />
      <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />

      <footer className={styles.footer}>
        <div className="container text-center">
          <Reveal>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <Map size={48} style={{ margin: '0 auto 30px', color: '#f97316' }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>{t(config.footer.title)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.7 }}>
                {t(config.footer.subtitle)} Get your free, no-obligation quote in minutes.
              </p>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(249, 115, 22, 0.2)", "0 0 40px rgba(249, 115, 22, 0.5)", "0 0 20px rgba(249, 115, 22, 0.2)"] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                href={`tel:${phone}`} 
                className={styles.actionBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL DISPATCH: {phone}
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

export default function LogisticsPage() {
  return (
    <Suspense fallback={<div>Optimizing routes...</div>}>
      <LogisticsContent />
    </Suspense>
  );
}