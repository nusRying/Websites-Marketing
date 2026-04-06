'use client';

import {
  ArrowUpRight,
  BookOpen,
  Brain,
  CheckCircle2,
  GraduationCap,
  PhoneCall,
  School,
  Users,
  Waypoints
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
import { ScholasticConfig as Config } from '@/configs/scholastic';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './scholastic.module.css';

const ACCENT = '#0f766e';

const SERVICE_ICONS = [BookOpen, Brain, GraduationCap];

const TESTIMONIALS = [
  {
    name: 'Olivia P.',
    location: 'A-level student',
    text: 'The sessions were structured properly from the first assessment. I knew what I was improving each week instead of just doing more worksheets.',
    stars: 5
  },
  {
    name: 'Tom H.',
    location: 'Parent',
    text: 'What stood out was the communication. We got clear progress updates, honest advice, and a plan that actually matched our son\'s gaps.',
    stars: 5
  },
  {
    name: 'Emma J.',
    location: 'University applicant',
    text: 'They helped with subject tutoring and admissions support at the same time, which made the whole process feel much more joined up.',
    stars: 5
  }
];

const TRUST_POINTS = [
  'Assessment-led tutoring makes it clear what the student needs before a long-term plan is agreed.',
  'Parents and students get regular updates on confidence, progress, and the next learning focus.',
  'The offer covers core academic support, exam preparation, and higher-level progression planning.'
];

const FAMILY_POINTS = [
  {
    title: 'Primary to sixth form',
    text: 'Useful for students who need stronger subject foundations, steadier study habits, or support as academic demands increase.'
  },
  {
    title: 'Exam-year preparation',
    text: 'Suitable for GCSE and A-level students who need revision structure, technique work, and support under real deadlines.'
  },
  {
    title: 'Future pathways',
    text: 'Helpful for families looking at university applications, competitive entry, or a more ambitious academic target.'
  }
];

function ScholasticContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Scholastic Academy',
      niche: 'Private Tutoring Academy',
      location: 'Academic District',
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
            description: `${name} provides ${niche.toLowerCase()} in ${location} including subject tutoring, exam preparation, and academic planning support.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '141'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <School size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Tutoring, exam preparation, and academic planning in {location}
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
                <p className={styles.eyebrow}>
                  Assessment first. Personal plan. Measurable progress.
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
                    '1:1 tutoring, exam support, and academic mentoring',
                    'Clear plans for confidence, grades, and progression',
                    `${rating}/5 rated by local families and students`
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
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} tutoring session`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Parent priority</span>
                    <strong>
                      Families usually want to know why a student is struggling,
                      how progress will be tracked, and what improvement should look like.
                    </strong>
                    <span className={styles.floatingMeta}>
                      A proper assessment and learning plan make tutoring feel
                      focused instead of generic.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <Waypoints size={16} />
                      Typical pathway
                    </div>
                    <div className={styles.panelRow}>
                      <span>Initial assessment</span>
                      <strong>First step</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Weekly sessions</span>
                      <strong>Matched to goals</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Progress review</span>
                      <strong>Built in</strong>
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
              <p className={styles.sectionEyebrow}>Learning programmes</p>
              <h2 className={styles.sectionTitle}>
                Clear support for foundation building, exam preparation, and ambitious next steps.
              </h2>
              <p className={styles.sectionDescription}>
                Students do better when the tutoring offer is clear from the
                start, with the right level of subject support and a realistic
                plan for where the learning should lead.
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
              <p className={styles.sectionEyebrowDark}>Popular routes</p>
              <h2 className={styles.sectionTitleDark}>
                Clear options for an initial assessment, ongoing tutoring, or focused exam support.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These options make it easier for families to understand whether
                the student needs a first diagnostic step, steady weekly support,
                or a shorter-term academic push.
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
                      Discuss this route
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
                  <p className={styles.sectionEyebrow}>Why families trust it</p>
                  <h2 className={styles.sectionTitle}>
                    Tutoring feels more dependable when the student has a clear
                    starting point, regular progress checks, and a realistic academic target.
                  </h2>
                  <p className={styles.sectionDescription}>
                    Parents and students want the tutoring to feel organised,
                    measurable, and properly matched to the stage the learner is at.
                  </p>

                  <div className={styles.trustPoints}>
                    {TRUST_POINTS.map((point) => (
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
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                      alt="Tutoring and study planning"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Student fit</div>
                    <h3>
                      Built for students who need stronger subject confidence,
                      better exam structure, or a clearer pathway forward.
                    </h3>
                    <p>
                      Families usually need honest assessment, consistent tutoring,
                      and a plan that connects each session to a larger academic goal.
                    </p>

                    <div className={styles.sideMeta}>
                      {FAMILY_POINTS.map((item) => (
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
          heading="How the tutoring process works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What local families say"
        />

        <FAQSection faqs={Config.faqs} accentColor={ACCENT} />

        <section id="quote" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Book an assessment</p>
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
                    Request consultation
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
                Subject tutoring, exam preparation, and academic planning support across {location}.
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

export default function ScholasticPage() {
  return (
    <Suspense fallback={<div>Preparing the academic preview...</div>}>
      <ScholasticContent />
    </Suspense>
  );
}
