'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Gift, ArrowRight, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancellationModal({ isOpen, onClose, onConfirm }: Props) {
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState('');

  const reasons = [
    "It's too expensive",
    "Not finding enough quality leads",
    "Too complex to set up",
    "Switching to a competitor",
    "Temporary project completed"
  ];

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20000, backdropFilter: 'blur(8px)' }}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ background: 'white', padding: '50px', borderRadius: '32px', maxWidth: '550px', width: '90%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', position: 'relative' }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: '25px', right: '25px', border: 'none', background: '#f1f5f9', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}><X size={20} /></button>

        {step === 1 ? (
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1e293b', marginBottom: '15px' }}>We're sorry to see you go</h2>
            <p style={{ color: '#64748b', marginBottom: '30px', lineHeight: '1.6' }}>Before you cancel, could you tell us why you're leaving? This helps us improve for other agency owners.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {reasons.map((r, i) => (
                <button 
                  key={i} 
                  onClick={() => { setReason(r); setStep(2); }}
                  style={{ textAlign: 'left', padding: '15px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ background: '#f0fdf4', padding: '25px', borderRadius: '24px', border: '1px solid #dcfce7', marginBottom: '30px' }}>
              <h3 style={{ color: '#166534', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Gift size={20} /> Exclusive Salvage Offer
              </h3>
              <p style={{ color: '#166534', fontSize: '0.9rem', lineHeight: '1.6' }}>
                We'd love to keep you. Stay with us today and we'll apply a <strong>50% discount</strong> to your next 3 months, plus <strong>500 bonus AI credits</strong>.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <button 
                onClick={onClose}
                style={{ padding: '18px', background: '#10b981', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)' }}
              >
                KEEP SUBSCRIPTION & CLAIM OFFER
              </button>
              <button 
                onClick={onConfirm}
                style={{ padding: '15px', background: 'transparent', color: '#94a3b8', border: 'none', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
              >
                No thanks, finish cancellation
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
