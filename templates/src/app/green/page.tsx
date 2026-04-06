'use client';

import {
  ArrowUpRight,
  Battery,
  CheckCircle2,
  Leaf,
  PhoneCall,
  ShieldCheck,
  Sun,
  Wallet,
  Zap
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
import { GreenGrowthConfig as Config } from '@/configs/green-growth';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './green-growth.module.css';

const ACCENT = '#16a34a';

const SOLUTION_ICONS = [Sun, Battery, Zap];

const TESTIMONIALS = [
  {
    name: 'Helen R.',
    location: 'Homeowner',
    text: 'The team explained the numbers clearly, handled the install cleanly, and the system has already changed how much we rely on the grid.',
    stars: 5
  },
  {
    name: 'Marcus P.',
    location: 'Small business owner',
    text: 'We wanted lower running costs and a future-proof setup for our site. The proposal was practical, not pushy, and the project ran on schedule.',
    stars: 5
  },
  {
    name: 'Claire D.',
    location: 'Solar and battery client',
    text: 'What stood out was the guidance. They helped us understand generation, battery storage, and payback properly before we committed.',
    stars: 5
  }
];

const PROPERTY_POINTS = [
  'System design shaped around roof layout, daytime usage, and long-term savings goals.',
  'Battery and EV charging options available for clients who want a more complete energy setup.',
  'Installations positioned around performance, compliance, and easier ownership after handover.'
];

const ADVISORY_POINTS = [
  {
    title: 'Survey and proposal',
    text: 'The process starts with property details, usage patterns, and a clear savings estimate so the client understands what the system is meant to achieve.'
  },
  {
    title: 'Installation and commissioning',
    text: 'Once approved, the project is installed, tested, and commissioned with attention to system performance, safety, and documentation.'
  },
  {
    title: 'Monitoring and support',
    text: 'After handover, the client has a clearer view of generation, battery use, and how to get the most from the investment over time.'
  }
];

function GreenContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Green Growth Renewables',
      niche: 'Solar Specialist',
      location: 'Sustainable District',
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
            description: `${name} provides ${niche.toLowerCase()} installations, battery storage, and EV charging in ${location}.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '112'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Leaf size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Solar, storage, and smart energy upgrades in {location}
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
                <p className={styles.eyebrow}>Renewable energy systems</p>
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
                    'Residential and commercial solar installations',
                    'Battery storage and EV charging upgrades',
                    `${rating}/5 rated local installation experience`
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
                    src="https://images.unsplash.com/photo-1584277261846-c6a1672ed979?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} renewable energy installation`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Client outcome</span>
                    <strong>Lower running costs and a more resilient property energy setup.</strong>
                    <span className={styles.floatingMeta}>
                      Better system planning, clearer estimates, and cleaner
                      installation delivery from first survey to handover.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <Wallet size={16} />
                      Typical priorities
                    </div>
                    <div className={styles.panelRow}>
                      <span>Cut electricity spend</span>
                      <strong>High</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Add battery storage</span>
                      <strong>Optional</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Future EV charging</span>
                      <strong>Ready</strong>
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

        <section className={styles.solutionsSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>Core solutions</p>
              <h2 className={styles.sectionTitle}>
                Renewable upgrades built around savings, resilience, and cleaner
                long-term energy use.
              </h2>
              <p className={styles.sectionDescription}>
                Explore the difference between solar generation, battery
                storage, and EV charging upgrades so the system can be matched
                to how the property actually uses energy.
              </p>
            </div>

            <div className={styles.solutionGrid}>
              {Config.solutions.map((solution, index) => {
                const Icon = SOLUTION_ICONS[index % SOLUTION_ICONS.length];
                const aiOverride =
                  index === 0
                    ? ai.service_1
                    : index === 1
                      ? ai.service_2
                      : index === 2
                        ? ai.service_3
                        : undefined;

                return (
                  <Reveal key={solution.title} delay={index * 0.12}>
                    <article className={styles.solutionCard}>
                      <div className={styles.solutionIcon}>
                        <Icon size={22} />
                      </div>
                      <h3>{aiOverride || t(solution.title)}</h3>
                      <p>{t(solution.desc)}</p>

                      <div className={styles.solutionList}>
                        {solution.includes.map((item) => (
                          <div key={item} className={styles.solutionListItem}>
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

        <section className={styles.systemSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>System options</p>
              <h2 className={styles.sectionTitleDark}>
                Clear installation paths for homes, growing properties, and
                higher-usage sites.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These packages make the offer easier to understand before the
                technical survey, giving the client a realistic starting point on
                scope and budget.
              </p>
            </div>

            <div className={styles.systemGrid}>
              {Config.systems.map((system, index) => (
                <Reveal key={system.title} delay={index * 0.12}>
                  <article
                    className={`${styles.systemCard} ${
                      system.featured ? styles.systemFeatured : ''
                    }`}
                  >
                    {system.tag ? (
                      <div className={styles.systemTag}>{t(system.tag)}</div>
                    ) : null}

                    <div className={styles.systemHeader}>
                      <div>
                        <h3>{t(system.title)}</h3>
                        <p className={styles.systemIdeal}>{t(system.idealFor)}</p>
                      </div>
                      <div className={styles.systemPrice}>{t(system.price)}</div>
                    </div>

                    <div className={styles.systemList}>
                      {system.features.map((item) => (
                        <div key={item} className={styles.systemListItem}>
                          <CheckCircle2 size={16} />
                          <span>{t(item)}</span>
                        </div>
                      ))}
                    </div>

                    <a href={`tel:${phone}`} className={styles.systemButton}>
                      Discuss this system
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.propertySection}>
          <div className="container">
            <div className={styles.propertyGrid}>
              <Reveal>
                <div className={styles.propertyCopy}>
                  <p className={styles.sectionEyebrow}>Planning and suitability</p>
              <h2 className={styles.sectionTitle}>
                Better energy projects start with the right advice, not just
                the biggest system.
              </h2>
              <p className={styles.sectionDescription}>
                Stronger results come from understanding property suitability,
                usage habits, and the balance between generation, storage, and
                future upgrades before installation begins.
              </p>

                  <div className={styles.propertyPoints}>
                    {PROPERTY_POINTS.map((point) => (
                      <div key={point} className={styles.propertyPoint}>
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
                      src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80"
                      alt="Solar energy consultation"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Advisory approach</div>
                    <h3>Designed to make the investment easier to understand.</h3>
                    <p>
                      The site now presents a stronger consultative process for
                      households and businesses comparing solar, storage, and EV
                      charging as part of one longer-term upgrade plan.
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
          heading="How the renewable upgrade process works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What clients say after installation"
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
                    Request a savings review
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
                Solar, storage, and smart energy upgrades for homes and
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

export default function GreenPage() {
  return (
    <Suspense fallback={<div>Preparing the energy preview...</div>}>
      <GreenContent />
    </Suspense>
  );
}
