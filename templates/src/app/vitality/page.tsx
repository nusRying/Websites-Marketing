'use client';

import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Flower2,
  HeartHandshake,
  Leaf,
  MoonStar,
  PhoneCall,
  Sparkles,
  Users
} from 'lucide-react';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import BookingWidget from '@/components/BookingWidget';
import FAQSection from '@/components/FAQSection';
import MobileActions from '@/components/MobileActions';
import PrestigeBadge from '@/components/PrestigeBadge';
import TestimonialsSection from '@/components/TestimonialsSection';
import { Reveal } from '@/components/Reveal';
import { VitalityConfig as Config } from '@/configs/vitality';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './vitality.module.css';

const ACCENT = '#84cc16';

const CLASS_ICONS = [Leaf, MoonStar, Sparkles];

const STUDIO_POINTS = [
  'Most wellness clients are not looking for a hardcore gym. They want movement, recovery, and calmer routines that fit real life.',
  'The best studios create structure without pressure: clear class formats, coaches who can scale sessions properly, and a space that feels restorative from the moment people walk in.',
  'Vitality is positioned as a premium local wellness studio for clients who want consistency, better energy, and a more sustainable relationship with health.'
];

const MEMBER_TYPES = [
  {
    title: 'Beginners returning to movement',
    text: 'Useful for clients who want a calmer start, clear guidance, and sessions that feel welcoming rather than intimidating.'
  },
  {
    title: 'Busy professionals',
    text: 'Designed for people who need flexible studio sessions that improve posture, energy, recovery, and day-to-day headspace.'
  },
  {
    title: 'Members building consistency',
    text: 'Best for clients who already value movement and want a steadier weekly practice supported by coaches and class structure.'
  }
];

const TESTIMONIALS = [
  {
    name: 'Hannah M.',
    location: 'Studio member',
    text: 'The biggest change was consistency. The classes are structured, the coaches are calm and attentive, and the studio feels like somewhere you actually want to come back to.',
    stars: 5
  },
  {
    name: 'Sadia K.',
    location: 'Private client',
    text: 'I joined for movement and stayed for the atmosphere. It feels premium without being intimidating, and the sessions are genuinely restorative.',
    stars: 5
  },
  {
    name: 'Rebecca T.',
    location: 'Membership client',
    text: 'The mix of strength, mobility, and recovery classes helped me build a better routine without feeling burnt out. It is the first wellness plan I have kept long term.',
    stars: 5
  }
];

function VitalityContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Vitality Studio',
      niche: 'Wellness Studio',
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
            description: `${name} provides wellness classes, memberships, and private sessions in ${location}.`,
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
                <Flower2 size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Movement, recovery, and wellbeing in {location}
                </p>
              </div>
            </div>

            <a href={`tel:${phone}`} className={styles.headerAction}>
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
                  A calmer studio experience built around consistency
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
                    'Studio classes, private sessions, and guided memberships',
                    'Suitable for beginners, returning movers, and clients wanting consistency',
                    `${rating}/5 average client rating`
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
                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} wellness studio`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Typical client goal</span>
                    <strong>
                      {ai.pain_point ||
                        'I want to feel stronger, calmer, and more consistent without forcing myself into a routine that never lasts.'}
                    </strong>
                    <span className={styles.floatingMeta}>
                      {ai.solution ||
                        'Vitality combines guided classes, coach support, and a calmer studio atmosphere so movement becomes something clients can actually sustain.'}
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <Calendar size={16} />
                      Studio rhythm
                    </div>
                    <div className={styles.panelRow}>
                      <span>Class mix</span>
                      <strong>Movement + recovery</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Booking</span>
                      <strong>Flexible weekly schedule</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Support</span>
                      <strong>Coach-led guidance</strong>
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

        <section className={styles.section}>
          <div className="container">
            <Reveal>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionEyebrow}>Class formats</p>
                <h2 className={styles.sectionTitle}>
                  Signature sessions that balance movement, recovery, and studio
                  calm
                </h2>
                <p className={styles.sectionDescription}>
                  The strongest wellness studios give members a clear weekly rhythm:
                  one class to reconnect, one to build strength and control, and one
                  to support recovery and nervous-system reset.
                </p>
              </div>
            </Reveal>

            <div className={styles.classesGrid}>
              {Config.classes.map((session, index) => {
                const Icon = CLASS_ICONS[index] || Leaf;

                return (
                  <Reveal key={session.name} delay={0.1 * index}>
                    <article className={styles.classCard}>
                      <div className={styles.serviceIcon}>
                        <Icon size={22} />
                      </div>
                      <div className={styles.classMeta}>{t(session.time)}</div>
                      <h3>{t(session.name)}</h3>
                      <p>{t(session.desc)}</p>
                      <div className={styles.classFocus}>{t(session.focus)}</div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.membershipSection}>
          <div className="container">
            <Reveal>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionEyebrow}>Memberships</p>
                <h2 className={styles.sectionTitle}>
                  Clear options for drop-ins, weekly practice, and guided private
                  support
                </h2>
                <p className={styles.sectionDescription}>
                  The offer needs to feel simple: a low-friction start, a stronger
                  regular membership, and a premium option for clients who want more
                  hands-on guidance.
                </p>
              </div>
            </Reveal>

            <div className={styles.plansGrid}>
              {Config.plans.map((plan, index) => (
                <Reveal key={plan.name} delay={0.08 * index}>
                  <article
                    className={`${styles.planCard} ${
                      plan.featured ? styles.featuredPlan : ''
                    }`}
                  >
                    <div className={styles.planTop}>
                      <div>
                        <h3>{t(plan.name)}</h3>
                        <p className={styles.planPrice}>{t(plan.price)}</p>
                      </div>
                      {plan.tag ? (
                        <span className={styles.planTag}>{t(plan.tag)}</span>
                      ) : null}
                    </div>
                    <p className={styles.planIdeal}>{t(plan.idealFor)}</p>
                    <div className={styles.planFeatures}>
                      {plan.features.map((feature) => (
                        <div key={feature} className={styles.serviceInclude}>
                          <CheckCircle2 size={15} />
                          <span>{t(feature)}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.experienceSection}>
          <div className="container">
            <div className={styles.experienceGrid}>
              <Reveal>
                <div className={styles.experienceCopy}>
                  <p className={styles.sectionEyebrow}>Studio experience</p>
                  <h2 className={styles.sectionTitle}>
                    A wellness brand works when the space feels as considered as the
                    sessions themselves
                  </h2>
                  <div className={styles.experienceList}>
                    {STUDIO_POINTS.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>

                  <div className={styles.advisoryCard}>
                    <div className={styles.panelHeader}>
                      <HeartHandshake size={16} />
                      What members usually value
                    </div>
                    <div className={styles.panelRow}>
                      <span>Atmosphere</span>
                      <strong>Calm and premium</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Guidance</span>
                      <strong>Supportive, not intense</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Routine</span>
                      <strong>Easy to sustain</strong>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className={styles.memberGrid}>
                {MEMBER_TYPES.map((item, index) => (
                  <Reveal key={item.title} delay={0.1 * index}>
                    <article className={styles.memberCard}>
                      <div className={styles.serviceIcon}>
                        {index === 0 ? (
                          <Leaf size={22} />
                        ) : index === 1 ? (
                          <MoonStar size={22} />
                        ) : (
                          <Users size={22} />
                        )}
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="container">
            <Reveal>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionEyebrow}>Member journey</p>
                <h2 className={styles.sectionTitle}>
                  A cleaner path from first visit to a lasting routine
                </h2>
                <p className={styles.sectionDescription}>
                  Most studio buyers want to know three things: what to book first,
                  whether they will feel comfortable, and how the studio will help
                  them stay consistent after the first session.
                </p>
              </div>
            </Reveal>

            <div className={styles.processGrid}>
              {Config.process.map((step, index) => (
                <Reveal key={step.number} delay={0.08 * index}>
                  <article className={styles.processCard}>
                    <span className={styles.processNumber}>{step.number}</span>
                    <h3>{t(step.title)}</h3>
                    <p>{t(step.desc)}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection testimonials={TESTIMONIALS} accentColor={ACCENT} />
        <FAQSection faqs={Config.faqs} accentColor={ACCENT} />

        <section className={styles.closingSection}>
          <div className="container">
            <Reveal>
              <div className={styles.closingCard}>
                <p className={styles.sectionEyebrow}>Book a first session</p>
                <h2 className={styles.sectionTitle}>
                  {ai.solution || t(Config.footer.title)}
                </h2>
                <p className={styles.sectionDescription}>
                  {ai.pain_point || t(Config.footer.subtitle)}
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
                    'Studio classes, memberships, and private wellbeing sessions',
                    'Beginner-friendly guidance with a premium studio atmosphere',
                    `${name} welcomes clients across ${location}`
                  ].map((item) => (
                    <div key={item} className={styles.signalItem}>
                      <CheckCircle2 size={16} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <BookingWidget bookingUrl={booking_url} businessName={name} />
      <MobileActions phone={phone} name={name} />
    </div>
  );
}

export default function VitalityPage() {
  return (
    <Suspense fallback={<div>Preparing the studio...</div>}>
      <VitalityContent />
    </Suspense>
  );
}
