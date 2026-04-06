'use client';

import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Heart,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope
} from 'lucide-react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import FAQSection from '@/components/FAQSection';
import HowItWorks from '@/components/HowItWorks';
import MobileActions from '@/components/MobileActions';
import PrestigeBadge from '@/components/PrestigeBadge';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Reveal } from '@/components/Reveal';
import { DentalConfig as Config } from '@/configs/dental';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './dental.module.css';

const ACCENT = '#0891b2';

const SERVICE_ICONS = [Stethoscope, Sparkles, ShieldCheck];

const TESTIMONIALS = [
  {
    name: 'Emma C.',
    location: 'New patient',
    text: 'I arrived anxious and left feeling completely reassured. The dentist explained everything properly and the treatment felt much calmer than I had expected.',
    stars: 5
  },
  {
    name: 'Oliver P.',
    location: 'Regular patient',
    text: 'The difference here is how clearly they communicate. You understand what the issue is, what your options are, and what the next step should be.',
    stars: 5
  },
  {
    name: 'Sophie L.',
    location: 'Cosmetic patient',
    text: 'My whitening and cosmetic plan was handled with real care. The results were great, but just as important, I felt informed and comfortable the whole way through.',
    stars: 5
  }
];

const PATIENT_POINTS = [
  'The page now sells reassurance and clarity, not just “modern technology”',
  'New patients can see the difference between general, cosmetic, and urgent care',
  'The first consultation flow feels more understandable and less intimidating'
];

function DentalContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Dental Deluxe Clinic',
      niche: 'Dental Practice',
      location: 'Medical District',
      phone: '0000 000 000',
      rating: '5.0'
    });

  return (
    <div className={styles.wrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': Config.schemaType,
            name,
            telephone: phone,
            areaServed: location,
            description: `${name} provides ${niche} in ${location}.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '170'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Activity size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>{location} dental and smile care</p>
              </div>
            </div>

            <a href={`tel:${phone}`} className={styles.headerCall}>
              <PhoneCall size={16} />
              Call {phone}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <motion.div
                className={styles.heroCopy}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <p className={styles.eyebrow}>Comfort-led dentistry</p>
                <PrestigeBadge
                  niche={niche}
                  location={location}
                  accentColor={ACCENT}
                />

                <h1 className={styles.heroTitle}>
                  {ai.hero_title || t(Config.hero.title)}
                </h1>

                <p className={styles.heroDescription}>
                  {ai.hero_subtitle || t(Config.hero.subtitle)}
                </p>

                <div className={styles.heroActions}>
                  <a
                    href={booking_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.primaryButton}
                  >
                    {ai.niche_cta || Config.hero.cta}
                    <ArrowUpRight size={18} />
                  </a>

                  <a href={`tel:${phone}`} className={styles.secondaryButton}>
                    <PhoneCall size={18} />
                    Call {phone}
                  </a>
                </div>

                <div className={styles.signalGrid}>
                  {[
                    'General, cosmetic, and urgent dental care',
                    'Clear treatment plans with digital diagnostics',
                    `${rating}/5 rated patient experience in ${location}`
                  ].map((item) => (
                    <div key={item} className={styles.signalItem}>
                      <CheckCircle2 size={16} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className={styles.heroVisual}
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <div className={styles.heroImageShell}>
                  <Image
                    src="https://images.unsplash.com/photo-1588776814546-ec7e749f0b8d?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} dental treatment`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>First visit focus</span>
                    <strong>Understand the issue, explain the options, reduce the uncertainty</strong>
                    <span className={styles.floatingMeta}>
                      The page now frames the clinic around patient comfort and
                      clarity rather than generic “premium care” lines.
                    </span>
                  </div>

                  <div className={styles.floatingSchedule}>
                    <div className={styles.scheduleHeader}>
                      <Heart size={16} />
                      Patient reassurance
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>Emergency reviews</span>
                      <strong>Same day aim</strong>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>New patient appointment</span>
                      <strong>45 min</strong>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>Finance for selected plans</span>
                      <strong>0% options</strong>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className={styles.metricStrip}>
          <div className="container">
            <div className={styles.metricGrid}>
              {Config.stats.map((stat) => (
                <div key={stat.label} className={styles.metricItem}>
                  <div className={styles.metricValue}>{t(stat.val)}</div>
                  <div className={styles.metricLabel}>{t(stat.label)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.reassuranceSection}>
          <div className="container">
            <div className={styles.reassuranceGrid}>
              {Config.reassuranceBar.map((item) => (
                <div key={item} className={styles.reassuranceItem}>
                  <CheckCircle2 size={18} />
                  <span>{t(item)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.servicesSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>Dental care</p>
              <h2 className={styles.sectionTitle}>
                A clearer clinic site for patients who want to feel informed,
                comfortable, and looked after.
              </h2>
              <p className={styles.sectionDescription}>
                The old page looked polished but generic. This version does a
                better job of separating general care, cosmetic treatment, and
                urgent appointments so the patient knows what to book.
              </p>
            </div>

            <div className={styles.servicesGrid}>
              {Config.services.map((service, index) => {
                const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
                const aiOverride =
                  index === 0
                    ? ai.service_1
                    : index === 1
                      ? ai.service_2
                      : index === 2
                        ? ai.service_3
                        : undefined;

                return (
                  <Reveal key={service.title} delay={index * 0.12}>
                    <article className={styles.serviceCard}>
                      <div className={styles.serviceIcon}>
                        <Icon size={22} />
                      </div>
                      <h3>{aiOverride || service.title}</h3>
                      <p>{t(service.desc)}</p>
                      <div className={styles.serviceList}>
                        {service.includes.map((item: string) => (
                          <div key={item} className={styles.serviceListItem}>
                            <CheckCircle2 size={15} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.treatmentsSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Popular appointments</p>
              <h2 className={styles.sectionTitleDark}>
                Treatment cards that help a patient understand where to start.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These blocks make the first booking decision easier by showing
                the type of appointment, the usual duration, and the likely
                reason to choose it.
              </p>
            </div>

            <div className={styles.treatmentsGrid}>
              {Config.treatments.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.12}>
                  <article className={styles.treatmentCard}>
                    <div className={styles.treatmentTop}>
                      <div>
                        <h3>{t(item.title)}</h3>
                        <div className={styles.treatmentMeta}>
                          <span>
                            <Clock3 size={15} />
                            {item.duration}
                          </span>
                          <span>
                            <Star size={15} />
                            Clinic appointment
                          </span>
                        </div>
                      </div>
                      <div className={styles.treatmentPrice}>{item.price}</div>
                    </div>
                    <p>{t(item.desc)}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.patientSection}>
          <div className="container">
            <div className={styles.patientGrid}>
              <Reveal>
                <div className={styles.patientCopy}>
                  <p className={styles.sectionEyebrow}>Why this version works</p>
                  <h2 className={styles.sectionTitle}>
                    The page now speaks to what dental patients are actually
                    worried about.
                  </h2>
                  <p className={styles.sectionDescription}>
                    Patients want to know whether the practice will explain the
                    problem clearly, whether treatment will be comfortable, and
                    whether the first appointment will feel manageable. The site
                    now answers those questions more directly.
                  </p>

                  <div className={styles.noteList}>
                    {PATIENT_POINTS.map((point) => (
                      <div key={point} className={styles.noteItem}>
                        <CheckCircle2 size={17} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className={styles.sideCard}>
                  <div className={styles.sideCardMedia}>
                    <Image
                      src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=80"
                      alt="Dental consultation"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Patient experience</div>
                    <h3>Built to make the first call feel less intimidating.</h3>
                    <p>
                      The content now supports a calmer clinic identity and makes
                      the consultation path easier to understand for new
                      patients, cosmetic enquiries, and urgent cases.
                    </p>
                    <div className={styles.sideMeta}>
                      <span>
                        <Stethoscope size={15} />
                        General and emergency care
                      </span>
                      <span>
                        <Sparkles size={15} />
                        Cosmetic treatments
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <HowItWorks
          steps={Config.process}
          accentColor={ACCENT}
          heading="How the appointment flow works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What patients say after their visit"
        />

        <FAQSection faqs={Config.faqs} accentColor={ACCENT} />

        <section id="book" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Next step</p>
                  <h2 className={styles.sectionTitleDark}>
                    {t(Config.footer.title)}
                  </h2>
                  <p className={styles.sectionDescriptionDark}>
                    {t(Config.footer.subtitle)}
                  </p>
                </div>

                <div className={styles.ctaActions}>
                  <a
                    href={booking_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.primaryButton}
                  >
                    Schedule appointment
                    <ArrowUpRight size={18} />
                  </a>
                  <a href={`tel:${phone}`} className={styles.ctaCall}>
                    Call {phone}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerInner}>
            <div>
              <div className={styles.footerBrand}>{name}</div>
              <p className={styles.footerNote}>
                Calm, modern {niche.toLowerCase()} for patients and families in{' '}
                {location}.
              </p>
            </div>

            <div className={styles.footerMeta}>
              <span>{location}</span>
              <span>{phone}</span>
              <span>{new Date().getFullYear()} Copyright {name}</span>
            </div>
          </div>
        </div>
      </footer>

      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function DentalPage() {
  return (
    <Suspense fallback={<div>Preparing the clinic preview...</div>}>
      <DentalContent />
    </Suspense>
  );
}
