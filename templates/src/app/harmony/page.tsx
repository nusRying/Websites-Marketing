'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Palette, Ruler, Star, ArrowRight, Compass, Home } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { HomeHarmonyConfig } from '@/configs/home-harmony';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './home-harmony.module.css';


const ACCENT = '#7c3aed';
const TESTIMONIALS = [
  { name: 'Lucy M.', location: 'Client', text: "The most relaxing experience I've ever had. Left feeling completely renewed and genuinely recharged for the week ahead.", stars: 5 },
  { name: 'Diana K.', location: 'Regular', text: "Monthly sessions here have transformed my wellbeing completely. Skilled practitioners and a beautifully calming environment.", stars: 5 },
  { name: 'Paul H.', location: 'First Visit', text: "Came sceptical, left converted. The deep tissue work resolved my back pain in ways physiotherapy couldn't. Outstanding.", stars: 5 },
];
function HarmonyContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Harmony Design Atelier',
    niche: 'Interior Architect',
    location: 'Metropolitan Hub',
    phone: '0000 000 000',
    rating: '5.0'
  });

  return (
    <div className={styles.wrapper}>
      {/* Design SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": HomeHarmonyConfig.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Premier ${niche} and spatial curation in ${location}. Defining the art of modern living.`
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className={styles.logo}
            >
              {name}
            </motion.div>
            <motion.a 
              whileHover={{ backgroundColor: '#000', color: '#fff' }}
              href={`tel:${phone}`} 
              className={styles.ctaBtn}
            >
              Curate
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', color: '#1a1a1a', marginBottom: '30px', opacity: 0.3 }}>
              <Compass size={24} /> <Ruler size={24} /> <Palette size={24} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: t(HomeHarmonyConfig.hero.title) }} />
            <p>{t(HomeHarmonyConfig.hero.subtitle)}</p>
            <motion.a 
              whileHover={{ letterSpacing: '4px' }}
              href="#book" 
              className={styles.ctaBtn} 
              style={{ padding: '18px 60px', fontSize: '0.9rem' }}
            >
              {HomeHarmonyConfig.hero.cta}
            </motion.a>
          </motion.div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.services}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 200, letterSpacing: '-1px' }}>Design Disciplines</h2>
              <p style={{ opacity: 0.4, marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                AESTHETIC EXCELLENCE IN {location.toUpperCase()}
              </p>
            </div>
          </Reveal>
          
          <div className={styles.grid}>
            {HomeHarmonyConfig.services.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <h3 style={{ marginBottom: '20px' }}>{s.title}</h3>
                  <p>{t(s.desc)}</p>
                  <motion.div 
                    whileHover={{ x: 10 }}
                    style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    EXPLORE <ArrowRight size={14} />
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
              <Home size={48} style={{ margin: '0 auto 30px', opacity: 0.2 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 200, marginBottom: '30px' }}>{t(HomeHarmonyConfig.footer.title)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.6 }}>
                {t(HomeHarmonyConfig.footer.subtitle)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#fff', marginBottom: '50px', opacity: 0.5 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <motion.a 
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className={styles.ctaBtn} 
                style={{ background: '#fff', color: '#000', padding: '25px 80px', fontSize: '1.2rem' }}
              >
                Inquire: {phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.2, fontSize: '0.7rem', letterSpacing: '5px' }}>
            © 2026 {name.toUpperCase()} | CURATED IN {location.toUpperCase()}
          </div>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function HarmonyPage() {
  return (
    <Suspense fallback={<div>Curating the view...</div>}>
      <HarmonyContent />
    </Suspense>
  );
}
