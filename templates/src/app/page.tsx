'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSpreadsheet, Send, Globe, MapPin, Phone, Star, 
  RefreshCcw, Search, User, Info, CheckCircle2, Clock, 
  MessageSquare, DollarSign, X, MoreVertical, Filter, TrendingUp, Target, Award, Copy, ExternalLink, Zap,
  Image as ImageIcon, Loader2
} from 'lucide-react';
import { autoSelectTemplate } from '@/lib/personalization';
import { supabase } from '@/lib/supabase';
import WelcomeTour from '@/components/WelcomeTour';
import { Tooltip } from 'react-tooltip';
import GlobalHealthBanner from '@/components/GlobalHealthBanner';
import SupportWidget from '@/components/SupportWidget';
import CancellationModal from '@/components/CancellationModal';
import { trackEvent } from '@/lib/analytics';

interface ScrapedFile {
  id: string;
  name: string;
  date: string;
}

const STATUS_COLORS: Record<string, string> = {
  'NEW': '#64748b',
  'PITCH READY': '#3b82f6',
  'CONTACTED': '#f59e0b',
  'NEGOTIATING': '#8b5cf6',
  'CLOSED': '#10b981',
  'INTERESTED': '#ef4444'
};

export default function LeadCRM() {
  const [files, setFiles] = useState<ScrapedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [crmData, setCrmData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState('/preview');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [qualityFilter, setQualityFilter] = useState('ALL');
  const [notes, setNotes] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [selectedLeadIds, setSelectedLeadIds] = useState<Set<string>>(new Set());
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('inactive');
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setAppError] = useState<string | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Editable AI Fields
  const [editableAI, setEditableAI] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("Dashboard mount: fetchProfile started");
      const timeout = setTimeout(() => {
        if (profileLoading) {
          console.warn("fetchProfile: Hanging detected. Forcing profileLoading to false.");
          setProfileLoading(false);
          setAppError("Profile synchronization is taking longer than expected.");
        }
      }, 5000);

      try {
        console.log("Checking Auth & Profile...");
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          console.error("Supabase getUser error:", authError.message);
          setAppError("Authentication error: " + authError.message);
        } else if (user) {
          console.log("User authenticated:", user.id);
          const { data: profile, error: pError } = await supabase
            .from('profiles')
            .select('subscription_status')
            .eq('id', user.id)
            .single();
          
          if (pError) {
            console.error("Profile fetch error:", pError.message);
            // Don't block the UI if profile table isn't accessible yet
          }
          
          if (profile) {
            console.log("Profile found, status:", profile.subscription_status);
            setSubscriptionStatus(profile.subscription_status || 'inactive');
          } else {
            console.warn("No profile found for user. Defaulting to inactive.");
            setSubscriptionStatus('inactive');
          }
        } else {
          console.warn("No user found in session. Redirecting likely handled by middleware.");
        }
      } catch (e) {
        console.error("Global Auth/Profile Error", e);
        setAppError("Failed to synchronize your session. Please refresh.");
      } finally {
        clearTimeout(timeout);
        setProfileLoading(false);
        console.log("fetchProfile: Completed");
      }
    };
    fetchProfile();
  }, []);

  const handleCheckout = async () => {
    const res = await fetch('/api/billing/checkout', { method: 'POST' });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  const toggleLeadSelection = (id: string) => {
    const newSelection = new Set(selectedLeadIds);
    if (newSelection.has(id)) newSelection.delete(id);
    else newSelection.add(id);
    setSelectedLeadIds(newSelection);
  };

  const toggleAllLeads = () => {
    if (selectedLeadIds.size === filteredLeads.length) {
      setSelectedLeadIds(new Set());
    } else {
      setSelectedLeadIds(new Set(filteredLeads.map(l => getLeadId(l))));
    }
  };

  const bulkUpdateStatus = async (status: string) => {
    const promises = Array.from(selectedLeadIds).map(id => updateCRM(id, status));
    await Promise.all(promises);
    setSelectedLeadIds(new Set());
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/status');
        const data = await res.json();
        setSystemStatus(data);
      } catch (e) {
        console.error("Status fetch failed", e);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedLead) {
      const ai: Record<string, string> = {};
      Object.keys(selectedLead).forEach(key => {
        if (key.startsWith('ai_')) ai[key] = selectedLead[key];
      });
      setEditableAI(ai);
    }
  }, [selectedLead]);

  useEffect(() => {
    if (subscriptionStatus === 'active') {
      fetchFiles();
    }
  }, [subscriptionStatus]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setFiles(data.files || []);
    } catch (e) {
      setAppError("Failed to load pipeline batches.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCRMData = async () => {
    const res = await fetch('/api/crm');
    const data = await res.json();
    setCrmData(data);
  };

  const loadLeads = async (batchId: string) => {
    setSelectedFile(batchId);
    setLoading(true);
    setAppError(null);
    try {
      const res = await fetch(`/api/leads?batchId=${batchId}`);
      if (!res.ok) throw new Error("Failed to load leads from cloud.");
      const data = await res.json();
      setLeads(data.leads || []);
      
      if (data.leads?.length > 0) {
        setActiveTemplate(autoSelectTemplate(data.leads[0].category || 'Specialist'));
      }
    } catch (e: any) {
      setAppError(e.message);
    } finally {
      setLoading(false);
    }
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

  const getLeadId = (lead: any) => lead.id || `${lead.Name || lead.name}-${lead.Phone || lead.phone}`.replace(/\s+/g, '-');

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesSearch = (l.Name || l.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      const leadId = getLeadId(l);
      const status = crmData[leadId]?.status || l.status || 'NEW';
      const quality = getLeadQuality(l).label;
      
      const matchesStatus = statusFilter === 'ALL' || status === statusFilter;
      const matchesQuality = qualityFilter === 'ALL' || quality === qualityFilter;
      
      return matchesSearch && matchesStatus && matchesQuality;
    });
  }, [leads, searchQuery, statusFilter, qualityFilter, crmData]);

  const stats = useMemo(() => {
    const counts = { TOTAL: leads.length, NEW: 0, CONTACTED: 0, CLOSED: 0 };
    leads.forEach(l => {
      const status = crmData[getLeadId(l)]?.status || l.status || 'NEW';
      if (status === 'NEW') counts.NEW++;
      if (status === 'CONTACTED') counts.CONTACTED++;
      if (status === 'CLOSED') counts.CLOSED++;
    });
    return counts;
  }, [leads, crmData]);

  const generatePitch = (lead: any) => {
    const name = lead.Name || lead.name;
    const niche = lead.category || lead.Category || 'Specialist';
    const heroTitle = editableAI.ai_hero_title || lead.ai_copy?.ai_hero_title || lead.ai_hero_title || `Premier ${niche} solutions`;
    const painPoint = editableAI.ai_pain_point || lead.ai_copy?.ai_pain_point || lead.ai_pain_point || "reaching more local customers";
    
    return `Hi ${name} team,\n\nI noticed you're doing great work in ${lead.address || lead.Address || 'the local area'}, but don't seem to have a dedicated website yet.\n\nI've actually built a custom preview for you titled "${heroTitle.replace(/<[^>]*>?/gm, '')}" which addresses ${painPoint.toLowerCase()}.\n\nYou can view your personalized sample site here: ${window.location.origin}${generatePreviewUrl(lead)}\n\nWould you be open to a quick 5-minute chat about how this could help you get more leads?\n\nBest,\n[Your Name]`;
  };

  const copyPitch = (lead: any) => {
    navigator.clipboard.writeText(generatePitch(lead));
    setCopiedPitch(true);
    trackEvent('PITCH_COPIED', { leadId: getLeadId(lead) });
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const exportToOutreach = () => {
    const targets = selectedLeadIds.size > 0 
      ? leads.filter(l => selectedLeadIds.has(getLeadId(l)))
      : filteredLeads;

    if (!targets.length) return;

    const headers = ['first_name', 'company_name', 'email', 'phone', 'location', 'sample_site_url', 'custom_hero_title', 'custom_pain_point'];
    const rows = targets.map(l => {
      const niche = l.category || 'Specialist';
      const template = autoSelectTemplate(niche);
      
      const params = new URLSearchParams({
        name: l.name || l.Name || '',
        phone: l.phone || l.Phone || '',
        niche: niche,
        location: (l.address || 'Local').replace(/,/g, ' ')
      });

      const hero = (selectedLead && getLeadId(l) === getLeadId(selectedLead)) ? editableAI.ai_hero_title : (l.ai_copy?.ai_hero_title || l.ai_hero_title);
      const pain = (selectedLead && getLeadId(l) === getLeadId(selectedLead)) ? editableAI.ai_pain_point : (l.ai_copy?.ai_pain_point || l.ai_pain_point);

      if (hero) params.append('ai_hero_title', hero);
      if (pain) params.append('ai_pain_point', pain);

      const url = `${window.location.origin}${template}?${params.toString()}`;

      return [
        'Team',
        l.name || l.Name,
        l.email || l.Email || '',
        l.phone || l.Phone || '',
        l.address || l.Address || '',
        url,
        (hero || '').replace(/,/g, ''),
        (pain || '').replace(/,/g, '')
      ].map(val => `"${val}"`).join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `outreach_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    trackEvent('OUTREACH_EXPORTED', { count: targets.length });
    if (selectedLeadIds.size > 0) setSelectedLeadIds(new Set());
  };

  const generatePreviewUrl = (lead: any) => {
    const params = new URLSearchParams({
      name: lead.name || lead.Name || '',
      phone: lead.phone || lead.Phone || '',
      rating: lead.rating || lead.Rating || '5.0',
      niche: lead.category || 'Specialist',
      location: (lead.address || 'Local').replace(/,/g, ' ')
    });

    Object.keys(lead).forEach(key => {
      if (key.startsWith('ai_') && lead[key]) {
        params.append(key, String(lead[key]));
      }
    });
    
    if (lead.ai_copy) {
      Object.entries(lead.ai_copy).forEach(([k, v]) => {
        params.append(k, String(v));
      });
    }

    return `${activeTemplate}?${params.toString()}`;
  };

  if (profileLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white', fontFamily: 'Inter, sans-serif' }}>
        <Loader2 className="animate-spin" size={48} color="#3b82f6" />
        <p style={{ marginTop: '20px', fontWeight: 600, opacity: 0.6 }}>Syncing Elite Intel...</p>
      </div>
    );
  }

  if (subscriptionStatus !== 'active') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white', fontFamily: 'Inter, sans-serif' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ maxWidth: '500px', textAlign: 'center', padding: '60px', background: 'rgba(255,255,255,0.03)', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ background: '#3b82f6', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}>
            <Zap size={40} fill="white" />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px', letterSpacing: '-1px' }}>Unlock Elite Intel</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.7, lineHeight: '1.6', marginBottom: '40px' }}>
            Get unlimited access to the stealth scraper, AI enrichment pipeline, and high-conversion site templates.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '24px', textAlign: 'left', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <CheckCircle2 size={20} color="#10b981" /> <span style={{ fontWeight: 600 }}>Unlimited Lead Discovery</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <CheckCircle2 size={20} color="#10b981" /> <span style={{ fontWeight: 600 }}>GPT-4o AI Personalization</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <CheckCircle2 size={20} color="#10b981" /> <span style={{ fontWeight: 600 }}>Visual Proof Automation</span>
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            style={{ width: '100%', padding: '20px', background: 'white', color: '#0f172a', border: 'none', borderRadius: '16px', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
          >
            START 7-DAY FREE TRIAL
          </button>
          <p style={{ marginTop: '25px', fontSize: '0.85rem', opacity: 0.5 }}>Then $199/mo. Cancel anytime.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <GlobalHealthBanner />
      <div style={{ padding: '40px', maxWidth: '1800px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
        <WelcomeTour />
        <Tooltip id="global-tip" style={{ borderRadius: '10px', fontWeight: 600, fontSize: '0.8rem', zIndex: 10000 }} />
        <SupportWidget />
        
        {/* ERROR DISPLAY */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ background: '#fef2f2', color: '#ef4444', padding: '15px 30px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #fee2e2', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>{error}</span>
              <button onClick={() => setAppError(null)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><X size={18} /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ELITE HEADER */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              Lead Pro CRM <span style={{ fontSize: '0.8rem', background: '#0f172a', color: 'white', padding: '4px 12px', borderRadius: '20px', letterSpacing: '1px' }}>V2 ELITE</span>
            </h1>
            <p style={{ color: '#64748b', marginTop: '5px' }}>High-performance lead management and sales acceleration.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            {selectedFile && (
              <button onClick={exportToOutreach} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: '#0f172a', color: 'white', fontWeight: 700, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                <FileSpreadsheet size={18} /> Export Outreach CSV
              </button>
            )}
            <button onClick={() => { fetchFiles(); fetchCRMData(); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer', background: 'white', fontWeight: 700, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <RefreshCcw size={18} /> Sync Pipeline
            </button>
          </div>
        </header>

        {/* ANALYTICS TOP BAR */}
        {selectedFile && (
          <div style={{ marginBottom: '40px' }} data-tour="stats">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '20px' }}>
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
            
            {/* PIPELINE PROGRESS BAR */}
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                <span>Pipeline Conversion</span>
                <span>{stats.TOTAL > 0 ? Math.round((stats.CLOSED / stats.TOTAL) * 100) : 0}% Closed</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', display: 'flex' }}>
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${stats.TOTAL > 0 ? (stats.CLOSED / stats.TOTAL) * 100 : 0}%` }} 
                  transition={{ duration: 1 }}
                  style={{ height: '100%', background: '#10b981' }} 
                />
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${stats.TOTAL > 0 ? (stats.CONTACTED / stats.TOTAL) * 100 : 0}%` }} 
                  transition={{ duration: 1, delay: 0.2 }}
                  style={{ height: '100%', background: '#f59e0b' }} 
                />
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr' + (selectedLead ? ' 450px' : ''), gap: '30px' }}>
          {/* SIDEBAR: File Browser */}
          <aside 
            data-tour="batches"
            style={{ background: 'white', padding: '25px', borderRadius: '24px', border: '1px solid #e2e8f0', height: 'fit-content', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
          >
            <h2 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '25px', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#eff6ff', padding: '8px', borderRadius: '10px', color: '#3b82f6' }}>
                <FileSpreadsheet size={16} />
              </div>
              Pipeline Batches
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '70vh', overflowY: 'auto', paddingRight: '10px' }}>
              {files.length === 0 && !loading && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                  No pipeline batches found. Run the engine to start.
                </div>
              )}
              {loading && (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <Loader2 className="animate-spin" size={24} style={{ color: '#3b82f6', margin: '0 auto' }} />
                </div>
              )}
              {files.map(f => (
                <motion.button 
                  whileHover={{ x: 5, backgroundColor: selectedFile === f.id ? '#f8fafc' : '#f1f5f9' }}
                  key={f.id} 
                  onClick={() => loadLeads(f.id)} 
                  style={{ 
                    textAlign: 'left', padding: '16px', borderRadius: '16px', border: '1px solid',
                    borderColor: selectedFile === f.id ? '#3b82f6' : '#f1f5f9',
                    background: selectedFile === f.id ? '#eff6ff' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: selectedFile === f.id ? '#1e3a8a' : '#334155', wordBreak: 'break-word', lineHeight: '1.4' }}>
                    {f.name.replace('.xlsx', '').replace(/_/g, ' ')}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: selectedFile === f.id ? '#3b82f6' : '#94a3b8', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                    <Clock size={10} /> {new Date(f.date).toLocaleDateString()}
                  </div>
                </motion.button>
              ))}
            </div>
          </aside>

          {/* MAIN: Pipeline Table with Filters */}
          <main data-tour="lead-table">
            {selectedFile ? (
              <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ padding: '30px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <h3 style={{ fontWeight: 900, fontSize: '1.4rem' }}>{files.find(f => f.id === selectedFile)?.name.replace('.xlsx', '').replace(/_/g, ' ') || 'Active Batch'}</h3>
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
                      value={qualityFilter}
                      onChange={(e) => setQualityFilter(e.target.value)}
                      style={{ padding: '0 20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 700, color: '#64748b' }}
                    >
                      <option value="ALL">ALL QUALITY</option>
                      <option value="ELITE">ELITE ONLY</option>
                      <option value="SOLID">SOLID+</option>
                      <option value="POTENTIAL">POTENTIAL</option>
                    </select>
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
                      <th style={{ padding: '20px 30px', width: '50px' }}>
                        <input 
                          type="checkbox" 
                          checked={selectedLeadIds.size === filteredLeads.length && filteredLeads.length > 0} 
                          onChange={toggleAllLeads}
                          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                      </th>
                      <th style={{ padding: '20px' }}>Lead Intelligence</th>
                      <th style={{ padding: '20px' }}>Quality</th>
                      <th style={{ padding: '20px' }}>Reputation</th>
                      <th style={{ padding: '20px' }}>Pipeline Stage</th>
                      <th style={{ padding: '20px 30px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((l, i) => {
                      const leadId = getLeadId(l);
                      const status = crmData[leadId]?.status || l.status || 'NEW';
                      const quality = getLeadQuality(l);
                      const previewUrl = generatePreviewUrl(l);
                      const isSelected = selectedLeadIds.has(leadId);
                      return (
                        <motion.tr 
                          layout
                          key={i} 
                          onClick={() => { setSelectedLead(l); setNotes(crmData[leadId]?.notes || l.notes || ''); }}
                          style={{ borderTop: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s', background: isSelected ? '#eff6ff' : 'transparent' }}
                          whileHover={{ background: isSelected ? '#dbeafe' : '#f8fafc' }}
                        >
                          <td style={{ padding: '25px 30px' }} onClick={(e) => e.stopPropagation()}>
                            <input 
                              type="checkbox" 
                              checked={isSelected} 
                              onChange={() => toggleLeadSelection(leadId)}
                              style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                            />
                          </td>
                          <td style={{ padding: '25px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '1rem' }}>{l.name || l.Name}</div>
                              {(crmData[leadId]?.history?.some((h: any) => h.type === 'VIEW') || l.history?.some((h: any) => h.type === 'VIEW')) && (
                                <motion.div 
                                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                                  transition={{ repeat: Infinity, duration: 2 }}
                                  style={{ background: '#ef4444', color: 'white', fontSize: '0.6rem', fontWeight: 900, padding: '2px 6px', borderRadius: '4px', letterSpacing: '0.5px' }}
                                >
                                  HOT
                                </motion.div>
                              )}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                              <Phone size={14} color="#3b82f6" /> {l.phone || l.Phone || 'No Contact Number'}
                            </div>
                          </td>
                          <td style={{ padding: '25px 20px' }}>
                            <div 
                              data-tooltip-id="global-tip"
                              data-tooltip-content={
                                quality.label === 'ELITE' ? 'Rating > 4.5: High value target' :
                                quality.label === 'SOLID' ? 'Rating > 3.5: Strong potential' :
                                'Low volume or new business'
                              }
                              style={{ fontSize: '0.7rem', fontWeight: 900, color: quality.color, border: `1px solid ${quality.color}`, padding: '4px 10px', borderRadius: '20px', display: 'inline-block' }}
                            >
                              {quality.label}
                            </div>
                          </td>
                          <td style={{ padding: '25px 20px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 800, fontSize: '0.9rem' }}>
                              <Star size={16} fill="currentColor" /> {l.rating || l.Rating || '5.0'}
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
                          <td style={{ padding: '25px 30px' }} data-tour="actions">
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <Link href={previewUrl} target="_blank" onClick={(e) => e.stopPropagation()} style={{ 
                                padding: '10px 16px', background: '#0f172a', color: 'white', 
                                borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                              >
                                <Zap size={14} /> SHOW
                              </Link>
                              <button 
                                onClick={(e) => { e.stopPropagation(); copyToClipboard(previewUrl, leadId); }}
                                style={{ 
                                  padding: '10px', background: copiedId === leadId ? '#10b981' : '#f1f5f9', color: copiedId === leadId ? 'white' : '#475569', 
                                  border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                                title="Copy personalized link"
                              >
                                {copiedId === leadId ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* BULK ACTION TOOLBAR */}
                <AnimatePresence>
                  {selectedLeadIds.size > 0 && (
                    <motion.div 
                      initial={{ y: 100 }}
                      animate={{ y: 0 }}
                      exit={{ y: 100 }}
                      style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', background: '#0f172a', padding: '15px 30px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '25px', zIndex: 1000, color: 'white' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '25px' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>{selectedLeadIds.size} LEADS SELECTED</span>
                        <button onClick={() => setSelectedLeadIds(new Set())} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}>DESELECT</button>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8' }}>MOVE TO:</span>
                        {Object.keys(STATUS_COLORS).map(status => (
                          <button 
                            key={status}
                            onClick={() => bulkUpdateStatus(status)}
                            style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                          >
                            {status}
                          </button>
                        ))}
                      </div>

                      <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '25px' }}>
                        <button 
                          onClick={exportToOutreach}
                          style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: '#3b82f6', color: 'white', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                          <FileSpreadsheet size={16} /> EXPORT SELECTED
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {filteredLeads.length === 0 && (
                  <div style={{ padding: '100px', textAlign: 'center', color: '#94a3b8' }}>
                    <Search size={48} style={{ margin: '0 auto 20px', opacity: 0.2 }} />
                    <p>No leads match your search or filter.</p>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ height: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: '40px', border: '1px solid #e2e8f0', boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.02)' }}>
                <motion.div 
                  animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }} 
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  style={{ background: 'white', padding: '30px', borderRadius: '50%', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
                >
                  <Target size={80} color="#3b82f6" />
                </motion.div>
                <h3 style={{ marginTop: '30px', color: '#1e293b', fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px' }}>Ready to Launch</h3>
                <p style={{ color: '#64748b', marginTop: '10px', fontSize: '1rem', maxWidth: '400px', textAlign: 'center', lineHeight: '1.6' }}>Select a target scrape from the history sidebar to open the pipeline and start generating personalized sites.</p>
              </div>
            )}
          </main>

          {/* SIDEBAR: ELITE LEAD INTEL / SYSTEM MONITOR */}
          <AnimatePresence mode="wait">
            {selectedLead ? (
              <motion.aside 
                key="lead-intel"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                style={{ background: '#fff', padding: '40px', borderRadius: '30px', border: '1px solid #e2e8f0', boxShadow: '-20px 0 50px rgba(0,0,0,0.08)', position: 'sticky', top: '40px', height: 'calc(100vh - 80px)', overflowY: 'auto' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-1px' }}>Lead Intel</h2>
                    <div style={{ color: STATUS_COLORS[crmData[getLeadId(selectedLead)]?.status || selectedLead.status || 'NEW'], fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', marginTop: '5px' }}>
                      {crmData[getLeadId(selectedLead)]?.status || selectedLead.status || 'NEW'}
                    </div>
                  </div>
                  <button onClick={() => setSelectedLead(null)} style={{ border: 'none', background: '#f1f5f9', padding: '10px', borderRadius: '50%', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.3rem', marginBottom: '15px', color: '#1e3a8a' }}>{selectedLead.name || selectedLead.Name}</div>
                  <div style={{ color: '#475569', fontSize: '0.95rem', display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: '1.5' }}>
                    <MapPin size={20} color="#3b82f6" style={{ flexShrink: 0 }} /> {selectedLead.address || selectedLead.Address || 'Location hidden'}
                  </div>
                </div>

                {/* VISUAL PROOF PREVIEW */}
                {(selectedLead['Screenshot Path'] || selectedLead.screenshot_path) && (
                  <div style={{ marginBottom: '30px', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                    <div style={{ padding: '12px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Visual Proof Ready</span>
                      <ImageIcon size={14} color="#94a3b8" />
                    </div>
                    <div style={{ height: '200px', background: `url(http://localhost:3000/api/proxy-image?path=${encodeURIComponent(selectedLead['Screenshot Path'] || selectedLead.screenshot_path)})`, backgroundSize: 'cover', backgroundPosition: 'top' }} />
                  </div>
                )}

                {/* AI CONTENT EDITOR */}
                {(Object.keys(editableAI).length > 0 || selectedLead.ai_copy) && (
                  <div style={{ background: '#eff6ff', padding: '25px', borderRadius: '20px', marginBottom: '30px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#3b82f6', textTransform: 'uppercase', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Zap size={16} /> AI Personalized Content
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '8px' }}>HERO HEADLINE</label>
                        <input 
                          value={editableAI.ai_hero_title || selectedLead.ai_copy?.ai_hero_title || ''} 
                          onChange={(e) => setEditableAI({...editableAI, ai_hero_title: e.target.value})}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '8px' }}>CORE PAIN POINT</label>
                        <input 
                          value={editableAI.ai_pain_point || selectedLead.ai_copy?.ai_pain_point || ''} 
                          onChange={(e) => setEditableAI({...editableAI, ai_pain_point: e.target.value})}
                          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600 }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* DYNAMIC REVIEWS DISPLAY */}
                <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '20px', marginBottom: '30px' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MessageSquare size={16} /> Google Reviews Insight
                  </h4>
                  <div style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '10px' }}>
                    {(selectedLead['Recent Reviews (All)'] || selectedLead.rating) ? (
                      <div style={{ fontSize: '0.9rem', color: '#334155', whiteSpace: 'pre-line', lineHeight: '1.7' }}>
                        {selectedLead['Recent Reviews (All)'] || `Rating: ${selectedLead.rating}`}
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '40px 0', opacity: 0.4 }}>
                        <Star size={32} style={{ margin: '0 auto 10px' }} />
                        <p>No detailed review text found.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* LEAD ENGAGEMENT HISTORY */}
                <div style={{ marginBottom: '40px' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={16} /> Engagement History
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {(crmData[getLeadId(selectedLead)]?.history || selectedLead.history)?.length > 0 ? (
                      (crmData[getLeadId(selectedLead)]?.history || selectedLead.history).slice().reverse().map((h: any, idx: number) => (
                        <div key={idx} style={{ paddingLeft: '15px', borderLeft: '2px solid #e2e8f0', position: 'relative' }}>
                          <div style={{ position: 'absolute', left: '-5px', top: '0', width: '8px', height: '8px', borderRadius: '50%', background: h.type === 'ESCALATION' ? '#3b82f6' : '#10b981' }} />
                          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e293b' }}>
                            {h.type === 'ESCALATION' ? '🚀 Pushed to Hot Campaign' : '👀 Site Viewed'}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>
                            {new Date(h.timestamp).toLocaleString()}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>No engagement recorded yet.</div>
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
                    style={{ width: '100%', height: '100px', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0', resize: 'none', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                  <button 
                    onClick={() => copyPitch(selectedLead)}
                    style={{ width: '100%', padding: '18px', background: copiedPitch ? '#10b981' : '#3b82f6', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '1rem', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)', transition: 'all 0.2s' }}
                  >
                    {copiedPitch ? <CheckCircle2 size={20} /> : <Send size={20} />} 
                    {copiedPitch ? 'PITCH COPIED!' : 'COPY PERSONALIZED PITCH'}
                  </button>
                </div>
              </motion.aside>
            ) : (
              <motion.aside 
                data-tour="system-monitor"
                key="system-monitor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ background: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', height: 'fit-content' }}
              >
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '25px', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Zap size={18} color="#3b82f6" /> System Engine
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {systemStatus?.services ? Object.entries(systemStatus.services).map(([key, service]: [string, any]) => (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', background: '#f8fafc', borderRadius: '12px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>{service.label}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <motion.div 
                            animate={service.status === 'RUNNING' || service.status === 'PROCESSING' || service.status === 'ACTIVE' ? { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] } : {}}
                            transition={{ repeat: Infinity, duration: 2 }}
                            style={{ 
                              width: '8px', height: '8px', borderRadius: '50%', 
                              background: (service.status === 'RUNNING' || service.status === 'PROCESSING' || service.status === 'ACTIVE') ? '#10b981' : '#cbd5e1' 
                            }} 
                          />
                          <span style={{ fontSize: '0.7rem', fontWeight: 900, color: (service.status === 'RUNNING' || service.status === 'PROCESSING' || service.status === 'ACTIVE') ? '#10b981' : '#94a3b8' }}>{service.status}</span>
                        </div>
                      </div>
                    )) : (
                      <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <RefreshCcw size={24} className="animate-spin" style={{ color: '#cbd5e1', margin: '0 auto' }} />
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '10px' }}>Connecting to engine...</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div style={{ background: '#0f172a', padding: '25px', borderRadius: '20px', color: 'white' }}>
                  <h3 style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={16} color="#3b82f6" /> Performance
                  </h3>
                  <p style={{ fontSize: '0.75rem', opacity: 0.7, lineHeight: '1.6', marginBottom: '20px' }}>
                    Automated pipelines are currently healthy. Monitoring `exports/` for new leads to enrich.
                  </p>
                  <button 
                    onClick={() => setIsCancelModalOpen(true)}
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: 'none', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    MANAGE SUBSCRIPTION
                  </button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          <CancellationModal 
            isOpen={isCancelModalOpen} 
            onClose={() => setIsCancelModalOpen(false)} 
            onConfirm={() => {
              console.log("Subscription Cancelled");
              setIsCancelModalOpen(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
