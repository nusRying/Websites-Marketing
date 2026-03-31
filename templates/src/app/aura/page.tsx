'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, MapPin, Calendar, Heart } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import { AuraConfig as Config } from '@/configs/aura';
import { formatContent } from '@/lib/utils';
import styles from './aura.module.css';

function AuraContent() {
  const searchParams = useSearchParams();
  
  const name = searchParams.get('name') || 'The Wellness Atelier';
  const niche = searchParams.get('niche') || 'Skin & Beauty';
  const location = searchParams.get('location') || 'Local Area';
  const phone = searchParams.get('phone') || '0000 000 000';

  const data = { name, niche, location, phone };

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
            <h1>{formatContent(Config.hero.title, data)}</h1>
            <div className={styles.divider}></div>
            <motion.div
              whileHover={{ letterSpacing: "5px" }}
              transition={{ duration: 0.3 }}
            >
              <a href={`tel:${phone}`} className={styles.navAction} style={{padding: '18px 60px', background: '#c5a059'}}>
                {Config.hero.cta}
              </a>
            </motion.div>
          </motion.div>
        </div>
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
                    <h3>{formatContent(item.title, data)}</h3>
                    <p style={{fontSize: '0.95rem', color: '#777', marginTop: '8px'}}>{formatContent(item.desc, data)}</p>
                  </div>
                  <div className={styles.price}>{item.price}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
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
              "{formatContent(Config.testimonial.quote, data)}"
            </div>
            <div className={styles.author}>— {Config.testimonial.author.toUpperCase()}, {location.toUpperCase()}</div>
          </motion.div>
        </div>
      </section>

      <section className={styles.bookingSection}>
        <div className="container">
          <Reveal>
            <div className={styles.bookingCard}>
              <Heart size={40} color="#c5a059" style={{ marginBottom: '20px' }} />
              <h2 style={{fontFamily: 'serif', fontSize: '2.5rem', marginBottom: '20px'}}>{formatContent(Config.booking.title, data)}</h2>
              <p style={{marginBottom: '40px', color: '#666', fontSize: '1.1rem'}}>
                {formatContent(Config.booking.desc, data)}
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
