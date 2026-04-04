'use client';
import { CheckCircle2, Star, ArrowRight, Sparkles, MapPin, Calendar, Heart } from 'lucide-react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { AuraConfig as Config } from '@/configs/aura';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './aura.module.css';
import PrestigeBadge from '@/components/PrestigeBadge';
import TrustBadgeStrip from '@/components/TrustBadgeStrip';
import FAQSection from '@/components/FAQSection';
import Image from 'next/image';

const ACCENT = '#ec4899';
const TESTIMONIALS = [
  { name: 'Bella K.', location: 'Beauty Client', text: 'The treatments here are absolutely divine. Always leave feeling refreshed, pampered and completely glowing.', stars: 5 },
  { name: 'Sophie T.', location: 'Regular', text: 'My go-to beauty destination. The team are skilled, attentive and the results always exceed my expectations.', stars: 5 },
  { name: 'Grace P.', location: 'Special Occasion', text: 'Got a full beauty treatment before my wedding and looked and felt stunning. Cannot thank the team enough.', stars: 5 },
];
function AuraContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'The Wellness Atelier',
    niche: 'Skin & Beauty',
    location: 'Local Area',
    phone: '0000 000 000'
  });

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
            "areaServed": location
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${phone}`} 
              className={styles.navAction}
            >
              Consultation
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className={styles.heroSub}>
              <Sparkles size={14} style={{ marginRight: 8 }} />
              Defining the Art of Self-Care
            </p>
            <PrestigeBadge niche={niche} location={location} accentColor={ACCENT} />
            <h1 dangerouslySetInnerHTML={{ __html: t(Config.hero.title) }} />
            <div className={styles.divider}></div>
            <motion.div
              whileHover={{ letterSpacing: "5px" }}
              transition={{ duration: 0.3 }}
            >
              <a href="#book" className={styles.navAction} style={{padding: '18px 60px', background: '#c5a059'}}>
                {Config.hero.cta}
              </a>
            </motion.div>
          </motion.div>
        </div>

      
        <div style={{ position: 'relative', width: '100%', height: '400px', marginTop: '40px', borderRadius: '16px', overflow: 'hidden' }}>
          <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80" alt={`${niche} in ${location}`} fill style={{ objectFit: 'cover' }} priority />
        </div>
    
      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.serviceMenu}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <p style={{letterSpacing: '3px', opacity: 0.5, fontSize: '0.75rem', fontWeight: 700}}>EXPERIENCE EXCELLENCE</p>
              <h2 style={{fontFamily: 'serif', fontSize: '3rem', marginTop: '10px'}}>The {niche} Collective</h2>
            </div>
          </Reveal>
          
          <div className={styles.menuGrid}>
            {Config.menu.map((item, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className={styles.menuItem}
                >
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p style={{fontSize: '0.95rem', color: '#777', marginTop: '8px'}}>{t(item.desc)}</p>
                  </div>
                  <div className={styles.price}>{item.price}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.testimonialSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', color: '#c5a059', marginBottom: '30px' }}>
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
            </div>
            <div className={styles.quote}>
              "{t(Config.testimonial.quote)}"
            </div>
            <div className={styles.author}>— {Config.testimonial.author.toUpperCase()}, {location.toUpperCase()}</div>
          </motion.div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.bookingSection}>
        <div className="container">
          <Reveal>
            <div className={styles.bookingCard}>
              <Heart size={40} color="#c5a059" style={{ marginBottom: '20px' }} />
              <h2 style={{fontFamily: 'serif', fontSize: '2.5rem', marginBottom: '20px'}}>{t(Config.booking.title)}</h2>
              <p style={{marginBottom: '40px', color: '#666', fontSize: '1.1rem'}}>
                {t(Config.booking.desc)}
              </p>
              <a href={`tel:${phone}`} className={styles.navAction} style={{display: 'block', background: '#1a1a1a', padding: '20px'}}>
                Call {name}: {phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className={styles.footerAura}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px', opacity: 0.6 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> {location}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} /> Mon - Sat</span>
          </div>
          <div style={{fontFamily: 'serif', fontSize: '2rem', marginBottom: '20px', letterSpacing: '4px'}}>{name}</div>
          <p style={{fontSize: '0.75rem', opacity: 0.4, letterSpacing: '2px'}}>© 2026 | ESTABLISHED IN {location.toUpperCase()}</p>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function AuraPage() {
  return (
    <Suspense fallback={<div>Unveiling Excellence...</div>}>
      <AuraContent />
    </Suspense>
  );
}