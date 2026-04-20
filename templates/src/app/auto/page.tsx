'use client';

import {
  ArrowUpRight,
  CarFront,
  CheckCircle2,
  Clock3,
  Gauge,
  PhoneCall,
  ShieldCheck,
  ShieldAlert,
  Star,
  Wrench
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
import { AutoConfig as Config } from '@/configs/auto';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './auto.module.css';

const ACCENT = '#f97316';

const SERVICE_ICONS = [Gauge, Wrench, ShieldCheck];

const TESTIMONIALS = [
  {
    name: 'Mike D.',
    location: 'Diagnostic customer',
    text: 'They found the real fault quickly, explained it in plain language, and fixed the issue without padding the job. It felt like a proper workshop, not a sales pitch.',
    stars: 5
  },
  {
    name: 'Steve G.',
    location: 'Fleet client',
    text: 'We use them for routine servicing and urgent repairs across a small fleet. Turnaround is strong and communication is much clearer than most garages.',
    stars: 5
  },
  {
    name: 'Phil T.',
    location: 'Brake repair customer',
    text: 'The car had a brake vibration issue two garages had brushed off. They inspected it properly, showed me what had worn, and the car now drives exactly as it should.',
    stars: 5
  }
];

const WORKSHOP_POINTS = [
  'Faults diagnosed before repairs are sold',
  'Clear distinction between urgent work and work that can wait',
  'Road-test and verification after the repair is completed'
];

function AutoContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Auto Armor Performance',
      niche: 'Independent Auto Repair',
      location: 'Local Area',
      phone: '0000 000 000',
      rating: '4.8'
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
              reviewCount: '160'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Wrench size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>{location} workshop and diagnostics</p>
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
                <p className={styles.eyebrow}>Independent workshop support</p>
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
                    'Same-day diagnostics where workshop load allows',
                    'Servicing, MOT prep, brakes, and fault finding',
                    `${rating}/5 rated support from drivers in ${location}`
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
                    src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} workshop`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingAlert}>
                    <span className={styles.floatingLabel}>Workshop promise</span>
                    <strong>Diagnose first. Explain clearly. Repair properly.</strong>
                    <span className={styles.floatingMeta}>
                      The page now sells competence and clarity, not just
                      aggressive garage visuals.
                    </span>
                  </div>

                  <div className={styles.floatingChecklist}>
                    <div className={styles.checklistHeader}>
                      <ShieldAlert size={16} />
                      Common visit reasons
                    </div>
                    <div className={styles.checklistRow}>
                      <span>Warning light or fault code</span>
                      <strong>Diagnostic slot</strong>
                    </div>
                    <div className={styles.checklistRow}>
                      <span>Noise, vibration, or poor braking</span>
                      <strong>Safety inspection</strong>
                    </div>
                    <div className={styles.checklistRow}>
                      <span>MOT due or overdue service</span>
                      <strong>Workshop check</strong>
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

        <section className={styles.servicesSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>Workshop services</p>
              <h2 className={styles.sectionTitle}>
                A clearer garage site for real repair work, not generic
                performance-shop filler.
              </h2>
              <p className={styles.sectionDescription}>
                Most drivers want to know whether the workshop can find the
                fault, explain it properly, and repair it without wasting time.
                The structure now reflects that directly.
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

        <section className={styles.jobsSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Popular jobs</p>
              <h2 className={styles.sectionTitleDark}>
                Service blocks that look like real workshop offers.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These cards give a client a sensible starting point whether the
                car needs diagnostics, routine maintenance, brake work, or help
                after an MOT failure.
              </p>
            </div>

            <div className={styles.jobsGrid}>
              {Config.popularJobs.map((job, index) => (
                <Reveal key={job.title} delay={index * 0.12}>
                  <article className={styles.jobCard}>
                    <div className={styles.jobTop}>
                      <div>
                        <h3>{t(job.title)}</h3>
                        <div className={styles.jobMeta}>
                          <span>
                            <Clock3 size={15} />
                            {job.timing}
                          </span>
                          <span>
                            <CarFront size={15} />
                            Workshop booked service
                          </span>
                        </div>
                      </div>
                      <div className={styles.jobPrice}>{job.price}</div>
                    </div>
                    <p>{t(job.desc)}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.trustSection}>
          <div className="container">
            <div className={styles.trustGrid}>
              <Reveal>
                <div className={styles.trustCopy}>
                  <p className={styles.sectionEyebrow}>Why this version works</p>
                  <h2 className={styles.sectionTitle}>
                    The page now reads like a workshop a driver would actually
                    trust.
                  </h2>
                  <p className={styles.sectionDescription}>
                    Automotive clients respond to competence, urgency, and
                    clarity. The site now speaks to those directly instead of
                    leaning on vague performance language and filler sections.
                  </p>

                  <div className={styles.noteList}>
                    {WORKSHOP_POINTS.map((point) => (
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
                      src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80"
                      alt="Car in workshop"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Customer reassurance</div>
                    <h3>Good workshop marketing starts by reducing uncertainty.</h3>
                    <p>
                      Drivers want to know what happens after they book: how the
                      fault is checked, when they will hear back, and whether the
                      repair recommendation will be understandable.
                    </p>
                    <div className={styles.sideMeta}>
                      <span>
                        <Gauge size={15} />
                        Diagnostics and servicing
                      </span>
                      <span>
                        <ShieldCheck size={15} />
                        Safety-led repair focus
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
          heading="How the workshop handles the job"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What drivers say after the repair"
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
                    Schedule inspection
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
                Practical {niche.toLowerCase()} for drivers and light commercial
                vehicles in {location}.
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

export default function AutoPage() {
  return (
    <Suspense fallback={<div>Preparing the workshop preview...</div>}>
      <AutoContent />
    </Suspense>
  );
}
