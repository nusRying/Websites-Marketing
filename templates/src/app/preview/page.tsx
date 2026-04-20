'use client';

import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  PhoneCall,
  ShieldCheck,
  Star,
  ThumbsUp,
  Wrench
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
import { LeadMachineConfig as Config } from '@/configs/lead-machine';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './preview.module.css';

const ACCENT = '#2563eb';

const SERVICE_ICONS = [Clock3, ShieldCheck, ThumbsUp];

const CLIENT_POINTS = [
  'Most local-service buyers want three things quickly: confidence that someone will respond, clarity on price and scope, and proof that the work will be handled properly.',
  'A strong default template needs to work across different service categories, so the messaging has to stay broad enough for reuse while still sounding credible to a real local customer.',
  'Lead Machine is positioned as that flexible client-facing funnel: trustworthy, practical, and built to turn local traffic into calls, bookings, and quote requests.'
];

const CUSTOMER_TYPES = [
  {
    title: 'Urgent enquiries',
    text: 'Useful for customers who need a fast response, want to speak to a real business quickly, and do not want to wait around for a quote.'
  },
  {
    title: 'Planned jobs and estimates',
    text: 'Suitable for customers comparing providers who want clearer pricing, better communication, and confidence before booking.'
  },
  {
    title: 'Repeat local customers',
    text: 'Helpful for service businesses that rely on trust, recommendations, and ongoing local visibility rather than one-off cold traffic.'
  }
];

const TESTIMONIALS = [
  {
    name: 'Rachel P.',
    location: 'Local customer',
    text: 'They answered quickly, explained the job clearly, and made the whole process feel straightforward from the first call to the finished work.',
    stars: 5
  },
  {
    name: 'Mark H.',
    location: 'Repeat client',
    text: 'What stood out was how easy they were to deal with. Fast response, no confusion on price, and the work was done properly.',
    stars: 5
  },
  {
    name: 'Sofia L.',
    location: 'Homeowner',
    text: 'I booked because the site was clear and credible. The service matched that impression exactly, which is rare with local providers.',
    stars: 5
  }
];

function PreviewContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Your Business Name',
      niche: 'Local Service Specialist',
      location: 'Local Area',
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
            '@type': Config.schemaType,
            name,
            telephone: phone,
            areaServed: location,
            description: `${name} provides ${niche.toLowerCase()} in ${location} with fast response times, clear pricing, and trusted local service.`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: rating,
              reviewCount: '162'
            }
          })
        }}
      />

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.brandBlock}>
              <div className={styles.logoMark}>
                <Wrench size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>
                  Trusted {niche.toLowerCase()} in {location}
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
                <div className={styles.ratingBar}>
                  <div className={styles.starRow}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span>{rating}/5 local rating</span>
                </div>

                <PrestigeBadge
                  niche={niche}
                  location={location}
                  accentColor={ACCENT}
                />

                <h1 className={styles.heroTitle}>
                  {ai.hero_title || t(Config.hero.title)}
                </h1>

                <p className={styles.heroDescription}>
                  {ai.hero_subtitle || ai.pain_point || t(Config.hero.subtitle)}
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
                    'Fast local response with clear next steps',
                    'Transparent quotes and work explained properly before booking',
                    'Designed to convert calls, forms, and direct service enquiries'
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
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <div className={styles.heroImageShell}>
                  <Image
                    src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80"
                    alt={`${name} service team`}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingCard}>
                    <span className={styles.floatingLabel}>Why this converts</span>
                    <strong>
                      {ai.solution ||
                        'Customers decide faster when the service feels trustworthy, responsive, and easy to book.'}
                    </strong>
                    <span className={styles.floatingMeta}>
                      This default template is built to make that decision easier:
                      clear reassurance, useful service structure, and strong local
                      call-to-action placement.
                    </span>
                  </div>

                  <div className={styles.floatingPanel}>
                    <div className={styles.panelHeader}>
                      <Clock3 size={16} />
                      Customer priorities
                    </div>
                    <div className={styles.panelRow}>
                      <span>Response</span>
                      <strong>Fast and local</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Pricing</span>
                      <strong>Clear before work starts</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Trust</span>
                      <strong>Proof and reassurance</strong>
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
                <p className={styles.sectionEyebrow}>Service highlights</p>
                <h2 className={styles.sectionTitle}>
                  A reusable local-service page still needs credible reasons to book
                </h2>
                <p className={styles.sectionDescription}>
                  The default route should work across different service categories,
                  but it still has to sound like a real business that solves real
                  customer problems. That means response, trust, and clarity have to
                  be obvious within seconds.
                </p>
              </div>
            </Reveal>

            <div className={styles.servicesGrid}>
              {Config.features.map((feature, index) => {
                const Icon = SERVICE_ICONS[index] || CheckCircle2;

                return (
                  <Reveal key={feature.title} delay={0.1 * index}>
                    <article className={styles.serviceCard}>
                      <div className={styles.serviceIcon}>
                        <Icon size={22} />
                      </div>
                      <h3>{t(feature.title)}</h3>
                      <p>{t(feature.desc)}</p>
                      <div className={styles.serviceIncludes}>
                        {feature.includes.map((item) => (
                          <div key={item} className={styles.serviceInclude}>
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

        <section className={styles.offersSection}>
          <div className="container">
            <Reveal>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionEyebrow}>Offer structure</p>
                <h2 className={styles.sectionTitle}>
                  Clear options help customers understand how to book
                </h2>
                <p className={styles.sectionDescription}>
                  Even if the final service is customised, local customers respond
                  better when the page explains what kinds of jobs the business takes
                  on and how enquiries are handled.
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

        <section className={styles.section}>
          <div className="container">
            <div className={styles.advisoryGrid}>
              <Reveal>
                <div className={styles.advisoryCopy}>
                  <p className={styles.sectionEyebrow}>Why this template works</p>
                  <h2 className={styles.sectionTitle}>
                    The strongest default page is simple enough to reuse and strong
                    enough to sell
                  </h2>
                  <div className={styles.advisoryList}>
                    {CLIENT_POINTS.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>

                  <div className={styles.advisoryCard}>
                    <div className={styles.panelHeader}>
                      <ShieldCheck size={16} />
                      Conversion essentials
                    </div>
                    <div className={styles.panelRow}>
                      <span>Trust signals</span>
                      <strong>Near the top</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>Offer clarity</span>
                      <strong>Easy to scan</strong>
                    </div>
                    <div className={styles.panelRow}>
                      <span>CTA flow</span>
                      <strong>Call or book quickly</strong>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className={styles.clientGrid}>
                {CUSTOMER_TYPES.map((item, index) => (
                  <Reveal key={item.title} delay={0.1 * index}>
                    <article className={styles.clientCard}>
                      <div className={styles.serviceIcon}>
                        {index === 0 ? (
                          <Clock3 size={22} />
                        ) : index === 1 ? (
                          <ShieldCheck size={22} />
                        ) : (
                          <ThumbsUp size={22} />
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
                <p className={styles.sectionEyebrow}>Booking flow</p>
                <h2 className={styles.sectionTitle}>
                  A clean local-service path from enquiry to confirmed job
                </h2>
                <p className={styles.sectionDescription}>
                  Local landing pages convert better when the customer can quickly
                  understand how the business responds, when a quote happens, and
                  what to expect next.
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
                <p className={styles.sectionEyebrow}>Ready to convert local traffic</p>
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
                    'A strong default page for service-business demos',
                    'Clear reassurance, offer structure, and booking prompts',
                    `${name} can be personalised instantly for ${location}`
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

export default function PreviewPage() {
  return (
    <Suspense fallback={<div>Loading preview...</div>}>
      <PreviewContent />
    </Suspense>
  );
}
