'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Droplets, ShieldCheck, Waves, Zap, Settings, Star, Phone, CheckCircle2, ChevronRight, Thermometer, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import { AquaConfig as config } from '@/configs/aqua';
import { formatContent } from '@/lib/utils';
import styles from './aqua.module.css';

function AquaContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Aqua Artisans Pool & Spa';
  const niche = searchParams.get('niche') || 'Pool Specialist';
  const location = searchParams.get('location') || 'Coastal Hub';
  const phone = searchParams.get('phone') || '0000 000 000';
  const rating = searchParams.get('rating') || '4.9';

  const data = { name, niche, location, phone, rating };

  return (
    <div className={styles.wrapper}>
      {/* Aquatic SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": config.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Elite ${niche} and aquatic maintenance in ${location}. Crystal clear results and technical precision.`
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
              <Droplets size={28} />
              <div>{name.split(' ')[0]} <span>{name.split(' ').slice(1).join(' ')}</span></div>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.actionBtn}
            >
              Free Water Analysis
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div style={{ display: 'flex', gap: '15px', color: '#0891b2', marginBottom: '30px' }}>
                <Waves size={24} /> <Thermometer size={24} /> <ShieldCheck size={24} />
              </div>
              <h1>{formatContent(config.hero.title, data).split('in')[0]} <br/> <span>in {formatContent(config.hero.title, data).split('in')[1]}</span></h1>
              <p>
                {formatContent(config.hero.subtitle, data)}
              </p>
              <motion.a 
                whileHover={{ gap: '15px', paddingRight: '45px' }}
                href={`tel:${phone}`} 
                className={styles.actionBtn} 
                style={{ padding: '18px 45px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
              >
                {config.hero.cta} <ArrowRight size={20} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0', background: 'white' }}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#164e63' }}>Premier Water Services</h2>
              <p style={{ color: '#64748b', marginTop: '10px' }}>Technical excellence for {location} residents</p>
            </div>
          </Reveal>
          
          <div className={styles.serviceGrid}>
            {config.services.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <div style={{ color: '#0891b2', marginBottom: '20px' }}>
                    {i === 0 ? <Settings size={32} /> : i === 1 ? <Droplets size={32} /> : <ShieldCheck size={32} />}
                  </div>
                  <h3>{s.title}</h3>
                  <p style={{ color: '#64748b', lineHeight: 1.7 }}>{formatContent(s.desc, data)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container text-center">
          <Reveal>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>{formatContent(config.footer.title, data)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.9 }}>
                {formatContent(config.footer.subtitle, data)}
              </p>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(8, 145, 178, 0.2)", "0 0 40px rgba(8, 145, 178, 0.5)", "0 0 20px rgba(8, 145, 178, 0.2)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className={styles.actionBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem', background: '#fff', color: '#164e63' }}
              >
                CALL {name.toUpperCase()}: {phone}
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <div style={{ fontWeight: 900, fontSize: '1.5rem', marginBottom: '20px', letterSpacing: '2px', color: '#164e63' }}>
            {name.toUpperCase()} <span>MASTERY</span>
          </div>
          <p style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | CERTIFIED {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </p>
        </div>
      </footer>

      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function AquaPage() {
  return (
    <Suspense fallback={<div>Filtering the view...</div>}>
      <AquaContent />
    </Suspense>
  );
}
