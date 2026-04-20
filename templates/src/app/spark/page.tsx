'use client';

import {
  ArrowUpRight,
  CheckCircle2,
  Home,
  Lightbulb,
  PhoneCall,
  ShieldCheck,
  Sun,
  Zap
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
import { SparkConfig as Config } from '@/configs/spark';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './spark.module.css';

const ACCENT = '#f59e0b';

const SERVICE_ICONS = [ShieldCheck, Sun, Home];

const TESTIMONIALS = [
  {
    name: 'Neil H.',
    location: 'Homeowner',
    text: 'They handled a full rewire with clear safety advice, sensible timing, and no mess left behind. The certification and handover were straightforward.',
    stars: 5
  },
  {
    name: 'Sue M.',
    location: 'Business owner',
    text: 'We had an urgent electrical fault late in the evening. They arrived quickly, made the site safe, and explained exactly what needed doing next.',
    stars: 5
  },
  {
    name: 'Ian T.',
    location: 'Extension project',
    text: 'The fit-out for our extension and EV charging setup was planned properly from the start. Everything feels neat, modern, and reliable.',
    stars: 5
  }
];

const TRUST_POINTS = [
  'Safety checks and surveys make the electrical risk clear before work begins.',
  'Homeowners and businesses can see the difference between repair work, upgrades, and larger installations.',
  'Certificates, testing, and practical aftercare are treated as part of the job, not an afterthought.'
];

const CLIENT_POINTS = [
  {
    title: 'Faults and urgent visits',
    text: 'Useful for dangerous faults, power loss, repeated tripping, and electrical issues that need a safer diagnosis before more work is done.'
  },
  {
    title: 'Upgrades and rewires',
    text: 'Suitable for ageing systems, extensions, renovations, and properties that need a more modern electrical setup.'
  },
  {
    title: 'Energy and smart systems',
    text: 'Helpful for EV charging, solar-linked work, and smarter control setups where safety and future usability both matter.'
  }
];

function SparkContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Volt Tech Solutions',
      niche: 'Electrical Contractor',
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
            description: `${name} provides ${niche.toLowerCase()} in ${location} including fault finding, rewires, upgrades, and energy-related installations.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '133'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Zap size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Electrical repairs, upgrades, and energy systems in {location}
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
                  Test first. Quote clearly. Certify properly.
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
                    'Fault finding, rewires, upgrades, and energy installs',
                    'Residential and commercial electrical support',
                    `${rating}/5 rated by local clients`
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
                    src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} electrical work`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Client priority</span>
                    <strong>
                      Most clients want to know whether the issue is dangerous, what the fix involves, and whether the work will be certified properly.
                    </strong>
                    <span className={styles.floatingMeta}>
                      Clear testing, practical advice, and a proper written scope
                      remove a lot of uncertainty before the job starts.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <Lightbulb size={16} />
                      Typical job flow
                    </div>
                    <div className={styles.panelRow}>
                      <span>Testing and inspection</span>
                      <strong>First step</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Quote and scope</span>
                      <strong>Before work begins</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Certification</span>
                      <strong>Included where required</strong>
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
              {Config.safetyBar.map((item) => (
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
              <p className={styles.sectionEyebrow}>Electrical services</p>
              <h2 className={styles.sectionTitle}>
                Clear support for safety work, major upgrades, and smarter energy systems.
              </h2>
              <p className={styles.sectionDescription}>
                Clients can see quickly whether they need urgent electrical
                repairs, a larger upgrade project, or an installation that helps
                future-proof the property.
              </p>
            </div>

            <div className={styles.serviceGrid}>
              {Config.solutions.map((solution, index) => {
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
                  <Reveal key={solution.title} delay={index * 0.12}>
                    <article className={styles.serviceCard}>
                      <div className={styles.serviceIcon}>
                        <Icon size={22} />
                      </div>
                      <h3>{aiOverride || t(solution.title)}</h3>
                      <p>{t(solution.desc)}</p>

                      <div className={styles.serviceList}>
                        {solution.includes.map((item) => (
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

        <section className={styles.plansSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Service options</p>
              <h2 className={styles.sectionTitleDark}>
                Clear choices for an urgent repair, a full upgrade, or an energy-ready installation.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These options make it easier for clients to understand what sort
                of electrical support they need before a quote is prepared.
              </p>
            </div>

            <div className={styles.planGrid}>
              {Config.plans.map((plan, index) => (
                <Reveal key={plan.name} delay={index * 0.12}>
                  <article
                    className={`${styles.planCard} ${
                      plan.featured ? styles.planFeatured : ''
                    }`}
                  >
                    {plan.tag ? (
                      <div className={styles.planTag}>{t(plan.tag)}</div>
                    ) : null}

                    <div className={styles.planHeader}>
                      <div>
                        <h3>{t(plan.name)}</h3>
                        <p className={styles.planIdeal}>{t(plan.idealFor)}</p>
                      </div>
                      <div className={styles.planPrice}>{t(plan.price)}</div>
                    </div>

                    <div className={styles.planList}>
                      {plan.features.map((feature) => (
                        <div key={feature} className={styles.planListItem}>
                          <CheckCircle2 size={16} />
                          <span>{t(feature)}</span>
                        </div>
                      ))}
                    </div>

                    <a href={`tel:${phone}`} className={styles.planButton}>
                      Discuss this service
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
                    Electrical work feels safer when the problem is tested properly, the fix is explained clearly, and the certification is handled correctly.
                  </h2>
                  <p className={styles.sectionDescription}>
                    Good electrical services are not just about doing the work.
                    They are about leaving the client confident that the system
                    is safer, more reliable, and documented properly.
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
                      src="https://images.unsplash.com/photo-1581092919535-7146ff1a5903?auto=format&fit=crop&w=1200&q=80"
                      alt="Electrical inspection and planning"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Client fit</div>
                    <h3>
                      Built for homes and businesses that need electrical work handled safely, clearly, and without guesswork.
                    </h3>
                    <p>
                      Clients usually need honest fault diagnosis, realistic upgrade advice,
                      and a team that can explain both the immediate fix and the longer-term option.
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
          heading="How the electrical service process works"
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
                  <p className={styles.sectionEyebrowDark}>Book a safety check</p>
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
                    Request quote
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
                Electrical repairs, rewires, upgrades, and energy-ready installations across {location}.
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

export default function SparkPage() {
  return (
    <Suspense fallback={<div>Preparing the electrical preview...</div>}>
      <SparkContent />
    </Suspense>
  );
}
