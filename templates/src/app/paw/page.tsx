'use client';

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Dog,
  Heart,
  PawPrint,
  PhoneCall,
  Scissors,
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
import { PawConfig as Config } from '@/configs/paw';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './paw.module.css';

const ACCENT = '#0ea5e9';

const SERVICE_ICONS = [Scissors, Dog, ShieldCheck];

const TESTIMONIALS = [
  {
    name: 'Lucy V.',
    location: 'Dog owner',
    text: 'Our dog can be nervous, but the team handled him gently and kept us updated. He came back clean, calm, and clearly well looked after.',
    stars: 5
  },
  {
    name: 'Sam H.',
    location: 'Cat owner',
    text: 'They were patient, practical, and realistic about what my cat would tolerate. That honesty made the whole appointment feel much more trustworthy.',
    stars: 5
  },
  {
    name: 'Jane P.',
    location: 'Regular client',
    text: 'We use them for grooming and occasional daycare. The consistency is what matters: kind handling, tidy work, and a team that clearly knows pets well.',
    stars: 5
  }
];

const CARE_POINTS = [
  'Calm handling, clean facilities, and clear owner communication are treated as standard.',
  'Grooming, daycare, and routine maintenance visits are explained clearly before booking.',
  'The visit flow supports anxious pets, first appointments, and regular care plans without confusion.'
];

const OWNER_POINTS = [
  {
    title: 'Gentle first visits',
    text: 'New pets often need a calmer introduction, so the first visit is built around trust and handling rather than rushing straight into treatment.'
  },
  {
    title: 'Clear care updates',
    text: 'Owners want to know how the appointment went, what was done, and whether anything should be watched or booked again later.'
  },
  {
    title: 'Repeat care support',
    text: 'Repeat grooming and daycare visits are structured to feel dependable for loyal local pet owners.'
  }
];

function PawContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Paw & Palace Pet Care',
      niche: 'Pet Care Studio',
      location: 'Local District',
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
            description: `${name} provides ${niche.toLowerCase()} services in ${location} including grooming, daycare, and routine pet support.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '109'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <PawPrint size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Grooming, daycare, and gentle pet care in {location}
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
                <p className={styles.eyebrow}>Kind, calm pet care</p>
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
                    'Grooming, daycare, and routine pet support',
                    'Calm handling for first-time and nervous pets',
                    `${rating}/5 rated by local pet owners`
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
                    src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} pet care`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Owner priority</span>
                    <strong>They want their pet handled gently, kept calm, and returned looking and feeling well cared for.</strong>
                    <span className={styles.floatingMeta}>
                      Clear expectations and calm presentation reduce owner
                      anxiety before the appointment even begins.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <CalendarDays size={16} />
                      Typical booking flow
                    </div>
                    <div className={styles.panelRow}>
                      <span>Meet and greet</span>
                      <strong>Optional first step</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Appointment confirmed</span>
                      <strong>By service type</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Care notes after visit</span>
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
              <p className={styles.sectionEyebrow}>Pet care services</p>
              <h2 className={styles.sectionTitle}>
                A clearer service menu for grooming, supervised care, and repeat
                maintenance.
              </h2>
              <p className={styles.sectionDescription}>
                Owners can now understand the difference between a grooming
                booking, a daycare visit, and a more routine pet-care service
                without guessing what each includes.
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
              <p className={styles.sectionEyebrowDark}>Visit options</p>
              <h2 className={styles.sectionTitleDark}>
                Clear choices for a tidy-up, a full groom, or a day of supervised care.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These booking options make the offer easier to understand for
                first-time owners while still working for regular grooming and
                repeat care clients.
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
                      Book this visit
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
                  <p className={styles.sectionEyebrow}>Why owners trust it</p>
                  <h2 className={styles.sectionTitle}>
                    Pet owners usually book on calm handling, clear communication,
                    and whether the team feels genuinely safe.
                  </h2>
                  <p className={styles.sectionDescription}>
                    The studio is presented around reassurance first, so owners
                    can understand the standard of care before they commit to a
                    first or repeat visit.
                  </p>

                  <div className={styles.trustPoints}>
                    {CARE_POINTS.map((point) => (
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
                      src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80"
                      alt="Pet care consultation"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Owner expectations</div>
                    <h3>Built for first visits, nervous pets, and repeat care that feels dependable.</h3>
                    <p>
                      Local owners want practical care, kinder handling, and a
                      team that keeps them informed throughout the visit.
                    </p>

                    <div className={styles.sideMeta}>
                      {OWNER_POINTS.map((item) => (
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
          heading="How the pet-care booking process works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What local pet owners say"
        />

        <FAQSection faqs={Config.faqs} accentColor={ACCENT} />

        <section id="book" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Book a visit</p>
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
                    Schedule appointment
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
                Grooming, daycare, and gentle pet support for owners in {location}.
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

export default function PawPage() {
  return (
    <Suspense fallback={<div>Preparing the pet-care preview...</div>}>
      <PawContent />
    </Suspense>
  );
}
