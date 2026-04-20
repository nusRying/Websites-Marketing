'use client';

import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Package2,
  Palette,
  PhoneCall,
  Printer,
  Store
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
import { PrimePrintConfig as Config } from '@/configs/prime-print';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './prime-print.module.css';

const ACCENT = '#4f46e5';

const SERVICE_ICONS = [Printer, Store, Package2];

const TESTIMONIALS = [
  {
    name: 'Anna K.',
    location: 'Marketing manager',
    text: 'They handled the artwork cleanly, sent proofs quickly, and delivered a brochure run that looked sharp from the first copy to the last.',
    stars: 5
  },
  {
    name: 'Mark D.',
    location: 'Event organiser',
    text: 'We needed flyers, pull-up banners, and last-minute signage on a short deadline. They gave us a clear production plan and hit it.',
    stars: 5
  },
  {
    name: 'Fiona B.',
    location: 'Retail owner',
    text: 'The packaging and in-store print finally felt consistent with the brand. Good communication, sensible advice, and no confusion over finishes.',
    stars: 5
  }
];

const TRUST_POINTS = [
  'Artwork checks and proofing reduce print errors before production begins.',
  'Turnaround options are explained clearly for urgent jobs and planned campaigns.',
  'Brands can order stationery, signage, packaging, and promo print from one studio.'
];

const CLIENT_POINTS = [
  {
    title: 'Brand and campaign work',
    text: 'Useful for launches, events, seasonal campaigns, and recurring printed marketing materials.'
  },
  {
    title: 'Retail and hospitality',
    text: 'Suitable for menus, POS materials, signage, window graphics, and short-run promotional pieces.'
  },
  {
    title: 'Packaging and presentation',
    text: 'Ideal when the job needs both production quality and guidance on stock, finish, and how the item will actually be used.'
  }
];

function PrintContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Vivid Print Studio',
      niche: 'Print and Signage Studio',
      location: 'Creative District',
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
            description: `${name} provides ${niche.toLowerCase()} in ${location} including print production, signage, and packaging support.`,
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
                <Printer size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Print, signage, and packaging in {location}
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
                  Print production with clear proofing and delivery
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
                    'Print, signage, packaging, and campaign materials',
                    'Proofs, finish advice, and production guidance included',
                    `${rating}/5 rated by local brands and businesses`
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
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} print production`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Production focus</span>
                    <strong>
                      Most clients need artwork checked, the right finish
                      recommended, and a delivery timeline they can trust.
                    </strong>
                    <span className={styles.floatingMeta}>
                      That matters just as much as the print itself when the job
                      supports a launch, event, or branded environment.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <Clock3 size={16} />
                      Typical workflow
                    </div>
                    <div className={styles.panelRow}>
                      <span>Artwork review</span>
                      <strong>Before production</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Proof approval</span>
                      <strong>Included</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Delivery or collection</span>
                      <strong>Planned by deadline</strong>
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
              <p className={styles.sectionEyebrow}>Studio services</p>
              <h2 className={styles.sectionTitle}>
                Print support that covers branded materials, signage, and
                packaging without splitting the project across suppliers.
              </h2>
              <p className={styles.sectionDescription}>
                Whether the job is for a campaign launch, a retail location, or
                everyday branded collateral, the scope is clear before anything
                goes to print.
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
              <p className={styles.sectionEyebrowDark}>Popular jobs</p>
              <h2 className={styles.sectionTitleDark}>
                Clear options for campaign print, signage runs, and branded packaging.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These packages help a client understand what sort of project
                support they need before the artwork, quantities, and finish are
                finalised.
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
                      Discuss this project
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
                    Print work usually goes wrong when artwork, timing, and
                    finish choices are unclear before production starts.
                  </h2>
                  <p className={styles.sectionDescription}>
                    Clients want reassurance on proofing, quality control, and
                    delivery expectations before they ask for a quote.
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
                      alt="Print samples and packaging"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Client fit</div>
                    <h3>
                      Built for brands, venues, retailers, and teams that need
                      printed work to show up clean and on time.
                    </h3>
                    <p>
                      Clients usually need practical guidance on stock, finish,
                      size, quantity, and deadline planning before they commit to
                      a production run.
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
          heading="How the print project process works"
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
                  <p className={styles.sectionEyebrowDark}>Start a project</p>
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
                Print, signage, packaging, and branded production support across {location}.
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

export default function PrintPage() {
  return (
    <Suspense fallback={<div>Preparing the print-studio preview...</div>}>
      <PrintContent />
    </Suspense>
  );
}
