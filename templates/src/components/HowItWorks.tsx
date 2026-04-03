'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export interface Step {
  number: string;
  title: string;
  desc: string;
}

interface Props {
  steps?: Step[];
  accentColor?: string;
  heading?: string;
}

const defaultSteps: Step[] = [
  { number: '01', title: 'Get In Touch', desc: 'Call us or book online in under 60 seconds. We will confirm your appointment same day.' },
  { number: '02', title: 'We Show Up', desc: 'Our expert team arrives on time, fully equipped, and ready to deliver outstanding results.' },
  { number: '03', title: 'You\'re Thrilled', desc: 'Sit back, relax, and enjoy the results. We aren\'t satisfied until you are.' },
];

export default function HowItWorks({ steps = defaultSteps, accentColor = '#3b82f6', heading = 'How It Works' }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} style={{ padding: '100px 0', background: 'white' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
          style={{ marginBottom: '70px' }}
        >
          <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#1e293b', letterSpacing: '-1px' }}>{heading}</h2>
          <p style={{ color: '#64748b', marginTop: '12px', fontSize: '1.1rem' }}>Simple, transparent, stress-free from start to finish.</p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '0',
          position: 'relative',
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 * i }}
              style={{
                textAlign: 'center',
                padding: '40px 36px',
                position: 'relative',
              }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '56px',
                  right: '-2px',
                  width: '50%',
                  height: '2px',
                  background: `linear-gradient(to right, ${accentColor}40, ${accentColor}10)`,
                  zIndex: 0,
                  display: 'none',
                }} />
              )}

              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: `${accentColor}12`,
                border: `2px solid ${accentColor}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                position: 'relative',
                zIndex: 1,
              }}>
                <span style={{
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  color: accentColor,
                  letterSpacing: '-1px',
                }}>
                  {step.number}
                </span>
              </div>

              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '56px',
                  right: '0',
                  width: '50%',
                  height: '2px',
                  background: `linear-gradient(to right, ${accentColor}25, transparent)`,
                }} />
              )}
              {i > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '56px',
                  left: '0',
                  width: '50%',
                  height: '2px',
                  background: `linear-gradient(to right, transparent, ${accentColor}25)`,
                }} />
              )}

              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#1e293b',
                marginBottom: '12px',
              }}>
                {step.title}
              </h3>
              <p style={{
                color: '#64748b',
                lineHeight: 1.7,
                fontSize: '0.95rem',
              }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
