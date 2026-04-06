'use client';

import {
  ArrowUpRight,
  Camera,
  CheckCircle2,
  Clock3,
  Heart,
  MapPin,
  PhoneCall,
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
import { EternalConfig as Config } from '@/configs/eternal';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './eternal.module.css';

const ACCENT = '#b16452';

const SERVICE_ICONS = [Camera, Heart, Sparkles];

const TESTIMONIALS = [
  {
    name: 'Charlotte and James',
    location: 'Country house wedding',
    text: 'The photographs feel refined but still completely us. Nothing felt forced, and we stayed present all day because the direction was calm and clear.',
    stars: 5
  },
  {
    name: 'Amelia and Yusuf',
    location: 'City ceremony',
    text: 'We wanted modern, elegant coverage without spending hours posing. The gallery delivered exactly that and captured our families beautifully.',
    stars: 5
  },
  {
    name: 'Sophie and Daniel',
    location: 'Weekend celebration',
    text: 'From planning calls to album design, the whole process felt organised and thoughtful. The images look editorial without losing the warmth of the day.',
    stars: 5
  }
];

const STORY_POINTS = [
  'Timeline guidance before the day so portraits, family photographs, and speeches flow cleanly.',
  'Natural direction for couples who want polished photographs without turning the wedding into a long shoot.',
  'Editing that keeps atmosphere, skin tones, and venue detail elegant and true to life.'
];

const EXPERIENCE_POINTS = [
  {
    title: 'Planning support',
    text: 'Pre-wedding calls help shape timings, light windows, family groupings, and the calmest way to fit photography into the day.'
  },
  {
    title: 'Calm coverage',
    text: 'Most of the day is documented naturally, with short guided portrait moments that feel efficient and comfortable.'
  },
  {
    title: 'Gallery delivery',
    text: 'A quick preview arrives first, followed by a polished final gallery and optional album design for long-term keepsakes.'
  }
];

function EternalContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Eternal Memories',
      niche: 'Wedding Photographer',
      location: 'Country Estate',
      phone: '0000 000 000',
      rating: '4.9'
    });

  const heroSignals = [
    `${rating}/5 rated by recent couples`,
    'Editorial images with natural direction',
    `${location} weddings, intimate ceremonies, and destination travel`
  ];

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
            description: `${name} provides ${niche.toLowerCase()} in ${location} with editorial storytelling and a calm client experience.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '96'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Heart size={16} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Editorial wedding storytelling in {location}
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
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <p className={styles.eyebrow}>Refined wedding photography</p>
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
                  {heroSignals.map((item) => (
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
                    src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} wedding photography`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Signature approach</span>
                    <strong>Editorial polish without the stiff, over-directed feel.</strong>
                    <span className={styles.floatingMeta}>
                      Calm guidance, clean composition, and photographs that still
                      feel like your day.
                    </span>
                  </div>

                  <div className={styles.floatingStrip}>
                    <div className={styles.stripItem}>
                      <Clock3 size={15} />
                      <span>Preview gallery within 48 hours</span>
                    </div>
                    <div className={styles.stripItem}>
                      <MapPin size={15} />
                      <span>{location} and destination coverage</span>
                    </div>
                    <div className={styles.stripItem}>
                      <Sparkles size={15} />
                      <span>Fine art albums available</span>
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

        <section className={styles.storySection}>
          <div className="container">
            <div className={styles.storyGrid}>
              <Reveal>
                <div className={styles.storyMedia}>
                  <div className={styles.storyImagePanel}>
                    <Image
                      src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80"
                      alt="Couple portrait session"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.storyImage}
                    />
                  </div>

                  <div className={styles.storyCard}>
                    <span className={styles.storyCardLabel}>What couples want</span>
                    <h3>Beautiful photographs without losing the pace of the day.</h3>
                    <p>
                      The experience is shaped for modern weddings where the
                      couple wants strong portraits, genuine candids, and enough
                      structure to keep the timeline feeling easy.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className={styles.storyCopy}>
                  <p className={styles.sectionEyebrow}>Signature style</p>
                  <h2 className={styles.sectionTitle}>
                    Story-led coverage with a cleaner, more premium visual finish.
                  </h2>
                  <p className={styles.sectionDescription}>
                    For couples who love polished, magazine-style imagery but
                    still want the wedding to feel relaxed, warm, and natural
                    while it is happening.
                  </p>

                  <div className={styles.storyPoints}>
                    {STORY_POINTS.map((point) => (
                      <div key={point} className={styles.storyPoint}>
                        <CheckCircle2 size={17} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className={styles.servicesSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>Services</p>
              <h2 className={styles.sectionTitle}>
                Coverage built for full wedding days, intimate celebrations, and
                keepsakes that last beyond the gallery.
              </h2>
              <p className={styles.sectionDescription}>
                Choose a coverage style that fits the scale of the celebration,
                from a short city ceremony to a full wedding day or a larger
                weekend of events.
              </p>
            </div>

            <div className={styles.servicesGrid}>
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

        <section className={styles.collectionsSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Collections</p>
              <h2 className={styles.sectionTitleDark}>
                Clear pricing lanes for couples comparing style, time coverage,
                and deliverables.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                Each collection is framed around a type of wedding day, so the
                client can understand the difference between shorter coverage, a
                full narrative, and a larger celebration weekend.
              </p>
            </div>

            <div className={styles.collectionsGrid}>
              {Config.collections.map((collection, index) => (
                <Reveal key={collection.title} delay={index * 0.12}>
                  <article
                    className={`${styles.collectionCard} ${
                      collection.featured ? styles.collectionFeatured : ''
                    }`}
                  >
                    {collection.tag ? (
                      <div className={styles.collectionTag}>
                        {t(collection.tag)}
                      </div>
                    ) : null}

                    <div className={styles.collectionHeader}>
                      <div>
                        <h3>{t(collection.title)}</h3>
                        <p className={styles.collectionIdeal}>
                          {t(collection.idealFor)}
                        </p>
                      </div>
                      <div className={styles.collectionPrice}>
                        {t(collection.price)}
                      </div>
                    </div>

                    <div className={styles.collectionList}>
                      {collection.features.map((item) => (
                        <div key={item} className={styles.collectionListItem}>
                          <CheckCircle2 size={16} />
                          <span>{t(item)}</span>
                        </div>
                      ))}
                    </div>

                    <a href={`tel:${phone}`} className={styles.collectionButton}>
                      Ask about this collection
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.experienceSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>Experience</p>
              <h2 className={styles.sectionTitle}>
                The process is designed to feel organised before the wedding and
                unobtrusive during it.
              </h2>
              <p className={styles.sectionDescription}>
                From timeline advice to final delivery, every step is built to
                keep the experience clear, calm, and easy to enjoy.
              </p>
            </div>

            <div className={styles.experienceGrid}>
              {EXPERIENCE_POINTS.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.12}>
                  <article className={styles.experienceCard}>
                    <div className={styles.experienceStep}>
                      0{index + 1}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <HowItWorks
          steps={Config.process}
          accentColor={ACCENT}
          heading="How the wedding photography process works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What recent couples say"
        />

        <FAQSection faqs={Config.faqs} accentColor={ACCENT} />

        <section id="book" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Check availability</p>
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
                    Check your date
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
                Editorial, story-led {niche.toLowerCase()} for couples in{' '}
                {location} and beyond.
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

export default function EternalPage() {
  return (
    <Suspense fallback={<div>Preparing the gallery preview...</div>}>
      <EternalContent />
    </Suspense>
  );
}
