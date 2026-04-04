'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function PrestigeBadge({ niche, location, accentColor = '#3b82f6' }: { niche: string, location: string, accentColor?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        background: `${accentColor}15`, border: `1px solid ${accentColor}30`,
        color: accentColor, padding: '8px 18px', borderRadius: '50px',
        fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px',
        textTransform: 'uppercase', marginBottom: '24px',
      }}
    >
      <Star size={12} fill={accentColor} /> #1 Rated {niche} in {location}
    </motion.div>
  );
}
