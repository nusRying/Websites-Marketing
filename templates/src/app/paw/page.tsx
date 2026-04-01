'use client';

import { Suspense } from 'react';
import { motion, Variants } from 'framer-motion';
import { PawPrint, Heart, Bone, ShieldCheck, Star, Scissors, Stethoscope, Dog } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import { PawConfig } from '@/configs/paw';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './paw.module.css';

function PawContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Paw & Palace Pet Care',
    niche: 'Pet Specialist',
    location: 'Local District',
    phone: '0000 000 000',
    rating: '4.9'
  });

  const bounce: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Pet Industry SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": PawConfig.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Premium ${niche} services in ${location}. Where every pet is treated like royalty.`
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={styles.logo}
            >
              <PawPrint size={28} /> {name}
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${phone}`} 
              className={styles.bookBtn}
            >
              Book Appointment
            </motion.a>
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
            <motion.div variants={bounce} animate="animate" style={{ color: '#f59e0b', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <Heart size={40} fill="currentColor" />
            </motion.div>
            <h1>{t(PawConfig.hero.title).split('Feels at Home').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span>Feels at Home</span>}
              </span>
            ))}</h1>
            <p>{t(PawConfig.hero.subtitle)}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <motion.a 
                whileHover={{ y: -5 }}
                href={`tel:${phone}`} 
                className={styles.bookBtn} 
                style={{ padding: '18px 50px', fontSize: '1.1rem' }}
              >
                Schedule a Meet & Greet
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.perksSection}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#1e293b' }}>The {name} Standard</h2>
              <p style={{ opacity: 0.6, marginTop: '10px' }}>Excellence in pet care for {location} residents</p>
            </div>
          </Reveal>
          
          <div className={styles.perkGrid}>
            {PawConfig.perks.map((p, i) => {
              const icons = [<ShieldCheck size={32} />, <Bone size={32} />, <Dog size={32} />];
              return (
                <Reveal key={i} delay={0.2 * i}>
                  <div className={styles.perkCard}>
                    <div className={styles.iconCircle}>{icons[i % icons.length]}</div>
                    <h3>{t(p.title)}</h3>
                    <p style={{ color: '#64748b', lineHeight: 1.6 }}>{t(p.desc)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.treatments}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Curated {niche} Menu</h2>
            </div>
          </Reveal>
          
          <div className={styles.treatmentList}>
            {PawConfig.treatments.map((t_item, i) => {
              const icons = [<Scissors />, <Stethoscope />, <Dog />];
              return (
                <Reveal key={i} delay={0.1 * i}>
                  <motion.div whileHover={{ x: 10 }} className={styles.treatmentItem}>
                    <div style={{ color: '#0ea5e9' }}>{icons[i % icons.length]}</div>
                    <h3>{t(t_item.name)}</h3>
                    <div className={styles.priceTag}>{t(t_item.price)}</div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <Reveal>
            <div>
              <Dog size={64} style={{ margin: '0 auto 30px', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '20px' }}>{t(PawConfig.footer.title)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.8 }}>{t(PawConfig.footer.subtitle)}</p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', color: '#f59e0b', marginBottom: '40px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="currentColor" />)}
              </div>

              <motion.a 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className={styles.bookBtn} 
                style={{ background: '#f59e0b', padding: '25px 80px', fontSize: '1.4rem', borderRadius: '15px' }}
              >
                Call {name}: {phone}
              </motion.a>
            </div>
          </Reveal>
          <p style={{ marginTop: '100px', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '2px' }}>
            © 2026 {name.toUpperCase()} | PREMIER {niche.toUpperCase()} | {location.toUpperCase()}
          </p>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function PawPage() {
  return (
    <Suspense fallback={<div>Welcoming your best friend...</div>}>
      <PawContent />
    </Suspense>
  );
}
