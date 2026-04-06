'use client';

import {
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Home,
  Lightbulb,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Tv
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
import { SmartLivingConfig as Config } from '@/configs/smart-living';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './smart-living.module.css';

const ACCENT = '#8b5cf6';

const SOLUTION_ICONS = [Lightbulb, ShieldCheck, Tv];

const TESTIMONIALS = [
  {
    name: 'Ben A.',
    location: 'Homeowner',
    text: 'They planned the system around how we actually live, not just around gadgets. Lighting, heating, cameras, and media all feel joined up now.',
    stars: 5
  },
  {
    name: 'Karen T.',
    location: 'Renovation client',
    text: 'The automation was integrated during the renovation without slowing the project down. Handover was clear and nothing feels overcomplicated.',
    stars: 5
  },
  {
    name: 'Chris P.',
    location: 'Property owner',
    text: 'I wanted a smart home that was reliable for everyday use. The audit, design, and app setup were all handled properly from the start.',
    stars: 5
  }
];

const TRUST_POINTS = [
  'Home audits make it clear what should be automated, secured, or integrated before equipment is chosen.',
  'Lighting, climate, media, and smart access can be planned as one joined-up system instead of separate add-ons.',
  'Clients get setup support, app guidance, and handover that makes the system usable from day one.'
];

const CLIENT_POINTS = [
  {
    title: 'New smart-home installs',
    text: 'Useful for homeowners who want a better day-to-day living setup without building a complicated system they never use fully.'
  },
  {
    title: 'Renovations and upgrades',
    text: 'Suitable for properties already being upgraded where automation, lighting, audio, and security need to be coordinated properly.'
  },
  {
    title: 'Higher-value homes',
    text: 'Helpful when the project needs a more polished experience, cleaner integration, and better control over comfort, media, and safety.'
  }
];

function SmartLivingContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Intelligent Living Co.',
      niche: 'Smart Home Installation Service',
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
            description: `${name} provides ${niche.toLowerCase()} in ${location} including automation, lighting control, home security, and media integration.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '129'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Smartphone size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Smart-home automation, media, and security in {location}
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
                  Audit first. Integrate clearly. Control simply.
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
                    'Lighting, climate, security, and entertainment integration',
                    'System design matched to the way the home is actually used',
                    `${rating}/5 rated by local homeowners`
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
                    src="https://images.unsplash.com/photo-1558002038-1055e2e28ed1?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} smart home installation`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Homeowner priority</span>
                    <strong>
                      Most clients want their lighting, comfort, security, and media to work together without needing five different apps.
                    </strong>
                    <span className={styles.floatingMeta}>
                      Good planning makes the system feel calmer, easier to use,
                      and worth the investment long term.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <Bell size={16} />
                      Typical install path
                    </div>
                    <div className={styles.panelRow}>
                      <span>Home audit</span>
                      <strong>Before design</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>System planning</span>
                      <strong>Matched to lifestyle</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>App and user setup</span>
                      <strong>Included</strong>
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
              <p className={styles.sectionEyebrow}>Smart-home systems</p>
              <h2 className={styles.sectionTitle}>
                Clear support for automation, security, and entertainment that works as one system.
              </h2>
              <p className={styles.sectionDescription}>
                The service is structured so clients can understand quickly
                whether they need comfort automation, smart security, better media
                integration, or a more complete whole-home setup.
              </p>
            </div>

            <div className={styles.serviceGrid}>
              {Config.solutions.map((solution, index) => {
                const Icon = SOLUTION_ICONS[index % SOLUTION_ICONS.length];
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
              <p className={styles.sectionEyebrowDark}>Popular packages</p>
              <h2 className={styles.sectionTitleDark}>
                Clear options for a focused upgrade, a whole-home system, or a renovation-led install.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These packages help clients understand whether they need a
                smaller lifestyle upgrade, a more complete smart-home plan, or a
                coordinated install as part of wider building work.
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
                      Discuss this system
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
                    Smart-home projects feel more dependable when the technology is planned around real living habits instead of just equipment lists.
                  </h2>
                  <p className={styles.sectionDescription}>
                    Better audits, clearer integration choices, and a cleaner
                    handover make the system easier to understand and easier to
                    use once installation is complete.
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
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                      alt="Smart-home planning and control"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Best fit</div>
                    <h3>
                      Built for homeowners who want more comfort, better control,
                      and technology that feels easy to live with.
                    </h3>
                    <p>
                      Clients usually need straightforward advice on what to automate,
                      what to integrate, and how to avoid overbuilding the system.
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
          heading="How the smart-home process works"
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
                  <p className={styles.sectionEyebrowDark}>Book a home audit</p>
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
                Smart-home automation, lighting, security, and media integration across {location}.
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

export default function SmartPage() {
  return (
    <Suspense fallback={<div>Preparing the smart-home preview...</div>}>
      <SmartLivingContent />
    </Suspense>
  );
}
