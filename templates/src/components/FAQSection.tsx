'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface FAQ { q: string; a: string; }

export default function FAQSection({ faqs, accentColor = '#3b82f6' }: { faqs: FAQ[]; accentColor?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  
  if (!faqs || faqs.length === 0) return null;
  
  return (
    <section style={{ padding: '100px 0', background: '#f8fafc' }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.8rem', fontWeight: 900, marginBottom: '60px' }}>
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid #e2e8f0', marginBottom: '4px' }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width: '100%', textAlign: 'left', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#1e293b' }}>
              {faq.q}
              <motion.div animate={{ rotate: open === i ? 180 : 0 }}>
                <ChevronDown size={20} color={accentColor} />
              </motion.div>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                  <p style={{ paddingBottom: '24px', color: '#64748b', lineHeight: 1.8 }}>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
