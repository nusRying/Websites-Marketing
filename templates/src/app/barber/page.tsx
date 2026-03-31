'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Star, MapPin, Calendar, Clock, Phone, ChevronRight, Camera, UserCheck } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import { BarberConfig as config } from '@/configs/barber';
import { formatContent } from '@/lib/utils';
import styles from './barber.module.css';

function BarberContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'The Heritage Barbershop';
  const niche = searchParams.get('niche') || 'Master Barber';
  const location = searchParams.get('location') || 'Central District';
  const phone = searchParams.get('phone') || '0000 000 000';
  const rating = searchParams.get('rating') || '5.0';

  const data = { name, niche, location, phone, rating };

  return (
    <div className={styles.wrapper}>
      {/* Barber Industry SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": config.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Premium ${niche} and men's grooming in ${location}. Sharp cuts, classic service.`
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
              {name.split(' ')[0]} <span>{name.split(' ').slice(1).join(' ')}</span>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${phone}`} 
              className={styles.bookBtn}
            >
              Book Now
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div style={{ color: '#d4af37', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <Scissors size={32} />
            </div>
            <h1>{formatContent(config.hero.title, data).split('In the Heart of')[0]} <br/> <span>In the Heart of {formatContent(config.hero.title, data).split('In the Heart of')[1]}</span></h1>
            <p>
              {formatContent(config.hero.subtitle, data)}
            </p>
            <motion.a 
              whileHover={{ letterSpacing: '3px' }}
              href={`tel:${phone}`} 
              className={styles.bookBtn} 
              style={{ padding: '18px 50px', fontSize: '1.1rem' }}
            >
              {config.hero.cta}
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className={styles.services}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontFamily: 'serif', color: '#fff' }}>Service Menu</h2>
              <p style={{ opacity: 0.5, marginTop: '10px', letterSpacing: '2px' }}>CRAFTED FOR EXCELLENCE IN {location.toUpperCase()}</p>
            </div>
          </Reveal>
          
          <div className={styles.menuGrid}>
            {config.menu.map((s, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div style={{ marginBottom: '40px' }}>
                  <div className={styles.serviceItem}>
                    <span className={styles.serviceName}>{formatContent(s.name, data)}</span>
                    <span className={styles.servicePrice}>{s.price}</span>
                  </div>
                  <p className={styles.serviceDesc}>{formatContent(s.desc, data)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <Camera size={40} color="#d4af37" style={{ margin: '0 auto 20px' }} />
              <h2 style={{ fontSize: '3rem', fontFamily: 'serif' }}>The Lookbook</h2>
              <p style={{ opacity: 0.5 }}>Recent masterpieces from our {location} studio</p>
            </div>
          </Reveal>
          
          <div className={styles.imageGrid}>
            {[1, 2, 3, 4].map((id) => (
              <motion.div 
                key={id}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className={styles.imageBox}
                style={{ border: '1px solid #222' }}
              >
                Style #{id}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <UserCheck size={48} style={{ margin: '0 auto 30px', color: '#d4af37' }} />
              <h2 style={{ fontSize: '3.5rem', fontFamily: 'serif', marginBottom: '30px' }}>{formatContent(config.footer.title, data)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.7 }}>
                {formatContent(config.footer.subtitle, data)} Walk-ins welcome, but bookings are highly recommended.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '50px', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ color: '#d4af37', fontSize: '0.8rem', letterSpacing: '2px' }}>LOCATION</h4>
                  <p style={{ fontWeight: 700 }}>Main Street, {location}</p>
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ color: '#d4af37', fontSize: '0.8rem', letterSpacing: '2px' }}>HOURS</h4>
                  <p style={{ fontWeight: 700 }}>Tue - Sat: 9am - 7pm</p>
                </div>
              </div>

              <motion.a 
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                href={`tel:${phone}`} 
                className={styles.bookBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem', borderRadius: '0' }}
              >
                Call to Book: {phone}
              </motion.a>
            </div>
          </Reveal>
          <p style={{ marginTop: '100px', opacity: 0.2, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | PREMIER {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </p>
        </div>
      </footer>

      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function BarberPage() {
  return (
    <Suspense fallback={<div>Stropping the razor...</div>}>
      <BarberContent />
    </Suspense>
  );
}
