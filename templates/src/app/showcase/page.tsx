'use client';

import {
  ArrowUpRight,
  CheckCircle2,
  Home,
  ImageIcon,
  PhoneCall,
  Trophy,
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
import { ShowcaseConfig as Config } from '@/configs/showcase';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './showcase.module.css';

const ACCENT = '#0f766e';

const SERVICE_ICONS = [Home, ImageIcon, Trophy];

const TESTIMONIALS = [
  {
    name: 'Rachel M.',
    location: 'Homeowner',
    text: 'The portfolio made it easy to trust them before the first meeting, and the finished project looked exactly as carefully handled as the examples.',
    stars: 5
  },
  {
    name: 'James T.',
    location: 'Renovation client',
    text: 'We could see how they documented their work, explained the scope clearly, and kept the job moving without constant surprises.',
    stars: 5
  },
  {
    name: 'Diana K.',
    location: 'Property owner',
    text: 'The before-and-after examples, timeline guidance, and handover quality all matched what we experienced on our own project.',
    stars: 5
  }
];

const TRUST_POINTS = [
  'Project photos and case-study style examples help clients see the finish standard before they enquire.',
  'Written scopes and staged planning make larger works easier to understand from the first conversation.',
  'The offer works for renovations, upgrades, and visual improvements where trust in workmanship matters most.'
];

const CLIENT_POINTS = [
  {
    title: 'Renovation planning',
    text: 'Useful for homeowners who want to improve quality, layout, or finish but need clarity on how the project will be delivered.'
  },
  {
    title: 'Visual proof of work',
    text: 'Ideal for clients who want to compare real examples of finish quality rather than choosing from a simple services list alone.'
  },
  {
    title: 'Higher-trust enquiries',
    text: 'Better suited to clients who compare workmanship, attention to detail, and project management before they ask for a quote.'
  }
];

function ShowcaseContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Your Craftsmanship Co.',
      niche: 'Professional Contractor',
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
            description: `${name} provides ${niche.toLowerCase()} in ${location} with project-led renovation, upgrade, and property-improvement services.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '124'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Trophy size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Project-led craftsmanship and property improvement in {location}
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
                  Work that looks considered before the first visit
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
                    'Portfolio-led presentation for better enquiries',
                    'Renovation, upgrade, and finish-focused project support',
                    `${rating}/5 rated by local property owners`
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
                    alt={`${name} project showcase`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Why it converts</span>
                    <strong>
                      Homeowners usually want to see quality of finish, clarity
                      on scope, and confidence that the work will be managed properly.
                    </strong>
                    <span className={styles.floatingMeta}>
                      A project-first presentation answers those questions before the first
                      estimate call even starts.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <ImageIcon size={16} />
                      Typical journey
                    </div>
                    <div className={styles.panelRow}>
                      <span>Project review</span>
                      <strong>First conversation</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Scope and estimate</span>
                      <strong>Clearly outlined</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Build and handover</span>
                      <strong>Managed cleanly</strong>
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
              <p className={styles.sectionEyebrow}>Project types</p>
              <h2 className={styles.sectionTitle}>
                A clearer view of the work, from renovation upgrades to detail-driven property improvements.
              </h2>
              <p className={styles.sectionDescription}>
                This structure helps clients understand where the business fits,
                what kind of finish to expect, and how different project types
                are handled before they request a consultation.
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

        <section className={styles.projectsSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Featured work</p>
              <h2 className={styles.sectionTitleDark}>
                Example project formats that make the quality of work easier to judge.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These cards make the portfolio feel more concrete by showing the
                sort of outcomes, scope, and client needs the business usually handles.
              </p>
            </div>

            <div className={styles.projectGrid}>
              {Config.projects.map((project, index) => (
                <Reveal key={project.name} delay={index * 0.12}>
                  <article
                    className={`${styles.projectCard} ${
                      project.featured ? styles.projectFeatured : ''
                    }`}
                  >
                    {project.tag ? (
                      <div className={styles.projectTag}>{t(project.tag)}</div>
                    ) : null}

                    <div className={styles.projectHeader}>
                      <div>
                        <h3>{t(project.name)}</h3>
                        <p className={styles.projectIdeal}>{t(project.idealFor)}</p>
                      </div>
                      <div className={styles.projectValue}>{t(project.value)}</div>
                    </div>

                    <div className={styles.projectList}>
                      {project.features.map((feature) => (
                        <div key={feature} className={styles.projectListItem}>
                          <CheckCircle2 size={16} />
                          <span>{t(feature)}</span>
                        </div>
                      ))}
                    </div>

                    <a href={`tel:${phone}`} className={styles.projectButton}>
                      Discuss a similar project
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
                  <p className={styles.sectionEyebrow}>Why clients trust it</p>
                  <h2 className={styles.sectionTitle}>
                    When the work is visual and detail-sensitive, clients need proof of standards before the first meeting.
                  </h2>
                  <p className={styles.sectionDescription}>
                    Better project proof, clearer process language, and a more considered presentation all help serious enquiries feel justified.
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
                      src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
                      alt="Project planning and finish details"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Client fit</div>
                    <h3>
                      Built for property owners who compare quality, process, and proof before they commit.
                    </h3>
                    <p>
                      The strongest enquiries usually come from clients who can
                      already see the style of work, level of detail, and project
                      management standard they are buying into.
                    </p>

                    <div className={styles.sideMeta}>
                      {CLIENT_POINTS.map((item) => (
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
          heading="How the project process works"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What local clients say"
        />

        <FAQSection faqs={Config.faqs} accentColor={ACCENT} />

        <section id="quote" className={styles.ctaSection}>
          <div className="container">
            <Reveal>
              <div className={styles.ctaPanel}>
                <div className={styles.ctaCopy}>
                  <p className={styles.sectionEyebrowDark}>Book a consultation</p>
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
                    Request estimate
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
                Project-led craftsmanship, renovation support, and premium property improvements across {location}.
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

export default function ShowcasePage() {
  return (
    <Suspense fallback={<div>Preparing the project showcase...</div>}>
      <ShowcaseContent />
    </Suspense>
  );
}
