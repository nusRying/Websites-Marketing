'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSpreadsheet, Send, Globe, MapPin, Phone, Star, 
  RefreshCcw, Search, User, Info, CheckCircle2, Clock, 
  MessageSquare, DollarSign, X, MoreVertical, Filter, TrendingUp, Target, Award, Copy, ExternalLink, Zap,
  Image as ImageIcon, Loader2, Settings, Monitor, Tablet, Smartphone, ChevronLeft, Droplets
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
  'NEW': '#64748b', /* Slate 500 */
  'PITCH READY': '#3b82f6', /* Blue 500 */
  'CONTACTED': '#f59e0b', /* Amber 500 */
  'NEGOTIATING': '#8b5cf6', /* Violet 500 */
  'CLOSED': '#10b981', /* Emerald 500 */
  'INTERESTED': '#059669' /* Emerald 600 - Fixed from Red */
};

const templates = [
  { id: '/preview', label: 'Lead Machine (Default)' },
  { id: '/aqua', label: 'Aqua Artisans (Pools)' },
  { id: '/aura', label: 'Aura Beauty (Salon)' },
  { id: '/auto', label: 'Auto Mastery (Mechanic)' },
  { id: '/barber', label: 'Barber Elite' },
  { id: '/cleaning', label: 'Sparkle Clean' },
  { id: '/counsel', label: 'Counsel Care' },
  { id: '/dental', label: 'Dental Bright' },
  { id: '/eternal', label: 'Eternal Memories' },
  { id: '/event', label: 'Event Pro' },
  { id: '/fit', label: 'Fit Logic (Gym)' },
  { id: '/green', label: 'Green Growth (Solar)' },
  { id: '/gusto', label: 'Gusto Gastronomy' },
  { id: '/harmony', label: 'Harmony Interiors' },
  { id: '/industrial', label: 'Industrial Titan' },
  { id: '/law', label: 'Legal Eagle' },
  { id: '/local-pro', label: 'Local Pro (Handyman)' },
  { id: '/logistics', label: 'Logistics Prime' },
  { id: '/paw', label: 'Paw Pals (Pets)' },
  { id: '/pest', label: 'Pest Guard' },
  { id: '/print', label: 'Print Master' },
  { id: '/property', label: 'Property Prime' },
  { id: '/roofing', label: 'Roofing Pro' },
  { id: '/scholastic', label: 'Scholastic Academy' },
  { id: '/security', label: 'Security Shield' },
  { id: '/showcase', label: 'Showcase Portfolio' },
  { id: '/smart-living', label: 'Smart Living' },
  { id: '/spark', label: 'Spark Electrical' },
  { id: '/titan', label: 'Titan Heavy' },
  { id: '/vitality', label: 'Vitality Health' }
];

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

  // View routing
  const [activeView, setActiveView] = useState<'pipeline' | 'templates'>('pipeline');

  // Template Studio
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [activeSection, setActiveSection] = useState('site');
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [templateParams, setTemplateParams] = useState({ 
    name: 'Acme Services', 
    niche: 'Specialist', 
    location: 'New York, NY', 
    phone: '(555) 123-4567', 
    rating: '4.9',
    ai_hero_title: '',
    ai_hero_subtitle: '',
    ai_pain_point: '',
    ai_solution: '',
    ai_niche_cta: '',
    ai_service_1: '',
    ai_service_2: '',
    ai_service_3: '',
    ai_testimonial_1: '',
    ai_testimonial_2: ''
  });

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
      if (key.startsWith('ai_') && lead[key] && key !== 'ai_copy') {
        params.append(key, String(lead[key]));
      }
    });
    
    if (lead.ai_copy && typeof lead.ai_copy === 'object') {
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

  const getInitials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || '??';
  const getAvatarColor = (name: string) => { const colors = ['#3b82f6','#8b5cf6','#10b981','#f59e0b','#ef4444','#06b6d4','#ec4899']; let h = 0; for(let c of (name||'')) h = c.charCodeAt(0) + ((h << 5) - h); return colors[Math.abs(h) % colors.length]; };
  const getTemperature = (lead: any, crm: any, id: string) => { const hist = crm[id]?.history || lead.history || []; if(hist.some((h:any) => h.type === 'VIEW')) return { icon: '🔥', label: 'HOT', color: '#ef4444' }; if((crm[id]?.status || lead.status) === 'CONTACTED') return { icon: '⚡', label: 'WARM', color: '#f59e0b' }; return { icon: '❄️', label: 'COLD', color: '#94a3b8' }; };
  const getPitchScore = (lead: any, crm: any, id: string) => { let score = 40; const rating = parseFloat(lead.Rating || lead.rating || '0'); if(rating >= 4.5) score += 25; else if(rating >= 3.5) score += 15; const hasAI = !!(lead.ai_hero_title || lead.ai_copy?.ai_hero_title); if(hasAI) score += 20; const hist = crm[id]?.history || lead.history || []; if(hist.some((h:any) => h.type === 'VIEW')) score += 15; return Math.min(score, 100); };
  const timeAgo = (ts: string) => { const d = Date.now() - new Date(ts).getTime(); if(d < 3600000) return `${Math.floor(d/60000)}m ago`; if(d < 86400000) return `${Math.floor(d/3600000)}h ago`; return `${Math.floor(d/86400000)}d ago`; };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', display: 'flex' }}>
      {/* DARK SIDEBAR */}
      <aside style={{ width: '240px', minHeight: '100vh', background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)', flexShrink: 0, display: 'flex', flexDirection: 'column', padding: '32px 20px', position: 'sticky', top: 0 }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <div style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}>
              <Zap size={20} fill="white" color="white" />
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: 900, fontSize: '1rem', letterSpacing: '-0.5px', fontFamily: 'var(--font-outfit),sans-serif' }}>Lead Pro</div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '2px' }}>v2 ELITE</div>
            </div>
          </div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {[
            { icon: <Target size={18}/>, label: 'Pipeline', view: 'pipeline' as const },
            { icon: <Globe size={18}/>, label: 'Templates', view: 'templates' as const },
          ].map((item) => (
            <div key={item.view} onClick={() => setActiveView(item.view)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', background: activeView === item.view ? 'rgba(59,130,246,0.15)' : 'transparent', color: activeView === item.view ? '#93c5fd' : 'rgba(255,255,255,0.45)', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', border: activeView === item.view ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent' }}>{item.icon}{item.label}</div>
          ))}
        </nav>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', marginTop: '24px' }}>
          {systemStatus?.services && Object.entries(systemStatus.services).slice(0, 3).map(([key, service]: [string, any]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: (service.status === 'RUNNING' || service.status === 'ACTIVE') ? '#10b981' : '#475569', boxShadow: (service.status === 'RUNNING' || service.status === 'ACTIVE') ? '0 0 8px #10b981' : 'none' }} />
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontWeight: 600 }}>{service.label}</span>
            </div>
          ))}
          <button onClick={() => setIsCancelModalOpen(true)} style={{ marginTop: '12px', width: '100%', padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '1px' }}>MANAGE SUBSCRIPTION</button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div style={{ flex: 1, minWidth: 0 }}>
      <GlobalHealthBanner />
      <div style={{ padding: '32px 36px', fontFamily: 'Inter, sans-serif' }}>
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

        {activeView === 'pipeline' && (
          <div>
        {/* ELITE HEADER */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.5px', color: '#0f172a' }}>Pipeline Command Center</h1>
            <p style={{ color: '#64748b', marginTop: '4px', fontSize: '0.875rem' }}>High-performance lead management & sales acceleration.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {selectedFile && (
              <button className="btn" onClick={exportToOutreach} style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)', boxShadow: '0 4px 15px rgba(99,102,241,0.3)' }}>
                <FileSpreadsheet size={16} /> Export CSV
              </button>
            )}
            <button onClick={() => { fetchFiles(); fetchCRMData(); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer', background: 'white', fontWeight: 700, fontSize: '0.875rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 0.2s' }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
            >
              <RefreshCcw size={16} /> Sync Pipeline
            </button>
          </div>
        </header>

        {/* ANALYTICS TOP BAR */}
        {selectedFile && (
          <div style={{ marginBottom: '32px' }} data-tour="stats">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
              {[
                { label: 'Total Leads', val: stats.TOTAL, icon: <Target size={20}/>, grad: 'linear-gradient(135deg,#1e3a8a,#3b82f6)', glow: 'rgba(59,130,246,0.25)', sub: 'In pipeline' },
                { label: 'Untouched', val: stats.NEW, icon: <Clock size={20}/>, grad: 'linear-gradient(135deg,#1e293b,#334155)', glow: 'rgba(51,65,85,0.25)', sub: 'Awaiting contact' },
                { label: 'Active Outreach', val: stats.CONTACTED, icon: <TrendingUp size={20}/>, grad: 'linear-gradient(135deg,#78350f,#f59e0b)', glow: 'rgba(245,158,11,0.25)', sub: 'In conversation' },
                { label: 'Deals Closed', val: stats.CLOSED, icon: <Award size={20}/>, grad: 'linear-gradient(135deg,#064e3b,#10b981)', glow: 'rgba(16,185,129,0.25)', sub: stats.TOTAL > 0 ? `${Math.round((stats.CLOSED/stats.TOTAL)*100)}% conversion` : '0% conversion' },
              ].map((s, i) => (
                <motion.div key={i} whileHover={{ y: -3 }} style={{ background: s.grad, padding: '24px', borderRadius: '20px', boxShadow: `0 8px 32px ${s.glow}`, color: 'white', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.08, transform: 'scale(2.5)' }}>{s.icon}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.65, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>{s.label}</div>
                      <div style={{ fontSize: '2.25rem', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1 }}>{s.val}</div>
                      <div style={{ fontSize: '0.7rem', opacity: 0.55, marginTop: '8px', fontWeight: 600 }}>{s.sub}</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.12)', padding: '10px', borderRadius: '12px' }}>{s.icon}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div style={{ background: 'white', padding: '20px 24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>Pipeline Health</span>
              <div style={{ flex: 1, height: '10px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden', display: 'flex' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${stats.TOTAL > 0 ? (stats.CLOSED/stats.TOTAL)*100 : 0}%` }} transition={{ duration: 1 }} style={{ height: '100%', background: 'linear-gradient(90deg,#059669,#10b981)' }} />
                <motion.div initial={{ width: 0 }} animate={{ width: `${stats.TOTAL > 0 ? (stats.CONTACTED/stats.TOTAL)*100 : 0}%` }} transition={{ duration: 1, delay: 0.2 }} style={{ height: '100%', background: 'linear-gradient(90deg,#d97706,#f59e0b)' }} />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap' }}>{stats.TOTAL > 0 ? Math.round((stats.CLOSED/stats.TOTAL)*100) : 0}% Closed</span>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr' + (selectedLead ? ' 420px' : ''), gap: '24px', alignItems: 'start' }}>
          {/* SIDEBAR: File Browser */}
          <aside 
            data-tour="batches"
            style={{ padding: '24px', borderRadius: '20px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', height: 'fit-content' }}
          >
            <h2 style={{ fontSize: '0.75rem', fontWeight: 800, marginBottom: '20px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#eff6ff', padding: '8px', borderRadius: '10px', color: '#3b82f6' }}>
                <FileSpreadsheet size={14} />
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
              <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ padding: '30px', borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'rgba(248, 250, 252, 0.5)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <h3 style={{ fontWeight: 900, fontSize: '1.4rem', fontFamily: 'var(--font-outfit), sans-serif' }}>{files.find(f => f.id === selectedFile)?.name.replace('.xlsx', '').replace(/_/g, ' ') || 'Active Batch'}</h3>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)' }}>TEMPLATE:</span>
                      <select value={activeTemplate} onChange={(e) => setActiveTemplate(e.target.value)} style={{ padding: '10px 20px', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1', fontWeight: 700, background: 'var(--white)', fontFamily: 'var(--font-inter), sans-serif', boxShadow: 'var(--shadow-sm)' }}>
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
                  <tr style={{ textAlign: 'left', color: '#94a3b8', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '1.5px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                      <th style={{ padding: '14px 16px', width: '40px' }}>
                        <input type="checkbox" checked={selectedLeadIds.size === filteredLeads.length && filteredLeads.length > 0} onChange={toggleAllLeads} style={{ cursor: 'pointer', width: '16px', height: '16px' }} />
                      </th>
                      <th style={{ padding: '14px 16px' }}>Lead</th>
                      <th style={{ padding: '14px 16px' }}>Quality</th>
                      <th style={{ padding: '14px 16px' }}>Temp</th>
                      <th style={{ padding: '14px 16px' }}>Rating</th>
                      <th style={{ padding: '14px 16px' }}>Stage</th>
                      <th style={{ padding: '14px 20px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((l, i) => {
                      const leadId = getLeadId(l);
                      const status = crmData[leadId]?.status || l.status || 'NEW';
                      const quality = getLeadQuality(l);
                      const temp = getTemperature(l, crmData, leadId);
                      const previewUrl = generatePreviewUrl(l);
                      const isSelected = selectedLeadIds.has(leadId);
                      const initials = getInitials(l.name || l.Name || '');
                      const avatarBg = getAvatarColor(l.name || l.Name || '');
                      const qualityBorder = quality.label === 'ELITE' ? '#10b981' : quality.label === 'SOLID' ? '#3b82f6' : '#f59e0b';
                      return (
                        <motion.tr 
                          layout
                          key={i} 
                          onClick={() => { setSelectedLead(l); setNotes(crmData[leadId]?.notes || l.notes || ''); }}
                          style={{ borderTop: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s', background: isSelected ? '#eff6ff' : 'transparent', borderLeft: `3px solid ${qualityBorder}` }}
                          whileHover={{ background: isSelected ? '#dbeafe' : '#f8fafc' }}
                        >
                          <td style={{ padding: '20px 16px' }} onClick={(e) => e.stopPropagation()}>
                            <input 
                              type="checkbox" 
                              checked={isSelected} 
                              onChange={() => toggleLeadSelection(leadId)}
                              style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                            />
                          </td>
                          <td style={{ padding: '20px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 900, color: 'white', flexShrink: 0, boxShadow: `0 0 0 3px ${avatarBg}22` }}>{initials}</div>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>{l.name || l.Name}</span>
                                  {(crmData[leadId]?.history?.some((h: any) => h.type === 'VIEW') || l.history?.some((h: any) => h.type === 'VIEW')) && (
                                    <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ background: '#fef2f2', color: '#ef4444', fontSize: '0.55rem', fontWeight: 900, padding: '2px 7px', borderRadius: '4px', letterSpacing: '0.5px' }}>HOT</motion.span>
                                  )}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><MapPin size={12} color="#3b82f6" /> {l.address?.split(',')[0] || 'Local'}</span>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Phone size={12} color="#10b981" /> {l.phone || l.Phone || 'N/A'}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '20px 16px' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 900, color: quality.color, background: `${quality.color}18`, border: `1px solid ${quality.color}40`, padding: '4px 10px', borderRadius: '20px', display: 'inline-block' }}
                              data-tooltip-id="global-tip"
                              data-tooltip-content={quality.label === 'ELITE' ? 'Rating ≥ 4.5: High value target' : quality.label === 'SOLID' ? 'Rating ≥ 3.5: Strong potential' : 'New or low volume'}
                            >{quality.label}</span>
                          </td>
                          <td style={{ padding: '20px 16px' }}>
                            <div title={temp.label} style={{ fontSize: '1rem' }}>{temp.icon}</div>
                          </td>
                          <td style={{ padding: '20px 16px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#f59e0b', fontWeight: 800, fontSize: '0.875rem' }}>
                              <Star size={14} fill="currentColor" /> {l.rating || l.Rating || '5.0'}
                            </div>
                          </td>
                          <td style={{ padding: '20px 16px' }}>
                            <select 
                              value={status} 
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => updateCRM(leadId, e.target.value)}
                              style={{ 
                                padding: '6px 14px', borderRadius: '20px', border: 'none', 
                                background: `${STATUS_COLORS[status]}22`, color: STATUS_COLORS[status], fontWeight: 800, fontSize: '0.7rem', cursor: 'pointer', outline: 'none'
                              }}
                            >
                              {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>
                          <td style={{ padding: '20px 20px' }} data-tour="actions">
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                              <Link href={previewUrl} target="_blank" onClick={(e) => e.stopPropagation()} style={{ 
                                padding: '8px 14px', background: 'linear-gradient(135deg,#1e293b,#334155)', color: 'white', 
                                borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                              }}>
                                <Zap size={12} color="#fbbf24" /> PREVIEW
                              </Link>
                              <div style={{ display: 'flex', gap: '4px', borderLeft: '1px solid #e2e8f0', paddingLeft: '6px', marginLeft: '2px' }}>
                                <a href={`tel:${l.phone || l.Phone}`} onClick={(e) => e.stopPropagation()} title="Call" style={{ padding: '7px', borderRadius: '8px', background: '#f8fafc', color: '#475569', display: 'flex', transition: '0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.color = '#3b82f6'; }} onMouseOut={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#475569'; }}><Phone size={14} /></a>
                                <button onClick={(e) => { e.stopPropagation(); copyToClipboard(previewUrl, leadId); }} style={{ padding: '7px', background: copiedId === leadId ? '#10b981' : '#f8fafc', color: copiedId === leadId ? 'white' : '#475569', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex' }} title="Copy link">{copiedId === leadId ? <CheckCircle2 size={14} /> : <Copy size={14} />}</button>
                              </div>
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
                style={{ padding: '32px', borderRadius: '24px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', position: 'sticky', top: '32px', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}
              >
                {/* HEADER */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: getAvatarColor(selectedLead.name || selectedLead.Name || ''), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 900, color: 'white', flexShrink: 0 }}>{getInitials(selectedLead.name || selectedLead.Name || '')}</div>
                    <div>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-0.5px', color: '#0f172a' }}>{selectedLead.name || selectedLead.Name}</h2>
                      <div style={{ color: STATUS_COLORS[crmData[getLeadId(selectedLead)]?.status || selectedLead.status || 'NEW'], fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase', marginTop: '4px', letterSpacing: '1px' }}>{crmData[getLeadId(selectedLead)]?.status || selectedLead.status || 'NEW'}</div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedLead(null)} style={{ border: 'none', background: '#f1f5f9', padding: '8px', borderRadius: '50%', cursor: 'pointer', color: '#64748b', display: 'flex' }}><X size={18} /></button>
                </div>

                {/* PITCH SCORE RING */}
                {(() => { const score = getPitchScore(selectedLead, crmData, getLeadId(selectedLead)); const r = 28; const circ = 2 * Math.PI * r; const offset = circ - (score / 100) * circ; const clr = score >= 75 ? '#10b981' : score >= 50 ? '#3b82f6' : '#f59e0b'; return (
                  <div style={{ background: 'linear-gradient(135deg,#f8fafc,#f1f5f9)', padding: '20px', borderRadius: '16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <svg width="70" height="70" viewBox="0 0 70 70"><circle cx="35" cy="35" r={r} fill="none" stroke="#e2e8f0" strokeWidth="6"/><circle cx="35" cy="35" r={r} fill="none" stroke={clr} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 35 35)" style={{ transition: 'stroke-dashoffset 1s ease' }}/><text x="35" y="39" textAnchor="middle" fontSize="14" fontWeight="900" fill={clr}>{score}</text></svg>
                    <div><div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Pitch Score</div><div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>{score >= 75 ? '🔥 Highly Closeable' : score >= 50 ? '⚡ Good Potential' : '❄️ Needs Nurturing'}</div></div>
                  </div>
                );})()
                }

                {/* ADDRESS */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '24px', color: '#64748b', fontSize: '0.875rem' }}>
                  <MapPin size={16} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} /> {selectedLead.address || selectedLead.Address || 'Location hidden'}
                </div>

                {/* VISUAL PROOF */}
                {(selectedLead['Screenshot Path'] || selectedLead.screenshot_path) && (
                  <div style={{ marginBottom: '24px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <div style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Visual Proof Ready</span>
                      <ImageIcon size={12} color="#94a3b8" />
                    </div>
                    <div style={{ height: '180px', background: `url(http://localhost:3000/api/proxy-image?path=${encodeURIComponent(selectedLead['Screenshot Path'] || selectedLead.screenshot_path)})`, backgroundSize: 'cover', backgroundPosition: 'top' }} />
                  </div>
                )}

                {/* AI CONTENT EDITOR */}
                {(Object.keys(editableAI).length > 0 || selectedLead.ai_copy) && (
                  <div style={{ background: 'linear-gradient(135deg,#eff6ff,#f0f9ff)', padding: '20px', borderRadius: '16px', marginBottom: '24px', border: '1px solid rgba(59,130,246,0.15)' }}>
                    <h4 style={{ fontSize: '0.7rem', fontWeight: 900, color: '#3b82f6', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '1px' }}><Zap size={14} /> AI Personalized Content</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>HERO HEADLINE</label>
                        <input value={editableAI.ai_hero_title || selectedLead.ai_copy?.ai_hero_title || ''} onChange={(e) => setEditableAI({...editableAI, ai_hero_title: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #bfdbfe', fontSize: '0.85rem', fontWeight: 600, background: 'white', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>CORE PAIN POINT</label>
                        <input value={editableAI.ai_pain_point || selectedLead.ai_copy?.ai_pain_point || ''} onChange={(e) => setEditableAI({...editableAI, ai_pain_point: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #bfdbfe', fontSize: '0.85rem', fontWeight: 600, background: 'white', outline: 'none' }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* REVIEWS */}
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', marginBottom: '24px', border: '1px solid #f1f5f9' }}>
                  <h4 style={{ fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '1px' }}><MessageSquare size={13} /> Google Reviews</h4>
                  <div style={{ maxHeight: '160px', overflowY: 'auto', paddingRight: '8px' }}>
                    {(selectedLead['Recent Reviews (All)'] || selectedLead.rating) ? (
                      <div style={{ fontSize: '0.85rem', color: '#334155', whiteSpace: 'pre-line', lineHeight: '1.7' }}>{selectedLead['Recent Reviews (All)'] || `Rating: ${selectedLead.rating}`}</div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '20px 0', opacity: 0.4 }}><Star size={24} style={{ margin: '0 auto 8px' }} /><p style={{ fontSize: '0.8rem' }}>No review text found.</p></div>
                    )}
                  </div>
                </div>

                {/* ENGAGEMENT TIMELINE */}
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '1px' }}><TrendingUp size={13} /> Engagement History</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {(crmData[getLeadId(selectedLead)]?.history || selectedLead.history)?.length > 0 ? (
                      (crmData[getLeadId(selectedLead)]?.history || selectedLead.history).slice().reverse().map((h: any, idx: number) => (
                        <div key={idx} style={{ paddingLeft: '14px', borderLeft: `2px solid ${h.type === 'ESCALATION' ? '#3b82f6' : '#10b981'}`, position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ position: 'absolute', left: '-5px', top: '4px', width: '7px', height: '7px', borderRadius: '50%', background: h.type === 'ESCALATION' ? '#3b82f6' : '#10b981' }} />
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b' }}>{h.type === 'ESCALATION' ? '🚀 Pushed to Campaign' : '👀 Site Viewed'}</div>
                          <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '8px' }}>{timeAgo(h.timestamp)}</div>
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>No engagement recorded yet.</div>
                    )}
                  </div>
                </div>

                {/* NOTES */}
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>Strategy Notes</h4>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} onBlur={() => updateCRM(getLeadId(selectedLead), undefined, notes)} placeholder="Add pitch notes, follow-up schedule..." style={{ width: '100%', height: '90px', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', resize: 'none', fontSize: '0.85rem', fontFamily: 'inherit', outline: 'none', background: '#f8fafc' }} />
                </div>

                <button onClick={() => copyPitch(selectedLead)} style={{ width: '100%', padding: '16px', background: copiedPitch ? 'linear-gradient(135deg,#059669,#10b981)' : 'linear-gradient(135deg,#2563eb,#3b82f6)', color: 'white', border: 'none', borderRadius: '14px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '0.95rem', boxShadow: copiedPitch ? '0 8px 20px rgba(16,185,129,0.3)' : '0 8px 20px rgba(59,130,246,0.3)', transition: 'all 0.2s' }}>
                  {copiedPitch ? <CheckCircle2 size={18} /> : <Send size={18} />} {copiedPitch ? 'PITCH COPIED!' : 'COPY PERSONALIZED PITCH'}
                </button>
              </motion.aside>
            ) : (
              <motion.aside 
                data-tour="system-monitor"
                key="system-monitor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass"
                style={{ padding: '30px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', height: 'fit-content' }}
              >
                <div style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '25px', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-outfit), sans-serif' }}>
                    <Zap size={18} color="var(--primary)" /> System Engine
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
                              background: (service.status === 'RUNNING' || service.status === 'PROCESSING' || service.status === 'ACTIVE') ? 'var(--accent)' : '#cbd5e1',
                              boxShadow: (service.status === 'RUNNING' || service.status === 'PROCESSING' || service.status === 'ACTIVE') ? '0 0 10px var(--accent)' : 'none' 
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
                
                <div className="glass-dark" style={{ padding: '25px', borderRadius: 'var(--radius-md)' }}>
                  <h3 style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-outfit), sans-serif' }}>
                    <TrendingUp size={16} color="var(--primary)" /> Performance
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
        )}

        {/* ===== TEMPLATES STUDIO VIEW ===== */}
        {activeView === 'templates' && !isEditorMode && (
          <div>
            {/* Header */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.5px', color: '#0f172a' }}>Template Studio</h1>
                <p style={{ color: '#64748b', marginTop: '4px', fontSize: '0.875rem' }}>Browse, preview and personalize any of your {templates.length} niche templates.</p>
              </div>
              {selectedTemplate && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => setIsEditorMode(true)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 24px', background: 'linear-gradient(135deg,#3b82f6,#6366f1)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(99,102,241,0.3)' }}
                  >
                    <Settings size={16} /> Enter Visual Editor
                  </button>
                  <button onClick={() => { const url = `${window.location.origin}${selectedTemplate.id}?${new URLSearchParams(templateParams).toString()}`; navigator.clipboard.writeText(url); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 20px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                    <Copy size={16} /> Copy Shareable Link
                  </button>
                </div>
              )}
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: selectedTemplate ? '1fr 420px' : '1fr', gap: '24px', alignItems: 'start' }}>
              {/* GALLERY GRID */}
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                  {templates.map((tmpl) => {
                    const isActive = selectedTemplate?.id === tmpl.id;
                    const origin = typeof window !== 'undefined' ? window.location.origin : '';
                    const previewUrl = `${origin}${tmpl.id}?${new URLSearchParams(templateParams).toString()}`;
                    return (
                      <motion.div
                        key={tmpl.id}
                        whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}
                        onClick={() => setSelectedTemplate(tmpl)}
                        style={{ borderRadius: '16px', overflow: 'hidden', border: `2px solid ${isActive ? '#3b82f6' : '#e2e8f0'}`, cursor: 'pointer', background: 'white', boxShadow: isActive ? '0 0 0 4px rgba(59,130,246,0.15)' : '0 1px 4px rgba(0,0,0,0.04)', transition: 'border-color 0.2s' }}
                      >
                        {/* Mini iframe preview */}
                        <div style={{ position: 'relative', width: '100%', height: '140px', overflow: 'hidden', background: '#f8fafc', pointerEvents: 'none' }}>
                          <iframe
                            src={previewUrl}
                            style={{ width: '800px', height: '560px', border: 'none', transform: 'scale(0.25)', transformOrigin: 'top left', pointerEvents: 'none' }}
                            loading="lazy"
                            title={tmpl.label}
                          />
                          {isActive && (
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(59,130,246,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <div style={{ background: '#3b82f6', color: 'white', fontSize: '0.65rem', fontWeight: 900, padding: '4px 10px', borderRadius: '20px', letterSpacing: '1px' }}>SELECTED</div>
                            </div>
                          )}
                        </div>
                        <div style={{ padding: '12px 14px', borderTop: '1px solid #f1f5f9' }}>
                          <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#0f172a', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tmpl.label}</div>
                          <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600 }}>{tmpl.id}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* EDITOR PREVIEW SIDEBAR */}
              {selectedTemplate && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ borderRadius: '20px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', position: 'sticky', top: '32px', overflow: 'hidden' }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <iframe
                      key={JSON.stringify(templateParams) + selectedTemplate.id}
                      src={`${typeof window !== 'undefined' ? window.location.origin : ''}${selectedTemplate.id}?${new URLSearchParams(templateParams).toString()}`}
                      style={{ width: '1024px', height: '768px', border: 'none', transform: 'scale(0.4)', transformOrigin: 'top left', pointerEvents: 'none' }}
                      title="Live Preview"
                    />
                    <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                      <Link href={`${selectedTemplate.id}?${new URLSearchParams(templateParams).toString()}`} target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', background: 'rgba(15,23,42,0.8)', color: 'white', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
                        <ExternalLink size={12} /> Full Screen
                      </Link>
                    </div>
                  </div>

                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontWeight: 900, fontSize: '1rem', color: '#0f172a', marginBottom: '4px' }}>{selectedTemplate.label}</h3>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>Elite template designed for high conversion and technical precision.</p>
                    
                    <button 
                      onClick={() => setIsEditorMode(true)}
                      style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,#1e293b,#334155)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    >
                      <Settings size={18} /> OPEN VISUAL EDITOR
                    </button>
                    
                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                       <button onClick={() => setSelectedTemplate(null)} style={{ border: '1px solid #e2e8f0', background: 'white', padding: '10px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', cursor: 'pointer' }}>Deselect Template</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* ===== FULL-SCREEN WORDPRESS STYLE EDITOR ===== */}
        {activeView === 'templates' && isEditorMode && selectedTemplate && (
          <div style={{ position: 'fixed', inset: 0, background: '#f1f5f9', zIndex: 9999, display: 'flex', flexDirection: 'column' }}>
            {/* Editor Top Bar */}
            <div style={{ height: '60px', background: '#1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #334155', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button 
                  onClick={() => setIsEditorMode(false)}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700 }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'white'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                >
                  <ChevronLeft size={20} /> Exit Studio
                </button>
                <div style={{ width: '1px', height: '24px', background: '#334155' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ background: 'rgba(59,130,246,0.2)', padding: '6px', borderRadius: '8px', color: '#60a5fa' }}>
                    <Settings size={18} />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{selectedTemplate.label} <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 500, marginLeft: '8px' }}>/ v2 Elite Editor</span></span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', background: '#334155', padding: '4px', borderRadius: '10px', marginRight: '10px' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}><Monitor size={16} /></button>
                  <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', padding: '6px 12px', borderRadius: '6px', cursor: 'not-allowed' }}><Tablet size={16} /></button>
                  <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', padding: '6px 12px', borderRadius: '6px', cursor: 'not-allowed' }}><Smartphone size={16} /></button>
                </div>
                <button 
                  onClick={() => { const url = `${window.location.origin}${selectedTemplate.id}?${new URLSearchParams(templateParams).toString()}`; window.open(url, '_blank'); }}
                  style={{ padding: '9px 18px', background: '#334155', border: '1px solid #475569', borderRadius: '10px', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Preview
                </button>
                <button 
                  onClick={() => { const url = `${window.location.origin}${selectedTemplate.id}?${new URLSearchParams(templateParams).toString()}`; navigator.clipboard.writeText(url); }}
                  style={{ padding: '9px 24px', background: '#3b82f6', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}
                >
                  Save & Export
                </button>
              </div>
            </div>

            {/* Main Editor Body */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
              
              {/* LEFT: NAVIGATOR */}
              <div style={{ width: '280px', background: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
                  <h3 style={{ fontSize: '0.75rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0' }}>Page Navigator</h3>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                  {[
                    { id: 'site', label: 'Site Identity', icon: <Droplets size={16} /> },
                    { id: 'hero', label: 'Hero Section', icon: <Zap size={16} /> },
                    { id: 'services', label: 'Service List', icon: <Award size={16} /> },
                    { id: 'testimonials', label: 'Social Proof', icon: <Star size={16} /> },
                    { id: 'footer', label: 'Contact/Footer', icon: <Phone size={16} /> },
                  ].map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => setActiveSection(sec.id)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', border: 'none', borderRadius: '10px', background: activeSection === sec.id ? '#eff6ff' : 'transparent', color: activeSection === sec.id ? '#3b82f6' : '#64748b', fontWeight: activeSection === sec.id ? 800 : 600, fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left', marginBottom: '4px', transition: 'all 0.2s' }}
                    >
                      <span style={{ opacity: activeSection === sec.id ? 1 : 0.6 }}>{sec.icon}</span>
                      {sec.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CENTER: CANVAS */}
              <div style={{ flex: 1, background: '#f1f5f9', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px', paddingBottom: '40px', overflowY: 'auto' }}>
                 <div style={{ width: '1280px', minHeight: '800px', background: 'white', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                    {isIframeLoading && (
                      <div style={{ position: 'absolute', inset: 0, background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                        <div style={{ width: '40px', height: '40px', border: '3px solid #f1f5f9', borderTop: '3px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        <p style={{ marginTop: '16px', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', letterSpacing: '1px' }}>SYNCHRONIZING CANVAS...</p>
                      </div>
                    )}
                    <iframe
                      key={JSON.stringify(templateParams) + selectedTemplate.id}
                      src={`${typeof window !== 'undefined' ? window.location.origin : ''}${selectedTemplate.id}?${new URLSearchParams(templateParams).toString()}`}
                      style={{ width: '100%', height: 'calc(100vh - 140px)', border: 'none' }}
                      title="Editor Canvas"
                      onLoad={() => setIsIframeLoading(false)}
                    />
                 </div>
                 <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
                    <button onClick={() => setIsIframeLoading(true)} style={{ background: '#334155', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <RefreshCcw size={14} /> Force Sync Canvas
                    </button>
                    <div style={{ padding: '8px 16px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800 }}>LIVE SYNC ACTIVE</div>
                 </div>
              </div>

              {/* RIGHT: INSPECTOR */}
              <div style={{ width: '360px', background: 'white', borderLeft: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '0.75rem', fontWeight: 900, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '1px' }}>Inspector Settings</h3>
                </div>
                
                <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                  {activeSection === 'site' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Business Name</label>
                        <input value={templateParams.name} onChange={(e) => setTemplateParams({...templateParams, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 700, outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Location</label>
                        <input value={templateParams.location} onChange={(e) => setTemplateParams({...templateParams, location: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 700, outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Star Rating</label>
                        <input value={templateParams.rating} onChange={(e) => setTemplateParams({...templateParams, rating: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 700, outline: 'none' }} />
                      </div>
                    </div>
                  )}

                  {activeSection === 'hero' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '10px' }}>
                        <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, lineHeight: 1.5 }}>Use these fields to override the default niche messaging for more specialized campaigns.</p>
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Hero Title (AI Override)</label>
                        <textarea value={templateParams.ai_hero_title} onChange={(e) => setTemplateParams({...templateParams, ai_hero_title: e.target.value})} rows={3} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 700, outline: 'none', resize: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Hero Subtitle</label>
                        <textarea value={templateParams.ai_hero_subtitle} onChange={(e) => setTemplateParams({...templateParams, ai_hero_subtitle: e.target.value})} rows={3} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 700, outline: 'none', resize: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Primary CTA Text</label>
                        <input value={templateParams.ai_niche_cta} onChange={(e) => setTemplateParams({...templateParams, ai_niche_cta: e.target.value})} placeholder="e.get Free Quote" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 700, outline: 'none' }} />
                      </div>
                    </div>
                  )}

                  {activeSection === 'services' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Main Service Area</label>
                        <input value={templateParams.ai_service_1} onChange={(e) => setTemplateParams({...templateParams, ai_service_1: e.target.value})} placeholder="e.g. Precision Maintenance" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 700, outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Secondary Offering</label>
                        <input value={templateParams.ai_service_2} onChange={(e) => setTemplateParams({...templateParams, ai_service_2: e.target.value})} placeholder="e.g. Crisis Response" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 700, outline: 'none' }} />
                      </div>
                      <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                         <p style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600 }}>These values are dynamically mapped to the template's service grid.</p>
                      </div>
                    </div>
                  )}

                  {activeSection === 'testimonials' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <label style={{ fontSize: '0.65rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Featured Testimonial</label>
                        <textarea value={templateParams.ai_testimonial_1} onChange={(e) => setTemplateParams({...templateParams, ai_testimonial_1: e.target.value})} rows={4} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: 700, outline: 'none', resize: 'none' }} />
                      </div>
                      <div style={{ background: '#fff7ed', padding: '12px', borderRadius: '10px', border: '1px solid #ffedd5' }}>
                         <p style={{ fontSize: '0.65rem', color: '#9a3412', fontWeight: 700 }}>PRO TIP: Real customer voices increase conversion by 40%.</p>
                      </div>
                    </div>
                  )}

                  {['footer'].includes(activeSection) && (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', display: 'inline-block', marginBottom: '16px' }}>
                         <Settings size={32} color="#cbd5e1" />
                      </div>
                      <h4 style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>Advanced Controls</h4>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px' }}>Section-specific block editing is coming in the next build.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
