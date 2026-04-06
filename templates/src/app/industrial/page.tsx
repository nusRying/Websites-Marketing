'use client';

import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Construction,
  FileCheck,
  HardHat,
  PhoneCall,
  ShieldAlert,
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
import { IndustrialConfig as Config } from '@/configs/industrial';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './industrial.module.css';

const ACCENT = '#f5b517';

const SERVICE_ICONS = [Construction, ShieldAlert, FileCheck];

const TESTIMONIALS = [
  {
    name: 'Steve B.',
    location: 'Factory manager',
    text: 'The job was planned properly, the documentation was clear, and their team worked around our production hours without creating unnecessary disruption.',
    stars: 5
  },
  {
    name: 'Priya D.',
    location: 'Project lead',
    text: 'We used them for a multi-phase industrial works package and the difference was in the coordination. Fewer surprises, better communication, and safer site control.',
    stars: 5
  },
  {
    name: 'Gareth C.',
    location: 'Warehouse operator',
    text: 'For planned maintenance and reactive support they have been consistent, responsive, and easy to work with. That reliability matters more than sales language.',
    stars: 5
  }
];

const OPERATIONS_POINTS = [
  'The service is positioned around planning, compliance, and coordination, not just manual labour capacity.',
  'Clients can understand the difference between reactive callouts, planned maintenance, and larger project delivery.',
  'The contractor reads as operationally credible for estates, warehouses, plants, and industrial sites.'
];

const PROJECT_POINTS = [
  {
    title: 'Site planning first',
    text: 'Every job begins with a clearer view of access, risk, sequencing, and how works should be carried out around live operations.'
  },
  {
    title: 'Documentation and compliance',
    text: 'RAMS, permits, reporting, and sign-off are positioned as a core part of the service rather than something added at the last minute.'
  },
  {
    title: 'Delivery with less disruption',
    text: 'The strongest industrial contractors protect uptime as well as safety, so the work is framed around controlled delivery rather than brute-force turnaround.'
  }
];

function IndustrialContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Industrial Solutions Ltd',
      niche: 'Industrial Specialist',
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
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Industrial Services'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '94'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <HardHat size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Industrial works, maintenance, and compliance support in{' '}
                  {location}
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
                <p className={styles.eyebrow}>Industrial operations support</p>
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
                    'Reactive support, planned maintenance, and project delivery',
                    'RAMS, permits, and compliance-led site management',
                    `${rating}/5 rated by industrial and commercial clients`
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
                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} industrial project`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Operational priority</span>
                    <strong>Protect uptime, control risk, and deliver work with clearer site discipline.</strong>
                    <span className={styles.floatingMeta}>
                      Better planning before works begin and fewer surprises once
                      teams are on site.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <Clock3 size={16} />
                      Typical support model
                    </div>
                    <div className={styles.panelRow}>
                      <span>Reactive callouts</span>
                      <strong>Available</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Planned maintenance</span>
                      <strong>Contract basis</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Project delivery</span>
                      <strong>Scoped works</strong>
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
              <p className={styles.sectionEyebrow}>Core capabilities</p>
              <h2 className={styles.sectionTitle}>
                The service offer is structured around how industrial clients
                actually buy support.
              </h2>
              <p className={styles.sectionDescription}>
                From maintenance coverage to compliance-managed works packages,
                the service lanes now make it easier to match the contractor to
                the operational requirement.
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

        <section className={styles.contractSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Contract structures</p>
              <h2 className={styles.sectionTitleDark}>
                Clear engagement paths for urgent support, planned maintenance,
                and larger works packages.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                The contract options now read more credibly for estates teams,
                site managers, and project buyers comparing short-term help with
                longer operational support.
              </p>
            </div>

            <div className={styles.contractGrid}>
              {Config.contracts.map((contract, index) => (
                <Reveal key={contract.title} delay={index * 0.12}>
                  <article
                    className={`${styles.contractCard} ${
                      contract.featured ? styles.contractFeatured : ''
                    }`}
                  >
                    {contract.tag ? (
                      <div className={styles.contractTag}>{t(contract.tag)}</div>
                    ) : null}

                    <div className={styles.contractHeader}>
                      <div>
                        <h3>{t(contract.title)}</h3>
                        <p className={styles.contractIdeal}>
                          {t(contract.idealFor)}
                        </p>
                      </div>
                      <div className={styles.contractPrice}>
                        {t(contract.price)}
                      </div>
                    </div>

                    <div className={styles.contractList}>
                      {contract.features.map((item) => (
                        <div key={item} className={styles.contractListItem}>
                          <CheckCircle2 size={16} />
                          <span>{t(item)}</span>
                        </div>
                      ))}
                    </div>

                    <a href={`tel:${phone}`} className={styles.contractButton}>
                      Discuss this support model
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
                  <p className={styles.sectionEyebrow}>Why this works</p>
              <h2 className={styles.sectionTitle}>
                Industrial clients need reliability, documentation, and site
                control before they need marketing language.
              </h2>
              <p className={styles.sectionDescription}>
                The strongest contractor websites reduce uncertainty around
                delivery. That makes the business feel safer, clearer, and
                easier to trust on live operational sites.
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
                      src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1200&q=80"
                      alt="Industrial planning meeting"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Project approach</div>
                    <h3>Built around planning, permits, and less disruption on site.</h3>
                    <p>
                      The business is framed as a dependable operating partner
                      for industrial sites rather than a generic trade
                      contractor.
                    </p>

                    <div className={styles.sideMeta}>
                      {PROJECT_POINTS.map((item) => (
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
          heading="How the site works and project process is handled"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What operations teams say after delivery"
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
                    Request a site assessment
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
                Industrial support, maintenance, and compliance-led works across{' '}
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

export default function IndustrialPage() {
  return (
    <Suspense fallback={<div>Preparing the operations preview...</div>}>
      <IndustrialContent />
    </Suspense>
  );
}
