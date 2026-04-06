'use client';

import {
  ArrowUpRight,
  Bug,
  CheckCircle2,
  Clock3,
  Home,
  PhoneCall,
  ShieldAlert,
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
import { PrimePestConfig as Config } from '@/configs/prime-pest';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './prime-pest.module.css';

const ACCENT = '#d97706';

const SERVICE_ICONS = [Home, ShieldAlert, Warehouse];

const TESTIMONIALS = [
  {
    name: 'Kevin M.',
    location: 'Homeowner',
    text: 'They came out quickly, explained where the activity was coming from, and treated it without making the whole thing feel dramatic. Very professional.',
    stars: 5
  },
  {
    name: 'Rachel T.',
    location: 'Cafe manager',
    text: 'We needed something discreet and documented properly for the business. The reporting and follow-up advice were as useful as the treatment itself.',
    stars: 5
  },
  {
    name: 'Brian S.',
    location: 'Property manager',
    text: 'We use them across multiple units because the process is consistent: quick survey, clear notes, sensible treatment, and no vague promises.',
    stars: 5
  }
];

const TRUST_POINTS = [
  'Site surveys explain where activity is happening and what treatment is actually needed.',
  'Landlords and business owners get visit notes they can keep on record.',
  'Prevention advice and follow-up options reduce the risk of repeat infestations.'
];

const CLIENT_POINTS = [
  {
    title: 'Homes and rentals',
    text: 'Useful for owner-occupied homes, rental properties, and letting agents who need clear attendance and practical reporting.'
  },
  {
    title: 'Hospitality and retail',
    text: 'Suitable for food sites, shops, and front-of-house spaces where discretion matters as much as speed.'
  },
  {
    title: 'Ongoing monitoring',
    text: 'Repeat visits, proofing advice, and treatment reviews help stop the same issue from returning.'
  }
];

function PestContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Prime Pest Defense',
      niche: 'Pest Control Service',
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
            description: `${name} provides ${niche.toLowerCase()} in ${location} for homes, rental properties, and commercial premises.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '126'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Bug size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Residential and commercial pest control in {location}
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
                  Fast inspections. Clear treatment plans.
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
                    'Rodents, insects, and recurring infestations handled',
                    'Discreet visits for homes, rentals, and business sites',
                    `${rating}/5 rated by local clients`
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
                    src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} technician`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Inspection first</span>
                    <strong>
                      Fast attendance matters, but clear diagnosis and prevention
                      advice are what stop repeat callouts.
                    </strong>
                    <span className={styles.floatingMeta}>
                      That gives homeowners, tenants, and managers a sensible
                      next step instead of vague reassurance.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <Clock3 size={16} />
                      Typical response
                    </div>
                    <div className={styles.panelRow}>
                      <span>Urgent callouts</span>
                      <strong>Same day when available</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Site survey</span>
                      <strong>Before treatment starts</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Follow-up advice</span>
                      <strong>Included</strong>
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
              <p className={styles.sectionEyebrow}>Core services</p>
              <h2 className={styles.sectionTitle}>
                Clear support for active infestations, compliance work, and
                ongoing prevention.
              </h2>
              <p className={styles.sectionDescription}>
                Choose a one-off treatment for an active issue, a repeat plan
                for ongoing risk, or a commercial service with the reporting
                and attendance your site needs.
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

        <section className={styles.plansSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Treatment options</p>
              <h2 className={styles.sectionTitleDark}>
                Pricing tiers that fit an urgent callout, repeat protection, or
                a commercial contract.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                Start with a one-off treatment, move to repeat protection if
                the risk is ongoing, or arrange a contract when your business
                needs scheduled attendance and records.
              </p>
            </div>

            <div className={styles.planGrid}>
              {Config.plans.map((plan, index) => (
                <Reveal key={plan.name} delay={index * 0.12}>
                  <article
                    className={`${styles.planCard} ${
                      plan.featured ? styles.planFeatured : ''
                    }`}
                  >
                    {plan.tag ? (
                      <div className={styles.planTag}>{t(plan.tag)}</div>
                    ) : null}

                    <div className={styles.planHeader}>
                      <div>
                        <h3>{t(plan.name)}</h3>
                        <p className={styles.planIdeal}>{t(plan.idealFor)}</p>
                      </div>
                      <div className={styles.planPrice}>{t(plan.price)}</div>
                    </div>

                    <div className={styles.planList}>
                      {plan.features.map((feature) => (
                        <div key={feature} className={styles.planListItem}>
                          <CheckCircle2 size={16} />
                          <span>{t(feature)}</span>
                        </div>
                      ))}
                    </div>

                    <a href={`tel:${phone}`} className={styles.planButton}>
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
                    Most clients want someone to turn up quickly, explain the
                    problem clearly, and leave them with a sensible prevention
                    plan.
                  </h2>
                  <p className={styles.sectionDescription}>
                    Fast response matters, but diagnosis, treatment notes, and
                    follow-up are what make a pest-control service feel reliable
                    for both homes and commercial sites.
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
                      src="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
                      alt="Property inspection planning"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Client fit</div>
                    <h3>
                      Built for homes, managed properties, and businesses that
                      need clear attendance and proper follow-up.
                    </h3>
                    <p>
                      Clients usually need practical treatment, discretion on
                      site, and records they can actually use after the visit.
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
          heading="How the pest-control process works"
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
                  <p className={styles.sectionEyebrowDark}>Book a site survey</p>
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
                    Request inspection
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
                Pest inspections, treatment plans, and prevention support
                across {location}.
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

export default function PestPage() {
  return (
    <Suspense fallback={<div>Preparing the pest-control preview...</div>}>
      <PestContent />
    </Suspense>
  );
}
