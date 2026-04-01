'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, MapPin, Heart, Award, Sparkles, ArrowRight, Activity, Stethoscope } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import { DentalConfig as Config } from '@/configs/dental';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './dental.module.css';

function DentalContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Dental Deluxe Clinic',
    niche: 'Dental Specialist',
    location: 'Medical District',
    phone: '0000 000 000',
    rating: '5.0'
  });

  const barIcons = [
    <Sparkles size={24} color="#5eead4" key="sparkles" />,
    <Heart size={24} color="#5eead4" key="heart" />,
    <MapPin size={24} color="#5eead4" key="pin" />
  ];

  const serviceIcons = [
    <Stethoscope size={32} key="steth" />,
    <Sparkles size={32} key="spark" />,
    <ShieldCheck size={32} key="shield" />
  ];

  return (
    <div className={styles.wrapper}>
      {/* Dental SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": Config.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Premier ${niche} and oral health care in ${location}. Modern technology and patient-first comfort.`
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
              <Activity size={28} />
              {name}
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.actionBtn}
            >
              New Patient Offer
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
            <div style={{ display: 'flex', gap: '15px', color: '#0891b2', marginBottom: '20px' }}>
              <ShieldCheck size={24} /> <Award size={24} /> <Star size={24} />
            </div>
            <h1>{t(Config.hero.title)}</h1>
            <p>
              {t(Config.hero.subtitle)}
            </p>
            <motion.a 
              whileHover={{ gap: '15px', paddingRight: '45px' }}
              href="#book" 
              className={styles.actionBtn} 
              style={{ padding: '18px 45px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              {Config.hero.cta} <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className={styles.emergencyBanner}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
            {Config.emergencyBar.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}>
                {barIcons[i] || barIcons[0]} {t(item)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.serviceSection}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#164e63' }}>Elite Dental Services</h2>
              <p style={{ color: '#64748b', marginTop: '10px' }}>Comprehensive care for every stage of your life in {location}</p>
            </div>
          </Reveal>
          
          <div className={styles.serviceGrid}>
            {Config.services.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.serviceCard}>
                  <div className={styles.iconBox}>{serviceIcons[i] || serviceIcons[0]}</div>
                  <h3>{t(s.title)}</h3>
                  <p style={{ color: '#64748b', lineHeight: 1.7 }}>{t(s.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container text-center">
          <Reveal>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <Activity size={48} style={{ margin: '0 auto 30px', color: '#0891b2', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#164e63', marginBottom: '30px' }}>{t(Config.footer.title)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.7 }}>
                {t(Config.footer.subtitle)}
              </p>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(8, 145, 178, 0.2)", "0 0 40px rgba(8, 145, 178, 0.5)", "0 0 20px rgba(8, 145, 178, 0.2)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className={styles.actionBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL CLINIC: {phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | CERTIFIED {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </div>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function DentalPage() {
  return (
    <Suspense fallback={<div>Sterilizing the room...</div>}>
      <DentalContent />
    </Suspense>
  );
}
