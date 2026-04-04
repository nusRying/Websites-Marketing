'use client';
import { CheckCircle2, Star, ArrowRight, BookOpen, GraduationCap, Users, Award, Brain, Microscope, Music, Languages, Phone } from 'lucide-react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { ScholasticConfig as Config } from '@/configs/scholastic';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './scholastic.module.css';
import PrestigeBadge from '@/components/PrestigeBadge';
import TrustBadgeStrip from '@/components/TrustBadgeStrip';
import FAQSection from '@/components/FAQSection';
import Image from 'next/image';

const ACCENT = '#7c3aed';
const TESTIMONIALS = [
  { name: 'Olivia P.', location: 'A Level Student', text: 'My grades went from Cs to As. The tutors are incredibly skilled at making complex topics completely understandable.', stars: 5 },
  { name: 'Tom H.', location: 'Parent', text: 'Son is now confident and motivated in subjects he used to dread. We only wish we had found them sooner.', stars: 5 },
  { name: 'Emma J.', location: 'University Prep', text: 'Got into my first-choice university thanks to the support here. The guidance on personal statements was outstanding.', stars: 5 },
];
function ScholasticContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Scholastic Academy',
    niche: 'Private Tutor',
    location: 'Academic District',
    phone: '0000 000 000',
    rating: '5.0'
  });

  const disciplineIcons = [
    <Microscope size={32} key="micro" />,
    <Languages size={32} key="lang" />,
    <Music size={32} key="music" />
  ];

  return (
    <div className={styles.wrapper}>
      {/* Education SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": Config.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Expert ${niche} services in ${location}. Personalized learning for academic excellence.`
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.logo}
            >
              <GraduationCap size={32} />
              {name}
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.enrollBtn}
            >
              Book Assessment
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', color: '#0d9488', marginBottom: '20px' }}>
              <BookOpen size={24} /> <Brain size={24} /> <Star size={24} />
            </div>
            <PrestigeBadge niche={niche} location={location} accentColor={ACCENT} />
            <h1>{ai.heroTitle || t(Config.hero.title)}</h1>
            <p>
              {ai.heroSubtitle || t(Config.hero.subtitle)}
            </p>
            <motion.a 
              whileHover={{ gap: '15px', paddingRight: '45px' }}
              href="#book" 
              className={styles.enrollBtn} 
              style={{ padding: '18px 45px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              {ai.heroCta || Config.hero.cta} <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>

      
        <div style={{ position: 'relative', width: '100%', height: '400px', marginTop: '40px', borderRadius: '16px', overflow: 'hidden' }}>
          <Image src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80" alt={`${niche} in ${location}`} fill style={{ objectFit: 'cover' }} priority />
        </div>
    
      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontFamily: 'serif', color: '#1e3a8a' }}>Learning Disciplines</h2>
              <p style={{ opacity: 0.6, marginTop: '10px' }}>Expert guidance across core subjects in {location}</p>
            </div>
          </Reveal>
          
          <div className={styles.subjectGrid}>
            {Config.disciplines.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.subjectCard}>
                  <div style={{ color: '#0d9488', marginBottom: '20px' }}>{disciplineIcons[i] || disciplineIcons[0]}</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#1e3a8a' }}>{t(s.title)}</h3>
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

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.resultsSection}>
        <div className="container">
          <Reveal>
            <h2 style={{ fontSize: '3rem', fontWeight: 200 }}>Proven Student Impact</h2>
          </Reveal>
          <div className={styles.statsGrid}>
            {Config.stats.map((item, i) => (
              <div key={i} className={styles.statItem}>
                <div className={styles.statValue}>{t(item.value)}</div>
                <p>{t(item.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={Config.faqs} accentColor={ACCENT} />
      <HowItWorks accentColor={ACCENT} />
      <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />

      <footer className={styles.footer}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <Award size={48} style={{ margin: '0 auto 30px', color: '#5eead4' }} />
              <h2 style={{ fontSize: '3.5rem', fontFamily: 'serif', marginBottom: '30px' }}>{ai.footerTitle || t(Config.footer.title)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.8 }}>
                {ai.footerSubtitle || t(Config.footer.subtitle)}
              </p>
              <motion.a 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className={styles.enrollBtn} 
                style={{ background: '#5eead4', color: '#0f172a', padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL {name.toUpperCase()}: {phone}
              </motion.a>
            </div>
          </Reveal>
          <p style={{ marginTop: '100px', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | CERTIFIED {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </p>
        </div>
      </footer>

      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function ScholasticPage() {
  return (
    <Suspense fallback={<div>Opening the classroom...</div>}>
      <ScholasticContent />
    </Suspense>
  );
}