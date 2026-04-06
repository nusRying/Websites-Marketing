'use client';

import {
  ArrowUpRight,
  CheckCircle2,
  CloudRain,
  Hammer,
  Home,
  PhoneCall,
  ShieldCheck,
  Warehouse
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
import { RoofingConfig as Config } from '@/configs/roofing';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './roofing-royale.module.css';

const ACCENT = '#dc2626';

const SERVICE_ICONS = [Hammer, Home, Warehouse];

const TESTIMONIALS = [
  {
    name: 'Brian T.',
    location: 'Homeowner',
    text: 'They surveyed the leak properly, showed us the damaged area with photos, and gave a quote that made sense. The repair was tidy and fast.',
    stars: 5
  },
  {
    name: 'Carol F.',
    location: 'Storm damage claim',
    text: 'We needed emergency help after bad weather. They documented everything clearly, made the roof safe, and helped us handle the next steps.',
    stars: 5
  },
  {
    name: 'Dave M.',
    location: 'Extension project',
    text: 'The new roof tied into the existing build properly and the whole job felt organised from survey to final sign-off.',
    stars: 5
  }
];

const TRUST_POINTS = [
  'Roof surveys explain the issue clearly before any repair or replacement is quoted.',
  'Storm damage, recurring leaks, and ageing roofs are handled with a written scope of work.',
  'Homeowners and property managers get sensible timelines, site photos, and aftercare advice.'
];

const CLIENT_POINTS = [
  {
    title: 'Repairs and urgent callouts',
    text: 'Suitable for active leaks, slipped tiles, flashing issues, storm damage, and roof areas that need to be made safe quickly.'
  },
  {
    title: 'Replacement projects',
    text: 'Useful when the roof has reached the point where repeat patch repairs are no longer the sensible long-term option.'
  },
  {
    title: 'Managed properties',
    text: 'Helpful for landlords, agents, and commercial owners who need site attendance, reporting, and a clear scope before works begin.'
  }
];

function RoofingContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Royale Roofing Contractors',
      niche: 'Roofing Contractor',
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
            description: `${name} provides ${niche.toLowerCase()} in ${location} including roof surveys, repairs, replacements, and storm damage support.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '132'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Roof repairs, replacements, and surveys in {location}
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
                <p className={styles.eyebrow}>
                  Survey first. Quote clearly. Build it to last.
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
                    'Repairs, replacements, flat roofs, and storm damage support',
                    'Photo-led surveys and written quotes before work begins',
                    `${rating}/5 rated by local property owners`
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
                    src="https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} roofing work`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>What clients need</span>
                    <strong>
                      Most roofing calls start with uncertainty about the cause,
                      the urgency, and whether the roof needs repair or full replacement.
                    </strong>
                    <span className={styles.floatingMeta}>
                      A proper survey and clear scope remove guesswork before the
                      crew starts work on site.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <CloudRain size={16} />
                      Typical survey flow
                    </div>
                    <div className={styles.panelRow}>
                      <span>Inspection and photos</span>
                      <strong>First step</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Written scope</span>
                      <strong>Before works begin</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Repair or replacement</span>
                      <strong>Scheduled clearly</strong>
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

        <section className={styles.servicesSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>Roofing services</p>
              <h2 className={styles.sectionTitle}>
                Clear support for urgent repairs, full reroof projects, and
                ongoing roof protection.
              </h2>
              <p className={styles.sectionDescription}>
                Homeowners, landlords, and commercial clients can see quickly
                whether they need a repair visit, a larger replacement project,
                or routine maintenance that stops issues getting worse.
              </p>
            </div>

            <div className={styles.serviceGrid}>
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
                      <h3>{aiOverride || t(service.title)}</h3>
                      <p>{t(service.desc)}</p>

                      <div className={styles.serviceList}>
                        {service.includes.map((item) => (
                          <div key={item} className={styles.serviceListItem}>
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

        <section className={styles.packagesSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Project options</p>
              <h2 className={styles.sectionTitleDark}>
                Clear choices for a repair, replacement, or planned roof-care programme.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These options make it easier for a client to understand what
                sort of roofing support fits the property and the level of risk.
              </p>
            </div>

            <div className={styles.packageGrid}>
              {Config.packages.map((pkg, index) => (
                <Reveal key={pkg.name} delay={index * 0.12}>
                  <article
                    className={`${styles.packageCard} ${
                      pkg.featured ? styles.packageFeatured : ''
                    }`}
                  >
                    {pkg.tag ? (
                      <div className={styles.packageTag}>{t(pkg.tag)}</div>
                    ) : null}

                    <div className={styles.packageHeader}>
                      <div>
                        <h3>{t(pkg.name)}</h3>
                        <p className={styles.packageIdeal}>{t(pkg.idealFor)}</p>
                      </div>
                      <div className={styles.packagePrice}>{t(pkg.price)}</div>
                    </div>

                    <div className={styles.packageList}>
                      {pkg.features.map((feature) => (
                        <div key={feature} className={styles.packageListItem}>
                          <CheckCircle2 size={16} />
                          <span>{t(feature)}</span>
                        </div>
                      ))}
                    </div>

                    <a href={`tel:${phone}`} className={styles.packageButton}>
                      Discuss this option
                    </a>
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
                  <p className={styles.sectionEyebrow}>Why clients trust it</p>
                  <h2 className={styles.sectionTitle}>
                    Roofing clients usually want proof of the issue, a clear
                    recommendation, and confidence that the crew will leave the
                    property weather-safe.
                  </h2>
                  <p className={styles.sectionDescription}>
                    Survey notes, job photos, realistic timelines, and proper
                    guarantees are what make a roofing company feel dependable.
                  </p>

                  <div className={styles.trustPoints}>
                    {TRUST_POINTS.map((point) => (
                      <div key={point} className={styles.trustPoint}>
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
                      src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
                      alt="Roof inspection and planning"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Client fit</div>
                    <h3>
                      Built for homeowners, agents, and commercial properties
                      that need roofing work handled clearly and safely.
                    </h3>
                    <p>
                      Clients usually need a realistic survey, a written quote,
                      and a crew that can explain what happens next without
                      overcomplicating the job.
                    </p>

                    <div className={styles.sideMeta}>
                      {CLIENT_POINTS.map((item) => (
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
          heading="How the roofing process works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What local clients say"
        />

        <FAQSection faqs={Config.faqs} accentColor={ACCENT} />

        <section id="quote" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Book a survey</p>
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
                    Request survey
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
                Roof surveys, repairs, replacements, and weatherproofing support across {location}.
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

export default function RoofingPage() {
  return (
    <Suspense fallback={<div>Preparing the roofing preview...</div>}>
      <RoofingContent />
    </Suspense>
  );
}
