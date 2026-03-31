'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Palette, Ruler, Layout, Globe, Star, Phone, ArrowRight, Compass, Home } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import { HomeHarmonyConfig } from '@/configs/home-harmony';
import { formatContent } from '@/lib/utils';
import styles from './home-harmony.module.css';

function HarmonyContent() {
  const searchParams = useSearchParams();
  
  const data = {
    name: searchParams.get('name') || 'Harmony Design Atelier',
    niche: searchParams.get('niche') || 'Interior Architect',
    location: searchParams.get('location') || 'Metropolitan Hub',
    phone: searchParams.get('phone') || '0000 000 000',
    rating: searchParams.get('rating') || '5.0'
  };

  return (
    <div className={styles.wrapper}>
      {/* Design SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": HomeHarmonyConfig.schemaType,
            "name": data.name,
            "telephone": data.phone,
            "areaServed": data.location,
            "description": `Premier ${data.niche} and spatial curation in ${data.location}. Defining the art of modern living.`
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
              {data.name}
            </motion.div>
            <motion.a 
              whileHover={{ backgroundColor: '#000', color: '#fff' }}
              href={`tel:${data.phone}`} 
              className={styles.ctaBtn}
            >
              Curate
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', color: '#1a1a1a', marginBottom: '30px', opacity: 0.3 }}>
              <Compass size={24} /> <Ruler size={24} /> <Palette size={24} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: formatContent(HomeHarmonyConfig.hero.title, data) }} />
            <p>{formatContent(HomeHarmonyConfig.hero.subtitle, data)}</p>
            <motion.a 
              whileHover={{ letterSpacing: '4px' }}
              href={`tel:${data.phone}`} 
              className={styles.ctaBtn} 
              style={{ padding: '18px 60px', fontSize: '0.9rem' }}
            >
              {HomeHarmonyConfig.hero.cta}
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className={styles.services}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 200, letterSpacing: '-1px' }}>Design Disciplines</h2>
              <p style={{ opacity: 0.4, marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                AESTHETIC EXCELLENCE IN {data.location.toUpperCase()}
              </p>
            </div>
          </Reveal>
          
          <div className={styles.grid}>
            {HomeHarmonyConfig.services.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <h3 style={{ marginBottom: '20px' }}>{s.title}</h3>
                  <p>{formatContent(s.desc, data)}</p>
                  <motion.div 
                    whileHover={{ x: 10 }}
                    style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    EXPLORE <ArrowRight size={14} />
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
              <Home size={48} style={{ margin: '0 auto 30px', opacity: 0.2 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 200, marginBottom: '30px' }}>{formatContent(HomeHarmonyConfig.footer.title, data)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.6 }}>
                {formatContent(HomeHarmonyConfig.footer.subtitle, data)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#fff', marginBottom: '50px', opacity: 0.5 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <motion.a 
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${data.phone}`} 
                className={styles.ctaBtn} 
                style={{ background: '#fff', color: '#000', padding: '25px 80px', fontSize: '1.2rem' }}
              >
                Inquire: {data.phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.2, fontSize: '0.7rem', letterSpacing: '5px' }}>
            © 2026 {data.name.toUpperCase()} | CURATED IN {data.location.toUpperCase()}
          </div>
        </div>
      </footer>

      <MobileActions phone={data.phone} name={data.name} />
    </div>
  );
}

export default function HarmonyPage() {
  return (
    <Suspense fallback={<div>Curating the view...</div>}>
      <HarmonyContent />
    </Suspense>
  );
}
