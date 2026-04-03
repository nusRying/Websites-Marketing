'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Coffee, Wine } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { GustoConfig } from '@/configs/gusto';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './gusto.module.css';


const ACCENT = '#f97316';
const TESTIMONIALS = [
  { name: 'Maria T.', location: 'Regular Diner', text: 'Every single dish is exceptional. The flavours, the presentation, the service - this restaurant is simply world class.', stars: 5 },
  { name: 'John P.', location: 'Anniversary Dinner', text: 'Celebrated our anniversary here and it was magical. The tasting menu was extraordinary. Cannot wait to return.', stars: 5 },
  { name: 'Kate R.', location: 'Food Blogger', text: 'Reviewed over 200 restaurants and this is genuinely in my top three. The passion in every plate is extraordinary.', stars: 5 },
];
function GustoContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'The Artisanal Kitchen',
    niche: 'Modern Eatery',
    location: 'Local District',
    phone: '0000 000 000',
    rating: '4.9'
  });

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Hospitality SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": GustoConfig.schemaType,
            "name": name,
            "servesCuisine": niche,
            "telephone": phone,
            "address": { "@type": "PostalAddress", "addressLocality": location }
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
              {name}
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${phone}`} 
              className={styles.reserveBtn}
            >
              Book a Table
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', color: '#ff7e33' }}>
              <Coffee size={24} />
              <Utensils size={24} />
              <Wine size={24} />
            </div>
            <h1>{t(GustoConfig.hero.title)}</h1>
            <p>{t(GustoConfig.hero.subtitle)}</p>
            <motion.a 
              whileHover={{ y: -5 }}
              href="#book"
              className="btn" 
              style={{backgroundColor: '#ff7e33', borderRadius: '0', padding: '18px 50px', fontSize: '1.1rem', color: 'white', display: 'inline-block'}}
            >
              {t(GustoConfig.hero.cta)}
            </motion.a>
          </motion.div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.menuSection}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 className={styles.categoryTitle}>Tonight's Specialities</h2>
            </div>
          </Reveal>
          
          <motion.div 
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className={styles.menuGrid}
          >
            {GustoConfig.menu.map((dish, i) => (
              <motion.div 
                key={i}
                variants={{
                  initial: { opacity: 0, x: i % 2 === 0 ? -20 : 20 },
                  animate: { opacity: 1, x: 0 }
                }}
                className={styles.dish}
              >
                <div className={styles.dishHeader}>
                  <span className={styles.dishName}>{t(dish.name)}</span>
                  <div className={styles.dishDots}></div>
                  <span className={styles.dishPrice}>{t(dish.price)}</span>
                </div>
                <p className={styles.dishDesc}>{t(dish.desc)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.ambiance}>
        <div className="container">
          <Reveal>
            <div style={{ marginBottom: '60px' }}>
              <h2 style={{fontFamily: 'serif', fontSize: '3rem', marginBottom: '20px'}}>The Soul of {name}</h2>
              <p style={{opacity: 0.8, maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem'}}>
                Step into a world of warmth and light in the heart of {location}. Every corner tells a story.
              </p>
            </div>
          </Reveal>
          
          <div className={styles.imageMosaic}>
            <motion.div whileHover={{ scale: 1.02 }} className={styles.mosaicItem} style={{gridRow: 'span 2', display: 'flex', background: '#222', border: '1px solid #333', alignItems: 'center', justifyContent: 'center'}}>Gusto Ambiance #1</motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className={styles.mosaicItem} style={{background: '#222', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Local Flavor #2</motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className={styles.mosaicItem} style={{background: '#222', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Chef's Craft #3</motion.div>
          </div>
        </div>
      </section>

      <footer className={styles.footerGusto}>
        <div className="container">
          <Reveal>
            <div style={{ background: 'white', color: 'black', padding: '60px', borderRadius: '0' }}>
              <h2 style={{fontFamily: 'serif', fontSize: '2.5rem', marginBottom: '20px'}}>{t(GustoConfig.footer.title)}</h2>
              <p style={{marginBottom: '40px', opacity: 0.7}}>{t(GustoConfig.footer.subtitle)}</p>
              
              <div style={{display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '40px'}}>
                <div style={{textAlign: 'left'}}>
                  <h4 style={{color: '#ff7e33', fontSize: '0.8rem', letterSpacing: '2px'}}>LOCATE US</h4>
                  <p style={{ fontWeight: 700 }}>High Street, {location}</p>
                </div>
                <div style={{textAlign: 'left'}}>
                  <h4 style={{color: '#ff7e33', fontSize: '0.8rem', letterSpacing: '2px'}}>CONTACT</h4>
                  <p style={{ fontWeight: 700 }}>{phone}</p>
                </div>
              </div>
              
              <motion.a 
                whileHover={{ scale: 1.05 }}
                href={`tel:${phone}`} 
                className={styles.reserveBtn} 
                style={{padding: '25px 80px', fontSize: '1.2rem'}}
              >
                Reserve Your Experience
              </motion.a>
            </div>
          </Reveal>
          <p style={{marginTop: '80px', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '3px'}}>© 2026 {name.toUpperCase()} | CURATED IN {location.toUpperCase()}</p>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function GustoPage() {
  return (
    <Suspense fallback={<div>Setting the table...</div>}>
      <GustoContent />
    </Suspense>
  );
}
