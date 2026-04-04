'use client';
import { CheckCircle2, Star, ArrowRight, Camera, Heart, Sparkles } from 'lucide-react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { EternalConfig } from '@/configs/eternal';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './eternal.module.css';
import PrestigeBadge from '@/components/PrestigeBadge';
import TrustBadgeStrip from '@/components/TrustBadgeStrip';
import FAQSection from '@/components/FAQSection';
import Image from 'next/image';

const ACCENT = '#d97706';
const TESTIMONIALS = [
  { name: 'Claire H.', location: 'Ceremony Client', text: 'Made the most difficult time in our lives bearable with their compassion and total professionalism. Forever grateful.', stars: 5 },
  { name: 'Robert M.', location: 'Memorial Service', text: 'Every detail was handled with such dignity and care. The service was beautiful and exactly what we wanted.', stars: 5 },
  { name: 'Susan P.', location: 'Pre-planning Client', text: 'Pre-planning gave us complete peace of mind. Sensitive, clear and thorough. A genuinely important service.', stars: 5 },
];
function EternalContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Eternal Memories',
    niche: 'Wedding Photographer',
    location: 'Country Estate',
    phone: '0000 000 000',
    rating: '4.9'
  });

  return (
    <div className={styles.wrapper}>
      {/* Luxury Event SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": EternalConfig.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Premier ${niche} services in ${location}. Capturing timeless moments with elegance.`
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, letterSpacing: '10px' }}
            animate={{ opacity: 1, letterSpacing: '6px' }}
            transition={{ duration: 1.2 }}
            className={styles.logo}
          >
            {name}
            <span>ESTABLISHED IN {location.toUpperCase()}</span>
          </motion.div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p>Capturing the Soul of the Moment</p>
            <PrestigeBadge niche={niche} location={location} accentColor={ACCENT} />
            <h1>{t(EternalConfig.hero.title).split('in').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span>in</span>}
              </span>
            ))}</h1>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="#book" 
              className={styles.bookAction}
            >
              {t(EternalConfig.hero.cta)}
            </motion.a>
          </motion.div>
        </div>

      
        <div style={{ position: 'relative', width: '100%', height: '400px', marginTop: '40px', borderRadius: '16px', overflow: 'hidden' }}>
          <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80" alt={`${niche} in ${location}`} fill style={{ objectFit: 'cover' }} priority />
        </div>
    
      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <Reveal>
              <div className={styles.storyImage} style={{ background: '#f1f5f9', aspectRatio: '3/4', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.2 }}>
                  <Camera size={80} />
                </div>
              </div>
            </Reveal>
            <div className={styles.storyContent}>
              <Reveal delay={0.2}>
                <p style={{ letterSpacing: '3px', color: '#d4af37', fontWeight: 700, marginBottom: '20px' }}>THE ART OF {niche.toUpperCase()}</p>
                <h2>Every Story is <br/> <span>Uniquely Yours</span></h2>
                <p>
                  In the heart of {location}, we believe that every event is a masterpiece waiting to be captured. 
                  Our approach to {niche.toLowerCase()} is rooted in authentic connection and timeless aesthetic.
                </p>
                <p>
                  We don't just provide a service; we preserve a legacy. Join the most exclusive clients in {location} 
                  who trust {name} with their most precious memories.
                </p>
                <motion.a 
                  whileHover={{ x: 10 }}
                  href={`tel:${phone}`} 
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1a1a1a', fontWeight: 700, textDecoration: 'underline' }}
                >
                  View Full Portfolio <ArrowRight size={18} />
                </motion.a>
              </Reveal>
            </div>
          </div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section style={{ padding: '100px 0', background: '#fdfdfb' }}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <Sparkles size={32} color="#d4af37" style={{ margin: '0 auto 20px' }} />
              <h2 style={{ fontSize: '3rem', fontWeight: 400 }}>Curated Experiences</h2>
              <p style={{ letterSpacing: '2px', opacity: 0.5, marginTop: '10px' }}>SELECT YOUR {niche.toUpperCase()} LEVEL</p>
            </div>
          </Reveal>
          
          <div className={styles.packageGrid}>
            {EternalConfig.packages.map((pkg, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div className={styles.packageCard}>
                  <h3>{t(pkg.title)}</h3>
                  <div className={styles.packagePrice}>{t(pkg.price)}</div>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px', fontFamily: 'Inter', opacity: 0.7 }}>
                    {pkg.features.map((f, j) => <li key={j} style={{ marginBottom: '10px' }}>{t(f)}</li>)}
                  </ul>
                  <a href={`tel:${phone}`} className={styles.bookAction} style={{ background: 'transparent', border: '1px solid #1a1a1a', color: '#1a1a1a' }}>Check Availability</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={EternalConfig.faqs} accentColor={ACCENT} />
      <HowItWorks accentColor={ACCENT} />
      <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />

      <footer className={styles.footer}>
        <div className="container">
          <Reveal>
            <div>
              <Heart size={48} style={{ margin: '0 auto 30px', opacity: 0.3 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 400, marginBottom: '30px' }}>{t(EternalConfig.footer.title)}</h2>
              <p style={{ letterSpacing: '2px', marginBottom: '50px' }}>{t(EternalConfig.footer.subtitle).toUpperCase()}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#d4af37', marginBottom: '40px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href={`tel:${phone}`} 
                className={styles.bookAction} 
                style={{ background: '#d4af37', padding: '25px 80px', fontSize: '1.2rem' }}
              >
                Call {name}: {phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.3, fontSize: '0.75rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | PREMIER {niche.toUpperCase()} | {location.toUpperCase()}
          </div>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function EternalPage() {
  return (
    <Suspense fallback={<div>Setting the scene...</div>}>
      <EternalContent />
    </Suspense>
  );
}