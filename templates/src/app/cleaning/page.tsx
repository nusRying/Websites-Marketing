'use client';

import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Home,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star
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
import { CleaningConfig } from '@/configs/cleaning';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './sparkle-shine.module.css';

const ACCENT = '#0ea5e9';

const SERVICE_ICONS = [Home, BriefcaseBusiness, ShieldCheck];

const TESTIMONIALS = [
  {
    name: 'Sarah J.',
    location: 'Homeowner',
    text: 'The house felt reset after the first visit. They worked through the rooms properly, communicated clearly, and the finish was much better than any service we had used before.',
    stars: 5
  },
  {
    name: 'Mark T.',
    location: 'Office client',
    text: 'We needed a cleaning company that would be reliable rather than just cheap. They have been consistent, professional, and noticeably better with detail in the shared areas.',
    stars: 5
  },
  {
    name: 'Lisa R.',
    location: 'Recurring customer',
    text: 'We started with a deep clean and moved onto a regular plan. The difference is that the standard has stayed high, not just on the first appointment.',
    stars: 5
  }
];

const CLEANING_POINTS = [
  'Clear scope and expectations before the visit',
  'Recurring and one-off options that sound practical, not vague',
  'A cleaner visual system that feels calm and professional'
];

function CleaningContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Elite Sparkle Cleaners',
      niche: 'Cleaning Service',
      location: 'Central District',
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
            '@type': CleaningConfig.schemaType,
            name,
            telephone: phone,
            areaServed: location,
            description: `${name} provides ${niche} in ${location}.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '180'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Sparkles size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>{location} home and office cleaning</p>
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
                <p className={styles.eyebrow}>Home and workspace cleaning</p>
                <PrestigeBadge
                  niche={niche}
                  location={location}
                  accentColor={ACCENT}
                />

                <h1 className={styles.heroTitle}>
                  {ai.hero_title || t(CleaningConfig.hero.title)}
                </h1>

                <p className={styles.heroDescription}>
                  {ai.hero_subtitle || t(CleaningConfig.hero.subtitle)}
                </p>

                <div className={styles.heroActions}>
                  <a
                    href={booking_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.primaryButton}
                  >
                    {ai.niche_cta || CleaningConfig.hero.cta}
                    <ArrowUpRight size={18} />
                  </a>

                  <a href={`tel:${phone}`} className={styles.secondaryButton}>
                    <PhoneCall size={18} />
                    Call {phone}
                  </a>
                </div>

                <div className={styles.signalGrid}>
                  {[
                    'Residential, office, and deep-clean support',
                    'Insured team with supplies and equipment included',
                    `${rating}/5 rated service across ${location}`
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
                    src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} cleaning team`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Most requested</span>
                    <strong>One-off deep clean followed by recurring upkeep</strong>
                    <span className={styles.floatingMeta}>
                      A practical route for clients who want the property reset
                      first, then maintained properly.
                    </span>
                  </div>

                  <div className={styles.floatingChecklist}>
                    <div className={styles.checklistHeader}>
                      <ShieldCheck size={16} />
                      What the quote covers
                    </div>
                    <div className={styles.checklistRow}>
                      <span>Property type and room count</span>
                      <strong>Scope</strong>
                    </div>
                    <div className={styles.checklistRow}>
                      <span>Standard, deep, or ongoing clean</span>
                      <strong>Visit type</strong>
                    </div>
                    <div className={styles.checklistRow}>
                      <span>Access, timing, and frequency</span>
                      <strong>Scheduling</strong>
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
              {CleaningConfig.stats.map((stat) => (
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
              <p className={styles.sectionEyebrow}>Cleaning services</p>
              <h2 className={styles.sectionTitle}>
                A more credible cleaning site for clients who want reliability,
                not just generic “sparkle” copy.
              </h2>
              <p className={styles.sectionDescription}>
                The new structure makes it easier to understand what type of
                clean is being offered, how the service is scoped, and whether it
                suits a home, a business, or a one-off reset.
              </p>
            </div>

            <div className={styles.servicesGrid}>
              {CleaningConfig.services.map((service, index) => {
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

        <section className={styles.plansSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Popular plans</p>
              <h2 className={styles.sectionTitleDark}>
                Options that sound practical and easy to buy.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These plan cards help a client see whether they need recurring
                upkeep, business maintenance, or a deeper one-off clean before
                moving onto something regular.
              </p>
            </div>

            <div className={styles.plansGrid}>
              {CleaningConfig.plans.map((plan, index) => (
                <Reveal key={plan.title} delay={index * 0.12}>
                  <article className={styles.planCard}>
                    <div className={styles.planTop}>
                      <div>
                        <h3>{t(plan.title)}</h3>
                        <div className={styles.planMeta}>
                          <span>
                            <Clock3 size={15} />
                            Flexible scheduling
                          </span>
                          <span>
                            <Star size={15} />
                            Quote-based service
                          </span>
                        </div>
                      </div>
                    </div>
                    <p>{t(plan.desc)}</p>
                    <div className={styles.planList}>
                      {plan.features.map((feature: string) => (
                        <div key={feature} className={styles.planListItem}>
                          <CheckCircle2 size={15} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
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
                    The page now sells trust and scope, not just “freshness.”
                  </h2>
                  <p className={styles.sectionDescription}>
                    Cleaning clients want to know what gets done, how often, who
                    is arriving, and whether the standard will hold after the
                    first visit. The site now answers those questions much more
                    clearly.
                  </p>

                  <div className={styles.noteList}>
                    {CLEANING_POINTS.map((point) => (
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
                      src="https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80"
                      alt="Clean modern interior"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Client reassurance</div>
                    <h3>Built to make the first quote request feel simpler.</h3>
                    <p>
                      The content now helps a home or business client understand
                      the likely service path before they call, which makes the
                      enquiry feel lower-friction and more credible.
                    </p>
                    <div className={styles.sideMeta}>
                      <span>
                        <Home size={15} />
                        Residential support
                      </span>
                      <span>
                        <BriefcaseBusiness size={15} />
                        Commercial cleaning
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <HowItWorks
          steps={CleaningConfig.process}
          accentColor={ACCENT}
          heading="How the service runs"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What clients say after the clean"
        />

        <FAQSection faqs={CleaningConfig.faqs} accentColor={ACCENT} />

        <section id="book" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Next step</p>
                  <h2 className={styles.sectionTitleDark}>
                    {t(CleaningConfig.footer.title)}
                  </h2>
                  <p className={styles.sectionDescriptionDark}>
                    {t(CleaningConfig.footer.subtitle)}
                  </p>
                </div>

                <div className={styles.ctaActions}>
                  <a
                    href={booking_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.primaryButton}
                  >
                    Request quote
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
                Practical {niche.toLowerCase()} for homes and workplaces in{' '}
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

export default function CleaningPage() {
  return (
    <Suspense fallback={<div>Preparing the cleaning preview...</div>}>
      <CleaningContent />
    </Suspense>
  );
}
