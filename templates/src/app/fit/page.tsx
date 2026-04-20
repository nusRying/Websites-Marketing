'use client';

import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Dumbbell,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Target,
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
import { FitConfig as Config } from '@/configs/fit';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './fit.module.css';

const ACCENT = '#b7ff3c';

const PROGRAM_ICONS = [Target, Users, Sparkles];

const TESTIMONIALS = [
  {
    name: 'Ryan T.',
    location: 'Strength member',
    text: 'What kept me here was the structure. Every session has a purpose, the coaches know when to push, and I am stronger now than I have been in years.',
    stars: 5
  },
  {
    name: 'Leah M.',
    location: 'Coaching client',
    text: 'I joined wanting fat-loss support and more confidence in the gym. The programming was clear, the accountability was real, and the results actually lasted.',
    stars: 5
  },
  {
    name: 'Omar H.',
    location: 'Small-group member',
    text: 'The sessions feel coached, not chaotic. You still get energy from the room, but the form cues and progression make it feel far more personal.',
    stars: 5
  }
];

const MEMBER_POINTS = [
  'Programmes are built around measurable goals, not random workouts.',
  'Coaches give real form correction, progression, and accountability.',
  'The club works for beginners, returning gym-goers, and performance-focused members.'
];

const CULTURE_POINTS = [
  {
    title: 'Goal-first onboarding',
    text: 'Every member starts with a conversation about training history, current routine, and the result they are actually trying to reach.'
  },
  {
    title: 'Coached gym floor',
    text: 'Sessions are not left to guesswork. Members get support with movement quality, exercise selection, and progression over time.'
  },
  {
    title: 'Long-term consistency',
    text: 'The offer is built to help people stay consistent for months, not just train hard for two weeks and disappear.'
  }
];

function FitContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Fit Foundry Club',
      niche: 'Performance Gym',
      location: 'Central District',
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
            description: `${name} provides ${niche.toLowerCase()} coaching, memberships, and small-group training in ${location}.`,
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
                <Dumbbell size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Strength, conditioning, and coached training in {location}
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
                <p className={styles.eyebrow}>Coaching-led gym membership</p>
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
                    'Strength, fat-loss, and performance support under one roof',
                    'Small-group coaching plus open-gym membership options',
                    `${rating}/5 rated by local members`
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
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} training gym`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Member outcome</span>
                    <strong>Progress feels structured, measured, and easier to stick with.</strong>
                    <span className={styles.floatingMeta}>
                      A better mix of coaching, accountability, and training
                      variety than a standard gym membership.
                    </span>
                  </div>

                  <div className={styles.floatingSchedule}>
                    <div className={styles.scheduleHeader}>
                      <ShieldCheck size={16} />
                      Coaching system
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>Initial goal review</span>
                      <strong>Included</strong>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>Small-group sessions</span>
                      <strong>Book weekly</strong>
                    </div>
                    <div className={styles.scheduleRow}>
                      <span>Progress check-ins</span>
                      <strong>Monthly</strong>
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

        <section className={styles.programsSection}>
          <div className="container">
            <div className={styles.sectionIntro}>
              <p className={styles.sectionEyebrow}>Training options</p>
              <h2 className={styles.sectionTitle}>
                Programmes that cover coaching, community, and real-world
                consistency.
              </h2>
              <p className={styles.sectionDescription}>
                Choose between one-to-one coaching, small-group sessions, and
                performance-focused programming depending on the level of support
                and structure you want.
              </p>
            </div>

            <div className={styles.programGrid}>
              {Config.programs.map((program, index) => {
                const Icon = PROGRAM_ICONS[index % PROGRAM_ICONS.length];
                const aiOverride =
                  index === 0
                    ? ai.service_1
                    : index === 1
                      ? ai.service_2
                      : index === 2
                        ? ai.service_3
                        : undefined;

                return (
                  <Reveal key={program.title} delay={index * 0.12}>
                    <article className={styles.programCard}>
                      <div className={styles.programIcon}>
                        <Icon size={22} />
                      </div>
                      <h3>{aiOverride || t(program.title)}</h3>
                      <p>{t(program.desc)}</p>

                      <div className={styles.programList}>
                        {program.includes.map((item) => (
                          <div key={item} className={styles.programListItem}>
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

        <section className={styles.membershipSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Memberships</p>
              <h2 className={styles.sectionTitleDark}>
                Clear paths for people joining for access, coached sessions, or
                hands-on transformation support.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                Each plan explains who it is for and what level of coaching comes
                with it, so new members can choose based on the support they
                actually need.
              </p>
            </div>

            <div className={styles.membershipGrid}>
              {Config.memberships.map((plan, index) => (
                <Reveal key={plan.title} delay={index * 0.12}>
                  <article
                    className={`${styles.membershipCard} ${
                      plan.featured ? styles.membershipFeatured : ''
                    }`}
                  >
                    {plan.tag ? (
                      <div className={styles.membershipTag}>{t(plan.tag)}</div>
                    ) : null}

                    <div className={styles.membershipHeader}>
                      <div>
                        <h3>{t(plan.title)}</h3>
                        <p className={styles.membershipIdeal}>
                          {t(plan.idealFor)}
                        </p>
                      </div>
                      <div className={styles.membershipPrice}>
                        {t(plan.price)}
                      </div>
                    </div>

                    <div className={styles.membershipList}>
                      {plan.features.map((item) => (
                        <div key={item} className={styles.membershipListItem}>
                          <CheckCircle2 size={16} />
                          <span>{t(item)}</span>
                        </div>
                      ))}
                    </div>

                    <a href={`tel:${phone}`} className={styles.membershipButton}>
                      Ask about this plan
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.resultsSection}>
          <div className="container">
            <div className={styles.resultsGrid}>
              <Reveal>
                <div className={styles.resultsCopy}>
                  <p className={styles.sectionEyebrow}>Why members stay</p>
              <h2 className={styles.sectionTitle}>
                The difference is the coaching, not just the equipment.
              </h2>
              <p className={styles.sectionDescription}>
                Many gyms sell access. Here, the focus is on stronger coaching,
                clearer onboarding, and a training system designed to support
                long-term progress rather than short bursts of motivation.
              </p>

                  <div className={styles.resultsPoints}>
                    {MEMBER_POINTS.map((point) => (
                      <div key={point} className={styles.resultsPoint}>
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
                      src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
                      alt="Personal training session"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Club culture</div>
                    <h3>Built for members who want results without training alone.</h3>
                    <p>
                      The environment combines proper coaching standards with a
                      more welcoming training culture, so the club works for
                      ambitious beginners as well as experienced lifters.
                    </p>

                    <div className={styles.sideMeta}>
                      {CULTURE_POINTS.map((item) => (
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
          heading="How the membership and coaching setup works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What members say after joining"
        />

        <FAQSection faqs={Config.faqs} accentColor={ACCENT} />

        <section id="book" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Start here</p>
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
                    Book a trial session
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
                Coaching-led {niche.toLowerCase()} for members who want strength,
                consistency, and better training habits in {location}.
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

export default function FitPage() {
  return (
    <Suspense fallback={<div>Preparing the training preview...</div>}>
      <FitContent />
    </Suspense>
  );
}
