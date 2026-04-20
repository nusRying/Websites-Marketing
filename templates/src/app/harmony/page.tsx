'use client';

import {
  ArrowUpRight,
  CheckCircle2,
  Home,
  MapPin,
  Paintbrush,
  PhoneCall,
  Ruler,
  Sofa,
  Sparkles
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
import { HomeHarmonyConfig as Config } from '@/configs/home-harmony';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './home-harmony.module.css';

const ACCENT = '#9b7b63';

const SERVICE_ICONS = [Ruler, Paintbrush, Sofa];

const TESTIMONIALS = [
  {
    name: 'Lucy M.',
    location: 'Townhouse project',
    text: 'They brought clarity to every decision, from layout changes to finishing details. The house feels calmer, brighter, and far more complete than it did before.',
    stars: 5
  },
  {
    name: 'Darren and Elise',
    location: 'Apartment redesign',
    text: 'What we valued most was the balance between aesthetics and practicality. The flat now feels far more intentional without becoming overly styled or difficult to live in.',
    stars: 5
  },
  {
    name: 'Rachel P.',
    location: 'Styling client',
    text: 'The studio helped us refine what we already had and add the right pieces where it mattered. The result feels elevated, not overdesigned.',
    stars: 5
  }
];

const DESIGN_POINTS = [
  'Layouts, finishes, and furniture choices are shaped around how the home is actually used.',
  'The service supports both full redesigns and more focused room-by-room upgrades.',
  'Clients get clearer guidance on concept, sourcing, and implementation rather than generic luxury language.'
];

const STUDIO_POINTS = [
  {
    title: 'Concept direction',
    text: 'Projects begin with a clearer view of what the property should feel like, how rooms should function, and where the strongest design opportunities sit.'
  },
  {
    title: 'Material and furniture selection',
    text: 'The studio helps narrow the field on finishes, textures, lighting, and furniture so the scheme feels cohesive without becoming repetitive.'
  },
  {
    title: 'Delivery and styling',
    text: 'Once the design is agreed, the final value comes from bringing the room together properly through installation, placement, and finishing detail.'
  }
];

function HarmonyContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Harmony Design Atelier',
      niche: 'Interior Architect',
      location: 'Metropolitan Hub',
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
            description: `${name} provides ${niche.toLowerCase()} and residential design services in ${location}.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '88'
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
                  Residential interiors and spatial design in {location}
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
                <p className={styles.eyebrow}>Interior architecture and styling</p>
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
                    'Full-home design, room refinement, and styling support',
                    'Layout, materials, and furniture considered as one scheme',
                    `${rating}/5 rated design experience in ${location}`
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
                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} interior project`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Studio focus</span>
                    <strong>Spaces that feel calmer, more resolved, and easier to live in.</strong>
                    <span className={styles.floatingMeta}>
                      Design decisions are framed around proportion, warmth, and
                      how the home should function day to day.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <MapPin size={16} />
                      Project scope
                    </div>
                    <div className={styles.panelRow}>
                      <span>Townhouses and apartments</span>
                      <strong>Common</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Single-room redesigns</span>
                      <strong>Available</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Turnkey styling support</span>
                      <strong>Optional</strong>
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
                Design support that covers structure, atmosphere, and the final
                lived-in finish.
              </h2>
              <p className={styles.sectionDescription}>
                Clients can see the difference between architectural planning,
                interior curation, and a more complete delivery service, making
                it easier to choose the right level of support.
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

        <section className={styles.engagementSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Project formats</p>
              <h2 className={styles.sectionTitleDark}>
                Clear ways to engage the studio whether the project is a single
                room or a whole property.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These formats make it easier for the client to understand scale,
                support level, and what kind of design involvement fits the
                property best.
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
                        <p className={styles.engagementIdeal}>
                          {t(item.idealFor)}
                        </p>
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
                      Discuss this project type
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.designSection}>
          <div className="container">
            <div className={styles.designGrid}>
              <Reveal>
                <div className={styles.designCopy}>
                  <p className={styles.sectionEyebrow}>Approach</p>
              <h2 className={styles.sectionTitle}>
                Good interiors come from better decisions, not just more
                decoration.
              </h2>
              <p className={styles.sectionDescription}>
                The strongest projects tend to balance space planning,
                material restraint, and the right level of detail. That balance
                is what makes a home feel intentional rather than overstyled.
              </p>

                  <div className={styles.designPoints}>
                    {DESIGN_POINTS.map((point) => (
                      <div key={point} className={styles.designPoint}>
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
                      alt="Interior design consultation"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Studio method</div>
                    <h3>A calmer, more structured process from concept to installation.</h3>
                    <p>
                      The process is designed for clients who want a home to
                      feel complete, edited, and better connected across every
                      room rather than styled in fragments.
                    </p>

                    <div className={styles.sideMeta}>
                      {STUDIO_POINTS.map((item) => (
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
          heading="How the interior design process works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What clients say after the project"
        />

        <FAQSection faqs={Config.faqs} accentColor={ACCENT} />

        <section id="book" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Start the project</p>
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
                    Book a design consultation
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
                Interior architecture and residential design for homes in{' '}
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

export default function HarmonyPage() {
  return (
    <Suspense fallback={<div>Preparing the studio preview...</div>}>
      <HarmonyContent />
    </Suspense>
  );
}
