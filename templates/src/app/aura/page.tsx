'use client';

import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock3,
  Heart,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Star
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
import { AuraConfig as Config } from '@/configs/aura';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './aura.module.css';

const ACCENT = '#c78b63';

const SERVICE_ICONS = [Sparkles, ShieldCheck, Heart];

const TESTIMONIALS = [
  {
    name: 'Bella K.',
    location: 'Skin treatment client',
    text: 'Every appointment feels calm, considered, and genuinely bespoke. The consultation is excellent and my skin looks healthier after each visit, not just for a day.',
    stars: 5
  },
  {
    name: 'Sophie T.',
    location: 'Regular client',
    text: 'The studio feels elevated without being intimidating. Treatments are tailored properly and the aftercare guidance is one of the reasons I keep returning.',
    stars: 5
  },
  {
    name: 'Grace P.',
    location: 'Bridal booking',
    text: 'They handled my wedding skin plan and event beauty beautifully. Everything felt polished, calm, and thoughtfully timed right up to the day itself.',
    stars: 5
  }
];

const STUDIO_POINTS = [
  'Consultation-first appointments rather than fixed generic packages',
  'A calmer treatment rhythm with clear aftercare and next-step guidance',
  'Event and bridal bookings structured around preparation, not last-minute panic'
];

function AuraContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'The Wellness Atelier',
      niche: 'Skin and Beauty Studio',
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
            description: `${name} provides ${niche} in ${location}.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '120'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Sparkles size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>{location} skin and beauty studio</p>
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
                <p className={styles.eyebrow}>Consultation-led beauty</p>
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

                <div className={styles.signalGrid}>
                  {[
                    'Tailored skin consultations before treatment decisions',
                    'Bridal and occasion beauty with proper planning support',
                    `${rating}/5 rated client experience in ${location}`
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
                    src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} beauty treatment`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Most booked</span>
                    <strong>Signature skin consultation and facial</strong>
                    <span className={styles.floatingMeta}>
                      A detailed first visit for skin goals, treatment choice, and
                      aftercare.
                    </span>
                  </div>

                  <div className={styles.floatingAppointment}>
                    <div className={styles.appointmentHeader}>
                      <Calendar size={16} />
                      Studio appointments
                    </div>
                    <div className={styles.appointmentRow}>
                      <span>Typical new-client slot</span>
                      <strong>60 to 90 min</strong>
                    </div>
                    <div className={styles.appointmentRow}>
                      <span>Consultation style</span>
                      <strong>One to one</strong>
                    </div>
                    <div className={styles.appointmentRow}>
                      <span>Recommended lead time</span>
                      <strong>7 days</strong>
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

        <section className={styles.servicesSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>Treatment focus</p>
              <h2 className={styles.sectionTitle}>
                A stronger studio page for beauty clients who want reassurance,
                not vague luxury language.
              </h2>
              <p className={styles.sectionDescription}>
                The template now leads with consultation quality, treatment
                clarity, and a calmer premium aesthetic that feels more
                believable for a modern skin and beauty brand.
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
              <p className={styles.sectionEyebrowDark}>Signature menu</p>
              <h2 className={styles.sectionTitleDark}>
                A treatment list that looks curated instead of copied from a
                placeholder salon.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These menu blocks give the client immediate context around
                duration, price point, and what each service is actually for.
              </p>
            </div>

            <div className={styles.menuGrid}>
              {Config.rituals.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.12}>
                  <article className={styles.menuCard}>
                    <div className={styles.menuTop}>
                      <div>
                        <h3>{t(item.title)}</h3>
                        <div className={styles.menuMeta}>
                          <span>
                            <Clock3 size={15} />
                            {item.duration}
                          </span>
                          <span>
                            <Star size={15} />
                            Signature appointment
                          </span>
                        </div>
                      </div>
                      <div className={styles.menuPrice}>{item.price}</div>
                    </div>
                    <p>{t(item.desc)}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.studioSection}>
          <div className="container">
            <div className={styles.studioGrid}>
              <Reveal>
                <div className={styles.studioCopy}>
                  <p className={styles.sectionEyebrow}>Why this version works</p>
                  <h2 className={styles.sectionTitle}>
                    The page now feels like a studio with a point of view, not
                    just a pretty landing page.
                  </h2>
                  <p className={styles.sectionDescription}>
                    Beauty clients want a space that feels calm, polished, and
                    trustworthy. They also want enough clarity to know what to
                    book first and what kind of result the studio is aiming for.
                  </p>

                  <div className={styles.noteList}>
                    {STUDIO_POINTS.map((point) => (
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
                      src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
                      alt="Beauty studio client"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Client experience</div>
                    <h3>Polished enough for premium positioning, simple enough to trust.</h3>
                    <p>
                      The content now frames the studio around consultation,
                      treatment judgement, and visible results rather than
                      abstract luxury lines that do not help someone decide.
                    </p>
                    <div className={styles.sideMeta}>
                      <span>
                        <MapPin size={15} />
                        {location}
                      </span>
                      <span>
                        <Heart size={15} />
                        Skin and beauty focused
                      </span>
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
          heading="How appointments flow"
        />

        <TestimonialsSection
          testimonials={
            ai.testimonial_1
              ? [
                  {
                    name: 'Featured client',
                    location: 'Studio guest',
                    text: ai.testimonial_1,
                    stars: 5
                  },
                  ...TESTIMONIALS.slice(1)
                ]
              : TESTIMONIALS
          }
          accentColor={ACCENT}
          heading="What clients say after their visit"
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
                    Schedule your appointment
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
                Consultation-led {niche.toLowerCase()} for clients in {location}.
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

export default function AuraPage() {
  return (
    <Suspense fallback={<div>Preparing the studio preview...</div>}>
      <AuraContent />
    </Suspense>
  );
}
