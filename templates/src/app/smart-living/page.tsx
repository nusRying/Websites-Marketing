'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, ShieldCheck, Video, Zap, Settings, Star, Phone, ArrowRight, Eye, Tv, Lightbulb, Home } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import { SmartLivingConfig } from '@/configs/smart-living';
import { formatContent } from '@/lib/utils';
import styles from './smart-living.module.css';

function SmartContent() {
  const searchParams = useSearchParams();
  
  const data = {
    name: searchParams.get('name') || 'Intelligent Living Co.',
    niche: searchParams.get('niche') || 'Smart Home Specialist',
    location: searchParams.get('location') || 'Digital District',
    phone: searchParams.get('phone') || '0000 000 000',
    rating: searchParams.get('rating') || '5.0'
  };

  return (
    <div className={styles.wrapper}>
      {/* Smart Home SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": SmartLivingConfig.schemaType,
            "name": data.name,
            "telephone": data.phone,
            "areaServed": data.location,
            "description": `Premier ${data.niche} and intelligent automation in ${data.location}. Future-proofing your lifestyle.`
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
              <Smartphone size={28} style={{ marginRight: 10, color: '#8b5cf6' }} />
              {data.name.split(' ')[0]} <span>{data.name.split(' ').slice(1).join(' ')}</span>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${data.phone}`} 
              className={styles.ctaBtn}
            >
              System Audit
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', color: '#8b5cf6', marginBottom: '30px' }}>
              <Tv size={24} /> <Lightbulb size={24} /> <ShieldCheck size={24} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: formatContent(SmartLivingConfig.hero.title, data) }} />
            <p>{formatContent(SmartLivingConfig.hero.subtitle, data)}</p>
            <motion.a 
              whileHover={{ gap: '20px', paddingRight: '50px' }}
              href={`tel:${data.phone}`} 
              className={styles.ctaBtn} 
              style={{ padding: '20px 60px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              Initialize Design <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className={styles.services}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase' }}>Technical Mastery</h2>
              <p style={{ color: '#94a3b8', marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                INTELLIGENCE REFINED IN {data.location.toUpperCase()}
              </p>
            </div>
          </Reveal>
          
          <div className={styles.grid}>
            {SmartLivingConfig.solutions.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <h3 style={{ marginBottom: '20px' }}>{s.title}</h3>
                  <p>{formatContent(s.desc, data)}</p>
                  <motion.div 
                    whileHover={{ x: 10, color: '#8b5cf6' }}
                    style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}
                  >
                    SPECS <Zap size={14} />
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container text-center">
          <Reveal>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Home size={48} style={{ margin: '0 auto 30px', color: '#8b5cf6', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>{formatContent(SmartLivingConfig.footer.title, data)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.7 }}>
                {formatContent(SmartLivingConfig.footer.subtitle, data)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#8b5cf6', marginBottom: '50px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(139, 92, 246, 0.2)", "0 0 40px rgba(139, 92, 246, 0.5)", "0 0 20px rgba(139, 92, 246, 0.2)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${data.phone}`} 
                className={styles.ctaBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL OPERATIONS: {data.phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.2, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {data.name.toUpperCase()} | INTEGRATED BY {data.niche.toUpperCase()} | {data.location.toUpperCase()} REGION
          </div>
        </div>
      </footer>

      <MobileActions phone={data.phone} name={data.name} />
    </div>
  );
}

export default function SmartPage() {
  return (
    <Suspense fallback={<div>Synchronizing nodes...</div>}>
      <SmartContent />
    </Suspense>
  );
}
