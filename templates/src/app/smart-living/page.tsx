'use client';
import { CheckCircle2, Star, ArrowRight, Smartphone, ShieldCheck, Video, Zap, Settings, Phone, Eye, Tv, Lightbulb, Home } from 'lucide-react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { SmartLivingConfig } from '@/configs/smart-living';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './smart-living.module.css';
import PrestigeBadge from '@/components/PrestigeBadge';
import TrustBadgeStrip from '@/components/TrustBadgeStrip';
import FAQSection from '@/components/FAQSection';
import Image from 'next/image';

const ACCENT = '#8b5cf6';
const TESTIMONIALS = [
  { name: 'Ben A.', location: 'Home Owner', text: 'The smart home system they installed is incredible. Everything works seamlessly and the energy savings have been significant.', stars: 5 },
  { name: 'Karen T.', location: 'Renovation Client', text: 'Transformed our entire home into a smart space during our renovation. The integration is flawless and intuitive.', stars: 5 },
  { name: 'Chris P.', location: 'Tech Enthusiast', text: 'As someone who knows tech, I am genuinely impressed by the quality of their installation and system design.', stars: 5 },
];
function SmartContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Intelligent Living Co.',
    niche: 'Smart Home Specialist',
    location: 'Digital District',
    phone: '0000 000 000',
    rating: '5.0'
  });

  return (
    <div className={styles.wrapper}>
      {/* Smart Home SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": SmartLivingConfig.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Premier ${niche} and intelligent automation in ${location}. Future-proofing your lifestyle.`
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
              {name.split(' ')[0]} <span>{name.split(' ').slice(1).join(' ')}</span>
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
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
            <PrestigeBadge niche={niche} location={location} accentColor={ACCENT} />
            <h1 dangerouslySetInnerHTML={{ __html: ai.heroTitle || t(SmartLivingConfig.hero.title) }} />
            <p>{ai.heroSubtitle || t(SmartLivingConfig.hero.subtitle)}</p>
            <motion.a 
              whileHover={{ gap: '20px', paddingRight: '50px' }}
              href="#book" 
              className={styles.ctaBtn} 
              style={{ padding: '20px 60px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              {ai.heroCta || SmartLivingConfig.hero.cta} <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>

      
        <div style={{ position: 'relative', width: '100%', height: '400px', marginTop: '40px', borderRadius: '16px', overflow: 'hidden' }}>
          <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80" alt={`${niche} in ${location}`} fill style={{ objectFit: 'cover' }} priority />
        </div>
    
      <SocialProofBar accentColor={ACCENT} />

      </section>

      <TrustBadgeStrip />

      <section className={styles.services}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase' }}>Technical Mastery</h2>
              <p style={{ color: '#94a3b8', marginTop: '10px', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                INTELLIGENCE REFINED IN {location.toUpperCase()}
              </p>
            </div>
          </Reveal>
          
          <div className={styles.grid}>
            {SmartLivingConfig.solutions.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.card}>
                  <h3 style={{ marginBottom: '20px' }}>{s.title}</h3>
                  <p style={{ flex: 1 }}>{t(s.desc)}</p>
                  <ul style={{ marginTop: '20px', paddingLeft: '0', listStyle: 'none' }}>
                    {s.includes?.map((item: string, idx: number) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', borderTop: idx === 0 ? '1px solid #f1f5f9' : 'none', fontSize: '0.85rem', color: '#475569' }}>
                        <CheckCircle2 size={14} color={ACCENT} /> {item}
                      </li>
                    ))}
                  </ul>
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

      <FAQSection faqs={SmartLivingConfig.faqs} accentColor={ACCENT} />
      <HowItWorks accentColor={ACCENT} />
      <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />

      <footer className={styles.footer}>
        <div className="container text-center">
          <Reveal>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <Home size={48} style={{ margin: '0 auto 30px', color: '#8b5cf6', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '30px' }}>{ai.footerTitle || t(SmartLivingConfig.footer.title)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.7 }}>
                {ai.footerSubtitle || t(SmartLivingConfig.footer.subtitle)}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', color: '#8b5cf6', marginBottom: '50px' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="currentColor" />)}
              </div>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(139, 92, 246, 0.2)", "0 0 40px rgba(139, 92, 246, 0.5)", "0 0 20px rgba(139, 92, 246, 0.2)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className={styles.ctaBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL OPERATIONS: {phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.2, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | INTEGRATED BY {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </div>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
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