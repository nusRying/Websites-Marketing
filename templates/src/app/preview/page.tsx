'use client';
import { CheckCircle2, Star, ArrowRight, CheckCircle, ShieldCheck, Clock } from 'lucide-react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import { LeadMachineConfig as Config } from '@/configs/lead-machine';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './preview.module.css';
import { Reveal } from '@/components/Reveal';
import PrestigeBadge from '@/components/PrestigeBadge';
import TrustBadgeStrip from '@/components/TrustBadgeStrip';
import FAQSection from '@/components/FAQSection';
import Image from 'next/image';

const ICON_MAP = {
  Clock: Clock,
  ShieldCheck: ShieldCheck,
  CheckCircle: CheckCircle
};

function PreviewContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Your Business Name',
    niche: 'Emergency Specialist',
    location: 'Local Area',
    phone: '0000 000 000',
    rating: '5.0'
  });

  const data = { name, phone, rating, niche, location };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Dynamic SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": Config.schemaType,
            "name": name,
            "telephone": phone,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": location
            }
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
              {name}
            </motion.div>
            <a href={`tel:${phone}`} className={styles.phoneLink}>
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div 
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className={styles.ratingBar}>
              <div style={{ display: 'flex', color: '#fbbf24' }}>
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span>{rating} Google Rating</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp}>
              {ai.hero_title || t(Config.hero.title)}
            </motion.h1>
            
            <motion.p variants={fadeInUp}>
              {ai.pain_point || t(Config.hero.subtitle)}
            </motion.p>
            
            <motion.div variants={fadeInUp} className={styles.ctaGroup}>
              <a href="#book" className="btn" style={{ fontSize: '1.1rem', padding: '16px 45px', fontWeight: 800, borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', transition: 'all 0.2s', fontFamily: 'var(--font-outfit), sans-serif' }}>
                {Config.hero.cta}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
            style={{ fontWeight: 900, fontFamily: 'var(--font-outfit), sans-serif', color: 'var(--secondary)', letterSpacing: '-0.5px' }}
          >
            The {name} Guarantee
          </motion.h2>
          
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className={styles.grid}
          >
            {Config.features.map((feature, idx) => {
              const Icon = ICON_MAP[feature.icon as keyof typeof ICON_MAP] || CheckCircle;
              return (
                <motion.div key={idx} variants={fadeInUp} className={styles.card}>
                  <Icon className={styles.icon} size={32} color="var(--primary)" style={{ marginBottom: '15px' }} />
                  <h3>{feature.title}</h3>
                  <p>{t(feature.desc)}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            style={{ padding: '60px 20px' }}
          >
            <h2>{ai.niche_cta || t(Config.ctaSection.title)}</h2>
            <p className="mb-40" style={{ fontSize: '1.15rem', opacity: 0.9 }}>{t(Config.ctaSection.subtitle)}</p>
            <a href={`tel:${phone}`} className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '20px 50px', background: 'var(--white)', color: 'var(--secondary)', fontWeight: 900, borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
              Call {phone}
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="text-center mt-20 mb-40">
        <p className="text-muted" style={{ fontWeight: 600 }}>© {new Date().getFullYear()} {name} - Professional {niche} in {location}.</p>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      {/* High-Effort Feature: Mobile Sticky Bar */}
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div>Loading Premium Preview...</div>}>
      <PreviewContent />
    </Suspense>
  );
}