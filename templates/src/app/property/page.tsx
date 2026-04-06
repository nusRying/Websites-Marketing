'use client';

import {
  ArrowUpRight,
  Bath,
  BedDouble,
  Building2,
  CarFront,
  CheckCircle2,
  KeyRound,
  LineChart,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles
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
import { PropertyConfig as Config } from '@/configs/property';
import { usePersonalization } from '@/lib/usePersonalization';
import styles from './property.module.css';

const ACCENT = '#b78a43';

const SERVICE_ICONS = [LineChart, KeyRound, ShieldCheck];

const TESTIMONIALS = [
  {
    name: 'Louise M.',
    location: 'Home seller',
    text: 'The strategy was clear from the first meeting. We relaunched with better pricing discipline, stronger photography, and accepted an offer above our target within days.',
    stars: 5
  },
  {
    name: 'Daniel and Priya R.',
    location: 'Buyer clients',
    text: 'We were relocating on a tight timeline and needed someone commercially sharp. They shortlisted properly, negotiated firmly, and kept the whole move calm.',
    stars: 5
  },
  {
    name: 'Helen S.',
    location: 'Landlord and investor',
    text: 'They look after presentation, tenant quality, and the bigger portfolio decisions. It feels like having an advisor, not just an agent.',
    stars: 5
  }
];

const MARKET_NOTES = [
  'Pricing is based on live comparable evidence and buyer behaviour, not vanity valuations.',
  'Launch materials are built to create confidence quickly, with sharp copy, clean media, and buyer-ready presentation.',
  'Negotiations stay active right through chain management and completion so momentum is not lost when the legal work begins.'
];

function PropertyContent() {
  const { name, niche, location, phone, rating, ai, t, booking_url } =
    usePersonalization({
      name: 'Prime Realty Group',
      niche: 'Real Estate Advisory',
      location: 'Metropolitan',
      phone: '0000 000 000',
      rating: '4.9'
    });

  const heroListing = Config.featuredListings[0];

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
            description: `${name} provides ${niche} services in ${location}.`,
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
                <Building2 size={18} />
              </div>
              <div>
                <div className={styles.logo}>{name}</div>
                <p className={styles.logoMeta}>{location} property advisory</p>
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
                <p className={styles.eyebrow}>Boutique property advisory</p>
                <PrestigeBadge
                  niche={niche}
                  location={location}
                  accentColor={ACCENT}
                />

                <h1 className={styles.heroTitle}>
                  {ai.hero_title || t(Config.hero.title)}
                </h1>

                <p className={styles.heroDescription}>
                  {ai.pain_point || t(Config.hero.subtitle)}
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
                    'Senior-led valuation response within 24 hours',
                    'Launch, viewings, and negotiation handled with one clear strategy',
                    `${rating} rated client experience across ${location}`
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
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <div className={styles.heroImageShell}>
                  <Image
                    src={heroListing.image}
                    alt={heroListing.title}
                    fill
                    priority
                    sizes="(max-width: 960px) 100vw, 46vw"
                    className={styles.heroImage}
                  />
                  <div className={styles.imageShade} />

                  <div className={styles.floatingStat}>
                    <span className={styles.floatingLabel}>Client rating</span>
                    <strong>{rating}/5</strong>
                    <span className={styles.floatingMeta}>Trusted in {location}</span>
                  </div>

                  <div className={styles.featuredPreview}>
                    <span className={styles.previewLabel}>Featured listing</span>
                    <h2>{heroListing.title}</h2>
                    <p>{t(heroListing.area)}</p>
                    <div className={styles.previewPrice}>{heroListing.price}</div>
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
              <p className={styles.sectionEyebrow}>What we do</p>
              <h2 className={styles.sectionTitle}>
                Representation that feels composed, premium, and commercially
                sharp.
              </h2>
              <p className={styles.sectionDescription}>
                This template is built to present a serious real estate brand,
                not a generic brochure site. It frames the agency as strategic,
                high-touch, and trustworthy from the first screen.
              </p>
            </div>

            <div className={styles.servicesGrid}>
              {Config.services.map((service, index) => {
                const Icon =
                  SERVICE_ICONS[index % SERVICE_ICONS.length] ?? ShieldCheck;

                return (
                  <Reveal key={service.title} delay={index * 0.12}>
                    <article className={styles.serviceCard}>
                      <div className={styles.serviceIcon}>
                        <Icon size={22} />
                      </div>
                      <h3>{service.title}</h3>
                      <p>{service.desc}</p>
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

        <section className={styles.listingsSection}>
          <div className="container">
            <div className={styles.sectionIntroDark}>
              <p className={styles.sectionEyebrowDark}>Featured stock</p>
              <h2 className={styles.sectionTitleDark}>
                A property presentation section that immediately looks more
                credible to a client.
              </h2>
              <p className={styles.sectionDescriptionDark}>
                These listings are placeholder showcases, but the structure is
                now strong enough to swap in real stock and still feel premium.
              </p>
            </div>

            <div className={styles.listingGrid}>
              {Config.featuredListings.map((listing, index) => (
                <Reveal key={listing.title} delay={index * 0.14}>
                  <article className={styles.listingCard}>
                    <div className={styles.listingImageWrap}>
                      <Image
                        src={listing.image}
                        alt={listing.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={styles.listingImage}
                      />
                      <div className={styles.listingBadge}>
                        <MapPin size={14} />
                        {t(listing.area)}
                      </div>
                    </div>

                    <div className={styles.listingBody}>
                      <div className={styles.listingHeader}>
                        <h3>{listing.title}</h3>
                        <div className={styles.listingPrice}>{listing.price}</div>
                      </div>

                      <p className={styles.listingSummary}>{t(listing.summary)}</p>

                      <div className={styles.listingMetaRow}>
                        <div className={styles.listingMetaItem}>
                          <BedDouble size={16} />
                          <span>{listing.beds}</span>
                        </div>
                        <div className={styles.listingMetaItem}>
                          <Bath size={16} />
                          <span>{listing.baths}</span>
                        </div>
                        <div className={styles.listingMetaItem}>
                          <CarFront size={16} />
                          <span>{listing.parking}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.conciergeSection}>
          <div className="container">
            <div className={styles.conciergeGrid}>
              <Reveal>
                <div className={styles.conciergeCopy}>
                  <p className={styles.sectionEyebrow}>Why this version works</p>
                  <h2 className={styles.sectionTitle}>
                    The page now sells expertise as much as it sells property.
                  </h2>
                  <p className={styles.sectionDescription}>
                    A strong real estate homepage should reassure sellers and
                    buyers before they even speak to the agency. This version
                    does that by balancing authority, elegance, and concrete
                    proof.
                  </p>

                  <div className={styles.noteList}>
                    {MARKET_NOTES.map((note) => (
                      <div key={note} className={styles.noteItem}>
                        <CheckCircle2 size={17} />
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className={styles.conciergeCard}>
                  <div className={styles.conciergeHeader}>
                    <Sparkles size={18} />
                    <span>Seller advantage</span>
                  </div>

                  <h3>
                    From first impression to final negotiation, each step is
                    designed to protect price and momentum.
                  </h3>

                  <div className={styles.conciergeChecklist}>
                    <div className={styles.conciergeChecklistItem}>
                      Bespoke valuation strategy before the listing goes live
                    </div>
                    <div className={styles.conciergeChecklistItem}>
                      Premium media and positioning for better quality enquiries
                    </div>
                    <div className={styles.conciergeChecklistItem}>
                      Active progression with clear updates after offer acceptance
                    </div>
                  </div>

                  <a
                    href={booking_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.inlineLink}
                  >
                    View the consultation flow
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <HowItWorks
          steps={Config.process}
          accentColor={ACCENT}
          heading="How we guide the move"
        />

        <TestimonialsSection
          testimonials={TESTIMONIALS}
          accentColor={ACCENT}
          heading="What clients say once the deal is done"
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
                    Schedule a consultation
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
                Premium {niche.toLowerCase()} for sellers, buyers, landlords,
                and investors in {location}.
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

export default function PropertyPage() {
  return (
    <Suspense fallback={<div>Preparing the property preview...</div>}>
      <PropertyContent />
    </Suspense>
  );
}
