'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, MapPin, Heart, Shield, Award } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { LocalProConfig as Config } from '@/configs/local-pro';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './local-pro.module.css';


const ACCENT = '#2563eb';
const TESTIMONIALS = [
  { name: 'Neil C.', location: 'Home Owner', text: 'Called in the morning and they arrived by noon. Fixed the problem in under an hour. Honest, skilled and great value.', stars: 5 },
  { name: 'Emma S.', location: 'Regular Customer', text: 'Used them three times now for different jobs. Always reliable, always tidy, and always exactly as quoted. Brilliant.', stars: 5 },
  { name: 'Tony G.', location: 'Landlord', text: 'Use them for all my rental properties. Never let me down once. Tenants love them and so do I. Simply the best.', stars: 5 },
];
function LocalProContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Your Local Service',
    niche: 'Professional Expert',
    location: 'Local Area',
    phone: '0000 000 000',
    rating: '5.0'
  });

  return (
    <div className={styles.wrapper}>
      {/* Friendly SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": Config.schemaType,
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={styles.logo}
            >
              {name}
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${phone}`} 
              className="btn" 
              style={{backgroundColor: '#2563eb', padding: '10px 25px'}}
            >
              {Config.hero.cta}
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.badge}>
              <MapPin size={14} style={{ marginRight: 5 }} />
              {t(Config.hero.badge)}
            </div>
            <h1 style={{fontSize: '3.5rem', color: '#1e3a8a', marginBottom: '20px', fontWeight: 900}}>
              {t(Config.hero.title)}
            </h1>
            <p style={{fontSize: '1.3rem', color: '#475569', maxWidth: '800px', margin: '0 auto 40px'}}>
              {t(Config.hero.subtitle)}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#1e3a8a' }}>
                <Shield size={20} color="#10b981" /> 100% Insured
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#1e3a8a' }}>
                <Award size={20} color="#10b981" /> Certified Pro
              </div>
            </div>
          </motion.div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.services}>
        <div className="container">
          <Reveal>
            <h2 className="text-center" style={{fontSize: '2.8rem', color: '#1e3a8a', marginBottom: '60px'}}>Transparent Pricing</h2>
          </Reveal>
          
          <div className={styles.pricingGrid}>
            {Config.pricing.map((p, i) => (
              <Reveal key={i} delay={0.15 * i}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className={styles.priceCard} 
                  style={p.popular ? {borderColor: '#2563eb', background: '#eff6ff', position: 'relative'} : {}}
                >
                  {p.popular && <div style={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)', background: '#2563eb', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800 }}>MOST POPULAR</div>}
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{p.level}</h3>
                  <div className={styles.price}>{p.price}<span style={{fontSize: '1rem', color: '#64748b'}}>/session</span></div>
                  <ul className={styles.featureList}>
                    {p.features.map((f, j) => (
                      <li key={j}><Check size={16} color="#10b981" /> {t(f)}</li>
                    ))}
                  </ul>
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    href={`tel:${phone}`} 
                    className="btn" 
                    style={{width: '100%', backgroundColor: p.popular ? '#2563eb' : '#1e3a8a'}}
                  >
                    Select {p.level}
                  </motion.a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer style={{padding: '100px 0', background: '#1e3a8a', color: 'white', textAlign: 'center'}}>
        <div className="container">
          <Reveal>
            <div>
              <Heart size={48} style={{ margin: '0 auto 30px', color: '#60a5fa' }} />
              <h2 style={{fontSize: '3rem', fontWeight: 900, marginBottom: '20px'}}>{t(Config.footer.title)}</h2>
              <p style={{fontSize: '1.2rem', marginBottom: '50px', opacity: 0.8}}>{t(Config.footer.subtitle)}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', color: '#fbbf24', marginBottom: '40px' }}>
                <Star size={24} fill="currentColor" />
                <Star size={24} fill="currentColor" />
                <Star size={24} fill="currentColor" />
                <Star size={24} fill="currentColor" />
                <Star size={24} fill="currentColor" />
              </div>
              <motion.a 
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className="btn" 
                style={{backgroundColor: '#10b981', padding: '25px 60px', fontSize: '1.4rem', fontWeight: 900, borderRadius: '50px'}}
              >
                Call {name}: {phone}
              </motion.a>
            </div>
          </Reveal>
          <p style={{marginTop: '100px', opacity: 0.4, fontSize: '0.8rem', letterSpacing: '2px'}}>© 2026 {name.toUpperCase()} | YOUR NEIGHBORHOOD {niche.toUpperCase()} | {location.toUpperCase()}</p>
        </div>
      </footer>

      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function LocalProPage() {
  return (
    <Suspense fallback={<div>Connecting with neighbors...</div>}>
      <LocalProContent />
    </Suspense>
  );
}
