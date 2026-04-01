'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HealthStatus {
  services: {
    scraper: { status: string };
    watcher: { status: string };
    enrichment: { status: string };
  };
}

export default function GlobalHealthBanner() {
  const [status, setStatus] = useState<HealthStatus | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        setStatus(data);
      } catch (e) {
        console.error("Health check failed");
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const isDegraded = status?.services && (
    status.services.scraper.status === 'OFFLINE' || 
    status.services.enrichment.status === 'OFFLINE'
  );

  if (!status || !isDegraded || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        style={{ background: '#fff7ed', borderBottom: '1px solid #ffedd5', overflow: 'hidden' }}
      >
        <div style={{ maxWidth: '1800px', margin: '0 auto', padding: '12px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9a3412', fontSize: '0.85rem', fontWeight: 600 }}>
            <AlertTriangle size={18} />
            <span>System Notice: Some pipeline workers are currently offline. New scrapes may be delayed.</span>
          </div>
          <button onClick={() => setVisible(false)} style={{ background: 'none', border: 'none', color: '#9a3412', cursor: 'pointer', padding: '5px' }}>
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
