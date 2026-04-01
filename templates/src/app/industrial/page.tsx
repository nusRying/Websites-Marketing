'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Award, FileCheck, Map, PhoneCall, HardHat, Construction } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import { IndustrialConfig as Config } from '@/configs/industrial';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './industrial.module.css';

const ICON_MAP = {
  Award: Award,
  ShieldAlert: ShieldAlert,
  FileCheck: FileCheck
};

function IndustrialContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Industrial Solutions Ltd',
    niche: 'Industrial Specialist',
    location: 'Local Area',
    phone: '0000 000 000',
    rating: '5.0'
  });

  return (
    <div className={styles.wrapper}>
      {/* Authoritative SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": Config.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Industrial Services"
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={styles.logo}
            >
              {name.split(' ')[0]}<span className={styles.yellow}>{name.split(' ').slice(1).join(' ')}</span>
            </motion.div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <motion.a 
                whileHover={{ color: '#facc15' }}
                href={`tel:${phone}`} 
                style={{fontWeight: 900, fontSize: '1.1rem'}}
              >
                {phone}
              </motion.a>
            </div>
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
            <div style={{ display: 'flex', gap: '15px', color: '#facc15', marginBottom: '30px' }}>
              <HardHat size={24} /> <Construction size={24} /> <ShieldAlert size={24} />
            </div>
            <h1>{t(Config.hero.title)}</h1>
            <p style={{fontSize: '1.3rem', maxWidth: '650px', marginBottom: '50px', opacity: 0.9, lineHeight: 1.6}}>
              {t(Config.hero.subtitle)}
            </p>
            <motion.a 
              whileHover={{ x: 10 }}
              href={`tel:${phone}`} 
              className="btn" 
              style={{backgroundColor: '#facc15', color: '#0f172a', padding: '20px 50px', fontWeight: 900, borderRadius: '0'}}
            >
              {Config.hero.cta}
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className={styles.credentials}>
        <div className="container">
          <div className={styles.credFlex}>
            <motion.span whileHover={{ y: -3 }}>✓ FULLY INSURED & BONDED</motion.span>
            <motion.span whileHover={{ y: -3 }}>✓ CHAS & ISO ACCREDITED</motion.span>
            <motion.span whileHover={{ y: -3 }}>✓ {location.toUpperCase()} REGIONAL HUB</motion.span>
            <motion.span whileHover={{ y: -3 }}>✓ 24/7 TECHNICAL SUPPORT</motion.span>
          </div>
        </div>
      </section>

      <section className={styles.services}>
        <div className="container">
          <Reveal>
            <h2 className="text-center" style={{fontSize: '3rem', color: '#0f172a', fontWeight: 900}}>Core Industrial Capabilities</h2>
          </Reveal>
          
          <div className={styles.industrialGrid}>
            {Config.services.map((s, i) => {
              const Icon = ICON_MAP[Object.keys(ICON_MAP)[i] as keyof typeof ICON_MAP] || Award;
              return (
                <Reveal key={i} delay={0.2 * i}>
                  <div className={styles.industrialCard} style={{ transition: 'all 0.3s ease' }}>
                    <div style={{ color: '#facc15', marginBottom: '20px' }}><Icon /></div>
                    <h3>{s.title}</h3>
                    <p style={{ color: '#475569', lineHeight: 1.7 }}>{t(s.desc)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.quoteSection}>
        <div className="container">
          <Reveal>
            <div>
              <Map size={48} style={{ margin: '0 auto 30px' }} />
              <h2>{t(Config.footer.title)}</h2>
              <p style={{fontSize: '1.3rem', marginBottom: '50px', opacity: 0.9}}>{t(Config.footer.subtitle)}</p>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`tel:${phone}`} 
                className="btn" 
                style={{backgroundColor: '#0f172a', color: 'white', padding: '25px 80px', fontSize: '1.4rem', fontWeight: 900, borderRadius: '0'}}
              >
                <PhoneCall size={20} style={{ marginRight: 10, display: 'inline' }} />
                Contact Logistics: {phone}
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer style={{padding: '60px 0', textAlign: 'center', background: '#0f172a', color: 'white'}}>
        <div className="container">
          <div style={{fontWeight: 900, fontSize: '1.5rem', marginBottom: '20px', letterSpacing: '2px'}}>{name.toUpperCase()}</div>
          <p style={{opacity: 0.5, fontSize: '0.8rem'}}>© 2026 | INDUSTRIAL GRADE {niche.toUpperCase()} | {location.toUpperCase()} REGION</p>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function IndustrialPage() {
  return (
    <Suspense fallback={<div>Deploying infrastructure...</div>}>
      <IndustrialContent />
    </Suspense>
  );
}
