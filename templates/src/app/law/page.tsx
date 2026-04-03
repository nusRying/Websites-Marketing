'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Gavel, Landmark, Star, ArrowRight, Briefcase } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { LawLibertyConfig } from '@/configs/law-liberty';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './law-liberty.module.css';


const ACCENT = '#92400e';
const TESTIMONIALS = [
  { name: 'Andrew H.', location: 'Business Client', text: "Handled a complex commercial dispute with total professionalism and achieved an outcome beyond what I hoped for.", stars: 5 },
  { name: 'Susan T.', location: 'Estate Client', text: "Navigated an incredibly sensitive estate matter with compassion and complete competence. Couldn't have asked for more.", stars: 5 },
  { name: 'James R.', location: 'Contract Review', text: "Reviewed our entire commercial contract portfolio and found issues no one else had spotted. Invaluable expertise.", stars: 5 },
];
function LawContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Heritage Legal Counsel',
    niche: 'Solicitor',
    location: 'Legal District',
    phone: '0000 000 000',
    rating: '5.0'
  });

  return (
    <div className={styles.wrapper}>
      {/* Legal SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": LawLibertyConfig.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Distinguished ${niche} services in ${location}. Strategic defense and unwavering integrity.`
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
              {name.split(' ')[0]} <span>{name.split(' ').slice(1).join(' ')}</span>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
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
            <h1 dangerouslySetInnerHTML={{ __html: t(LawLibertyConfig.hero.title) }} />
            <p>{t(LawLibertyConfig.hero.subtitle)}</p>
            <motion.a 
              whileHover={{ gap: '20px', paddingRight: '50px' }}
              href={`tel:${phone}`} 
              className={styles.evalBtn} 
              style={{ padding: '20px 60px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              Consult Now <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.practiceAreas}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontFamily: 'serif', color: '#2d1b14' }}>Distinguished Practice</h2>
              <p style={{ opacity: 0.5, marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                PROFESSIONAL EXCELLENCE IN {location.toUpperCase()}
              </p>
            </div>
          </Reveal>
          
          <div className={styles.grid}>
            {LawLibertyConfig.practiceAreas.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <h3>{s.title}</h3>
                  <p>{t(s.desc)}</p>
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

      <HowItWorks accentColor={ACCENT} />
      <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />

      <footer className={styles.footer}>
        <div className="container">
          <Reveal>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Briefcase size={48} style={{ margin: '0 auto 30px', color: '#c5a059', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontFamily: 'serif', marginBottom: '30px' }}>{t(LawLibertyConfig.footer.title)}</h2>
              <p style={{ fontSize: '1.25rem', marginBottom: '50px', opacity: 0.7 }}>
                {t(LawLibertyConfig.footer.subtitle)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#c5a059', marginBottom: '50px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(197, 160, 89, 0.1)", "0 0 40px rgba(197, 160, 89, 0.3)", "0 0 20px rgba(197, 160, 89, 0.1)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className={styles.evalBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL CHAMBERS: {phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | REGULATED {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </div>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
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
