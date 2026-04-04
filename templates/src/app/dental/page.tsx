'use client';
import { CheckCircle2, Star, ArrowRight, ShieldCheck, MapPin, Heart, Award, Sparkles, Activity, Stethoscope } from 'lucide-react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Reveal';
import MobileActions from '@/components/MobileActions';
import BookingWidget from '@/components/BookingWidget';
import SocialProofBar from '@/components/SocialProofBar';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import { DentalConfig as Config } from '@/configs/dental';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './dental.module.css';
import PrestigeBadge from '@/components/PrestigeBadge';
import TrustBadgeStrip from '@/components/TrustBadgeStrip';
import FAQSection from '@/components/FAQSection';
import Image from 'next/image';

const ACCENT = '#0891b2';
const TESTIMONIALS = [
  { name: 'Emma C.', location: 'New Patient', text: "I was nervous but they made me feel completely at ease. The treatment was painless and my smile has completely transformed.", stars: 5 },
  { name: 'Oliver P.', location: 'Regular Patient', text: "Best dental practice I've ever been to. Modern equipment, gentle team, and they actually listen to what you want.", stars: 5 },
  { name: 'Sophie L.', location: 'Cosmetic Patient', text: "The whitening treatment was fantastic. Clear results in one session and the team explained every step perfectly.", stars: 5 },
];
function DentalContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } = usePersonalization({
    name: 'Dental Deluxe Clinic',
    niche: 'Dental Specialist',
    location: 'Medical District',
    phone: '0000 000 000',
    rating: '5.0'
  });

  const barIcons = [
    <Sparkles size={24} color="#5eead4" key="sparkles" />,
    <Heart size={24} color="#5eead4" key="heart" />,
    <MapPin size={24} color="#5eead4" key="pin" />
  ];

  const serviceIcons = [
    <Stethoscope size={32} key="steth" />,
    <Sparkles size={32} key="spark" />,
    <ShieldCheck size={32} key="shield" />
  ];

  return (
    <div className={styles.wrapper}>
      {/* Dental SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": Config.schemaType,
            "name": name,
            "telephone": phone,
            "areaServed": location,
            "description": `Premier ${niche} and oral health care in ${location}. Modern technology and patient-first comfort.`
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
              <Activity size={28} />
              {name}
            </motion.div>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={`tel:${phone}`} 
              className={styles.actionBtn}
            >
              New Patient Offer
            </motion.a>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: 'flex', gap: '15px', color: '#0891b2', marginBottom: '20px' }}>
              <ShieldCheck size={24} /> <Award size={24} /> <Star size={24} />
            </div>
            <PrestigeBadge niche={niche} location={location} accentColor={ACCENT} />
            <h1>{t(Config.hero.title)}</h1>
            <p>
              {t(Config.hero.subtitle)}
            </p>
            <motion.a 
              whileHover={{ gap: '15px', paddingRight: '45px' }}
              href="#book" 
              className={styles.actionBtn} 
              style={{ padding: '18px 45px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              {Config.hero.cta} <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>

      
        <div style={{ position: 'relative', width: '100%', height: '400px', marginTop: '40px', borderRadius: '16px', overflow: 'hidden' }}>
          <Image src="https://images.unsplash.com/photo-1625515843003-3482329381c6?auto=format&fit=crop&w=1200&q=80" alt={`${niche} in ${location}`} fill style={{ objectFit: 'cover' }} priority />
        </div>
    
      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.emergencyBanner}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
            {Config.emergencyBar.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700 }}>
                {barIcons[i] || barIcons[0]} {t(item)}
              </div>
            ))}
          </div>
        </div>

      <SocialProofBar accentColor={ACCENT} />

      </section>

      <section className={styles.serviceSection}>
        <div className="container">
          <Reveal>
            <div className="text-center">
              <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#164e63' }}>Elite Dental Services</h2>
              <p style={{ color: '#64748b', marginTop: '10px' }}>Comprehensive care for every stage of your life in {location}</p>
            </div>
          </Reveal>
          
          <div className={styles.serviceGrid}>
            {Config.services.map((s, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div className={styles.serviceCard}>
                  <div className={styles.iconBox}>{serviceIcons[i] || serviceIcons[0]}</div>
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
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <Activity size={48} style={{ margin: '0 auto 30px', color: '#0891b2', opacity: 0.5 }} />
              <h2 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#164e63', marginBottom: '30px' }}>{t(Config.footer.title)}</h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '50px', opacity: 0.7 }}>
                {t(Config.footer.subtitle)}
              </p>
              <motion.a 
                animate={{ boxShadow: ["0 0 20px rgba(8, 145, 178, 0.2)", "0 0 40px rgba(8, 145, 178, 0.5)", "0 0 20px rgba(8, 145, 178, 0.2)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                href={`tel:${phone}`} 
                className={styles.actionBtn} 
                style={{ padding: '25px 80px', fontSize: '1.4rem' }}
              >
                CALL CLINIC: {phone}
              </motion.a>
            </div>
          </Reveal>
          <div style={{ marginTop: '100px', opacity: 0.3, fontSize: '0.8rem', letterSpacing: '4px' }}>
            © 2026 {name.toUpperCase()} | CERTIFIED {niche.toUpperCase()} | {location.toUpperCase()} REGION
          </div>
        </div>
      </footer>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function DentalPage() {
  return (
    <Suspense fallback={<div>Sterilizing the room...</div>}>
      <DentalContent />
    </Suspense>
  );
}