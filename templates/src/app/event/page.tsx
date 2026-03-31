'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Presentation, Users, Trophy, Globe, Star, Phone, ArrowRight, Calendar, Sparkles, Layout } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import { EliteEventConfig } from '@/configs/elite-event';
import { formatContent } from '@/lib/utils';
import styles from './elite-event.module.css';

function EventContent() {
  const searchParams = useSearchParams();
  
  const data = {
    name: searchParams.get('name') || 'Elite Event Productions',
    niche: searchParams.get('niche') || 'Event Strategist',
    location: searchParams.get('location') || 'Metropolitan Area',
    phone: searchParams.get('phone') || '0000 000 000',
    rating: searchParams.get('rating') || '5.0'
  };

  return (
    <div className={styles.wrapper}>
      {/* Corporate Event SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": EliteEventConfig.schemaType,
            "name": data.name,
            "telephone": data.phone,
            "areaServed": data.location,
            "description": `Premier ${data.niche} and corporate production in ${data.location}. Strategic impact and flawless execution.`
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
              <Presentation size={28} style={{ marginRight: 10, color: '#4f46e5' }} />
              {data.name.split(' ')[0]} <span>{data.name.split(' ').slice(1).join(' ')}</span>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${data.phone}`} 
              className={styles.ctaBtn}
            >
              Consultation
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
            <div style={{ display: 'flex', gap: '15px', color: '#4f46e5', marginBottom: '30px' }}>
              <Layout size={24} /> <Users size={24} /> <Trophy size={24} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: formatContent(EliteEventConfig.hero.title, data) }} />
            <p>{formatContent(EliteEventConfig.hero.subtitle, data)}</p>
            <motion.a 
              whileHover={{ gap: '20px', paddingRight: '50px' }}
              href={`tel:${data.phone}`} 
              className={styles.ctaBtn} 
              style={{ padding: '20px 60px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              Initialize Planning <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className={styles.services}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', color: '#1e1b4b' }}>Core Competencies</h2>
              <p style={{ color: '#64748b', marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                IMPACT REFINED IN {data.location.toUpperCase()}
              </p>
            </div>
          </Reveal>
          
          <div className={styles.grid}>
            {EliteEventConfig.services.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <h3 style={{ marginBottom: '20px' }}>{s.title}</h3>
                  <p>{formatContent(s.desc, data)}</p>
                  <motion.div 
                    whileHover={{ x: 10, color: '#4f46e5' }}
                    style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}
                  >
                    CAPABILITIES <Sparkles size={14} />
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Globe size={48} style={{ margin: '0 auto 30px', color: '#4f46e5', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>{formatContent(EliteEventConfig.footer.title, data)}</h2>
              <p style={{ fontSize: '1.25rem', marginBottom: '50px', opacity: 0.7 }}>
                {formatContent(EliteEventConfig.footer.subtitle, data)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#fbbf24', marginBottom: '50px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(79, 70, 229, 0.2)", "0 0 40px rgba(79, 70, 229, 0.5)", "0 0 20px rgba(79, 70, 229, 0.2)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${data.phone}`} 
                className={styles.ctaBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL STRATEGY: {data.phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {data.name.toUpperCase()} | CERTIFIED {data.niche.toUpperCase()} | {data.location.toUpperCase()} REGION
          </div>
        </div>
      </footer>

      <MobileActions phone={data.phone} name={data.name} />
    </div>
  );
}

export default function EventPage() {
  return (
    <Suspense fallback={<div>Synchronizing logistics...</div>}>
      <EventContent />
    </Suspense>
  );
}
