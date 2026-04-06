'use client';

import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  FileCheck,
  PhoneCall,
  Scale,
  ShieldCheck,
  Users
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
import { LawLibertyConfig as Config } from '@/configs/law-liberty';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './law-liberty.module.css';

const ACCENT = '#a67c37';

const PRACTICE_ICONS = [Briefcase, Users, ShieldCheck];

const TESTIMONIALS = [
  {
    name: 'Andrew H.',
    location: 'Business client',
    text: 'The firm handled a difficult commercial dispute with a level of clarity and control that made the whole process feel more manageable from the start.',
    stars: 5
  },
  {
    name: 'Susan T.',
    location: 'Private client',
    text: 'We needed calm, discreet advice on a sensitive estate matter. They were measured, thorough, and clear at every stage.',
    stars: 5
  },
  {
    name: 'James R.',
    location: 'Contract review client',
    text: 'The advice was practical rather than theatrical. We understood the risks, the options, and the commercial implications before making a decision.',
    stars: 5
  }
];

const CLIENT_POINTS = [
  'Clients can quickly see the difference between business advisory, private client work, and regulatory support.',
  'The tone is more measured and consultative, which fits a real law-firm decision process better than generic courtroom language.',
  'The consultation flow is built for higher-trust enquiries where confidentiality and clarity matter.'
];

const ADVISORY_POINTS = [
  {
    title: 'Initial case or matter review',
    text: 'The process begins with a proper understanding of the issue, the parties involved, the urgency, and the likely legal and commercial implications.'
  },
  {
    title: 'Advice on options and risk',
    text: 'Clients should understand the available routes, likely pressure points, and where cost, speed, or exposure may affect the strategy.'
  },
  {
    title: 'Measured execution',
    text: 'Whether the matter is transactional, advisory, or contentious, the value comes from acting with clear direction and avoiding unnecessary noise.'
  }
];

function LawContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Heritage Legal Counsel',
      niche: 'Solicitor',
      location: 'Legal District',
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
            description: `${name} provides ${niche.toLowerCase()} services in ${location} for businesses and private clients.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '76'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Scale size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Business and private client legal advice in {location}
                </p>
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
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <p className={styles.eyebrow}>Measured legal advice</p>
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
                    'Commercial, private client, and regulatory advisory work',
                    'Confidential consultations and partner-led strategy',
                    `${rating}/5 rated client experience`
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <div className={styles.heroImageShell}>
                  <Image
                    src="https://images.unsplash.com/photo-1528747008803-f9f2d6b0fca3?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} legal consultation`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Client need</span>
                    <strong>Clarity on risk, options, and next steps before the matter grows more difficult.</strong>
                    <span className={styles.floatingMeta}>
                      The first consultation should feel discreet, clear, and
                      worth taking before the matter becomes harder to manage.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <FileCheck size={16} />
                      Common priorities
                    </div>
                    <div className={styles.panelRow}>
                      <span>Urgent issue review</span>
                      <strong>Available</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Fixed-fee scope where suitable</span>
                      <strong>Discussed upfront</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Confidential consultation</span>
                      <strong>Standard</strong>
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

        <section className={styles.practiceSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>Practice areas</p>
              <h2 className={styles.sectionTitle}>
                Legal support organised around the kinds of matters clients
                actually bring to a firm.
              </h2>
              <p className={styles.sectionDescription}>
                Business work, private client matters, and regulatory issues are
                separated more clearly so clients can see where their issue
                fits and what kind of support to expect.
              </p>
            </div>

            <div className={styles.practiceGrid}>
              {Config.practiceAreas.map((area, index) => {
                const Icon = PRACTICE_ICONS[index % PRACTICE_ICONS.length];
                const aiOverride =
                  index === 0
                    ? ai.service_1
                    : index === 1
                      ? ai.service_2
                      : index === 2
                        ? ai.service_3
                        : undefined;

                return (
                  <Reveal key={area.title} delay={index * 0.12}>
                    <article className={styles.practiceCard}>
                      <div className={styles.practiceIcon}>
                        <Icon size={22} />
                      </div>
                      <h3>{aiOverride || t(area.title)}</h3>
                      <p>{t(area.desc)}</p>

                      <div className={styles.practiceList}>
                        {area.includes.map((item) => (
                          <div key={item} className={styles.practiceListItem}>
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

        <section className={styles.engagementSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Ways to engage</p>
              <h2 className={styles.sectionTitleDark}>
                Clear entry points for one-off advice, ongoing support, and
                higher-stakes contentious matters.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                Clients can understand how advice begins and what level of
                support fits the matter, whether they need an early review or
                more involved representation.
              </p>
            </div>

            <div className={styles.engagementGrid}>
              {Config.engagements.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.12}>
                  <article
                    className={`${styles.engagementCard} ${
                      item.featured ? styles.engagementFeatured : ''
                    }`}
                  >
                    {item.tag ? (
                      <div className={styles.engagementTag}>{t(item.tag)}</div>
                    ) : null}

                    <div className={styles.engagementHeader}>
                      <div>
                        <h3>{t(item.title)}</h3>
                        <p className={styles.engagementIdeal}>{t(item.idealFor)}</p>
                      </div>
                      <div className={styles.engagementPrice}>{t(item.price)}</div>
                    </div>

                    <div className={styles.engagementList}>
                      {item.features.map((feature) => (
                        <div key={feature} className={styles.engagementListItem}>
                          <CheckCircle2 size={16} />
                          <span>{t(feature)}</span>
                        </div>
                      ))}
                    </div>

                    <a href={`tel:${phone}`} className={styles.engagementButton}>
                      Discuss this matter type
                    </a>
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
                  <p className={styles.sectionEyebrow}>Advisory approach</p>
              <h2 className={styles.sectionTitle}>
                Good legal advice should help clients feel informed before they
                ever commit to a course of action.
              </h2>
              <p className={styles.sectionDescription}>
                    The tone here is more credible for real client decisions: it
                    supports confidentiality, measured advice, and practical
                    action rather than generic courtroom dramatics.
                  </p>

                  <div className={styles.advisoryPoints}>
                    {CLIENT_POINTS.map((point) => (
                      <div key={point} className={styles.advisoryPoint}>
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
                      src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80"
                      alt="Legal strategy meeting"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Consultation flow</div>
                    <h3>Built to make the first conversation feel clearer and more worthwhile.</h3>
                    <p>
                      The firm is positioned for clients who want competence,
                      discretion, and a stronger sense of what happens next.
                    </p>

                    <div className={styles.sideMeta}>
                      {ADVISORY_POINTS.map((item) => (
                        <div key={item.title} className={styles.sideMetaItem}>
                          <strong>{item.title}</strong>
                          <span>{item.text}</span>
                        </div>
                      ))}
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
          heading="How the legal consultation process works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What clients say after working with the firm"
        />

        <FAQSection faqs={Config.faqs} accentColor={ACCENT} />

        <section id="book" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Request advice</p>
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
                    Request consultation
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
                Legal advice for businesses and private clients across {location}.
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

export default function LawPage() {
  return (
    <Suspense fallback={<div>Preparing the consultation preview...</div>}>
      <LawContent />
    </Suspense>
  );
}
