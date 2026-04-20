'use client';

import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Cloud,
  Cpu,
  Lock,
  PhoneCall,
  ShieldCheck,
  Terminal,
  Zap
} from 'lucide-react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import BookingWidget from '@/components/BookingWidget';
import FAQSection from '@/components/FAQSection';
import MobileActions from '@/components/MobileActions';
import PrestigeBadge from '@/components/PrestigeBadge';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Reveal } from '@/components/Reveal';
import { TitanConfig as Config } from '@/configs/titan';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './titan.module.css';

const ACCENT = '#14b8a6';

const SERVICE_ICONS = [Terminal, Cloud, ShieldCheck];

const ADVISORY_POINTS = [
  'Business owners usually do not want more tools. They want support requests handled quickly, changes rolled out cleanly, and security responsibilities that are properly owned.',
  'The best outcomes come from treating support, cloud structure, identity, backup, and cyber hygiene as one operating system instead of a list of separate fixes.',
  'Titan is positioned for teams that need an IT partner who can stabilise the day to day while still moving infrastructure and security forward.'
];

const CLIENT_TYPES = [
  {
    title: 'Growing operations',
    text: 'Useful for firms adding headcount, opening new sites, or inheriting systems that no longer fit the pace of the business.'
  },
  {
    title: 'Multi-team environments',
    text: 'Suitable where devices, permissions, cloud tools, and support expectations need clearer control across departments.'
  },
  {
    title: 'Risk-sensitive businesses',
    text: 'Helpful for organisations that need stronger cyber basics, cleaner backups, clearer reporting, and less operational exposure.'
  }
];

const TESTIMONIALS = [
  {
    name: 'Aamir T.',
    location: 'Operations director',
    text: 'We stopped chasing multiple suppliers and finally had one team owning support, Microsoft 365 issues, device rollouts, and security follow-up properly.',
    stars: 5
  },
  {
    name: 'Sophie L.',
    location: 'Managing partner',
    text: 'The difference was clarity. They explained what actually needed fixing first, what could wait, and how the changes would affect the wider business.',
    stars: 5
  },
  {
    name: 'Daniel M.',
    location: 'Finance lead',
    text: 'Support improved immediately, but the bigger win was the structure behind it. Backups, permissions, documentation, and reporting all became easier to trust.',
    stars: 5
  }
];

function TitanContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Titan Technology Partners',
      niche: 'Managed IT Provider',
      location: 'Local Area',
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
            '@type': Config.schemaType,
            name,
            telephone: phone,
            areaServed: location,
            description: `${name} provides managed IT, cloud support, and cyber security services for businesses in ${location}.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '124'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Terminal size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Managed IT, cloud, and cyber support in {location}
                </p>
              </div>
            </div>

            <a href={`tel:${phone}`} className={styles.headerAction}>
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
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <p className={styles.eyebrow}>
                  Managed support for teams that cannot afford downtime
                </p>
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

                <div className={styles.heroSignals}>
                  {[
                    'Managed support, cloud projects, and cyber hardening',
                    'Suitable for growing firms, multi-site teams, and operations-heavy businesses',
                    `${rating}/5 average client rating`
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
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <div className={styles.heroImageShell}>
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} managed IT support`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Typical client brief</span>
                    <strong>
                      {ai.pain_point ||
                        'We need faster support, clearer security, and systems that stop slowing the team down.'}
                    </strong>
                    <span className={styles.floatingMeta}>
                      {ai.solution ||
                        'Titan combines day-to-day support, cloud structure, and practical governance so operations keep moving.'}
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <ShieldCheck size={16} />
                      Operating priorities
                    </div>
                    <div className={styles.panelRow}>
                      <span>Support response</span>
                      <strong>SLA-backed</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Cloud oversight</span>
                      <strong>Planned and managed</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Security review</span>
                      <strong>Ongoing</strong>
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
              {Config.promisesBar.map((item) => (
                <div key={item} className={styles.reassuranceItem}>
                  <CheckCircle2 size={18} />
                  <span>{t(item)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <Reveal>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionEyebrow}>Core delivery areas</p>
                <h2 className={styles.sectionTitle}>
                  Support, infrastructure, and security built around how the
                  business actually operates
                </h2>
                <p className={styles.sectionDescription}>
                  Titan is positioned as a working IT partner, not a generic helpdesk.
                  The model suits organisations in {location} that need responsive
                  support while still improving cloud structure, cyber posture, and
                  reporting discipline.
                </p>
              </div>
            </Reveal>

            <div className={styles.servicesGrid}>
              {Config.services.map((service, index) => {
                const Icon = SERVICE_ICONS[index] || Cpu;

                return (
                  <Reveal key={service.title} delay={0.1 * index}>
                    <article className={styles.serviceCard}>
                      <div className={styles.serviceIcon}>
                        <Icon size={22} />
                      </div>
                      <h3>{t(service.title)}</h3>
                      <p>{t(service.desc)}</p>
                      <div className={styles.serviceIncludes}>
                        {service.includes.map((item) => (
                          <div key={item} className={styles.serviceInclude}>
                            <CheckCircle2 size={15} />
                            <span>{t(item)}</span>
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
            <Reveal>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionEyebrow}>Engagement models</p>
                <h2 className={styles.sectionTitle}>
                  Retainers and advisory structures that match different levels of
                  operational complexity
                </h2>
                <p className={styles.sectionDescription}>
                  Some clients need a dependable support desk. Others need a partner
                  who can clean up inherited IT, handle change projects, and add
                  stronger governance around identity, backup, and cyber risk.
                </p>
              </div>
            </Reveal>

            <div className={styles.plansGrid}>
              {Config.plans.map((plan, index) => (
                <Reveal key={plan.name} delay={0.08 * index}>
                  <article
                    className={`${styles.planCard} ${
                      plan.featured ? styles.featuredPlan : ''
                    }`}
                  >
                    <div className={styles.planTop}>
                      <div>
                        <h3>{t(plan.name)}</h3>
                        <p className={styles.planPrice}>{t(plan.price)}</p>
                      </div>
                      {plan.tag ? (
                        <span className={styles.planTag}>{t(plan.tag)}</span>
                      ) : null}
                    </div>
                    <p className={styles.planIdeal}>{t(plan.idealFor)}</p>
                    <div className={styles.planFeatures}>
                      {plan.features.map((feature) => (
                        <div key={feature} className={styles.serviceInclude}>
                          <CheckCircle2 size={15} />
                          <span>{t(feature)}</span>
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
                  <p className={styles.sectionEyebrow}>Why this offer works</p>
                  <h2 className={styles.sectionTitle}>
                    The real client value is stability first, then sharper IT
                    decision-making
                  </h2>
                  <div className={styles.advisoryList}>
                    {ADVISORY_POINTS.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>

                  <div className={styles.advisoryCard}>
                    <div className={styles.panelHeader}>
                      <BarChart3 size={16} />
                      What decision-makers usually want
                    </div>
                    <div className={styles.panelRow}>
                      <span>Issue ownership</span>
                      <strong>Clear and fast</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Change planning</span>
                      <strong>Prioritised by business risk</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Reporting</span>
                      <strong>Simple enough to act on</strong>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className={styles.clientGrid}>
                {CLIENT_TYPES.map((item, index) => (
                  <Reveal key={item.title} delay={0.1 * index}>
                    <article className={styles.clientCard}>
                      <div className={styles.serviceIcon}>
                        {index === 0 ? (
                          <Zap size={22} />
                        ) : index === 1 ? (
                          <Cloud size={22} />
                        ) : (
                          <Lock size={22} />
                        )}
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <Reveal>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionEyebrow}>Delivery process</p>
                <h2 className={styles.sectionTitle}>
                  A clearer path from audit to day-to-day management
                </h2>
                <p className={styles.sectionDescription}>
                  The strongest technology partnerships start with visibility,
                  move into prioritised action, and then settle into structured
                  support with reporting the client can actually use.
                </p>
              </div>
            </Reveal>

            <div className={styles.processGrid}>
              {Config.process.map((step, index) => (
                <Reveal key={step.number} delay={0.08 * index}>
                  <article className={styles.processCard}>
                    <span className={styles.processNumber}>{step.number}</span>
                    <h3>{t(step.title)}</h3>
                    <p>{t(step.desc)}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />
        <FAQSection faqs={Config.faqs} accentColor={ACCENT} />

        <section className={styles.closingSection}>
          <div className="container">
            <Reveal>
              <div className={styles.closingCard}>
                <p className={styles.sectionEyebrow}>Next step</p>
                <h2 className={styles.sectionTitle}>
                  {ai.solution || t(Config.footer.title)}
                </h2>
                <p className={styles.sectionDescription}>
                  {ai.pain_point || t(Config.footer.subtitle)}
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

                <div className={styles.heroSignals}>
                  {[
                    'Managed support retainers and project delivery',
                    'Cloud, backup, identity, and cyber priorities reviewed together',
                    `${name} supports businesses across ${location}`
                  ].map((item) => (
                    <div key={item} className={styles.signalItem}>
                      <CheckCircle2 size={16} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function TitanPage() {
  return (
    <Suspense fallback={<div>Loading systems...</div>}>
      <TitanContent />
    </Suspense>
  );
}
