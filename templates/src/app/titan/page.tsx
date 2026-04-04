'use client';
import { CheckCircle2, Star, ArrowRight, Cpu, ShieldCheck, Cloud, Globe, Code, Terminal, Zap, Phone, BarChart3, Lock } from 'lucide-react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { TitanConfig as Config } from '@/configs/titan';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './titan.module.css';
import PrestigeBadge from '@/components/PrestigeBadge';
import TrustBadgeStrip from '@/components/TrustBadgeStrip';
import FAQSection from '@/components/FAQSection';
import Image from 'next/image';

const ACCENT = '#64748b';
const TESTIMONIALS = [
  { name: 'Marcus B.', location: 'Project Director', text: 'Delivered on a massive scope without a single compromise on quality. The team are brilliantly skilled and highly professional.', stars: 5 },
  { name: 'Liz P.', location: 'Site Manager', text: 'Best contractors we have worked with in 15 years. Communication was exemplary and every milestone was hit on time.', stars: 5 },
  { name: 'Derek K.', location: 'Client', text: 'A genuinely reliable, high-quality operation. Costs were transparent, workers were skilled and the result was exceptional.', stars: 5 },
];
function TitanContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Titan Systems Global',
    niche: 'IT Specialist',
    location: 'Digital Hub',
    phone: '0000 000 000',
    rating: '4.9'
  });

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
            <PrestigeBadge niche={niche} location={location} accentColor={ACCENT} />
            <h1>{ai.heroTitle || t(Config.hero.title)}</h1>
            <p>
              {ai.heroSubtitle || t(Config.hero.subtitle)}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <motion.a 
                whileHover={{ gap: '15px', paddingRight: '45px' }}
                href="#book" 
                className={styles.btnTitan} 
                style={{ padding: '18px 40px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
              >
                {ai.heroCta || Config.hero.cta} <ArrowRight size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>

      
        <div style={{ position: 'relative', width: '100%', height: '400px', marginTop: '40px', borderRadius: '16px', overflow: 'hidden' }}>
          <Image src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=1200&q=80" alt={`${niche} in ${location}`} fill style={{ objectFit: 'cover' }} priority />
        </div>
    
      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.techBar}>
        <div className="container">
          <div className={styles.techGrid}>
            {Config.techBar.map((tech, i) => (
              <div key={i} className={styles.techItem}>
                {techIcons[i] || techIcons[0]} {t(tech)}
              </div>
            ))}
          </div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <TrustBadgeStrip />

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
                  <h3>{t(s.title)}</h3>
                  <p style={{ flex: 1 }}>{t(s.desc)}</p>
                  <ul style={{ marginTop: '20px', paddingLeft: '0', listStyle: 'none' }}>
                    {s.includes?.map((item: string, idx: number) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderTop: idx === 0 ? '1px solid #f1f5f9' : 'none', fontSize: '0.85rem', color: '#475569' }}>
                        <CheckCircle2 size={14} color={ACCENT} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={Config.faqs} accentColor={ACCENT} />
      <HowItWorks accentColor={ACCENT} />
      <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />

      <footer className={styles.footer}>
        <div className="container text-center">
          <Reveal>
            <div>
              <Globe size={48} style={{ margin: '0 auto 30px', color: '#3b82f6', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>{ai.footerTitle || t(Config.footer.title)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.7, maxWidth: '650px', margin: '0 auto 50px' }}>
                {ai.footerSubtitle || t(Config.footer.subtitle)}
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

      <BookingWidget bookingUrl={booking_url} businessName={name} />
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