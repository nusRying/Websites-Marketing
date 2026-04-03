'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  stars?: number;
}

interface Props {
  testimonials: Testimonial[];
  accentColor?: string;
  heading?: string;
}

const defaultTestimonials: Testimonial[] = [
  { name: 'Sarah M.', location: 'Local Client', text: 'Absolutely outstanding service. Professional, punctual and the results were beyond what we expected. Highly recommended.', stars: 5 },
  { name: 'James T.', location: 'Happy Customer', text: 'The team was incredible from start to finish. Communication was perfect and the quality of work speaks for itself.', stars: 5 },
  { name: 'Claire R.', location: 'Returning Client', text: 'We have used them three times now and every single time they exceed expectations. This is our go-to service.', stars: 5 },
];

export default function TestimonialsSection({ testimonials = defaultTestimonials, accentColor = '#3b82f6', heading = 'What Our Clients Say' }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} style={{ padding: '100px 0', background: '#f8fafc' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
          style={{ marginBottom: '60px' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: `${accentColor}15`,
            color: accentColor,
            padding: '8px 20px',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            <Star size={14} fill={accentColor} /> Verified Reviews
          </div>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#1e293b', letterSpacing: '-1px' }}>{heading}</h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              style={{
                background: 'white',
                padding: '36px',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'default',
              }}
              whileHover={{ y: -6, boxShadow: `0 20px 40px rgba(0,0,0,0.08)` }}
            >
              <div style={{ display: 'flex', gap: '4px', marginBottom: '18px' }}>
                {Array.from({ length: t.stars ?? 5 }).map((_, si) => (
                  <Star key={si} size={16} fill={accentColor} color={accentColor} />
                ))}
              </div>
              <p style={{
                color: '#475569',
                lineHeight: 1.8,
                fontSize: '0.95rem',
                fontStyle: 'italic',
                marginBottom: '24px',
              }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
                <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.9rem' }}>{t.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '2px' }}>{t.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
