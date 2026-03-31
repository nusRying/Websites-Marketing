'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSpreadsheet, Send, Globe, MapPin, Phone, Star, 
  RefreshCcw, Search, User, Info, CheckCircle2, Clock, 
  MessageSquare, DollarSign, X, MoreVertical, Filter, TrendingUp, Target, Award, Copy, ExternalLink, Zap
} from 'lucide-react';
import { autoSelectTemplate } from '@/lib/personalization';

interface ScrapedFile {
  name: string;
  date: string;
}

const STATUS_COLORS: Record<string, string> = {
  'NEW': '#64748b',
  'PITCH READY': '#3b82f6',
  'CONTACTED': '#f59e0b',
  'NEGOTIATING': '#8b5cf6',
  'CLOSED': '#10b981'
};

export default function LeadCRM() {
  const [files, setFiles] = useState<ScrapedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [crmData, setCrmData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [activeTemplate, setActiveTemplate] = useState('/preview');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [notes, setNotes] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const templates = [
    { id: '/preview', label: '🚀 Lead Machine (Emergency)' },
    { id: '/showcase', label: '🖼️ Showcase (Visual)' },
    { id: '/local-pro', label: '🏠 Local Pro (Service)' },
    { id: '/industrial', label: '🏗️ Industrial (B2B)' },
    { id: '/aura', label: '✨ Aura (Luxury Beauty)' },
    { id: '/gusto', label: '🍷 Gusto (Hospitality)' },
    { id: '/vitality', label: '🌿 Vitality (Wellness)' },
    { id: '/counsel', label: '⚖️ Counsel (Corporate)' },
    { id: '/eternal', label: '💍 Eternal (Events)' },
    { id: '/paw', label: '🐾 Paw & Palace (Pet)' },
    { id: '/property', label: '🏙️ Prime Property (Real Estate)' },
    { id: '/auto', label: '🏎️ Auto Armor (Mechanic)' },
    { id: '/titan', label: '⚡ Tech Titan (IT/Software)' },
    { id: '/scholastic', label: '📚 Scholastic (Education)' },
    { id: '/spark', label: '⚡ Spark & Structure (Electrician)' },
    { id: '/barber', label: '💈 Barber & Blade (Grooming)' },
    { id: '/fit', label: '💪 Fit Focus (Fitness)' },
    { id: '/dental', label: '🦷 Dental Deluxe (Medical)' },
    { id: '/logistics', label: '🚛 Logistics Logic (Transport)' },
    { id: '/aqua', label: '🌊 Aqua Artisans (Pool/Plumbing)' },
    { id: '/harmony', label: '🏠 Home Harmony (Design)' },
    { id: '/law', label: '⚖️ Law & Liberty (Solicitors)' },
    { id: '/security', label: '🛡️ Smart Security (CCTV/Alarms)' },
    { id: '/cleaning', label: '✨ Sparkle & Shine (Cleaning)' },
    { id: '/roofing', label: '🏠 Roofing Royale (Roofing)' },
    { id: '/green', label: '🌿 Green Growth (Solar)' },
    { id: '/smart-living', label: '🏠 Smart Living (Home Automation)' },
    { id: '/pest', label: '🛡️ Prime Pest (Pest Control)' },
    { id: '/event', label: '👔 Elite Event (Corporate Events)' },
    { id: '/print', label: '🖨️ Prime Print (Signage/Print)' }
  ];

  useEffect(() => {
    fetchFiles();
    fetchCRMData();
  }, []);

  const fetchFiles = async () => {
    const res = await fetch('/api/leads');
    const data = await res.json();
    setFiles(data.files || []);
  };

  const fetchCRMData = async () => {
    const res = await fetch('/api/crm');
    const data = await res.json();
    setCrmData(data);
  };

  const loadLeads = async (filename: string) => {
    setSelectedFile(filename);
    setLoading(true);
    const res = await fetch(`/api/leads?file=${filename}`);
    const data = await res.json();
    setLeads(data.leads || []);
    
    // Auto-select template based on niche from filename
    const niche = filename.split('_')[0] || 'Specialist';
    setActiveTemplate(autoSelectTemplate(niche));
    
    setLoading(false);
  };

  const updateCRM = async (leadId: string, status?: string, leadNotes?: string) => {
    const res = await fetch('/api/crm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId, status, notes: leadNotes })
    });
    const result = await res.json();
    if (result.success) {
      setCrmData(prev => ({ ...prev, [leadId]: result.entry }));
    }
  };

  const getLeadQuality = (lead: any) => {
    const rating = parseFloat(lead.Rating || lead.rating || '0');
    if (rating >= 4.5) return { label: 'ELITE', color: '#10b981' };
    if (rating >= 3.5) return { label: 'SOLID', color: '#3b82f6' };
    return { label: 'POTENTIAL', color: '#f59e0b' };
  };

  const copyToClipboard = (url: string, id: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getLeadId = (lead: any) => `${lead.Name || lead.name}-${lead.Phone || lead.phone}`.replace(/\s+/g, '-');

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch = (l.Name || l.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      const leadId = getLeadId(l);
      const status = crmData[leadId]?.status || 'NEW';
      const matchesStatus = statusFilter === 'ALL' || status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter, crmData]);

  const stats = useMemo(() => {
    const counts = { TOTAL: leads.length, NEW: 0, CONTACTED: 0, CLOSED: 0 };
    leads.forEach(l => {
      const status = crmData[getLeadId(l)]?.status || 'NEW';
      if (status === 'NEW') counts.NEW++;
      if (status === 'CONTACTED') counts.CONTACTED++;
      if (status === 'CLOSED') counts.CLOSED++;
    });
    return counts;
  }, [leads, crmData]);

  const generatePreviewUrl = (lead: any) => {
    const params = new URLSearchParams({
      name: lead.Name || lead.name || '',
      phone: lead.Phone || lead.phone || '',
      rating: lead.Rating || lead.rating || '5.0',
      niche: selectedFile?.split('_')[0] || 'Specialist',
      location: (selectedFile?.split('_')[1] || 'Local').replace(/_/g, ' ')
    });

    // Automatically include all AI-generated fields from the Excel/Lead object
    Object.keys(lead).forEach(key => {
      if (key.startsWith('ai_') && lead[key]) {
        params.append(key, String(lead[key]));
      }
    });

    return `${activeTemplate}?${params.toString()}`;
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1800px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      {/* ELITE HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            Lead Pro CRM <span style={{ fontSize: '0.8rem', background: '#0f172a', color: 'white', padding: '4px 12px', borderRadius: '20px', letterSpacing: '1px' }}>V2 ELITE</span>
          </h1>
          <p style={{ color: '#64748b', marginTop: '5px' }}>High-performance lead management and sales acceleration.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => { fetchFiles(); fetchCRMData(); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer', background: 'white', fontWeight: 700, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <RefreshCcw size={18} /> Sync Pipeline
          </button>
        </div>
      </header>

      {/* ANALYTICS TOP BAR */}
      {selectedFile && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
          {[
            { label: 'Identified Leads', val: stats.TOTAL, icon: <Target color="#3b82f6" />, color: '#eff6ff' },
            { label: 'Untouched', val: stats.NEW, icon: <Clock color="#64748b" />, color: '#f8fafc' },
            { label: 'Active Outreach', val: stats.CONTACTED, icon: <TrendingUp color="#f59e0b" />, color: '#fffbeb' },
            { label: 'Deals Closed', val: stats.CLOSED, icon: <Award color="#10b981" />, color: '#f0fdf4' }
          ].map((s, i) => (
            <div key={i} style={{ background: s.color, padding: '25px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{s.label}</span>
                {s.icon}
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 900, marginTop: '10px' }}>{s.val}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr' + (selectedLead ? ' 450px' : ''), gap: '30px' }}>
        {/* SIDEBAR: File Browser */}
        <aside style={{ background: '#f8fafc', padding: '25px', borderRadius: '24px', border: '1px solid #e2e8f0', height: 'fit-content' }}>
          <h2 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '25px', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileSpreadsheet size={18} /> Scraper History
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {files.map(f => (
              <motion.button 
                whileHover={{ x: 5 }}
                key={f.name} 
                onClick={() => loadLeads(f.name)} 
                style={{ 
                  textAlign: 'left', padding: '18px', borderRadius: '16px', border: '1px solid',
                  borderColor: selectedFile === f.name ? '#3b82f6' : '#e2e8f0',
                  background: selectedFile === f.name ? '#fff' : 'white',
                  boxShadow: selectedFile === f.name ? '0 10px 25px -5px rgba(59, 130, 246, 0.1)' : 'none',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: selectedFile === f.name ? '#1e3a8a' : '#334155' }}>{f.name.replace('.xlsx', '').replace(/_/g, ' ')}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={12} /> {new Date(f.date).toLocaleDateString()}
                </div>
              </motion.button>
            ))}
          </div>
        </aside>

        {/* MAIN: Pipeline Table with Filters */}
        <main>
          {selectedFile ? (
            <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ padding: '30px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                  <h3 style={{ fontWeight: 900, fontSize: '1.4rem' }}>{selectedFile.replace('.xlsx', '').replace(/_/g, ' ')}</h3>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b' }}>TEMPLATE:</span>
                    <select value={activeTemplate} onChange={(e) => setActiveTemplate(e.target.value)} style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #cbd5e1', fontWeight: 700, background: 'white' }}>
                      {templates.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                    </select>
                  </div>
                </div>
                
                {/* FILTERS BAR */}
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ position: 'relative', flexGrow: 1 }}>
                    <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                    <input 
                      placeholder="Search business name..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontWeight: 600 }}
                    />
                  </div>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ padding: '0 20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 700, color: '#64748b' }}
                  >
                    <option value="ALL">ALL STATUSES</option>
                    {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', background: '#fff' }}>
                    <th style={{ padding: '20px 30px' }}>Lead Intelligence</th>
                    <th style={{ padding: '20px' }}>Quality</th>
                    <th style={{ padding: '20px' }}>Reputation</th>
                    <th style={{ padding: '20px' }}>Pipeline Stage</th>
                    <th style={{ padding: '20px 30px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((l, i) => {
                    const leadId = getLeadId(l);
                    const status = crmData[leadId]?.status || 'NEW';
                    const quality = getLeadQuality(l);
                    const previewUrl = generatePreviewUrl(l);
                    return (
                      <motion.tr 
                        layout
                        key={i} 
                        onClick={() => { setSelectedLead(l); setNotes(crmData[leadId]?.notes || ''); }}
                        style={{ borderTop: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s' }}
                        whileHover={{ background: '#f8fafc' }}
                      >
                        <td style={{ padding: '25px 30px' }}>
                          <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '1rem' }}>{l.Name || l.name}</div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                            <Phone size={14} color="#3b82f6" /> {l.Phone || 'No Contact Number'}
                          </div>
                        </td>
                        <td style={{ padding: '25px 20px' }}>
                          <div style={{ fontSize: '0.7rem', fontWeight: 900, color: quality.color, border: `1px solid ${quality.color}`, padding: '4px 10px', borderRadius: '20px', display: 'inline-block' }}>
                            {quality.label}
                          </div>
                        </td>
                        <td style={{ padding: '25px 20px' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 800, fontSize: '0.9rem' }}>
                            <Star size={16} fill="currentColor" /> {l.Rating || '5.0'}
                          </div>
                        </td>
                        <td style={{ padding: '25px 20px' }}>
                          <select 
                            value={status} 
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => updateCRM(leadId, e.target.value)}
                            style={{ 
                              padding: '8px 16px', borderRadius: '10px', border: 'none', 
                              background: STATUS_COLORS[status], color: 'white', fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', appearance: 'none', textAlign: 'center'
                            }}
                          >
                            {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td style={{ padding: '25px 30px' }}>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <Link href={previewUrl} target="_blank" onClick={(e) => e.stopPropagation()} style={{ 
                              padding: '12px 20px', background: '#0f172a', color: 'white', 
                              borderRadius: '10px', fontSize: '0.85rem', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                            }}>
                              <Zap size={16} /> SHOW
                            </Link>
                            <button 
                              onClick={(e) => { e.stopPropagation(); copyToClipboard(previewUrl, leadId); }}
                              style={{ 
                                padding: '12px', background: copiedId === leadId ? '#10b981' : '#f1f5f9', color: copiedId === leadId ? 'white' : '#1e293b', 
                                border: 'none', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s'
                              }}
                            >
                              {copiedId === leadId ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredLeads.length === 0 && (
                <div style={{ padding: '100px', textAlign: 'center', color: '#94a3b8' }}>
                  <Search size={48} style={{ margin: '0 auto 20px', opacity: 0.2 }} />
                  <p>No leads match your search or filter.</p>
                </div>
              )}
            </div>
          ) : (
            <div style={{ height: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', borderRadius: '40px', border: '3px dashed #e2e8f0' }}>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                <Target size={64} color="#cbd5e1" />
              </motion.div>
              <h3 style={{ marginTop: '20px', color: '#64748b', fontSize: '1.25rem', fontWeight: 700 }}>Select a target scrape to open the pipeline.</h3>
            </div>
          )}
        </main>

        {/* SIDEBAR: ELITE LEAD INTEL */}
        <AnimatePresence>
          {selectedLead && (
            <motion.aside 
              initial={{ x: 450, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 450, opacity: 0 }}
              style={{ background: '#fff', padding: '40px', borderRadius: '30px', border: '1px solid #e2e8f0', boxShadow: '-20px 0 50px rgba(0,0,0,0.08)', position: 'sticky', top: '40px', height: 'calc(100vh - 80px)', overflowY: 'auto' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-1px' }}>Lead Intel</h2>
                  <div style={{ color: STATUS_COLORS[crmData[getLeadId(selectedLead)]?.status || 'NEW'], fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', marginTop: '5px' }}>
                    {crmData[getLeadId(selectedLead)]?.status || 'NEW'}
                  </div>
                </div>
                <button onClick={() => setSelectedLead(null)} style={{ border: 'none', background: '#f1f5f9', padding: '10px', borderRadius: '50%', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
              </div>

              <div style={{ marginBottom: '40px' }}>
                <div style={{ fontWeight: 900, fontSize: '1.3rem', marginBottom: '15px', color: '#1e3a8a' }}>{selectedLead.Name || selectedLead.name}</div>
                <div style={{ color: '#475569', fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: '1.5' }}>
                  <MapPin size={20} color="#3b82f6" style={{ flexShrink: 0 }} /> {selectedLead.Address || 'Location hidden'}
                </div>
              </div>

              {/* DYNAMIC REVIEWS DISPLAY */}
              <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '20px', marginBottom: '30px' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={16} /> Google Reviews Insight
                </h4>
                <div style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '10px' }}>
                  {selectedLead['Recent Reviews (All)'] ? (
                    <div style={{ fontSize: '0.9rem', color: '#334155', whiteSpace: 'pre-line', lineHeight: '1.7' }}>
                      {selectedLead['Recent Reviews (All)']}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 0', opacity: 0.4 }}>
                      <Star size={32} style={{ margin: '0 auto 10px' }} />
                      <p>No detailed review text found.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* PERSISTENT NOTES SYSTEM */}
              <div style={{ marginBottom: '40px' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '15px' }}>Internal Strategy Notes</h4>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={() => updateCRM(getLeadId(selectedLead), undefined, notes)}
                  placeholder="Add details about your pitch, their pain points, or follow-up schedule..."
                  style={{ width: '100%', height: '150px', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0', resize: 'none', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none' }}
                />
                <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '10px' }}>Notes are auto-saved on click-away.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                <button style={{ width: '100%', padding: '18px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '1rem', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)' }}>
                  <Send size={20} /> SEND PERSONALIZED PITCH
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
