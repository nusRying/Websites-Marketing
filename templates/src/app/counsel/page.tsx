'use client';

import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Clock3,
  Landmark,
  LineChart,
  PhoneCall,
  ShieldCheck,
  Star,
  TrendingUp
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
import { CounselConfig } from '@/configs/counsel';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './counsel.module.css';

const ACCENT = '#2563eb';

const SERVICE_ICONS = [ShieldCheck, LineChart, TrendingUp];

const TESTIMONIALS = [
  {
    name: 'Michael H.',
    location: 'Managing director',
    text: 'They brought real structure to our reporting. What changed was not just the compliance side, but how quickly we could see where the business was actually making and losing money.',
    stars: 5
  },
  {
    name: 'Priya S.',
    location: 'Founder client',
    text: 'We needed more than year-end accounts and that is exactly what they gave us. The monthly reviews are clear, practical, and tied to the decisions we are making in the business.',
    stars: 5
  },
  {
    name: 'David W.',
    location: 'Owner-managed company',
    text: 'The numbers are now cleaner, the deadlines are under control, and we finally have reporting we can use in meetings rather than just file away.',
    stars: 5
  }
];

const ADVISORY_POINTS = [
  'Compliance, reporting, and advisory are presented as one joined-up service',
  'The template now fits an accountancy and finance-partner offer clearly',
  'Founders and directors can understand what level of support they need'
];

function CounselContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'North Ledger Advisory',
      niche: 'Chartered Accountants',
      location: 'Financial District',
      phone: '0000 000 000',
      rating: '4.9'
    });

  return (
    <div className={styles.wrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': CounselConfig.schemaType,
            name,
            telephone: phone,
            address: {
              '@type': 'PostalAddress',
              addressLocality: location
            },
            description: `${name} provides ${niche} in ${location}.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '130'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Landmark size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>{location} accountancy and advisory</p>
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
                <p className={styles.eyebrow}>Chartered accountancy and advisory</p>
                <PrestigeBadge
                  niche={niche}
                  location={location}
                  accentColor={ACCENT}
                />

                <h1 className={styles.heroTitle}>
                  {ai.hero_title || t(CounselConfig.hero.title)}
                </h1>

                <p className={styles.heroDescription}>
                  {ai.hero_subtitle || t(CounselConfig.hero.subtitle)}
                </p>

                <div className={styles.heroActions}>
                  <a
                    href={booking_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.primaryButton}
                  >
                    {ai.niche_cta || CounselConfig.hero.cta}
                    <ArrowUpRight size={18} />
                  </a>

                  <a href={`tel:${phone}`} className={styles.secondaryButton}>
                    <PhoneCall size={18} />
                    Call {phone}
                  </a>
                </div>

                <div className={styles.signalGrid}>
                  {[
                    'Accounts, tax, reporting, and advisory support',
                    'Built for founders, directors, and owner-managed firms',
                    `${rating}/5 rated professional service in ${location}`
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
                    src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} advisory meeting`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Typical first conversation</span>
                    <strong>Reporting quality, cash visibility, deadlines, and growth decisions</strong>
                    <span className={styles.floatingMeta}>
                      The page now frames the firm as a finance partner, not just
                      a compliance provider.
                    </span>
                  </div>

                  <div className={styles.floatingSchedule}>
                    <div className={styles.scheduleHeader}>
                      <Briefcase size={16} />
                      Common engagement rhythm
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>Compliance support</span>
                      <strong>Ongoing</strong>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>Management reporting</span>
                      <strong>Monthly</strong>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>Advisory projects</span>
                      <strong>By brief</strong>
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
              {CounselConfig.stats.map((stat) => (
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
              <p className={styles.sectionEyebrow}>Core support</p>
              <h2 className={styles.sectionTitle}>
                A clearer professional-services template for accountancy and
                business advisory.
              </h2>
              <p className={styles.sectionDescription}>
                This version removes the mixed legal and finance messaging and
                presents a cleaner offer: compliance handled properly, reporting
                made useful, and advice tied to growth decisions.
              </p>
            </div>

            <div className={styles.servicesGrid}>
              {CounselConfig.services.map((service, index) => {
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

        <section className={styles.engagementsSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Engagement models</p>
              <h2 className={styles.sectionTitleDark}>
                Packages that make sense to a business owner at first glance.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These cards help the client understand whether they need core
                compliance, regular reporting, or a more strategic advisory
                relationship.
              </p>
            </div>

            <div className={styles.engagementsGrid}>
              {CounselConfig.engagements.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.12}>
                  <article className={styles.engagementCard}>
                    <div className={styles.engagementTop}>
                      <div>
                        <h3>{t(item.title)}</h3>
                        <div className={styles.engagementMeta}>
                          <span>
                            <Clock3 size={15} />
                            {item.cadence}
                          </span>
                          <span>
                            <Star size={15} />
                            Business-focused support
                          </span>
                        </div>
                      </div>
                    </div>
                    <p>{t(item.desc)}</p>
                    <div className={styles.engagementList}>
                      {item.features.map((feature: string) => (
                        <div key={feature} className={styles.engagementListItem}>
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

        <section className={styles.advisorySection}>
          <div className="container">
            <div className={styles.advisoryGrid}>
              <Reveal>
                <div className={styles.advisoryCopy}>
                  <p className={styles.sectionEyebrow}>Why this version works</p>
                  <h2 className={styles.sectionTitle}>
                    The template now feels like a serious accountancy and finance
                    advisory firm.
                  </h2>
                  <p className={styles.sectionDescription}>
                    The old page mixed legal, investment, and finance language.
                    This one is tighter: better for accountants, clearer for
                    directors, and easier to personalise for a real client.
                  </p>

                  <div className={styles.noteList}>
                    {ADVISORY_POINTS.map((point) => (
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
                      src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
                      alt="Financial reporting meeting"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Client reassurance</div>
                    <h3>Built to make the first consultation feel commercially useful.</h3>
                    <p>
                      The page now helps a founder or director understand what
                      will actually happen on the first call and what kind of
                      support the firm can provide beyond filing deadlines.
                    </p>
                    <div className={styles.sideMeta}>
                      <span>
                        <LineChart size={15} />
                        Reporting and forecasting
                      </span>
                      <span>
                        <TrendingUp size={15} />
                        Growth advisory support
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <HowItWorks
          steps={CounselConfig.process}
          accentColor={ACCENT}
          heading="How the engagement works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What business clients say after the numbers improve"
        />

        <FAQSection faqs={CounselConfig.faqs} accentColor={ACCENT} />

        <section id="book" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Next step</p>
                  <h2 className={styles.sectionTitleDark}>
                    {t(CounselConfig.footer.title)}
                  </h2>
                  <p className={styles.sectionDescriptionDark}>
                    {t(CounselConfig.footer.subtitle)}
                  </p>
                </div>

                <div className={styles.ctaActions}>
                  <a
                    href={booking_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.primaryButton}
                  >
                    Schedule consultation
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
                Practical {niche.toLowerCase()} for owner-managed businesses and
                growing companies in {location}.
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

export default function CounselPage() {
  return (
    <Suspense fallback={<div>Preparing the advisory preview...</div>}>
      <CounselContent />
    </Suspense>
  );
}
