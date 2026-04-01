'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Camera, Home, Trophy, Users, PhoneCall } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import { ShowcaseConfig as Config } from '@/configs/showcase';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './showcase.module.css';

function ShowcaseContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Your Craftsmanship Co.',
    niche: 'Professional Contractor',
    location: 'Local Area',
    phone: '0000 000 000',
    rating: '5.0'
  });

  return (
    <div className={styles.wrapper}>
      {/* Visual Pro SEO Schema */}
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.logo}
            >
              {name}
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05, backgroundColor: '#064e3b', color: 'white' }}
              href={`tel:${phone}`} 
              className="btn" 
              style={{ background: 'transparent', border: '2px solid #064e3b', color: '#064e3b' }}
            >
              Get a Free Estimate
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'flex', gap: '10px', color: '#059669', marginBottom: '20px' }}>
              <Home size={20} /> <ImageIcon size={20} /> <Trophy size={20} />
            </div>
            <h1>{ai.heroTitle || t(Config.hero.title)}</h1>
            <p style={{fontSize: '1.4rem', color: '#065f46', marginBottom: '40px', maxWidth: '700px'}}>
              {ai.heroSubtitle || t(Config.hero.subtitle)}
            </p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#book" 
              className="btn" 
              style={{backgroundColor: '#064e3b', padding: '20px 50px', fontSize: '1.1rem'}}
            >
              {ai.heroCta || Config.hero.cta}
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className={styles.process}>
        <div className="container">
          <Reveal>
            <h2 className="text-center" style={{ fontSize: '3rem', color: '#064e3b', marginBottom: '60px' }}>Our Seamless Process</h2>
          </Reveal>
          
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '40px'}}>
            {Config.process.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.step} style={{flex: '1 1 300px', background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)'}}>
                  <div className={styles.stepNumber}>{s.step}</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{s.title}</h3>
                  <p style={{ color: '#666', lineHeight: 1.6 }}>{t(s.desc)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className="container">
          <Reveal>
            <div className="text-center" style={{ marginBottom: '60px' }}>
              <Camera size={40} color="#059669" style={{ margin: '0 auto 20px' }} />
              <h2 style={{ fontSize: '3rem', color: '#064e3b' }}>Craftsmanship Gallery</h2>
              <p style={{ opacity: 0.6 }}>Recent {niche.toLowerCase()} transformations in {location}</p>
            </div>
          </Reveal>
          
          <div className={styles.imageGrid}>
            {[1, 2, 3, 4].map((id) => (
              <motion.div 
                key={id}
                whileHover={{ scale: 1.03, rotate: 1 }}
                className={styles.placeholderImage}
                style={{ background: '#f0fdf4', border: '1px dashed #059669', color: '#059669' }}
              >
                Project #{id} Preview
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{padding: '100px 0', background: '#064e3b', color: 'white'}}>
        <div className="container text-center">
          <Reveal>
            <div>
              <Users size={48} style={{ margin: '0 auto 30px', opacity: 0.5 }} />
              <h2 style={{fontSize: '3.5rem', fontWeight: 900, marginBottom: '20px'}}>{ai.footerTitle || t(Config.footer.title)}</h2>
              <p style={{fontSize: '1.2rem', marginBottom: '50px', opacity: 0.8}}>{ai.footerSubtitle || t(Config.footer.subtitle)}</p>
              <motion.a 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                href={`tel:${phone}`} 
                className="btn" 
                style={{backgroundColor: 'white', color: '#064e3b', padding: '25px 60px', fontSize: '1.3rem', fontWeight: 900}}
              >
                <PhoneCall size={20} style={{ marginRight: 10, display: 'inline' }} />
                Call {name}: {phone}
              </motion.a>
            </div>
          </Reveal>
          <p style={{marginTop: '100px', opacity: 0.4, fontSize: '0.8rem', letterSpacing: '2px'}}>© 2026 {name.toUpperCase()} | PREMIUM {niche.toUpperCase()} SERVICES | {location.toUpperCase()}</p>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function ShowcasePage() {
  return (
    <Suspense fallback={<div>Framing the vision...</div>}>
      <ShowcaseContent />
    </Suspense>
  );
}
