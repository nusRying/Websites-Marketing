'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Printer, Image as ImageIcon, Package, Globe, Star, ArrowRight, PenTool, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { PrimePrintConfig } from '@/configs/prime-print';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './prime-print.module.css';


const ACCENT = '#6366f1';
const TESTIMONIALS = [
  { name: 'Anna K.', location: 'Marketing Manager', text: 'The quality of the brochures was stunning. Colours were vibrant, the finish was premium and delivered ahead of schedule.', stars: 5 },
  { name: 'Mark D.', location: 'Event Organiser', text: 'Ordered 5000 flyers with a tight deadline and they delivered perfectly. Outstanding print quality and packaging.', stars: 5 },
  { name: 'Fiona B.', location: 'Small Business', text: 'As a small business they treated my order with the same care as a large corporate. Exceptional quality and service.', stars: 5 },
];
function PrintContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Vivid Print Solutions',
    niche: 'Print Specialist',
    location: 'Creative Hub',
    phone: '0000 000 000',
    rating: '5.0'
  });

  return (
    <div className={styles.wrapper}>
      {/* Print SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": PrimePrintConfig.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Premier ${niche} and signage solutions in ${location}. Precision printing and vivid impact.`
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
              <Printer size={28} style={{ marginRight: 10, color: '#6366f1' }} />
              {name.split(' ')[0]} <span>{name.split(' ').slice(1).join(' ')}</span>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.ctaBtn}
            >
              Consultation
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
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', color: '#6366f1', marginBottom: '30px' }}>
              <PenTool size={24} /> <ImageIcon size={24} /> <Package size={24} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: t(PrimePrintConfig.hero.title) }} />
            <p>{t(PrimePrintConfig.hero.subtitle)}</p>
            <motion.a 
              whileHover={{ gap: '20px', paddingRight: '50px' }}
              href={`tel:${phone}`} 
              className={styles.ctaBtn} 
              style={{ padding: '20px 60px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              Start Your Project <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.services}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', color: '#1e1b4b' }}>Core Competencies</h2>
              <p style={{ color: '#64748b', marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                IMPACT REFINED IN {location.toUpperCase()}
              </p>
            </div>
          </Reveal>
          
          <div className={styles.grid}>
            {PrimePrintConfig.services.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <h3 style={{ marginBottom: '20px' }}>{s.title}</h3>
                  <p>{t(s.desc)}</p>
                  <motion.div 
                    whileHover={{ x: 10, color: '#6366f1' }}
                    style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}
                  >
                    CAPABILITIES <Sparkles size={14} />
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks accentColor={ACCENT} />
      <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />

      <footer className={styles.footer}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Globe size={48} style={{ margin: '0 auto 30px', color: '#6366f1', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>{t(PrimePrintConfig.footer.title)}</h2>
              <p style={{ fontSize: '1.25rem', marginBottom: '50px', opacity: 0.7 }}>
                {t(PrimePrintConfig.footer.subtitle)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#fbbf24', marginBottom: '40px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(99, 102, 241, 0.2)", "0 0 40px rgba(99, 102, 241, 0.5)", "0 0 20px rgba(99, 102, 241, 0.2)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className={styles.ctaBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL PRODUCTION: {phone}
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

export default function PrintPage() {
  return (
    <Suspense fallback={<div>Inking the layout...</div>}>
      <PrintContent />
    </Suspense>
  );
}
