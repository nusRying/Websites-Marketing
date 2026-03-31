'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Cloud, Globe, Code, Terminal, Zap, Phone, ArrowRight, BarChart3, Lock } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import { TitanConfig as Config } from '@/configs/titan';
import { formatContent } from '@/lib/utils';
import styles from './titan.module.css';

function TitanContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Titan Systems Global';
  const niche = searchParams.get('niche') || 'IT Specialist';
  const location = searchParams.get('location') || 'Digital Hub';
  const phone = searchParams.get('phone') || '0000 000 000';
  const rating = searchParams.get('rating') || '4.9';

  const data = { name, niche, location, phone, rating };

  const techIcons = [
    <ShieldCheck size={18} color="#3b82f6" key="shield" />,
    <Cloud size={18} color="#3b82f6" key="cloud" />,
    <Zap size={18} color="#3b82f6" key="zap" />,
    <BarChart3 size={18} color="#3b82f6" key="chart" />
  ];

  const solutionIcons = [
    <Lock size={32} key="lock" />,
    <Cloud size={32} key="cloud-sol" />,
    <Cpu size={32} key="cpu" />
  ];

  return (
    <div className={styles.wrapper}>
      {/* Tech SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": Config.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Premier ${niche} and digital infrastructure solutions in ${location}. Future-proofing businesses through technical excellence.`
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
              <Terminal size={24} />
              <div>{name.split(' ')[0]}<span>{name.split(' ').slice(1).join(' ')}</span></div>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.btnTitan}
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
            transition={{ duration: 1 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', color: '#3b82f6', marginBottom: '30px' }}>
              <Code size={20} /> <Globe size={20} /> <Cpu size={20} />
            </div>
            <h1>{formatContent(Config.hero.title, data)}</h1>
            <p>
              {formatContent(Config.hero.subtitle, data)}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <motion.a 
                whileHover={{ gap: '15px', paddingRight: '45px' }}
                href={`tel:${phone}`} 
                className={styles.btnTitan} 
                style={{ padding: '18px 40px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
              >
                {Config.hero.cta} <ArrowRight size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className={styles.techBar}>
        <div className="container">
          <div className={styles.techGrid}>
            {Config.techBar.map((tech, i) => (
              <div key={i} className={styles.techItem}>
                {techIcons[i] || techIcons[0]} {formatContent(tech, data)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.services}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900 }}>Enterprise Solutions</h2>
              <p style={{ color: '#94a3b8', marginTop: '20px', maxWidth: '600px', margin: '20px auto 0' }}>
                Technical excellence delivered through a proven methodology.
              </p>
            </div>
          </Reveal>
          
          <div className={styles.solutionsGrid}>
            {Config.solutions.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.solutionCard}>
                  <div style={{ color: '#3b82f6', marginBottom: '25px' }}>{solutionIcons[i] || solutionIcons[0]}</div>
                  <h3>{formatContent(s.title, data)}</h3>
                  <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>{formatContent(s.desc, data)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container text-center">
          <Reveal>
            <div>
              <Globe size={48} style={{ margin: '0 auto 30px', color: '#3b82f6', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>{formatContent(Config.footer.title, data)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.7, maxWidth: '650px', margin: '0 auto 50px' }}>
                {formatContent(Config.footer.subtitle, data)}
              </p>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(59, 130, 246, 0.3)", "0 0 40px rgba(59, 130, 246, 0.6)", "0 0 20px rgba(59, 130, 246, 0.3)"] }}
                transition={{ repeat: Infinity, duration: 2 }}
                href={`tel:${phone}`} 
                className={styles.btnTitan} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL {name.toUpperCase()}: {phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.2, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | ENTERPRISE {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </div>
        </div>
      </footer>

      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function TitanPage() {
  return (
    <Suspense fallback={<div>Synchronizing systems...</div>}>
      <TitanContent />
    </Suspense>
  );
}
