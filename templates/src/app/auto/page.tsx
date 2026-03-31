'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Gauge, ShieldAlert, Zap, Settings, Star, Phone, CheckCircle2, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import { AutoConfig as Config } from '@/configs/auto';
import { formatContent } from '@/lib/utils';
import styles from './auto.module.css';

function AutoContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Auto Armor Performance';
  const niche = searchParams.get('niche') || 'Auto Specialist';
  const location = searchParams.get('location') || 'Local Area';
  const phone = searchParams.get('phone') || '0000 000 000';
  const rating = searchParams.get('rating') || '4.8';

  const data = { name, niche, location, phone, rating };

  const icons = [<Gauge size={32} key="gauge" />, <ShieldAlert size={32} key="shield" />, <Zap size={32} key="zap" />];

  return (
    <div className={styles.wrapper}>
      {/* Automotive SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": Config.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Elite ${niche} services in ${location}. Precision diagnostics and certified repairs.`
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <motion.div 
              initial={{ skewX: -10, opacity: 0 }}
              animate={{ skewX: -10, opacity: 1 }}
              className={styles.logo}
            >
              <Settings size={28} style={{ marginRight: 8 }} />
              {name.toUpperCase()}
            </motion.div>
            <motion.a 
              whileHover={{ x: 5 }}
              href={`tel:${phone}`} 
              style={{ color: '#ea580c', fontWeight: 900, fontSize: '1.1rem' }}
            >
              EMERGENCY: {phone}
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', color: '#ea580c', marginBottom: '20px' }}>
              <Gauge size={24} /> <Wrench size={24} /> <Zap size={24} />
            </div>
            <h1>{formatContent(Config.hero.title, data)}</h1>
            <p>
              {formatContent(Config.hero.subtitle, data)}
            </p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${phone}`} 
              className="btn" 
              style={{ backgroundColor: '#ea580c', padding: '20px 60px', fontWeight: 900, borderRadius: '0', fontSize: '1.2rem' }}
            >
              {Config.hero.cta}
            </motion.a>
          </motion.div>

          <div className={styles.specBar}>
            {Config.specs.map((spec, i) => (
              <div key={i} className={styles.specItem}>
                <CheckCircle2 size={18} /> {formatContent(spec, data)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.services}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase' }}>Workshop Capabilities</h2>
              <p style={{ color: '#94a3b8', marginTop: '10px' }}>Advanced technical support for {location} motorists</p>
            </div>
          </Reveal>
          
          <div className={styles.serviceGrid}>
            {Config.capabilities.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.serviceCard}>
                  <div style={{ color: '#ea580c', marginBottom: '20px' }}>{icons[i] || icons[0]}</div>
                  <h3>{formatContent(s.title, data)}</h3>
                  <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>{formatContent(s.desc, data)}</p>
                  <motion.div whileHover={{ x: 5 }} style={{ marginTop: '20px', color: '#ea580c', fontWeight: 700, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    Learn More <ChevronRight size={16} />
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bookingSection}>
        <div className="container">
          <Reveal>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', color: '#fff', marginBottom: '30px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="currentColor" />)}
              </div>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '20px', textTransform: 'uppercase' }}>{formatContent(Config.footer.title, data)}</h2>
              <p style={{ fontSize: '1.3rem', marginBottom: '50px', opacity: 0.9 }}>
                {formatContent(Config.footer.subtitle, data)}
              </p>
              <motion.a 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                href={`tel:${phone}`} 
                className="btn" 
                style={{ backgroundColor: '#0f172a', color: 'white', padding: '25px 80px', fontSize: '1.4rem', fontWeight: 900, borderRadius: '0' }}
              >
                CALL {name.toUpperCase()}: {phone}
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <div style={{ fontWeight: 900, fontSize: '1.5rem', marginBottom: '20px', letterSpacing: '2px', fontStyle: 'italic' }}>
            {name.toUpperCase()} <span>PERFORMANCE</span>
          </div>
          <p style={{ opacity: 0.5, fontSize: '0.8rem', letterSpacing: '2px' }}>
            © 2026 | CERTIFIED {niche.toUpperCase()} | {location.toUpperCase()} HUB
          </p>
        </div>
      </footer>

      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function AutoPage() {
  return (
    <Suspense fallback={<div>Igniting engines...</div>}>
      <AutoContent />
    </Suspense>
  );
}
