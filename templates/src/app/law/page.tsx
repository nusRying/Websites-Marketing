'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Gavel, Landmark, Star, Phone, ArrowRight, FileText, Briefcase } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import { LawLibertyConfig } from '@/configs/law-liberty';
import { formatContent } from '@/lib/utils';
import styles from './law-liberty.module.css';

function LawContent() {
  const searchParams = useSearchParams();
  
  const data = {
    name: searchParams.get('name') || 'Heritage Legal Counsel',
    niche: searchParams.get('niche') || 'Solicitor',
    location: searchParams.get('location') || 'Legal District',
    phone: searchParams.get('phone') || '0000 000 000',
    rating: searchParams.get('rating') || '5.0'
  };

  return (
    <div className={styles.wrapper}>
      {/* Legal SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": LawLibertyConfig.schemaType,
            "name": data.name,
            "telephone": data.phone,
            "areaServed": data.location,
            "description": `Distinguished ${data.niche} services in ${data.location}. Strategic defense and unwavering integrity.`
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
              <Scale size={28} style={{ marginRight: 10, color: '#c5a059' }} />
              {data.name.split(' ')[0]} <span>{data.name.split(' ').slice(1).join(' ')}</span>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${data.phone}`} 
              className={styles.evalBtn}
            >
              {LawLibertyConfig.hero.cta}
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
            <div style={{ display: 'flex', gap: '15px', color: '#c5a059', marginBottom: '30px' }}>
              <Landmark size={24} /> <Gavel size={24} /> <ShieldCheck size={24} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: formatContent(LawLibertyConfig.hero.title, data) }} />
            <p>{formatContent(LawLibertyConfig.hero.subtitle, data)}</p>
            <motion.a 
              whileHover={{ gap: '20px', paddingRight: '50px' }}
              href={`tel:${data.phone}`} 
              className={styles.evalBtn} 
              style={{ padding: '20px 60px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              Consult Now <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className={styles.practiceAreas}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontFamily: 'serif', color: '#2d1b14' }}>Distinguished Practice</h2>
              <p style={{ opacity: 0.5, marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                PROFESSIONAL EXCELLENCE IN {data.location.toUpperCase()}
              </p>
            </div>
          </Reveal>
          
          <div className={styles.grid}>
            {LawLibertyConfig.practiceAreas.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <h3>{s.title}</h3>
                  <p>{formatContent(s.desc, data)}</p>
                  <motion.div 
                    whileHover={{ x: 10, color: '#c5a059' }}
                    style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', borderTop: '1px solid #eee', paddingTop: '20px' }}
                  >
                    LEARN MORE <ArrowRight size={14} />
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
              <Briefcase size={48} style={{ margin: '0 auto 30px', color: '#c5a059', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontFamily: 'serif', marginBottom: '30px' }}>{formatContent(LawLibertyConfig.footer.title, data)}</h2>
              <p style={{ fontSize: '1.25rem', marginBottom: '50px', opacity: 0.7 }}>
                {formatContent(LawLibertyConfig.footer.subtitle, data)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#c5a059', marginBottom: '50px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(197, 160, 89, 0.1)", "0 0 40px rgba(197, 160, 89, 0.3)", "0 0 20px rgba(197, 160, 89, 0.1)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${data.phone}`} 
                className={styles.evalBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL CHAMBERS: {data.phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {data.name.toUpperCase()} | REGULATED {data.niche.toUpperCase()} | {data.location.toUpperCase()} REGION
          </div>
        </div>
      </footer>

      <MobileActions phone={data.phone} name={data.name} />
    </div>
  );
}

export default function LawPage() {
  return (
    <Suspense fallback={<div>Convening the counsel...</div>}>
      <LawContent />
    </Suspense>
  );
}
