'use client';

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChefHat,
  Clock3,
  MapPin,
  PhoneCall,
  Sparkles,
  Wine
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
import { GustoConfig as Config } from '@/configs/gusto';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './gusto.module.css';

const ACCENT = '#d96d2a';

const EXPERIENCE_ICONS = [ChefHat, Wine, Sparkles];

const TESTIMONIALS = [
  {
    name: 'Maria T.',
    location: 'Regular guest',
    text: 'It feels polished without being stiff. The room is warm, the service is sharp, and the menu changes enough that we keep finding reasons to come back.',
    stars: 5
  },
  {
    name: 'Daniel and Priya',
    location: 'Celebration dinner',
    text: 'We booked for an anniversary and the whole evening felt considered from start to finish. Great pacing, beautiful food, and a room that actually feels special.',
    stars: 5
  },
  {
    name: 'Hannah C.',
    location: 'Private dining guest',
    text: 'The private dining experience was excellent. The menu felt curated, communication was straightforward, and our guests kept talking about the meal afterwards.',
    stars: 5
  }
];

const HOUSE_POINTS = [
  'Seasonal dishes that read well online and still leave room for daily changes.',
  'A reservation journey that feels more premium than a generic booking page.',
  'Clearer positioning for lunch, dinner, and private dining enquiries.'
];

const SERVICE_POINTS = [
  {
    title: 'Seasonal menu updates',
    text: 'The menu is designed to shift with availability and kitchen focus, while still keeping signature dishes guests expect to see.'
  },
  {
    title: 'Front-of-house pacing',
    text: 'The service style is positioned as calm, considered, and guest-focused rather than rushed or generic.'
  },
  {
    title: 'Private dining enquiries',
    text: 'Guests can understand the restaurant as both an evening destination and a venue for birthdays, client dinners, and smaller events.'
  }
];

function GustoContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'The Artisanal Kitchen',
      niche: 'Modern Eatery',
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
            servesCuisine: niche,
            telephone: phone,
            address: {
              '@type': 'PostalAddress',
              addressLocality: location
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '186'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <ChefHat size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Seasonal food and evening dining in {location}
                </p>
              </div>
            </div>

            <a
              href={booking_url}
              target="_blank"
              rel="noreferrer"
              className={styles.headerReserve}
            >
              <CalendarDays size={16} />
              Reserve a table
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
                <p className={styles.eyebrow}>Neighbourhood dining</p>
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
                    'Lunch, dinner, and private dining reservations',
                    'Seasonal menu with modern, ingredient-led cooking',
                    `${rating}/5 rated local dining experience`
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
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} dining room`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Tonight&apos;s feel</span>
                    <strong>Warm room, sharp service, and dishes that feel considered rather than overworked.</strong>
                    <span className={styles.floatingMeta}>
                      A stronger balance of atmosphere, hospitality, and kitchen
                      identity from the first click through to the reservation.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <Clock3 size={16} />
                      Service times
                    </div>
                    <div className={styles.panelRow}>
                      <span>Lunch</span>
                      <strong>Wed to Sun</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Dinner</span>
                      <strong>Daily evenings</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Private dining</span>
                      <strong>By enquiry</strong>
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

        <section className={styles.experiencesSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>Dining formats</p>
              <h2 className={styles.sectionTitle}>
                Clear reasons to visit for a casual booking, a full evening out,
                or a private table.
              </h2>
              <p className={styles.sectionDescription}>
                Guests can quickly understand the difference between everyday
                dining, a more premium evening experience, and event-style
                reservations.
              </p>
            </div>

            <div className={styles.experienceGrid}>
              {Config.experiences.map((experience, index) => {
                const Icon = EXPERIENCE_ICONS[index % EXPERIENCE_ICONS.length];
                const aiOverride =
                  index === 0
                    ? ai.service_1
                    : index === 1
                      ? ai.service_2
                      : index === 2
                        ? ai.service_3
                        : undefined;

                return (
                  <Reveal key={experience.title} delay={index * 0.12}>
                    <article className={styles.experienceCard}>
                      <div className={styles.experienceIcon}>
                        <Icon size={22} />
                      </div>
                      <h3>{aiOverride || t(experience.title)}</h3>
                      <p>{t(experience.desc)}</p>

                      <div className={styles.experienceList}>
                        {experience.includes.map((item) => (
                          <div key={item} className={styles.experienceListItem}>
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

        <section className={styles.menuSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Featured menu</p>
              <h2 className={styles.sectionTitleDark}>
                Signature dishes that make the kitchen feel focused, seasonal,
                and worth booking ahead for.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                A more balanced mix of starters, mains, and desserts gives the
                menu better rhythm and helps the kitchen identity feel more
                complete.
              </p>
            </div>

            <div className={styles.menuGrid}>
              {Config.menu.map((dish, index) => (
                <Reveal key={dish.name} delay={index * 0.1}>
                  <article className={styles.dishCard}>
                    <div className={styles.dishTop}>
                      <div>
                        <h3>{t(dish.name)}</h3>
                        <p className={styles.dishPrice}>{t(dish.price)}</p>
                      </div>
                      <div className={styles.courseTag}>{t(dish.course)}</div>
                    </div>

                    <p className={styles.dishDescription}>{t(dish.desc)}</p>

                    <div className={styles.dishList}>
                      {dish.notes.map((item) => (
                        <div key={item} className={styles.dishListItem}>
                          <CheckCircle2 size={15} />
                          <span>{t(item)}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.houseSection}>
          <div className="container">
            <div className={styles.houseGrid}>
              <Reveal>
                <div className={styles.houseCopy}>
                  <p className={styles.sectionEyebrow}>House experience</p>
                  <h2 className={styles.sectionTitle}>
                    A good restaurant should feel as memorable for the room and
                    service as it does for the plates.
                  </h2>
                  <p className={styles.sectionDescription}>
                    The dining experience is framed around date nights, client
                    dinners, celebrations, and reliable midweek meals, so guests
                    can picture the kind of evening that suits them best.
                  </p>

                  <div className={styles.housePoints}>
                    {HOUSE_POINTS.map((point) => (
                      <div key={point} className={styles.housePoint}>
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
                      src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80"
                      alt="Restaurant interior"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Service style</div>
                    <h3>Built around a stronger sense of place and a better reservation journey.</h3>
                    <p>
                      The restaurant is positioned to feel intimate enough for
                      repeat neighbourhood guests and polished enough for bigger
                      occasions.
                    </p>

                    <div className={styles.sideMeta}>
                      {SERVICE_POINTS.map((item) => (
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
          heading="How the booking and dining experience works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What guests say after dining"
        />

        <FAQSection faqs={Config.faqs} accentColor={ACCENT} />

        <section id="book" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Book a table</p>
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
                    Reserve now
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
                A modern {niche.toLowerCase()} serving lunch, dinner, and special
                occasions in {location}.
              </p>
            </div>

            <div className={styles.footerMeta}>
              <span>
                <MapPin size={15} />
                {location}
              </span>
              <span>
                <PhoneCall size={15} />
                {phone}
              </span>
              <span>{new Date().getFullYear()} Copyright {name}</span>
            </div>
          </div>
        </div>
      </footer>

      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function GustoPage() {
  return (
    <Suspense fallback={<div>Preparing the dining preview...</div>}>
      <GustoContent />
    </Suspense>
  );
}
