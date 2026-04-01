'use client';

import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Clock } from 'lucide-react';
import { Reveal } from './Reveal';

interface BookingWidgetProps {
  bookingUrl?: string;
  businessName: string;
}

export default function BookingWidget({ bookingUrl, businessName }: BookingWidgetProps) {
  // Default booking URL if none provided
  const finalUrl = bookingUrl || "https://calendly.com/expert-consultation/15min";
  
  // Extract slug from URL for inline embed
  const urlObj = new URL(finalUrl);
  const slug = urlObj.pathname.substring(1);

  return (
    <section id="book" style={{ padding: '100px 0', background: '#f8fafc' }}>
      <div className="container">
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#eff6ff', color: '#3b82f6', padding: '8px 20px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '20px', textTransform: 'uppercase' }}>
              <Calendar size={16} /> Instant Scheduling
            </div>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-1px' }}>
              Let's Scale <span>{businessName}</span> Together
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#64748b', marginTop: '15px', maxWidth: '700px', margin: '15px auto 0' }}>
              Select a time below for a quick 15-minute strategy call. No pressure, just value.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'start' }}>
          {/* FEATURES SIDE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            {[
              { icon: <MessageSquare color="#3b82f6" />, title: "Free Strategy Audit", desc: "We'll walk through your new site and show you how to dominate your local market." },
              { icon: <Clock color="#10b981" />, title: "15-Min Quick Sync", desc: "Your time is valuable. We keep it focused, high-impact, and fluff-free." },
              { icon: <Calendar color="#f59e0b" />, title: "Flexible Times", desc: "Choose a slot that fits your busy schedule. We work around you." }
            ].map((f, i) => (
              <Reveal key={i} delay={0.2 * i}>
                <div style={{ background: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)' }}>
                  <div style={{ marginBottom: '15px' }}>{f.icon}</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>{f.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CALENDLY EMBED */}
          <Reveal delay={0.4}>
            <div style={{ background: 'white', borderRadius: '30px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', height: '700px' }}>
              <iframe
                src={`https://calendly.com/${slug}?hide_landing_page_details=1&hide_gdpr_banner=1`}
                width="100%"
                height="100%"
                frameBorder="0"
              ></iframe>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
