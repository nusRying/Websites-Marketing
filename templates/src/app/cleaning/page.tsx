'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Heart, Star, Phone, ArrowRight, Brush, Home, CheckCircle2, Zap } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import { CleaningConfig } from '@/configs/cleaning';
import { formatContent } from '@/lib/utils';
import { formatPersonalizedContent, LeadData, AICopy } from '@/lib/personalization';
import styles from './sparkle-shine.module.css';

function CleaningContent() {
  const searchParams = useSearchParams();
  
  const leadData: LeadData = {
    name: searchParams.get('name') || 'Elite Sparkle Cleaners',
    niche: searchParams.get('niche') || 'Cleaning Specialist',
    location: searchParams.get('location') || 'Central District',
    phone: searchParams.get('phone') || '0000 000 000',
    rating: searchParams.get('rating') || '5.0'
  };

  const aiCopy: AICopy = {
    hero_title: searchParams.get('ai_hero_title') || undefined,
    hero_subtitle: searchParams.get('ai_hero_subtitle') || undefined,
    pain_point: searchParams.get('ai_pain_point') || undefined,
    solution: searchParams.get('ai_solution') || undefined,
    niche_cta: searchParams.get('ai_niche_cta') || undefined
  };

  const data = leadData; // For backward compatibility in simple fields

  return (
    <div className={styles.wrapper}>
      {/* ... (SEO Schema) */}

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.logo}
            >
              <Sparkles size={28} />
              {data.name.split(' ')[0]} <span>{data.name.split(' ').slice(1).join(' ')}</span>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${data.phone}`} 
              className={styles.sparkBtn}
            >
              Quick Estimate
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
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', color: '#0ea5e9', marginBottom: '30px' }}>
              <Home size={24} /> <Brush size={24} /> <Zap size={24} />
            </div>
            <h1 dangerouslySetInnerHTML={{ __html: formatPersonalizedContent(CleaningConfig.hero.title, leadData, aiCopy) }} />
            <p>{formatPersonalizedContent(CleaningConfig.hero.subtitle, leadData, aiCopy)}</p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${data.phone}`} 
              className={styles.sparkBtn} 
              style={{ padding: '18px 45px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              {aiCopy.niche_cta || 'Start Fresh Today'} <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className={styles.purityBanner}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
              <ShieldCheck size={24} color="#fff" /> ECO-FRIENDLY
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
              <CheckCircle2 size={24} color="#fff" /> FULLY INSURED
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800 }}>
              <Heart size={24} color="#fff" /> {data.location.toUpperCase()} HUB
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0', background: 'white' }}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a' }}>Signature Standards</h2>
              <p style={{ color: '#64748b', marginTop: '10px' }}>Clinical purity for your {data.location} property</p>
            </div>
          </Reveal>
          
          <div className={styles.grid}>
            {CleaningConfig.services.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <h3 style={{ marginBottom: '20px' }}>{s.title}</h3>
                  <p>{formatContent(s.desc, data)}</p>
                  <motion.div 
                    whileHover={{ x: 10, color: '#0ea5e9' }}
                    style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}
                  >
                    SPECS <Sparkles size={14} />
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
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <Sparkles size={48} style={{ margin: '0 auto 30px', color: '#0ea5e9', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px', color: '#0f172a' }}>{formatContent(CleaningConfig.footer.title, data)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.7 }}>
                {formatContent(CleaningConfig.footer.subtitle, data)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#0ea5e9', marginBottom: '50px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(14, 165, 233, 0.2)", "0 0 40px rgba(14, 165, 233, 0.5)", "0 0 20px rgba(14, 165, 233, 0.2)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${data.phone}`} 
                className={styles.sparkBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL TEAM: {data.phone}
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

export default function CleaningPage() {
  return (
    <Suspense fallback={<div>De-dusting the view...</div>}>
      <CleaningContent />
    </Suspense>
  );
}
