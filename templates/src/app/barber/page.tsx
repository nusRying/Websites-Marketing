'use client';

import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock3,
  MapPin,
  PhoneCall,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  UserCheck
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
import { BarberConfig as config } from '@/configs/barber';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './barber.module.css';

const ACCENT = '#d4af37';

const SERVICE_ICONS = [Scissors, UserCheck, Sparkles];

const TESTIMONIALS = [
  {
    name: 'James K.',
    location: 'Regular client',
    text: 'The difference here is consistency. Every cut is clean, the consultation is quick but useful, and the result still grows out properly two weeks later.',
    stars: 5
  },
  {
    name: 'Ryan M.',
    location: 'First-time client',
    text: 'I came in unsure what I wanted and left with the best haircut I have had in years. The barber actually explained what would suit my hair and why.',
    stars: 5
  },
  {
    name: 'Tom B.',
    location: 'Long-term customer',
    text: 'The hot towel ritual and beard detail are excellent. It feels like a modern barbershop with proper standards, not just a fast in-and-out cut.',
    stars: 5
  }
];

const SHOP_POINTS = [
  'Cuts shaped around the client rather than rushed through a standard pattern',
  'Clearer service choices so new clients know what to book first',
  'A darker editorial look that feels more premium and intentional'
];

function BarberContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'The Heritage Barbershop',
      niche: 'Modern Barber Shop',
      location: 'Central District',
      phone: '0000 000 000',
      rating: '5.0'
    });

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
              reviewCount: '150'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Scissors size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>{location} cuts and grooming</p>
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
                <p className={styles.eyebrow}>Modern barbershop appointments</p>
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
                    'Haircuts, beard work, and ritual appointments',
                    'Sharper booking flow for new and returning clients',
                    `${rating}/5 rated experience in ${location}`
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
                    src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} barber chair`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Most booked</span>
                    <strong>Signature cut and beard detail</strong>
                    <span className={styles.floatingMeta}>
                      A balanced service for clients who want the haircut and the
                      beard finished together.
                    </span>
                  </div>

                  <div className={styles.floatingSchedule}>
                    <div className={styles.scheduleHeader}>
                      <Calendar size={16} />
                      Appointment rhythm
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>Standard haircut slot</span>
                      <strong>45 min</strong>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>Cut and beard appointment</span>
                      <strong>60 min</strong>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>Recommended rebook cycle</span>
                      <strong>2 to 4 weeks</strong>
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
              <p className={styles.sectionEyebrow}>Service focus</p>
              <h2 className={styles.sectionTitle}>
                A stronger shop page for clients who care about consistency,
                detail, and the overall experience.
              </h2>
              <p className={styles.sectionDescription}>
                The old page had the right mood but not enough structure. This
                version makes it clearer what the shop does, what to book, and
                why the quality should feel different.
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

        <section className={styles.menuSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Service menu</p>
              <h2 className={styles.sectionTitleDark}>
                Menu cards that look curated instead of like a simple price list.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These blocks help a client decide quickly whether they need a
                standard cut, a beard service, or a longer ritual appointment.
              </p>
            </div>

            <div className={styles.menuGrid}>
              {config.menu.map((item, index) => (
                <Reveal key={item.name} delay={index * 0.12}>
                  <article className={styles.menuCard}>
                    <div className={styles.menuTop}>
                      <div>
                        <h3>{t(item.name)}</h3>
                        <div className={styles.menuMeta}>
                          <span>
                            <Clock3 size={15} />
                            {item.duration}
                          </span>
                          <span>
                            <Star size={15} />
                            Barbershop appointment
                          </span>
                        </div>
                      </div>
                      <div className={styles.menuPrice}>{item.price}</div>
                    </div>
                    <p>{t(item.desc)}</p>
                    <div className={styles.menuList}>
                      {item.includes.map((feature: string) => (
                        <div key={feature} className={styles.menuListItem}>
                          <CheckCircle2 size={15} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.shopSection}>
          <div className="container">
            <div className={styles.shopGrid}>
              <Reveal>
                <div className={styles.shopCopy}>
                  <p className={styles.sectionEyebrow}>Why this version works</p>
                  <h2 className={styles.sectionTitle}>
                    The page now feels like a real shop with standards, not just
                    a dark landing page with barber icons.
                  </h2>
                  <p className={styles.sectionDescription}>
                    For this niche, trust comes from a mix of tone and clarity:
                    the barbershop should feel sharp, but the client should also
                    know what the appointment includes and what kind of result to
                    expect.
                  </p>

                  <div className={styles.noteList}>
                    {SHOP_POINTS.map((point) => (
                      <div key={point} className={styles.noteItem}>
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
                      src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80"
                      alt="Barber shop interior"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Shop experience</div>
                    <h3>Built to sell the atmosphere as well as the haircut.</h3>
                    <p>
                      The content now supports a shop that wants to look premium
                      without feeling theatrical. It balances service quality,
                      style confidence, and a clearer path to booking.
                    </p>
                    <div className={styles.sideMeta}>
                      <span>
                        <MapPin size={15} />
                        {location}
                      </span>
                      <span>
                        <Scissors size={15} />
                        Cuts, beard work, and rituals
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <HowItWorks
          steps={config.process}
          accentColor={ACCENT}
          heading="How appointments run"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What clients say after the cut"
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
                    Reserve your chair
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
                Cleaner cuts and better grooming appointments for clients in{' '}
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

export default function BarberPage() {
  return (
    <Suspense fallback={<div>Preparing the barbershop preview...</div>}>
      <BarberContent />
    </Suspense>
  );
}
