'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, MessageCircle, FileText, Bug, X, Send } from 'lucide-react';

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const supportOptions = [
    { icon: <FileText size={18} />, label: 'Documentation', href: '#' },
    { icon: <MessageCircle size={18} />, label: 'Live Chat', href: '#' },
    { icon: <Bug size={18} />, label: 'Report a Bug', href: '#' },
  ];

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 10000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass"
            style={{ 
              marginBottom: '20px', 
              borderRadius: 'var(--radius-lg)', 
              padding: '24px', 
              boxShadow: 'var(--shadow-lg)',
              width: '280px',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-outfit), sans-serif', color: 'var(--secondary)', letterSpacing: '-0.5px' }}>
              <HelpCircle size={20} color="var(--primary)" /> How can we help?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {supportOptions.map((opt, i) => (
                <a 
                  key={i} 
                  href={opt.href} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '12px 15px', 
                    borderRadius: 'var(--radius-md)', 
                    background: 'rgba(255,255,255,0.5)', 
                    color: 'var(--text-main)', 
                    textDecoration: 'none', 
                    fontSize: '0.9rem', 
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    fontFamily: 'var(--font-inter), sans-serif'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.color = 'var(--primary)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = 'var(--text-main)'; }}
                >
                  {opt.icon} {opt.label}
                </a>
              ))}
            </div>
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              <button style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', background: 'var(--secondary)', color: 'var(--white)', border: 'none', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s', fontFamily: 'var(--font-outfit), sans-serif', boxShadow: 'var(--shadow-sm)' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                <Send size={14} /> Send Feedback
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          background: 'var(--primary)', 
          color: 'var(--white)', 
          border: 'none', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 10000
        }}
      >
        {isOpen ? <X size={28} /> : <HelpCircle size={28} />}
      </motion.button>
    </div>
  );
}
