'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Phone, CheckCircle, ShieldCheck, Clock, Star } from 'lucide-react';
import MobileActions from '@/components/MobileActions';
import { LeadMachineConfig as Config } from '@/configs/lead-machine';
import { formatContent } from '@/lib/utils';
import styles from './preview.module.css';

const ICON_MAP = {
  Clock: Clock,
  ShieldCheck: ShieldCheck,
  CheckCircle: CheckCircle
};

function PreviewContent() {
  const searchParams = useSearchParams();
  
  const name = searchParams.get('name') || 'Your Business Name';
  const phone = searchParams.get('phone') || '0000 000 000';
  const rating = searchParams.get('rating') || '5.0';
  const niche = searchParams.get('niche') || 'Emergency Specialist';
  const location = searchParams.get('location') || 'Local Area';

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
              <Phone size={18} />
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
              {formatContent(Config.hero.title, data)}
            </motion.h1>
            
            <motion.p variants={fadeInUp}>
              {formatContent(Config.hero.subtitle, data)}
            </motion.p>
            
            <motion.div variants={fadeInUp} className={styles.ctaGroup}>
              <a href={`tel:${phone}`} className="btn" style={{ fontSize: '1.1rem', padding: '15px 40px' }}>
                {Config.hero.cta}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
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
                  <p>{formatContent(feature.desc, data)}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>{formatContent(Config.ctaSection.title, data)}</h2>
            <p className="mb-40">{formatContent(Config.ctaSection.subtitle, data)}</p>
            <a href={`tel:${phone}`} className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '20px 50px' }}>
              Call {phone}
            </a>
          </motion.div>
        </div>
      </section>

      <footer className="text-center mt-20 mb-40">
        <p className="text-muted">© 2026 {name} - Professional {niche} in {location}.</p>
      </footer>

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
