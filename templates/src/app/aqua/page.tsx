'use client';

import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Droplets,
  FlaskConical,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Waves,
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
import { AquaConfig as config } from '@/configs/aqua';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './aqua.module.css';

const ACCENT = '#0ea5b7';

const SERVICE_ICONS = [Droplets, Wrench, FlaskConical];
const PLAN_ICONS = [Waves, SunMedium, ShieldCheck];

const TESTIMONIALS = [
  {
    name: 'David H.',
    location: 'Pool owner',
    text: 'They took over a pool that had become a constant headache. The water has been consistently clear ever since, and the maintenance reporting is genuinely useful.',
    stars: 5
  },
  {
    name: 'Amanda P.',
    location: 'Weekly care client',
    text: 'Reliable, tidy, and technically sharp. They do not just clean the pool, they keep the whole system stable so we are not dealing with recurring issues.',
    stars: 5
  },
  {
    name: 'Marcus L.',
    location: 'Emergency callout client',
    text: 'We had a chemical balance problem and a heater issue before a family event. They responded quickly, fixed the cause, and explained exactly what went wrong.',
    stars: 5
  }
];

const WATER_HEALTH_POINTS = [
  'Water chemistry tested and corrected with each visit',
  'Pump, filter, and circulation issues flagged before failure',
  'Simple visit notes so the homeowner always knows what changed'
];

function AquaContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Aqua Artisans Pool & Spa',
      niche: 'Pool and Spa Service',
      location: 'Coastal Hub',
      phone: '0000 000 000',
      rating: '4.9'
    });

  const plans = config.plans;

  return (
    <div className={styles.wrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': config.schemaType,
            name,
            telephone: phone,
            areaServed: location,
            description: `${name} provides ${niche} in ${location}.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '140'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Droplets size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>{location} pool and spa care</p>
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
                <p className={styles.eyebrow}>Pool and spa maintenance</p>
                <PrestigeBadge
                  niche={niche}
                  location={location}
                  accentColor={ACCENT}
                />

                <h1 className={styles.heroTitle}>
                  {ai.hero_title || t(config.hero.title)}
                </h1>

                <p className={styles.heroDescription}>
                  {ai.hero_subtitle || t(config.hero.subtitle)}
                </p>

                <div className={styles.heroActions}>
                  <a
                    href={booking_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.primaryButton}
                  >
                    {ai.niche_cta || config.hero.cta}
                    <ArrowUpRight size={18} />
                  </a>

                  <a href={`tel:${phone}`} className={styles.secondaryButton}>
                    <PhoneCall size={18} />
                    Call {phone}
                  </a>
                </div>

                <div className={styles.signalGrid}>
                  {[
                    'Scheduled chemistry, cleaning, and equipment checks',
                    'Fast rescue support for cloudy or green water',
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
                    src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} pool service`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingStatus}>
                    <span className={styles.floatingLabel}>Water health</span>
                    <strong>Balanced and inspection-ready</strong>
                    <span className={styles.floatingMeta}>
                      Weekly visits, repairs, and seasonal support
                    </span>
                  </div>

                  <div className={styles.floatingChecklist}>
                    <div className={styles.checklistHeader}>
                      <Sparkles size={16} />
                      First visit includes
                    </div>
                    {WATER_HEALTH_POINTS.map((item) => (
                      <div key={item} className={styles.checklistItem}>
                        <CheckCircle2 size={15} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className={styles.metricStrip}>
          <div className="container">
            <div className={styles.metricGrid}>
              {config.stats.map((stat) => (
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
              <p className={styles.sectionEyebrow}>Core services</p>
              <h2 className={styles.sectionTitle}>
                A cleaner, sharper service structure for a pool business that
                needs to look technically credible.
              </h2>
              <p className={styles.sectionDescription}>
                The old version looked themed. This one is built to feel
                trustworthy, service-led, and premium enough to show a real
                homeowner or management client.
              </p>
            </div>

            <div className={styles.servicesGrid}>
              {config.services.map((service, index) => {
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

        <section className={styles.planSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Care options</p>
              <h2 className={styles.sectionTitleDark}>
                Plans that read like a real service offer, not filler content.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                Each option gives the client a clear next step whether they need
                weekly maintenance, seasonal support, or a one-off repair visit.
              </p>
            </div>

            <div className={styles.planGrid}>
              {plans.map((plan, index) => {
                const Icon = PLAN_ICONS[index % PLAN_ICONS.length];

                return (
                  <Reveal key={plan.title} delay={index * 0.14}>
                    <article className={styles.planCard}>
                      <div className={styles.planIcon}>
                        <Icon size={22} />
                      </div>
                      <h3>{plan.title}</h3>
                      <p>{t(plan.desc)}</p>
                      <div className={styles.planFeatures}>
                        {plan.features.map((feature: string) => (
                          <div key={feature} className={styles.planFeature}>
                            <CheckCircle2 size={15} />
                            <span>{feature}</span>
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

        <section className={styles.inspectionSection}>
          <div className="container">
            <div className={styles.inspectionGrid}>
              <Reveal>
                <div className={styles.inspectionCopy}>
                  <p className={styles.sectionEyebrow}>What the client sees</p>
                  <h2 className={styles.sectionTitle}>
                    The site now explains why the service is valuable before it
                    asks for the booking.
                  </h2>
                  <p className={styles.sectionDescription}>
                    For pool and spa businesses, homeowners respond to clarity:
                    what gets tested, what gets cleaned, what gets repaired, and
                    how quickly help is available when the water turns.
                  </p>

                  <div className={styles.noteList}>
                    <div className={styles.noteItem}>
                      <Clock3 size={18} />
                      <span>
                        Priority response positioning for urgent water recovery.
                      </span>
                    </div>
                    <div className={styles.noteItem}>
                      <FlaskConical size={18} />
                      <span>
                        Chemistry and equipment language that sounds informed,
                        not vague.
                      </span>
                    </div>
                    <div className={styles.noteItem}>
                      <ShieldCheck size={18} />
                      <span>
                        Structured plans and visit outcomes that build trust.
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className={styles.sideCard}>
                  <div className={styles.sideCardMedia}>
                    <Image
                      src="https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1200&q=80"
                      alt="Clean pool water"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Water health check</div>
                    <h3>Start with one visit and a clear maintenance plan.</h3>
                    <p>
                      The first appointment can be sold as an inspection-led
                      service: test the water, inspect the system, stabilise the
                      urgent issues, then recommend the right care rhythm.
                    </p>
                    <a
                      href={booking_url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.inlineLink}
                    >
                      Request an inspection
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <HowItWorks
          steps={config.process}
          accentColor={ACCENT}
          heading="How service works"
        />

        <TestimonialsSection
          testimonials={
            ai.testimonial_1
              ? [
                  {
                    name: 'Featured client',
                    location: 'Local homeowner',
                    text: ai.testimonial_1,
                    stars: 5
                  },
                  ...TESTIMONIALS.slice(1)
                ]
              : TESTIMONIALS
          }
          accentColor={ACCENT}
          heading="What homeowners say after the service starts"
        />

        <FAQSection faqs={config.faqs} accentColor={ACCENT} />

        <section id="book" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Next step</p>
                  <h2 className={styles.sectionTitleDark}>
                    {t(config.footer.title)}
                  </h2>
                  <p className={styles.sectionDescriptionDark}>
                    {t(config.footer.subtitle)}
                  </p>
                </div>

                <div className={styles.ctaActions}>
                  <a
                    href={booking_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.primaryButton}
                  >
                    Schedule the first visit
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
                Reliable {niche.toLowerCase()} for homeowners and properties in{' '}
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

export default function AquaPage() {
  return (
    <Suspense fallback={<div>Preparing the water health preview...</div>}>
      <AquaContent />
    </Suspense>
  );
}
