'use client';

import {
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Lock,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Video
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
import { SmartSecurityConfig as Config } from '@/configs/smart-security';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './smart-security.module.css';

const ACCENT = '#22d3ee';

const SERVICE_ICONS = [Video, Bell, Lock];

const TESTIMONIALS = [
  {
    name: 'Richard B.',
    location: 'Business owner',
    text: 'They surveyed the premises properly, explained where the weak points were, and installed a system that our staff can actually use without confusion.',
    stars: 5
  },
  {
    name: 'Helen C.',
    location: 'Homeowner',
    text: 'We wanted cameras, alarms, and phone access without it feeling complicated. The setup was clean, the app is easy, and the handover was clear.',
    stars: 5
  },
  {
    name: 'Alex P.',
    location: 'Property manager',
    text: 'What matters to us is reliability, reporting, and support after installation. They covered all three and made the system easier to manage across sites.',
    stars: 5
  }
];

const TRUST_POINTS = [
  'Security audits make it clear what risks exist before equipment is specified.',
  'Residential and commercial clients get systems matched to access needs, visibility, and response requirements.',
  'Monitoring, mobile access, and handover guidance are explained properly before the install is agreed.'
];

const CLIENT_POINTS = [
  {
    title: 'Homes and family properties',
    text: 'Useful for homeowners who want clearer perimeter coverage, remote access, and an alarm setup that is practical day to day.'
  },
  {
    title: 'Commercial premises',
    text: 'Suitable for offices, retail sites, workshops, and mixed-use spaces where access control and recorded coverage matter.'
  },
  {
    title: 'Managed portfolios',
    text: 'Helpful for landlords and property managers who need dependable systems, user permissions, and sensible support after installation.'
  }
];

function SecurityContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Fortress Smart Systems',
      niche: 'Security Installation Service',
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
            description: `${name} provides ${niche.toLowerCase()} in ${location} including CCTV, alarms, access control, and monitored security support.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '137'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  CCTV, alarms, and access control in {location}
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
                  Audit first. Install clearly. Monitor properly.
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
                    'CCTV, alarms, smart access, and monitored setups',
                    'Residential and commercial systems matched to risk level',
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
                    src="https://images.unsplash.com/photo-1558002038-1055e2e28ed1?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} security installation`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Client priority</span>
                    <strong>
                      Most security buyers want the right coverage, easy user access,
                      and a system that makes sense the moment it is installed.
                    </strong>
                    <span className={styles.floatingMeta}>
                      Clear audit findings and sensible equipment choices reduce
                      overspending and prevent blind spots later.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <Smartphone size={16} />
                      Typical install path
                    </div>
                    <div className={styles.panelRow}>
                      <span>Site audit</span>
                      <strong>Before quote</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>System design</span>
                      <strong>Matched to property</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>User handover</span>
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
              <p className={styles.sectionEyebrow}>Security services</p>
              <h2 className={styles.sectionTitle}>
                Clear support for surveillance, intrusion alerts, and controlled access.
              </h2>
              <p className={styles.sectionDescription}>
                The offer is structured so a homeowner, business owner, or
                property manager can see quickly whether they need recording,
                alarm coverage, door-entry control, or a more joined-up system.
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

        <section className={styles.plansSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>System options</p>
              <h2 className={styles.sectionTitleDark}>
                Clear packages for a home setup, monitored business coverage, or access-controlled entry.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These options help clients understand whether they need a basic
                install, a broader monitored arrangement, or tighter control over
                who can enter and when.
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
                      Discuss this setup
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
                    Security projects feel more dependable when the risks are explained clearly and the system is practical to use every day.
                  </h2>
                  <p className={styles.sectionDescription}>
                    Good security is not just more hardware. It is the right coverage,
                    sensible user access, and a handover that leaves the client confident.
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
                      alt="Security planning and monitoring"
                      fill
                      sizes="(max-width: 960px) 100vw, 42vw"
                      className={styles.sideCardImage}
                    />
                  </div>

                  <div className={styles.sideCardBody}>
                    <div className={styles.sideCardLabel}>Client fit</div>
                    <h3>
                      Built for homes, businesses, and managed properties that need stronger visibility and more reliable control.
                    </h3>
                    <p>
                      Clients usually need straightforward advice on camera placement,
                      alarm response, user access, and how the system will work in real use.
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
          heading="How the security install process works"
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
                  <p className={styles.sectionEyebrowDark}>Book a security audit</p>
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
                    Request audit
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
                CCTV, alarm systems, access control, and monitoring support across {location}.
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

export default function SecurityPage() {
  return (
    <Suspense fallback={<div>Preparing the security preview...</div>}>
      <SecurityContent />
    </Suspense>
  );
}
