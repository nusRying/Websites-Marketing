'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { PropertyConfig as Config } from '@/configs/property';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './property.module.css';


const ACCENT = '#1e293b';
const TESTIMONIALS = [
  { name: 'Louise M.', location: 'Property Seller', text: 'Sold in two weeks above asking price. The marketing was exceptional and they handled every negotiation perfectly.', stars: 5 },
  { name: 'Paul K.', location: 'Property Buyer', text: 'Found us exactly what we wanted in a competitive area. Knowledgeable, honest and worked incredibly hard on our behalf.', stars: 5 },
  { name: 'Helen S.', location: 'Landlord', text: 'Managing our portfolio for three years with zero issues. Tenant communications, maintenance and compliance are all handled brilliantly.', stars: 5 },
];
function PropertyContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Prime Realty Group',
    niche: 'Property Specialist',
    location: 'Metropolitan',
    phone: '0000 000 000',
    rating: '4.9'
  });

  return (
    <div className={styles.wrapper}>
      {/* Real Estate SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": Config.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Premier ${niche} services in ${location}. Managing luxury assets and exclusive listings.`
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
              <Building2 size={24} style={{ marginRight: 10 }} />
              {name}
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.actionBtn}
            >
              {Config.hero.cta}
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>
              {t(Config.hero.title)}
            </h1>
            <p>
              {t(Config.hero.subtitle)}
            </p>
            <motion.a 
              whileHover={{ gap: '20px' }}
              href="#book" 
              className={styles.actionBtn} 
              style={{ padding: '20px 60px', display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem' }}
            >
              Browse Private Collection <ArrowUpRight size={20} />
            </motion.a>
          </motion.div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.marketSection}>
        <div className="container">
          <Reveal>
            <div style={{ marginBottom: '60px' }}>
              <p style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', color: '#666' }}>MARKET AUTHORITY</p>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginTop: '10px' }}>The Numbers of Success</h2>
            </div>
          </Reveal>
          
          <div className={styles.statGrid}>
            {Config.stats.map((s, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div className={styles.statItem}>
                  <h3>{t(s.val)}</h3>
                  <p>{t(s.label)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section style={{ padding: '100px 0', background: '#000', color: '#fff' }}>
        <div className="container">
          <Reveal>
            <div className="text-center" style={{ marginBottom: '80px' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Featured Portfolio</h2>
              <p style={{ opacity: 0.6, marginTop: '20px' }}>Exclusive opportunities currently available in {location}</p>
            </div>
          </Reveal>
          
          <div className={styles.listingGrid}>
            {[
              { name: "The Glass House", area: "West " + location, price: "£2.4M" },
              { name: "Skyline Penthouse", area: "Central " + location, price: "£1.8M" }
            ].map((p, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <motion.div whileHover={{ scale: 1.02 }} className={styles.propertyCard}>
                  <div className={styles.propertyInfo}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ccc', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '10px' }}>
                      <MapPin size={12} /> {p.area}
                    </div>
                    <h3>{p.name}</h3>
                    <div style={{ fontWeight: 900, color: '#fff', fontSize: '1.2rem' }}>{p.price}</div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks accentColor={ACCENT} />
      <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />

      <footer className={styles.footer}>
        <div className="container text-center">
          <Reveal>
            <div>
              <ShieldCheck size={48} style={{ margin: '0 auto 30px', color: '#fff' }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>{t(Config.footer.title)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.7, maxWidth: '600px', margin: '0 auto 50px' }}>
                {t(Config.footer.subtitle)}
              </p>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href={`tel:${phone}`} 
                className={styles.actionBtn} 
                style={{ background: '#fff', color: '#000', padding: '25px 80px', fontSize: '1.4rem' }}
              >
                Call Advisory: {phone}
              </motion.a>
            </div>
          </Reveal>
          <p style={{ marginTop: '100px', opacity: 0.3, fontSize: '0.75rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | REGULATED {niche.toUpperCase()} | {location.toUpperCase()}
          </p>
        </div>
      </footer>

      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function PropertyPage() {
  return (
    <Suspense fallback={<div>Opening the vault...</div>}>
      <PropertyContent />
    </Suspense>
  );
}
