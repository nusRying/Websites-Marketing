'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Phone, CheckCircle, ShieldCheck, Clock, Star } from 'lucide-react';
import MobileActions from '@/components/MobileActions';
import styles from './preview.module.css';

function PreviewContent() {
  const searchParams = useSearchParams();
  
  const name = searchParams.get('name') || 'Your Business Name';
  const phone = searchParams.get('phone') || '0000 000 000';
  const rating = searchParams.get('rating') || '5.0';
  const niche = searchParams.get('niche') || 'Emergency Specialist';
  const location = searchParams.get('location') || 'Local Area';

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
            "@type": "LocalBusiness",
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
              Trusted {niche} <br/> in {location}
            </motion.h1>
            
            <motion.p variants={fadeInUp}>
              Don't settle for less. We provide 24/7 priority {niche.toLowerCase()} support 
              across {location}. Fast, professional, and fully insured.
            </motion.p>
            
            <motion.div variants={fadeInUp} className={styles.ctaGroup}>
              <a href={`tel:${phone}`} className="btn" style={{ fontSize: '1.1rem', padding: '15px 40px' }}>
                Get Immediate Help
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
            <motion.div variants={fadeInUp} className={styles.card}>
              <Clock className={styles.icon} size={32} color="var(--primary)" style={{ marginBottom: '15px' }} />
              <h3>30-Min Response</h3>
              <p>Available 24/7. We guarantee to have a {niche.toLowerCase()} expert at your door in {location} within 30 minutes.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className={styles.card}>
              <ShieldCheck className={styles.icon} size={32} color="var(--primary)" style={{ marginBottom: '15px' }} />
              <h3>Fully Certified</h3>
              <p>Peace of mind guaranteed. All work is conducted by background-checked and CHAS-accredited specialists.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className={styles.card}>
              <CheckCircle className={styles.icon} size={32} color="var(--primary)" style={{ marginBottom: '15px' }} />
              <h3>Fixed Pricing</h3>
              <p>No hidden surprises. We provide up-front, transparent quotes before any {niche.toLowerCase()} work begins.</p>
            </motion.div>
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
            <h2>Emergency? Call Us Now</h2>
            <p className="mb-40">Direct line to our on-call {niche.toLowerCase()} team in {location}.</p>
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
