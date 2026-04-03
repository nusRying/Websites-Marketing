'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface Props {
  stats?: Stat[];
  accentColor?: string;
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1800, bounce: 0 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) ref.current.textContent = Math.floor(latest) + suffix;
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const defaultStats: Stat[] = [
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { value: 4.9, suffix: '★', label: 'Average Rating' },
  { value: 10, suffix: '+', label: 'Years Experience' },
];

export default function SocialProofBar({ stats = defaultStats, accentColor = '#3b82f6' }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        background: 'white',
        borderTop: `4px solid ${accentColor}`,
        padding: '32px 0',
        boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
      }}
    >
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0',
          flexWrap: 'wrap',
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0',
            }}>
              <div style={{
                textAlign: 'center',
                padding: '0 40px',
              }}>
                <div style={{
                  fontSize: '2.4rem',
                  fontWeight: 900,
                  color: accentColor,
                  letterSpacing: '-1px',
                  lineHeight: 1,
                }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginTop: '6px',
                }}>
                  {stat.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div style={{
                  width: '1px',
                  height: '50px',
                  background: '#e2e8f0',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
