'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Clock, MapPin, Star, Coffee, Wine } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import { GustoConfig } from '@/configs/gusto';
import { formatContent } from '@/lib/utils';
import styles from './gusto.module.css';

function GustoContent() {
  const searchParams = useSearchParams();
  
  const name = searchParams.get('name') || 'The Artisanal Kitchen';
  const niche = searchParams.get('niche') || 'Modern Eatery';
  const location = searchParams.get('location') || 'Local District';
  const phone = searchParams.get('phone') || '0000 000 000';
  const rating = searchParams.get('rating') || '4.9';

  const data = { name, niche, location, phone, rating };

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
            <h1>{formatContent(GustoConfig.hero.title, data)}</h1>
            <p>{formatContent(GustoConfig.hero.subtitle, data)}</p>
            <motion.button 
              whileHover={{ y: -5 }}
              className="btn" 
              style={{backgroundColor: '#ff7e33', borderRadius: '0', padding: '18px 50px', fontSize: '1.1rem'}}
            >
              {formatContent(GustoConfig.hero.cta, data)}
            </motion.button>
          </motion.div>
        </div>
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
                  <span className={styles.dishName}>{formatContent(dish.name, data)}</span>
                  <div className={styles.dishDots}></div>
                  <span className={styles.dishPrice}>{formatContent(dish.price, data)}</span>
                </div>
                <p className={styles.dishDesc}>{formatContent(dish.desc, data)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
              <h2 style={{fontFamily: 'serif', fontSize: '2.5rem', marginBottom: '20px'}}>{formatContent(GustoConfig.footer.title, data)}</h2>
              <p style={{marginBottom: '40px', opacity: 0.7}}>{formatContent(GustoConfig.footer.subtitle, data)}</p>
              
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
