'use client';

import {
  ArrowUpRight,
  Briefcase,
  CalendarRange,
  CheckCircle2,
  Globe,
  Layout,
  PhoneCall,
  Presentation,
  Sparkles,
  Star,
  Users
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
import { EliteEventConfig } from '@/configs/elite-event';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './elite-event.module.css';

const ACCENT = '#4f46e5';

const SERVICE_ICONS = [Presentation, Sparkles, Users];

const TESTIMONIALS = [
  {
    name: 'Charlotte B.',
    location: 'Wedding client',
    text: 'The planning process was organised from the beginning and the event day felt effortless from our side. They handled the detail without losing the atmosphere we wanted.',
    stars: 5
  },
  {
    name: 'Alex D.',
    location: 'Corporate event client',
    text: 'We needed a team that could manage suppliers, AV, delegates, and speaker flow without creating noise. They were calm, sharp, and very well prepared.',
    stars: 5
  },
  {
    name: 'Natalie F.',
    location: 'Private celebration',
    text: 'They understood the brief quickly, improved it in the right places, and made the whole event feel polished without making it feel overproduced.',
    stars: 5
  }
];

const EVENT_POINTS = [
  'The template now sells process and control, not just “premium” event language',
  'Clients can immediately see the difference between corporate, launch, and private-event support',
  'The first planning call feels clearer and lower-friction to book'
];

function EventContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Elite Event Productions',
      niche: 'Event Planning and Production',
      location: 'Metropolitan Area',
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
            '@type': EliteEventConfig.schemaType,
            name,
            telephone: phone,
            areaServed: location,
            description: `${name} provides ${niche} in ${location}.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '140'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Layout size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>{location} event planning and production</p>
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
                <p className={styles.eyebrow}>Planning and production partner</p>
                <PrestigeBadge
                  niche={niche}
                  location={location}
                  accentColor={ACCENT}
                />

                <h1 className={styles.heroTitle}>
                  {ai.hero_title || t(EliteEventConfig.hero.title)}
                </h1>

                <p className={styles.heroDescription}>
                  {ai.hero_subtitle || t(EliteEventConfig.hero.subtitle)}
                </p>

                <div className={styles.heroActions}>
                  <a
                    href={booking_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.primaryButton}
                  >
                    {ai.niche_cta || EliteEventConfig.hero.cta}
                    <ArrowUpRight size={18} />
                  </a>

                  <a href={`tel:${phone}`} className={styles.secondaryButton}>
                    <PhoneCall size={18} />
                    Call {phone}
                  </a>
                </div>

                <div className={styles.signalGrid}>
                  {[
                    'Corporate, brand, and private event planning',
                    'Venue, supplier, schedule, and on-the-day control',
                    `${rating}/5 rated planning support in ${location}`
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
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} event production`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Planning focus</span>
                    <strong>Brief, budget, suppliers, timing, and guest flow handled as one system</strong>
                    <span className={styles.floatingMeta}>
                      The page now positions the agency as a calm operator, not
                      just a luxury-events brand.
                    </span>
                  </div>

                  <div className={styles.floatingSchedule}>
                    <div className={styles.scheduleHeader}>
                      <CalendarRange size={16} />
                      Typical planning rhythm
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>Smaller private events</span>
                      <strong>3 to 6 months</strong>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>Corporate and conference formats</span>
                      <strong>6 to 12 months</strong>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>One point of coordination</span>
                      <strong>Start to finish</strong>
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
              {EliteEventConfig.stats.map((stat) => (
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
              {EliteEventConfig.reassuranceBar.map((item) => (
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
                A stronger event template for clients who need structure as much
                as creativity.
              </h2>
              <p className={styles.sectionDescription}>
                The old version looked premium but vague. This one explains what
                the team actually does and where the operational value sits in
                the planning process.
              </p>
            </div>

            <div className={styles.servicesGrid}>
              {EliteEventConfig.services.map((service, index) => {
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

        <section className={styles.typesSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Event types</p>
              <h2 className={styles.sectionTitleDark}>
                Event categories that make the offer easier to understand.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These cards help a client identify the sort of event they are
                planning and whether the agency is a fit before the first call.
              </p>
            </div>

            <div className={styles.typesGrid}>
              {EliteEventConfig.eventTypes.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.12}>
                  <article className={styles.typeCard}>
                    <div className={styles.typeTop}>
                      <div>
                        <h3>{t(item.title)}</h3>
                        <div className={styles.typeMeta}>
                          <span>
                            <Users size={15} />
                            {item.scale}
                          </span>
                          <span>
                            <Star size={15} />
                            Planned with one team
                          </span>
                        </div>
                      </div>
                    </div>
                    <p>{t(item.desc)}</p>
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
                  <p className={styles.sectionEyebrow}>Why this version works</p>
                  <h2 className={styles.sectionTitle}>
                    The template now feels like a real planning and production
                    business.
                  </h2>
                  <p className={styles.sectionDescription}>
                    Clients booking events want to know whether the agency can
                    organise the moving parts, not just promise a premium result.
                    The site now reflects that much more clearly.
                  </p>

                  <div className={styles.noteList}>
                    {EVENT_POINTS.map((point) => (
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
                      src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"
                      alt="Event audience and staging"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Client reassurance</div>
                    <h3>Built to make the first planning conversation more useful.</h3>
                    <p>
                      The new structure makes it easier for a client to discuss
                      scale, budget, format, and support level without feeling
                      like they need the whole event figured out first.
                    </p>
                    <div className={styles.sideMeta}>
                      <span>
                        <Briefcase size={15} />
                        Corporate and brand events
                      </span>
                      <span>
                        <Globe size={15} />
                        Private and guest-led formats
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <HowItWorks
          steps={EliteEventConfig.process}
          accentColor={ACCENT}
          heading="How the planning process works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What clients say after the event lands well"
        />

        <FAQSection faqs={EliteEventConfig.faqs} accentColor={ACCENT} />

        <section id="book" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Next step</p>
                  <h2 className={styles.sectionTitleDark}>
                    {t(EliteEventConfig.footer.title)}
                  </h2>
                  <p className={styles.sectionDescriptionDark}>
                    {t(EliteEventConfig.footer.subtitle)}
                  </p>
                </div>

                <div className={styles.ctaActions}>
                  <a
                    href={booking_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.primaryButton}
                  >
                    Start planning
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
                Structured {niche.toLowerCase()} for corporate, private, and
                brand-led events in {location}.
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

export default function EventPage() {
  return (
    <Suspense fallback={<div>Preparing the event preview...</div>}>
      <EventContent />
    </Suspense>
  );
}
