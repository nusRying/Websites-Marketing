'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Printer, Image as ImageIcon, Package, Globe, Star, Phone, ArrowRight, PenTool, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import { PrimePrintConfig } from '@/configs/prime-print';
import { formatContent } from '@/lib/utils';
import styles from './prime-print.module.css';

function PrintContent() {
  const searchParams = useSearchParams();
  
  const data = {
    name: searchParams.get('name') || 'Vivid Print Solutions',
    niche: searchParams.get('niche') || 'Print Specialist',
    location: searchParams.get('location') || 'Creative Hub',
    phone: searchParams.get('phone') || '0000 000 000',
    rating: searchParams.get('rating') || '5.0'
  };

  return (
    <div className={styles.wrapper}>
      {/* Print SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": PrimePrintConfig.schemaType,
            "name": data.name,
            "telephone": data.phone,
            "areaServed": data.location,
            "description": `Premier ${data.niche} and signage solutions in ${data.location}. Precision printing and vivid impact.`
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
              <Printer size={28} style={{ marginRight: 10, color: '#6366f1' }} />
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
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', color: '#6366f1', marginBottom: '30px' }}>
              <PenTool size={24} /> <ImageIcon size={24} /> <Package size={24} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: formatContent(PrimePrintConfig.hero.title, data) }} />
            <p>{formatContent(PrimePrintConfig.hero.subtitle, data)}</p>
            <motion.a 
              whileHover={{ gap: '20px', paddingRight: '50px' }}
              href={`tel:${data.phone}`} 
              className={styles.ctaBtn} 
              style={{ padding: '20px 60px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              Start Your Project <ArrowRight size={20} />
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
            {PrimePrintConfig.services.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <h3 style={{ marginBottom: '20px' }}>{s.title}</h3>
                  <p>{formatContent(s.desc, data)}</p>
                  <motion.div 
                    whileHover={{ x: 10, color: '#6366f1' }}
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
              <Globe size={48} style={{ margin: '0 auto 30px', color: '#6366f1', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>{formatContent(PrimePrintConfig.footer.title, data)}</h2>
              <p style={{ fontSize: '1.25rem', marginBottom: '50px', opacity: 0.7 }}>
                {formatContent(PrimePrintConfig.footer.subtitle, data)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#fbbf24', marginBottom: '40px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(99, 102, 241, 0.2)", "0 0 40px rgba(99, 102, 241, 0.5)", "0 0 20px rgba(99, 102, 241, 0.2)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${data.phone}`} 
                className={styles.ctaBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL PRODUCTION: {data.phone}
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

export default function PrintPage() {
  return (
    <Suspense fallback={<div>Inking the layout...</div>}>
      <PrintContent />
    </Suspense>
  );
}
