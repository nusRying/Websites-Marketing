'use client';

import {
  ArrowUpRight,
  Box,
  CheckCircle2,
  Clock3,
  Package,
  PhoneCall,
  ShieldCheck,
  Truck,
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
import { LogisticsConfig as Config } from '@/configs/logistics';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './logistics.module.css';

const ACCENT = '#f97316';

const SERVICE_ICONS = [Truck, Clock3, Warehouse];

const TESTIMONIALS = [
  {
    name: 'Carl B.',
    location: 'Supply chain director',
    text: 'They helped us steady our regional delivery schedule without overcomplicating the process. Better communication, better timing, and fewer avoidable delays.',
    stars: 5
  },
  {
    name: 'Helen A.',
    location: 'Operations manager',
    text: 'The difference is how clearly they handle handovers, updates, and exceptions. That makes them much easier to trust during busy periods.',
    stars: 5
  },
  {
    name: 'John M.',
    location: 'Retail client',
    text: 'For peak trading periods they have been reliable, responsive, and realistic about what can be delivered. That honesty matters as much as the service itself.',
    stars: 5
  }
];

const OPERATIONS_POINTS = [
  'The service is structured for same-day jobs, scheduled distribution, and storage-backed fulfilment.',
  'Buyers can understand the difference between urgent courier work and longer-term logistics support.',
  'The service suits retail, e-commerce, trade, and operations teams that need consistency.'
];

const CONTROL_POINTS = [
  {
    title: 'Collection and routing',
    text: 'Every job starts with timing, collection windows, and the delivery path so the movement is planned properly rather than improvised after booking.'
  },
  {
    title: 'Handling and visibility',
    text: 'Updates, tracking expectations, and proof-of-delivery style communication are positioned as part of the service, not optional extras.'
  },
  {
    title: 'Storage and onward delivery',
    text: 'For clients with fluctuating stock or scheduled outbound needs, the offer supports warehousing and fulfilment rather than one-off transport alone.'
  }
];

function LogisticsContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Logic Logistics Group',
      niche: 'Delivery Specialist',
      location: 'Transport Hub',
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
            description: `${name} provides ${niche.toLowerCase()} logistics, courier, and storage support in ${location}.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '118'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Truck size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Delivery, fulfilment, and logistics support in {location}
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
                <p className={styles.eyebrow}>Transport and fulfilment</p>
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
                    'Same-day, scheduled, and storage-backed logistics support',
                    'Suitable for retail, trade, and business operations',
                    `${rating}/5 rated by logistics clients`
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
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} logistics operations`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Client priority</span>
                    <strong>Reliable timing, clearer updates, and fewer avoidable delivery problems.</strong>
                    <span className={styles.floatingMeta}>
                      Good logistics partners reduce uncertainty as much as they
                      move goods.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <Package size={16} />
                      Support model
                    </div>
                    <div className={styles.panelRow}>
                      <span>Urgent shipments</span>
                      <strong>Available</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Regional distribution</span>
                      <strong>Scheduled</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Storage and fulfilment</span>
                      <strong>By need</strong>
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
                  <div className={styles.metricValue}>{t(stat.value)}</div>
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
                The offer is organised around the kinds of movement and storage
                problems businesses actually need solved.
              </h2>
              <p className={styles.sectionDescription}>
                Same-day delivery, scheduled distribution, and storage-backed
                support are separated more clearly so clients can understand the
                right fit faster.
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

        <section className={styles.supportSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Support models</p>
              <h2 className={styles.sectionTitleDark}>
                Clear options for urgent jobs, routine transport, and wider
                fulfilment support.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                Buyers can see whether they need a fast-response courier, a
                scheduled delivery partner, or a broader logistics setup with
                storage built in.
              </p>
            </div>

            <div className={styles.supportGrid}>
              {Config.supportModels.map((model, index) => (
                <Reveal key={model.title} delay={index * 0.12}>
                  <article
                    className={`${styles.supportCard} ${
                      model.featured ? styles.supportFeatured : ''
                    }`}
                  >
                    {model.tag ? (
                      <div className={styles.supportTag}>{t(model.tag)}</div>
                    ) : null}

                    <div className={styles.supportHeader}>
                      <div>
                        <h3>{t(model.title)}</h3>
                        <p className={styles.supportIdeal}>{t(model.idealFor)}</p>
                      </div>
                      <div className={styles.supportPrice}>{t(model.price)}</div>
                    </div>

                    <div className={styles.supportList}>
                      {model.features.map((feature) => (
                        <div key={feature} className={styles.supportListItem}>
                          <CheckCircle2 size={16} />
                          <span>{t(feature)}</span>
                        </div>
                      ))}
                    </div>

                    <a href={`tel:${phone}`} className={styles.supportButton}>
                      Discuss this service model
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.operationsSection}>
          <div className="container">
            <div className={styles.operationsGrid}>
              <Reveal>
                <div className={styles.operationsCopy}>
                  <p className={styles.sectionEyebrow}>Operations view</p>
              <h2 className={styles.sectionTitle}>
                Logistics clients are usually buying confidence, not just
                transport capacity.
              </h2>
              <p className={styles.sectionDescription}>
                Good transport partners reduce missed handovers, poor
                communication, and preventable delays. The page is built to
                speak more directly to those operational concerns.
              </p>

                  <div className={styles.operationsPoints}>
                    {OPERATIONS_POINTS.map((point) => (
                      <div key={point} className={styles.operationsPoint}>
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
                      src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80"
                      alt="Logistics planning"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Service control</div>
                    <h3>Built around routing, communication, and steadier fulfilment.</h3>
                    <p>
                      The company is positioned more like a dependable operations
                      partner for growing businesses than a one-dimensional
                      courier service.
                    </p>

                    <div className={styles.sideMeta}>
                      {CONTROL_POINTS.map((item) => (
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
          heading="How the logistics process works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What operations teams say"
        />

        <FAQSection faqs={Config.faqs} accentColor={ACCENT} />

        <section id="book" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Get a quote</p>
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
                    Request logistics quote
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
                Delivery, storage, and fulfilment support for businesses across{' '}
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

export default function LogisticsPage() {
  return (
    <Suspense fallback={<div>Preparing the route preview...</div>}>
      <LogisticsContent />
    </Suspense>
  );
}
