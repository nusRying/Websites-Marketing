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
            style={{ 
              marginBottom: '20px', 
              background: 'white', 
              borderRadius: '24px', 
              padding: '20px', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              width: '280px',
              border: '1px solid #e2e8f0'
            }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <HelpCircle size={20} color="#3b82f6" /> How can we help?
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
                    borderRadius: '12px', 
                    background: '#f8fafc', 
                    color: '#475569', 
                    textDecoration: 'none', 
                    fontSize: '0.9rem', 
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#eff6ff'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#f8fafc'}
                >
                  {opt.icon} {opt.label}
                </a>
              ))}
            </div>
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
              <button style={{ width: '100%', padding: '12px', borderRadius: '12px', background: '#0f172a', color: 'white', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
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
          background: '#3b82f6', 
          color: 'white', 
          border: 'none', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
        }}
      >
        {isOpen ? <X size={28} /> : <HelpCircle size={28} />}
      </motion.button>
    </div>
  );
}
