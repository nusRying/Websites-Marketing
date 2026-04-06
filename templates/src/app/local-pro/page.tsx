'use client';

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Home,
  MapPin,
  PhoneCall,
  ShieldCheck
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
import { LocalProConfig as Config } from '@/configs/local-pro';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './local-pro.module.css';

const ACCENT = '#2563eb';

const SERVICE_ICONS = [Home, ShieldCheck, HeartHandshake];

const TESTIMONIALS = [
  {
    name: 'Neil C.',
    location: 'Homeowner',
    text: 'We called in the morning, got a clear time window, and the job was handled without fuss. Straightforward, tidy, and easy to deal with.',
    stars: 5
  },
  {
    name: 'Emma S.',
    location: 'Repeat customer',
    text: 'What keeps us using them is the consistency. They explain the work properly, show up when they say they will, and charge fairly.',
    stars: 5
  },
  {
    name: 'Tony G.',
    location: 'Landlord',
    text: 'For rentals and smaller property jobs, they have been reliable and practical. That matters more than polished marketing.',
    stars: 5
  }
];

const TRUST_POINTS = [
  'Built for homeowners, landlords, and small businesses who want reliable local help.',
  'Clearer visit types make it easier to choose between a quick fix, standard booking, or ongoing property support.',
  'The service feels more trustworthy because it explains timing, pricing style, and follow-through more clearly.'
];

const SUPPORT_POINTS = [
  {
    title: 'Fast local response',
    text: 'A strong local service business wins on speed and reliability, so availability and area coverage are made easier to understand.'
  },
  {
    title: 'Clear quotes and scope',
    text: 'Clients want to know what they are booking, what the visit covers, and whether more work is likely before they commit.'
  },
  {
    title: 'Ongoing property help',
    text: 'Recurring service relationships are supported too, which makes the offer more useful for landlords and repeat maintenance clients.'
  }
];

function LocalProContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Your Local Service',
      niche: 'Professional Expert',
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
            address: {
              '@type': 'PostalAddress',
              addressLocality: location
            },
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
                <Home size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Trusted {niche.toLowerCase()} in {location}
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
                <p className={styles.eyebrow}>{t(Config.hero.badge)}</p>
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
                    'Same-day and scheduled appointments where available',
                    'Clear quotes, tidy work, and dependable follow-through',
                    `${rating}/5 rated by local customers`
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
                    src="https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} service visit`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Why people book</span>
                    <strong>They want the problem handled quickly and properly without chasing, delays, or vague pricing.</strong>
                    <span className={styles.floatingMeta}>
                      A better local-service page makes speed, trust, and clear
                      communication feel obvious from the first click.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <CalendarDays size={16} />
                      Typical booking flow
                    </div>
                    <div className={styles.panelRow}>
                      <span>Quick call or online request</span>
                      <strong>First step</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Time window confirmed</span>
                      <strong>Before visit</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Quote or fix on site</span>
                      <strong>As needed</strong>
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
              <p className={styles.sectionEyebrow}>Service categories</p>
              <h2 className={styles.sectionTitle}>
                A local service offer organised around what people actually need
                help with.
              </h2>
              <p className={styles.sectionDescription}>
                Urgent visits, planned work, and longer-term property support
                are separated more clearly so the customer can quickly see where
                they fit.
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

        <section className={styles.pricingSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Booking options</p>
              <h2 className={styles.sectionTitleDark}>
                Clear visit types for one-off jobs, standard appointments, and
                repeat support.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                Customers can easily understand the difference between a quick
                appointment, a longer service visit, and ongoing help for homes
                or managed properties.
              </p>
            </div>

            <div className={styles.pricingGrid}>
              {Config.pricing.map((plan, index) => (
                <Reveal key={plan.level} delay={index * 0.12}>
                  <article
                    className={`${styles.priceCard} ${
                      plan.popular ? styles.priceFeatured : ''
                    }`}
                  >
                    {plan.popular ? (
                      <div className={styles.popularTag}>Most booked</div>
                    ) : null}

                    <div className={styles.priceHeader}>
                      <div>
                        <h3>{t(plan.level)}</h3>
                        <p className={styles.priceIdeal}>{t(plan.idealFor)}</p>
                      </div>
                      <div className={styles.priceValue}>{t(plan.price)}</div>
                    </div>

                    <div className={styles.featureList}>
                      {plan.features.map((feature) => (
                        <div key={feature} className={styles.featureItem}>
                          <CheckCircle2 size={16} />
                          <span>{t(feature)}</span>
                        </div>
                      ))}
                    </div>

                    <a href={`tel:${phone}`} className={styles.priceButton}>
                      Book this option
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
                  <p className={styles.sectionEyebrow}>Why this works</p>
              <h2 className={styles.sectionTitle}>
                Local service businesses win on reliability, clarity, and
                how easy they are to deal with.
              </h2>
              <p className={styles.sectionDescription}>
                Good local service pages reduce friction around booking. Here,
                timing, pricing style, and service scope are much easier for
                customers to trust.
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
                      src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
                      alt="Local service consultation"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Customer expectation</div>
                    <h3>People want a dependable local expert, not a complicated sales process.</h3>
                    <p>
                      The offer is positioned for busy households, landlords,
                      and small businesses who want the issue sorted with less
                      back-and-forth.
                    </p>

                    <div className={styles.sideMeta}>
                      {SUPPORT_POINTS.map((item) => (
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
          heading="How the local booking process works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What local customers say"
        />

        <FAQSection faqs={Config.faqs} accentColor={ACCENT} />

        <section id="book" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Book your slot</p>
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
                    Check availability
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
                Reliable local {niche.toLowerCase()} for homes and small
                businesses in {location}.
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

export default function LocalProPage() {
  return (
    <Suspense fallback={<div>Preparing the local preview...</div>}>
      <LocalProContent />
    </Suspense>
  );
}
