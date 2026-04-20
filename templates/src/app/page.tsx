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

const SMART_FILTER_OPTIONS = [
  { value: 'ALL', label: 'ALL SEGMENTS' },
  { value: 'READY', label: 'READY TO PITCH' },
  { value: 'HOT', label: 'HOT / VIEWED' },
  { value: 'AI_GAP', label: 'NEEDS AI COPY' },
  { value: 'NO_PHONE', label: 'MISSING PHONE' },
  { value: 'FOLLOW_UP', label: 'FOLLOW-UP QUEUE' },
  { value: 'SCREENSHOT', label: 'HAS VISUAL PROOF' }
];

type DashboardView = 'overview' | 'pipeline' | 'outreach' | 'templates' | 'operations';

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
  const [smartFilter, setSmartFilter] = useState('ALL');
  const [pipelineSort, setPipelineSort] = useState<'SCORE' | 'NAME' | 'RATING' | 'RECENT'>('SCORE');

  // View routing
  const [activeView, setActiveView] = useState<DashboardView>('overview');

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
      fetchCRMData();
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

  const getInitials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) || '??';
  const getAvatarColor = (name: string) => {
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899'];
    let hash = 0;
    for (const char of (name || '')) hash = char.charCodeAt(0) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };
  const getTemperature = (lead: any, crm: any, id: string) => {
    const history = crm[id]?.history || lead.history || [];
    if (history.some((entry: any) => entry.type === 'VIEW')) return { icon: 'HOT', label: 'HOT', color: '#ef4444' };
    if ((crm[id]?.status || lead.status) === 'CONTACTED') return { icon: 'WARM', label: 'WARM', color: '#f59e0b' };
    return { icon: 'COLD', label: 'COLD', color: '#94a3b8' };
  };
  const getPitchScore = (lead: any, crm: any, id: string) => {
    let score = 40;
    const rating = parseFloat(lead.Rating || lead.rating || '0');
    if (rating >= 4.5) score += 25;
    else if (rating >= 3.5) score += 15;
    const hasAI = !!(lead.ai_hero_title || lead.ai_copy?.ai_hero_title);
    if (hasAI) score += 20;
    const history = crm[id]?.history || lead.history || [];
    if (history.some((entry: any) => entry.type === 'VIEW')) score += 15;
    if ((crm[id]?.status || lead.status) === 'NEGOTIATING') score += 10;
    return Math.min(score, 100);
  };
  const getLastActivityMs = (lead: any, crm: any, id: string) => {
    const history = crm[id]?.history || lead.history || [];
    const latestHistory = history.reduce((latest: number, entry: any) => {
      const entryTime = new Date(entry.timestamp || 0).getTime();
      return Number.isFinite(entryTime) ? Math.max(latest, entryTime) : latest;
    }, 0);
    const fallback = new Date(lead.updated_at || lead.created_at || 0).getTime();
    return latestHistory || (Number.isFinite(fallback) ? fallback : 0);
  };
  const timeAgo = (timestamp: string) => {
    const delta = Date.now() - new Date(timestamp).getTime();
    if (delta < 3600000) return `${Math.max(1, Math.floor(delta / 60000))}m ago`;
    if (delta < 86400000) return `${Math.max(1, Math.floor(delta / 3600000))}h ago`;
    return `${Math.max(1, Math.floor(delta / 86400000))}d ago`;
  };
  const getCadenceState = (record: any) => {
    if (!['CONTACTED', 'NEGOTIATING', 'INTERESTED'].includes(record.status)) {
      if (record.hasViewed) return { label: 'VIEWED', color: '#ef4444', detail: 'Preview interest detected' };
      return { label: 'NEW', color: '#2563eb', detail: 'No follow-up SLA yet' };
    }

    if (!record.lastActivityMs) {
      return { label: 'UNTRACKED', color: '#94a3b8', detail: 'No engagement timestamp recorded' };
    }

    const age = Date.now() - record.lastActivityMs;
    if (age < 24 * 60 * 60 * 1000) return { label: 'FRESH', color: '#10b981', detail: 'Touched in the last 24h' };
    if (age < 72 * 60 * 60 * 1000) return { label: 'DUE SOON', color: '#2563eb', detail: 'Should be followed up soon' };
    return { label: 'OVERDUE', color: '#f59e0b', detail: 'Needs immediate follow-up' };
  };
  const formatBatchName = (name?: string) => (name || 'Untitled batch').replace('.xlsx', '').replace(/_/g, ' ');

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

  const filteredLeads = useMemo(() => {
    const filtered = leads.filter(l => {
      const matchesSearch = (l.Name || l.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      const leadId = getLeadId(l);
      const status = crmData[leadId]?.status || l.status || 'NEW';
      const quality = getLeadQuality(l).label;
      const history = crmData[leadId]?.history || l.history || [];
      const hasAI = !!(l.ai_hero_title || l.ai_copy?.ai_hero_title || l.ai_pain_point || l.ai_copy?.ai_pain_point);
      const hasPhone = !!(l.phone || l.Phone);
      const hasScreenshot = !!(l['Screenshot Path'] || l.screenshot_path);
      const isViewed = history.some((entry: any) => entry.type === 'VIEW');
      const isReady = status === 'NEW' && hasPhone && (quality === 'ELITE' || quality === 'SOLID');
      const needsFollowUp = status === 'CONTACTED' || status === 'NEGOTIATING' || status === 'INTERESTED';

      const matchesStatus = statusFilter === 'ALL' || status === statusFilter;
      const matchesQuality = qualityFilter === 'ALL' || quality === qualityFilter;
      const matchesSmart =
        smartFilter === 'ALL' ||
        (smartFilter === 'READY' && isReady) ||
        (smartFilter === 'HOT' && isViewed) ||
        (smartFilter === 'AI_GAP' && !hasAI) ||
        (smartFilter === 'NO_PHONE' && !hasPhone) ||
        (smartFilter === 'FOLLOW_UP' && needsFollowUp) ||
        (smartFilter === 'SCREENSHOT' && hasScreenshot);

      return matchesSearch && matchesStatus && matchesQuality && matchesSmart;
    });

    return [...filtered].sort((a, b) => {
      if (pipelineSort === 'NAME') {
        return String(a.Name || a.name || '').localeCompare(String(b.Name || b.name || ''));
      }
      if (pipelineSort === 'RATING') {
        return parseFloat(String(b.Rating || b.rating || '0')) - parseFloat(String(a.Rating || a.rating || '0'));
      }
      if (pipelineSort === 'RECENT') {
        return getLastActivityMs(b, crmData, getLeadId(b)) - getLastActivityMs(a, crmData, getLeadId(a));
      }
      return getPitchScore(b, crmData, getLeadId(b)) - getPitchScore(a, crmData, getLeadId(a));
    });
  }, [leads, searchQuery, statusFilter, qualityFilter, smartFilter, pipelineSort, crmData]);

  const stats = useMemo(() => {
    const counts = { TOTAL: leads.length, NEW: 0, CONTACTED: 0, CLOSED: 0 };
    leads.forEach(l => {
      const status = crmData[getLeadId(l)]?.status || l.status || 'NEW';
      if (status === 'NEW') counts.NEW++;
      if (['CONTACTED', 'NEGOTIATING', 'INTERESTED'].includes(status)) counts.CONTACTED++;
      if (status === 'CLOSED') counts.CLOSED++;
    });
    return counts;
  }, [leads, crmData]);

  const leadRecords = useMemo(() => {
    return leads.map((lead) => {
      const id = getLeadId(lead);
      const history = crmData[id]?.history || lead.history || [];
      const status = crmData[id]?.status || lead.status || 'NEW';
      const ratingValue = parseFloat(String(lead.Rating || lead.rating || '0'));
      const niche = lead.category || lead.Category || 'Specialist';
      return {
        lead,
        id,
        name: lead.Name || lead.name || 'Unnamed lead',
        location: lead.address || lead.Address || 'Local Area',
        phone: lead.phone || lead.Phone || '',
        niche,
        quality: getLeadQuality(lead),
        status,
        ratingValue,
        previewUrl: generatePreviewUrl(lead),
        hasAI: !!(lead.ai_hero_title || lead.ai_copy?.ai_hero_title || lead.ai_pain_point || lead.ai_copy?.ai_pain_point),
        hasPhone: !!(lead.phone || lead.Phone),
        hasScreenshot: !!(lead['Screenshot Path'] || lead.screenshot_path),
        hasViewed: history.some((entry: any) => entry.type === 'VIEW'),
        history,
        notes: crmData[id]?.notes || lead.notes || '',
        pitchScore: getPitchScore(lead, crmData, id),
        temperature: getTemperature(lead, crmData, id),
        lastActivityMs: getLastActivityMs(lead, crmData, id)
      };
    });
  }, [leads, crmData, activeTemplate]);

  const statusBreakdown = useMemo(() => {
    return Object.keys(STATUS_COLORS).reduce<Record<string, number>>((acc, key) => {
      acc[key] = leadRecords.filter(record => record.status === key).length;
      return acc;
    }, {});
  }, [leadRecords]);

  const qualityBreakdown = useMemo(() => {
    return leadRecords.reduce<Record<string, number>>((acc, record) => {
      acc[record.quality.label] = (acc[record.quality.label] || 0) + 1;
      return acc;
    }, {});
  }, [leadRecords]);

  const overviewMetrics = useMemo(() => {
    const total = leadRecords.length;
    const rated = leadRecords.filter(record => record.ratingValue > 0);
    const aiCoverage = total ? Math.round((leadRecords.filter(record => record.hasAI).length / total) * 100) : 0;
    const phoneCoverage = total ? Math.round((leadRecords.filter(record => record.hasPhone).length / total) * 100) : 0;
    const screenshotCoverage = total ? Math.round((leadRecords.filter(record => record.hasScreenshot).length / total) * 100) : 0;
    const readyCount = leadRecords.filter(record => record.status === 'NEW' && record.hasPhone && ['ELITE', 'SOLID'].includes(record.quality.label)).length;
    const hotCount = leadRecords.filter(record => record.hasViewed).length;
    const engagedCount = leadRecords.filter(record => ['CONTACTED', 'NEGOTIATING', 'INTERESTED'].includes(record.status)).length;
    const closingCount = leadRecords.filter(record => ['NEGOTIATING', 'INTERESTED'].includes(record.status)).length;
    const closedCount = leadRecords.filter(record => record.status === 'CLOSED').length;
    const previewReadyCount = leadRecords.filter(record => record.hasPhone && record.hasAI).length;
    const avgPitchScore = total ? Math.round(leadRecords.reduce((sum, record) => sum + record.pitchScore, 0) / total) : 0;
    const avgRating = rated.length ? (rated.reduce((sum, record) => sum + record.ratingValue, 0) / rated.length).toFixed(1) : '0.0';
    const previewReadyCoverage = total ? Math.round((previewReadyCount / total) * 100) : 0;
    const engagedRate = total ? Math.round((engagedCount / total) * 100) : 0;
    const closedRate = total ? Math.round((closedCount / total) * 100) : 0;
    const readinessScore = total
      ? Math.round(
          aiCoverage * 0.25 +
          phoneCoverage * 0.25 +
          screenshotCoverage * 0.15 +
          previewReadyCoverage * 0.15 +
          engagedRate * 0.1 +
          (readyCount / total) * 100 * 0.1
        )
      : 0;

    return {
      total,
      aiCoverage,
      phoneCoverage,
      screenshotCoverage,
      readyCount,
      hotCount,
      engagedCount,
      closingCount,
      closedCount,
      previewReadyCount,
      previewReadyCoverage,
      avgPitchScore,
      engagedRate,
      closedRate,
      readinessScore,
      avgRating
    };
  }, [leadRecords]);

  const latestBatchMeta = useMemo(() => {
    if (files.length === 0) return null;
    return [...files].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0] || null;
  }, [files]);

  const serviceHealthSummary = useMemo(() => {
    const services = Object.values(systemStatus?.services || {}) as any[];
    const healthy = services.filter((service) => ['RUNNING', 'ACTIVE', 'PROCESSING'].includes(service.status)).length;
    return {
      total: services.length,
      healthy,
      unhealthy: Math.max(services.length - healthy, 0)
    };
  }, [systemStatus]);

  const smartSegments = useMemo(() => {
    return [
      {
        key: 'READY',
        label: 'Ready to pitch',
        value: leadRecords.filter(record => record.status === 'NEW' && record.hasPhone && ['ELITE', 'SOLID'].includes(record.quality.label)).length,
        hint: 'High-quality leads with a phone number and untouched status',
        color: '#2563eb'
      },
      {
        key: 'HOT',
        label: 'Hot or viewed',
        value: leadRecords.filter(record => record.hasViewed).length,
        hint: 'Leads with engagement activity already recorded',
        color: '#ef4444'
      },
      {
        key: 'AI_GAP',
        label: 'Needs AI copy',
        value: leadRecords.filter(record => !record.hasAI).length,
        hint: 'Leads missing hero or pain-point personalization',
        color: '#8b5cf6'
      },
      {
        key: 'FOLLOW_UP',
        label: 'Follow-up queue',
        value: leadRecords.filter(record => ['CONTACTED', 'NEGOTIATING', 'INTERESTED'].includes(record.status)).length,
        hint: 'Conversations in play that still need action',
        color: '#f59e0b'
      }
    ];
  }, [leadRecords]);

  const recentActivity = useMemo(() => {
    return leadRecords
      .flatMap((record) =>
        record.history.map((entry: any) => ({
          id: `${record.id}-${entry.timestamp}-${entry.type}`,
          title: entry.type === 'VIEW' ? `${record.name} opened a preview` : `${record.name} hit ${entry.type}`,
          subtitle: `${record.niche} in ${record.location}`,
          timestamp: entry.timestamp,
          when: timeAgo(entry.timestamp),
          color: entry.type === 'VIEW' ? '#ef4444' : '#2563eb'
        }))
      )
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 8);
  }, [leadRecords]);

  const topOpportunities = useMemo(() => {
    return [...leadRecords]
      .filter(record => record.status !== 'CLOSED')
      .sort((a, b) => b.pitchScore - a.pitchScore || Number(b.hasViewed) - Number(a.hasViewed))
      .slice(0, 8);
  }, [leadRecords]);

  const outreachQueue = useMemo(() => {
    return [...leadRecords]
      .filter(record => record.status !== 'CLOSED')
      .sort((a, b) => {
        if (b.pitchScore !== a.pitchScore) return b.pitchScore - a.pitchScore;
        if (Number(b.hasViewed) !== Number(a.hasViewed)) return Number(b.hasViewed) - Number(a.hasViewed);
        return b.lastActivityMs - a.lastActivityMs;
      })
      .slice(0, 12);
  }, [leadRecords]);

  const templateCoverage = useMemo(() => {
    const coverage = leadRecords.reduce<Record<string, { label: string; count: number }>>((acc, record) => {
      const templateId = autoSelectTemplate(record.niche);
      const templateLabel = templates.find(template => template.id === templateId)?.label || templateId;
      if (!acc[templateId]) acc[templateId] = { label: templateLabel, count: 0 };
      acc[templateId].count += 1;
      return acc;
    }, {});

    return Object.entries(coverage)
      .map(([id, value]) => ({ id, ...value }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [leadRecords]);

  const funnelStages = useMemo(() => {
    const total = overviewMetrics.total || 1;
    return [
      { label: 'Untouched', count: statusBreakdown.NEW || 0, pct: Math.round(((statusBreakdown.NEW || 0) / total) * 100), color: '#334155' },
      { label: 'Engaged', count: overviewMetrics.engagedCount, pct: Math.round((overviewMetrics.engagedCount / total) * 100), color: '#f59e0b' },
      { label: 'Closing', count: overviewMetrics.closingCount, pct: Math.round((overviewMetrics.closingCount / total) * 100), color: '#8b5cf6' },
      { label: 'Won', count: overviewMetrics.closedCount, pct: Math.round((overviewMetrics.closedCount / total) * 100), color: '#10b981' }
    ];
  }, [overviewMetrics, statusBreakdown]);

  const staleFollowUps = useMemo(() => {
    const staleAfterMs = 72 * 60 * 60 * 1000;
    return [...leadRecords]
      .filter((record) => ['CONTACTED', 'NEGOTIATING', 'INTERESTED'].includes(record.status))
      .filter((record) => !record.lastActivityMs || Date.now() - record.lastActivityMs > staleAfterMs)
      .sort((a, b) => (a.lastActivityMs || 0) - (b.lastActivityMs || 0))
      .slice(0, 6);
  }, [leadRecords]);

  const channelReadiness = useMemo(() => {
    const total = overviewMetrics.total;
    const missingAI = leadRecords.filter(record => !record.hasAI).length;
    const missingPhone = leadRecords.filter(record => !record.hasPhone).length;
    const missingVisualProof = leadRecords.filter(record => !record.hasScreenshot).length;

    return [
      {
        label: 'Direct call reach',
        value: overviewMetrics.phoneCoverage,
        color: '#10b981',
        detail: total ? `${missingPhone} leads still missing a phone number.` : 'Load a batch to measure call readiness.'
      },
      {
        label: 'AI personalization',
        value: overviewMetrics.aiCoverage,
        color: '#8b5cf6',
        detail: total ? `${missingAI} leads still need custom copy before outreach.` : 'AI readiness appears after loading leads.'
      },
      {
        label: 'Visual proof',
        value: overviewMetrics.screenshotCoverage,
        color: '#2563eb',
        detail: total ? `${missingVisualProof} leads still have no screenshot proof attached.` : 'Preview proof coverage appears after batch load.'
      },
      {
        label: 'Preview ready',
        value: overviewMetrics.previewReadyCoverage,
        color: '#f59e0b',
        detail: total ? `${overviewMetrics.previewReadyCount} leads can ship with both phone and AI copy.` : 'Preview readiness appears after batch load.'
      }
    ];
  }, [leadRecords, overviewMetrics]);

  const nicheInsights = useMemo(() => {
    const grouped = leadRecords.reduce<Record<string, { count: number; ready: number; avgScore: number }>>((acc, record) => {
      if (!acc[record.niche]) acc[record.niche] = { count: 0, ready: 0, avgScore: 0 };
      acc[record.niche].count += 1;
      acc[record.niche].avgScore += record.pitchScore;
      if (record.status === 'NEW' && record.hasPhone && ['ELITE', 'SOLID'].includes(record.quality.label)) {
        acc[record.niche].ready += 1;
      }
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([label, value]) => ({
        label,
        count: value.count,
        ready: value.ready,
        avgScore: Math.round(value.avgScore / value.count)
      }))
      .sort((a, b) => b.count - a.count || b.avgScore - a.avgScore)
      .slice(0, 6);
  }, [leadRecords]);

  const activityPulse = useMemo(() => {
    const now = Date.now();
    const active24h = new Set<string>();
    const active7d = new Set<string>();
    let events24h = 0;
    let events7d = 0;
    let views24h = 0;
    let views7d = 0;
    let escalations7d = 0;

    leadRecords.forEach((record) => {
      record.history.forEach((entry: any) => {
        const timestamp = new Date(entry.timestamp || 0).getTime();
        if (!Number.isFinite(timestamp) || timestamp <= 0) return;

        const age = now - timestamp;
        if (age <= 24 * 60 * 60 * 1000) {
          events24h += 1;
          active24h.add(record.id);
          if (entry.type === 'VIEW') views24h += 1;
        }
        if (age <= 7 * 24 * 60 * 60 * 1000) {
          events7d += 1;
          active7d.add(record.id);
          if (entry.type === 'VIEW') views7d += 1;
          if (entry.type === 'ESCALATION') escalations7d += 1;
        }
      });
    });

    return {
      events24h,
      events7d,
      activeLeads24h: active24h.size,
      activeLeads7d: active7d.size,
      views24h,
      views7d,
      escalations7d
    };
  }, [leadRecords]);

  const followUpBuckets = useMemo(() => {
    const engagedRecords = leadRecords.filter((record) => ['CONTACTED', 'NEGOTIATING', 'INTERESTED'].includes(record.status));
    const now = Date.now();
    let fresh = 0;
    let dueSoon = 0;
    let stale = 0;
    let untracked = 0;

    engagedRecords.forEach((record) => {
      if (!record.lastActivityMs) {
        untracked += 1;
        return;
      }

      const age = now - record.lastActivityMs;
      if (age < 24 * 60 * 60 * 1000) fresh += 1;
      else if (age < 72 * 60 * 60 * 1000) dueSoon += 1;
      else stale += 1;
    });

    return [
      { label: 'Fresh under 24h', value: fresh, color: '#10b981', detail: 'Recently touched conversations' },
      { label: 'Due in 24-72h', value: dueSoon, color: '#2563eb', detail: 'Should get a follow-up soon' },
      { label: 'Stale over 72h', value: stale, color: '#f59e0b', detail: 'Needs rescue or closure' },
      { label: 'No activity logged', value: untracked, color: '#94a3b8', detail: 'Missing engagement timestamps' }
    ];
  }, [leadRecords]);

  const forecastModel = useMemo(() => {
    const openRecords = leadRecords.filter((record) => record.status !== 'CLOSED');
    const strong = openRecords.filter((record) => ['NEGOTIATING', 'INTERESTED'].includes(record.status) || record.pitchScore >= 85).length;
    const nurture = openRecords.filter((record) => !(['NEGOTIATING', 'INTERESTED'].includes(record.status) || record.pitchScore >= 85) && record.pitchScore >= 70 && record.hasPhone).length;
    const blocked = openRecords.filter((record) => record.pitchScore >= 70 && (!record.hasPhone || !record.hasAI)).length;
    const modeledWins = Math.round(strong * 0.7 + nurture * 0.35);
    const momentumScore = openRecords.length ? Math.min(100, Math.round(((strong * 100) + (nurture * 55)) / openRecords.length)) : 0;

    return {
      openCount: openRecords.length,
      strong,
      nurture,
      blocked,
      modeledWins,
      momentumScore
    };
  }, [leadRecords]);

  const attentionBoard = useMemo(() => {
    return [...leadRecords]
      .filter((record) => record.status !== 'CLOSED')
      .map((record) => {
        let urgency = record.pitchScore;
        let reason = 'High-scoring opportunity';
        let tone = '#2563eb';

        if (record.status === 'NEW' && record.hasViewed) {
          urgency += 30;
          reason = 'Preview interest already detected';
          tone = '#ef4444';
        }

        if (['CONTACTED', 'NEGOTIATING', 'INTERESTED'].includes(record.status)) {
          const inactivity = record.lastActivityMs ? Date.now() - record.lastActivityMs : Number.MAX_SAFE_INTEGER;
          if (inactivity > 72 * 60 * 60 * 1000) {
            urgency += 40;
            reason = 'Aging follow-up needs a rescue touch';
            tone = '#f59e0b';
          } else if (inactivity > 24 * 60 * 60 * 1000) {
            urgency += 20;
            reason = 'Follow-up due soon';
            tone = '#fb7185';
          }
        }

        if (record.status === 'NEW' && !record.hasAI && record.pitchScore >= 70) {
          urgency += 18;
          reason = 'Strong lead blocked by missing AI copy';
          tone = '#8b5cf6';
        }

        if (!record.hasPhone && record.pitchScore >= 75) {
          urgency += 12;
          reason = 'Strong lead missing contact data';
          tone = '#06b6d4';
        }

        return {
          id: record.id,
          name: record.name,
          niche: record.niche,
          status: record.status,
          urgency: Math.min(100, urgency),
          reason,
          tone,
          cadence: getCadenceState(record),
          lead: record.lead
        };
      })
      .sort((a, b) => b.urgency - a.urgency)
      .slice(0, 6);
  }, [leadRecords]);

  const activeSmartFilterLabel = useMemo(() => {
    return SMART_FILTER_OPTIONS.find((option) => option.value === smartFilter)?.label || 'ALL SEGMENTS';
  }, [smartFilter]);

  const commandPriorities = useMemo(() => {
    const items: { title: string; detail: string; action: string; cta: string; tone: 'positive' | 'warning' | 'caution' | 'info' }[] = [];

    if (!selectedFile && latestBatchMeta) {
      items.push({
        title: 'Open the newest batch',
        detail: `${formatBatchName(latestBatchMeta.name)} is ready for review and routing.`,
        action: 'LOAD_LATEST_BATCH',
        cta: 'Load batch',
        tone: 'info'
      });
    }

    if (overviewMetrics.readyCount > 0) {
      items.push({
        title: 'Launch first-wave outreach',
        detail: `${overviewMetrics.readyCount} high-quality leads are ready for immediate pitch work.`,
        action: 'READY_SEGMENT',
        cta: 'Open ready leads',
        tone: 'positive'
      });
    }

    if (staleFollowUps.length > 0) {
      items.push({
        title: 'Rescue stale conversations',
        detail: `${staleFollowUps.length} live follow-ups have gone quiet for more than 72 hours.`,
        action: 'FOLLOW_UP_SEGMENT',
        cta: 'Review follow-ups',
        tone: 'caution'
      });
    }

    const aiGapCount = leadRecords.filter(record => !record.hasAI).length;
    if (aiGapCount > 0) {
      items.push({
        title: 'Close AI copy gaps',
        detail: `${aiGapCount} leads still need hero and pain-point personalization.`,
        action: 'AI_GAP_SEGMENT',
        cta: 'Fix AI gaps',
        tone: 'warning'
      });
    }

    if (templateCoverage.length > 0) {
      items.push({
        title: 'Check template demand',
        detail: `${templateCoverage[0].label} is currently the most requested route across your leads.`,
        action: 'OPEN_TEMPLATES',
        cta: 'Open studio',
        tone: 'info'
      });
    }

    return items.slice(0, 4);
  }, [leadRecords, latestBatchMeta, overviewMetrics.readyCount, selectedFile, staleFollowUps, templateCoverage]);

  const operationsAlerts = useMemo(() => {
    const alerts: { tone: 'warning' | 'caution' | 'positive' | 'info'; title: string; detail: string }[] = [];
    if (overviewMetrics.aiCoverage < 60) {
      alerts.push({ tone: 'warning', title: 'AI coverage is still light', detail: `${overviewMetrics.aiCoverage}% of loaded leads currently have AI messaging.` });
    }
    if (leadRecords.filter(record => !record.hasPhone).length > 0) {
      alerts.push({ tone: 'caution', title: 'Some leads still need contact data', detail: `${leadRecords.filter(record => !record.hasPhone).length} leads are missing a phone number.` });
    }
    if (staleFollowUps.length > 0) {
      alerts.push({ tone: 'caution', title: 'Follow-ups are aging', detail: `${staleFollowUps.length} conversations have not moved for more than 72 hours.` });
    }
    if (overviewMetrics.readyCount > 0) {
      alerts.push({ tone: 'positive', title: 'High-priority outreach is waiting', detail: `${overviewMetrics.readyCount} leads are ready for immediate pitch work.` });
    }
    if (serviceHealthSummary.unhealthy > 0) {
      alerts.push({ tone: 'warning', title: 'Some automation services need attention', detail: `${serviceHealthSummary.unhealthy} service${serviceHealthSummary.unhealthy === 1 ? '' : 's'} are not in a healthy state.` });
    }
    if (latestBatchMeta && Date.now() - new Date(latestBatchMeta.date).getTime() > 72 * 60 * 60 * 1000) {
      alerts.push({ tone: 'info', title: 'Pipeline batch looks stale', detail: `${formatBatchName(latestBatchMeta.name)} has not been refreshed in over 72 hours.` });
    }
    if (files.length === 0) {
      alerts.push({ tone: 'info', title: 'No pipeline batches loaded yet', detail: 'Run the engine or sync the cloud pipeline to populate the dashboard.' });
    }
    return alerts.slice(0, 5);
  }, [files, latestBatchMeta, leadRecords, overviewMetrics, serviceHealthSummary, staleFollowUps]);

  const applySmartSegment = (segment: string) => {
    setSmartFilter(segment);
    setActiveView('pipeline');
  };

  const openLeadWorkbench = (lead: any, view: DashboardView = 'pipeline') => {
    setSelectedLead(lead);
    setNotes(crmData[getLeadId(lead)]?.notes || lead.notes || '');
    setActiveView(view);
  };

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

  const selectedBatchMeta = files.find(file => file.id === selectedFile) || null;
  const activeBatchMeta = selectedBatchMeta || latestBatchMeta;
  const serviceEntries = Object.entries(systemStatus?.services || {}) as [string, any][];

  const runDashboardAction = (action: string) => {
    if (action === 'LOAD_LATEST_BATCH' && latestBatchMeta) {
      setActiveView('pipeline');
      loadLeads(latestBatchMeta.id);
      return;
    }
    if (action === 'READY_SEGMENT') {
      applySmartSegment('READY');
      return;
    }
    if (action === 'FOLLOW_UP_SEGMENT') {
      applySmartSegment('FOLLOW_UP');
      return;
    }
    if (action === 'AI_GAP_SEGMENT') {
      applySmartSegment('AI_GAP');
      return;
    }
    if (action === 'OPEN_TEMPLATES') {
      setActiveView('templates');
      return;
    }
    if (action === 'OPEN_OUTREACH') {
      setActiveView('outreach');
      return;
    }
    if (action === 'OPEN_OPERATIONS') {
      setActiveView('operations');
    }
  };

  const renderGlobalCommandStrip = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      <div style={{ padding: '18px 20px', borderRadius: '20px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>Active batch</div>
        <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.3 }}>
          {activeBatchMeta ? formatBatchName(activeBatchMeta.name) : 'No batch loaded'}
        </div>
        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '8px' }}>
          {activeBatchMeta ? `Last synced ${timeAgo(activeBatchMeta.date)}` : 'Sync or load a batch to activate pipeline controls.'}
        </div>
        <button
          onClick={() => selectedBatchMeta ? setActiveView('pipeline') : latestBatchMeta ? runDashboardAction('LOAD_LATEST_BATCH') : fetchFiles()}
          style={{ marginTop: '14px', padding: '9px 12px', borderRadius: '10px', border: 'none', background: '#eff6ff', color: '#2563eb', fontWeight: 800, cursor: 'pointer', fontSize: '0.75rem' }}
        >
          {selectedBatchMeta ? 'Open in pipeline' : latestBatchMeta ? 'Load latest batch' : 'Sync batches'}
        </button>
      </div>

      <div style={{ padding: '18px 20px', borderRadius: '20px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>Live focus</div>
        <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.3 }}>{activeSmartFilterLabel}</div>
        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '8px' }}>
          {overviewMetrics.readyCount > 0 ? `${overviewMetrics.readyCount} leads are ready for a first pass.` : 'No smart segment is currently active.'}
        </div>
        <button
          onClick={() => runDashboardAction('READY_SEGMENT')}
          style={{ marginTop: '14px', padding: '9px 12px', borderRadius: '10px', border: 'none', background: '#0f172a', color: 'white', fontWeight: 800, cursor: 'pointer', fontSize: '0.75rem' }}
        >
          Focus ready leads
        </button>
      </div>

      <div style={{ padding: '18px 20px', borderRadius: '20px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>Routing leader</div>
        <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.3 }}>{templateCoverage[0]?.label || 'No routing data yet'}</div>
        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '8px' }}>
          {templateCoverage[0] ? `${templateCoverage[0].count} leads currently map to this template.` : 'Load leads to see template demand by niche.'}
        </div>
        <button
          onClick={() => setActiveView('templates')}
          style={{ marginTop: '14px', padding: '9px 12px', borderRadius: '10px', border: 'none', background: '#f8fafc', color: '#475569', fontWeight: 800, cursor: 'pointer', fontSize: '0.75rem' }}
        >
          Open template studio
        </button>
      </div>

      <div style={{ padding: '18px 20px', borderRadius: '20px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>Automation health</div>
        <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.3 }}>
          {serviceHealthSummary.total > 0 ? `${serviceHealthSummary.healthy}/${serviceHealthSummary.total} services healthy` : 'No service data yet'}
        </div>
        <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '8px' }}>
          {serviceHealthSummary.unhealthy > 0
            ? `${serviceHealthSummary.unhealthy} service${serviceHealthSummary.unhealthy === 1 ? '' : 's'} need attention.`
            : 'Automation stack looks stable right now.'}
        </div>
        <button
          onClick={() => setActiveView('operations')}
          style={{ marginTop: '14px', padding: '9px 12px', borderRadius: '10px', border: 'none', background: '#ecfdf5', color: '#047857', fontWeight: 800, cursor: 'pointer', fontSize: '0.75rem' }}
        >
          Open operations
        </button>
      </div>
    </div>
  );

  const renderOverviewView = () => (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 900, letterSpacing: '-0.8px', color: '#0f172a' }}>Revenue Command Center</h1>
          <p style={{ color: '#64748b', marginTop: '6px', fontSize: '0.9rem' }}>
            Executive view of pipeline readiness, lead quality, outreach pressure, and automation coverage.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => { fetchFiles(); fetchCRMData(); }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 18px', borderRadius: '12px', background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: 800, color: '#0f172a' }}
          >
            <RefreshCcw size={16} /> Sync intel
          </button>
          <button
            onClick={() => setActiveView('outreach')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 18px', borderRadius: '12px', background: 'linear-gradient(135deg,#2563eb,#4f46e5)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 800, boxShadow: '0 10px 24px rgba(79,70,229,0.22)' }}
          >
            <Send size={16} /> Open outreach desk
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div style={{ padding: '30px', borderRadius: '24px', background: 'linear-gradient(135deg,#0f172a,#1e293b 55%, #1d4ed8)', color: 'white', boxShadow: '0 24px 60px rgba(15,23,42,0.22)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', color: 'rgba(255,255,255,0.72)' }}>
            <Zap size={16} />
            <span style={{ fontSize: '0.78rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Command summary</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.05, marginBottom: '14px', maxWidth: '13ch' }}>
            {leadRecords.length > 0
              ? `${overviewMetrics.readinessScore}% pipeline readiness across your active lead set`
              : 'Load a batch to unlock the full command center'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', maxWidth: '58ch', lineHeight: 1.7, fontSize: '0.95rem' }}>
            {leadRecords.length > 0
              ? `You have ${overviewMetrics.readyCount} ready-to-pitch leads, ${overviewMetrics.engagedCount} live conversations, ${staleFollowUps.length} aging follow-ups, and ${overviewMetrics.previewReadyCoverage}% preview-ready coverage.`
              : 'The dashboard now surfaces workflow priorities, funnel pressure, outreach readiness, template demand, and operational risk from a single screen.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '22px' }}>
            <button
              onClick={() => runDashboardAction('READY_SEGMENT')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 16px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.16)', background: 'rgba(255,255,255,0.08)', color: 'white', cursor: 'pointer', fontWeight: 800 }}
            >
              <Target size={15} /> Focus ready leads
            </button>
            <button
              onClick={() => runDashboardAction('FOLLOW_UP_SEGMENT')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 16px', borderRadius: '999px', border: 'none', background: 'white', color: '#0f172a', cursor: 'pointer', fontWeight: 800 }}
            >
              <Clock size={15} /> Review follow-ups
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { label: 'Average rating', value: overviewMetrics.avgRating, sub: 'Across loaded leads', icon: <Star size={18} color="#f59e0b" /> },
            { label: 'Average pitch score', value: overviewMetrics.avgPitchScore, sub: 'Lead quality plus engagement', icon: <TrendingUp size={18} color="#2563eb" /> },
            { label: 'Closed rate', value: `${overviewMetrics.closedRate}%`, sub: 'Pipeline already converted', icon: <Award size={18} color="#10b981" /> },
            { label: 'Preview ready', value: `${overviewMetrics.previewReadyCoverage}%`, sub: 'Phone plus AI copy already present', icon: <Globe size={18} color="#8b5cf6" /> }
          ].map((metric) => (
            <div key={metric.label} style={{ padding: '18px 20px', borderRadius: '18px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 18px rgba(15,23,42,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px' }}>{metric.label}</div>
                <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{metric.value}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '8px' }}>{metric.sub}</div>
              </div>
              <div style={{ width: '46px', height: '46px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                {metric.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {smartSegments.map((segment) => (
          <motion.button
            key={segment.key}
            whileHover={{ y: -3 }}
            onClick={() => applySmartSegment(segment.key)}
            style={{ textAlign: 'left', padding: '20px', borderRadius: '20px', background: 'white', border: `1px solid ${segment.color}22`, boxShadow: '0 8px 22px rgba(15,23,42,0.05)', cursor: 'pointer' }}
          >
            <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: segment.color, marginBottom: '12px' }}>{segment.label}</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{segment.value}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '10px', lineHeight: 1.55 }}>{segment.hint}</div>
          </motion.button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.02fr 0.98fr', gap: '20px', marginBottom: '24px' }}>
        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>Next best actions</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>The highest-value moves for the current state of the pipeline.</p>
            </div>
            <button onClick={() => setActiveView('pipeline')} style={{ border: 'none', background: '#eff6ff', color: '#2563eb', padding: '9px 14px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', fontSize: '0.75rem' }}>
              Open pipeline
            </button>
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {commandPriorities.length > 0 ? commandPriorities.map((item) => (
              <div key={item.title} style={{ padding: '16px', borderRadius: '16px', background: item.tone === 'positive' ? '#ecfdf5' : item.tone === 'warning' ? '#faf5ff' : item.tone === 'caution' ? '#fff7ed' : '#eff6ff', border: '1px solid rgba(148,163,184,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px' }}>
                <div>
                  <div style={{ fontWeight: 900, color: '#0f172a', fontSize: '0.9rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px', lineHeight: 1.6 }}>{item.detail}</div>
                </div>
                <button onClick={() => runDashboardAction(item.action)} style={{ padding: '9px 12px', borderRadius: '10px', border: 'none', background: 'white', color: '#0f172a', fontWeight: 800, cursor: 'pointer', fontSize: '0.74rem', flexShrink: 0 }}>
                  {item.cta}
                </button>
              </div>
            )) : (
              <div style={{ padding: '20px', borderRadius: '16px', background: '#f8fafc', color: '#94a3b8', textAlign: 'center', fontWeight: 700 }}>
                No workflow suggestions yet. Load leads to unlock planning.
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>Funnel momentum</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Readiness score plus live distribution across the sales funnel.</p>
          </div>
          <div style={{ padding: '18px 20px', borderRadius: '18px', background: '#0f172a', color: 'white', marginBottom: '16px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>Pipeline readiness</div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, lineHeight: 1, marginTop: '8px' }}>{overviewMetrics.readinessScore}%</div>
            <div style={{ fontSize: '0.82rem', opacity: 0.78, marginTop: '10px', lineHeight: 1.6 }}>
              Built from AI coverage, contact coverage, screenshot proof, preview readiness, and current lead momentum.
            </div>
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {funnelStages.map((stage) => (
              <div key={stage.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.82rem', fontWeight: 800, color: '#475569' }}>
                  <span>{stage.label}</span>
                  <span>{stage.count} leads</span>
                </div>
                <div style={{ height: '10px', borderRadius: '999px', background: '#f1f5f9', overflow: 'hidden', marginBottom: '6px' }}>
                  <div style={{ width: `${stage.pct}%`, height: '100%', background: stage.color }} />
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{stage.pct}% of active pipeline</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>Forecast outlook</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Modeled close potential based on lead score, stage, and contact readiness.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            {[
              { label: 'Modeled wins', value: forecastModel.modeledWins, sub: 'Expected closes from current open set' },
              { label: 'Strong chances', value: forecastModel.strong, sub: 'High-confidence opportunities' },
              { label: 'Nurture upside', value: forecastModel.nurture, sub: 'Need another push to convert' },
              { label: 'Blocked leads', value: forecastModel.blocked, sub: 'Strong score but missing prerequisites' }
            ].map((item) => (
              <div key={item.label} style={{ padding: '16px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '8px' }}>{item.label}</div>
                <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{item.value}</div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '8px', lineHeight: 1.5 }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '16px 18px', borderRadius: '16px', background: '#0f172a', color: 'white' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>Momentum score</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1, marginTop: '8px' }}>{forecastModel.momentumScore}%</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.78, marginTop: '8px', lineHeight: 1.6 }}>
              Weighted from closing-stage leads, strong-score opportunities, and overall open-pipeline quality.
            </div>
          </div>
        </div>

        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>Attention board</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>The leads with the highest urgency after scoring, engagement, and decay are combined.</p>
            </div>
            <button onClick={() => setActiveView('pipeline')} style={{ border: 'none', background: '#eff6ff', color: '#2563eb', padding: '9px 14px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', fontSize: '0.75rem' }}>
              Open pipeline
            </button>
          </div>
          <div style={{ display: 'grid', gap: '10px' }}>
            {attentionBoard.length > 0 ? attentionBoard.map((item) => (
              <button key={item.id} onClick={() => openLeadWorkbench(item.lead)} style={{ textAlign: 'left', padding: '14px 16px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.86rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 900, color: item.tone }}>{item.urgency}</div>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '6px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span>{item.niche}</span>
                  <span>{item.status}</span>
                  <span style={{ color: item.cadence.color, fontWeight: 800 }}>{item.cadence.label}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: item.tone, marginTop: '8px', lineHeight: 1.55, fontWeight: 700 }}>{item.reason}</div>
              </button>
            )) : (
              <div style={{ padding: '20px', borderRadius: '16px', background: '#f8fafc', color: '#94a3b8', textAlign: 'center', fontWeight: 700 }}>
                No urgent lead signals yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>Top opportunities</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Highest scoring leads based on quality, AI readiness, and engagement.</p>
            </div>
            <button onClick={() => setActiveView('outreach')} style={{ border: 'none', background: '#eff6ff', color: '#2563eb', padding: '9px 14px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', fontSize: '0.75rem' }}>
              Open outreach
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topOpportunities.length > 0 ? topOpportunities.map((record) => (
              <button
                key={record.id}
                onClick={() => openLeadWorkbench(record.lead)}
                style={{ textAlign: 'left', width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #edf2f7', background: '#f8fafc', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center' }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.92rem' }}>{record.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '5px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span>{record.niche}</span>
                    <span>{record.location.split(',')[0]}</span>
                    <span style={{ color: record.quality.color, fontWeight: 800 }}>{record.quality.label}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>{record.pitchScore}</div>
                  <div style={{ fontSize: '0.72rem', color: record.temperature.color, marginTop: '4px', fontWeight: 800 }}>{record.temperature.label}</div>
                </div>
              </button>
            )) : (
              <div style={{ padding: '24px', borderRadius: '16px', background: '#f8fafc', color: '#94a3b8', textAlign: 'center', fontWeight: 700 }}>
                Load a pipeline batch to see ranked opportunities.
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>Recent activity</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Preview views and engagement events across the active pipeline.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {recentActivity.length > 0 ? recentActivity.map((activity) => (
              <div key={activity.id} style={{ display: 'grid', gridTemplateColumns: '10px 1fr auto', gap: '12px', alignItems: 'start' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: activity.color, marginTop: '6px' }} />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#0f172a' }}>{activity.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>{activity.subtitle}</div>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700 }}>{activity.when}</div>
              </div>
            )) : (
              <div style={{ padding: '20px', borderRadius: '16px', background: '#f8fafc', color: '#94a3b8', textAlign: 'center', fontWeight: 700 }}>
                No engagement history yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>Niche demand</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Where your current lead volume and quality are stacking up.</p>
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {nicheInsights.length > 0 ? nicheInsights.map((item) => (
              <div key={item.label} style={{ padding: '14px 16px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.88rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#2563eb' }}>{item.avgScore} avg score</div>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px', fontSize: '0.78rem', color: '#64748b' }}>
                  <span>{item.count} leads</span>
                  <span>{item.ready} ready to pitch</span>
                </div>
              </div>
            )) : (
              <div style={{ padding: '20px', borderRadius: '16px', background: '#f8fafc', color: '#94a3b8', textAlign: 'center', fontWeight: 700 }}>
                No niche intelligence yet.
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>Template demand</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>How current leads distribute across your website library.</p>
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {templateCoverage.length > 0 ? templateCoverage.map((item) => {
              const share = overviewMetrics.total ? Math.round((item.count / overviewMetrics.total) * 100) : 0;
              return (
                <div key={item.id} style={{ padding: '14px 16px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.88rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#8b5cf6' }}>{share}% share</div>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '8px' }}>{item.count} routed leads</div>
                </div>
              );
            }) : (
              <div style={{ padding: '20px', borderRadius: '16px', background: '#f8fafc', color: '#94a3b8', textAlign: 'center', fontWeight: 700 }}>
                No routing data yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOutreachView = () => (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.6px', color: '#0f172a' }}>Outreach Desk</h1>
          <p style={{ color: '#64748b', marginTop: '6px', fontSize: '0.9rem' }}>
            Prioritized pitch queue, follow-up rescue, copy readiness, and direct export controls.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => exportToOutreach()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 18px', borderRadius: '12px', background: 'linear-gradient(135deg,#2563eb,#4f46e5)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 800, boxShadow: '0 10px 24px rgba(79,70,229,0.2)' }}
          >
            <FileSpreadsheet size={16} /> Export outreach CSV
          </button>
          <button
            onClick={() => runDashboardAction('READY_SEGMENT')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 18px', borderRadius: '12px', background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: 800, color: '#0f172a' }}
          >
            <Filter size={16} /> Jump to ready segment
          </button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Ready now', value: overviewMetrics.readyCount, sub: 'Immediate pitch candidates', icon: <Send size={18} color="#2563eb" /> },
          { label: 'Follow-up risk', value: staleFollowUps.length, sub: 'Conversations older than 72h', icon: <Clock size={18} color="#f59e0b" /> },
          { label: 'Preview ready', value: `${overviewMetrics.previewReadyCoverage}%`, sub: 'Copy plus direct contact data', icon: <Globe size={18} color="#8b5cf6" /> },
          { label: 'Selected', value: selectedLeadIds.size, sub: 'Queued for bulk action', icon: <CheckCircle2 size={18} color="#10b981" /> }
        ].map((item) => (
          <div key={item.label} style={{ padding: '20px', borderRadius: '20px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 18px rgba(15,23,42,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8' }}>{item.label}</div>
              {item.icon}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{item.value}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '8px' }}>{item.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>Forecast outlook</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>A quick read on how much of the open pipeline looks closable versus blocked.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            {[
              { label: 'Modeled wins', value: forecastModel.modeledWins, sub: 'Projected closes from current open set' },
              { label: 'Strong chances', value: forecastModel.strong, sub: 'Already near close quality' },
              { label: 'Nurture upside', value: forecastModel.nurture, sub: 'Need follow-up or proof' },
              { label: 'Blocked leads', value: forecastModel.blocked, sub: 'Strong but missing contact or AI' }
            ].map((item) => (
              <div key={item.label} style={{ padding: '16px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '8px' }}>{item.label}</div>
                <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{item.value}</div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '8px', lineHeight: 1.5 }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '16px 18px', borderRadius: '16px', background: '#0f172a', color: 'white' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>Momentum score</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1, marginTop: '8px' }}>{forecastModel.momentumScore}%</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.78, marginTop: '8px', lineHeight: 1.6 }}>
              Higher scores mean a larger share of the pipeline is either close-ready or positioned to convert with one more touch.
            </div>
          </div>
        </div>

        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>Activity pulse</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Recent engagement velocity so outreach can react to real movement.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            {[
              { label: 'Events 24h', value: activityPulse.events24h, sub: `${activityPulse.activeLeads24h} active leads` },
              { label: 'Preview views 24h', value: activityPulse.views24h, sub: 'New preview interest' },
              { label: 'Events 7d', value: activityPulse.events7d, sub: `${activityPulse.activeLeads7d} active leads` },
              { label: 'Escalations 7d', value: activityPulse.escalations7d, sub: 'Moved deeper into campaigns' }
            ].map((item) => (
              <div key={item.label} style={{ padding: '16px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '8px' }}>{item.label}</div>
                <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{item.value}</div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '8px', lineHeight: 1.5 }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gap: '10px' }}>
            {followUpBuckets.map((bucket) => (
              <div key={bucket.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.8rem', fontWeight: 800, color: '#475569' }}>
                  <span>{bucket.label}</span>
                  <span>{bucket.value}</span>
                </div>
                <div style={{ height: '8px', borderRadius: '999px', background: '#f1f5f9', overflow: 'hidden', marginBottom: '6px' }}>
                  <div style={{ width: `${overviewMetrics.engagedCount ? Math.min(100, Math.round((bucket.value / overviewMetrics.engagedCount) * 100)) : 0}%`, height: '100%', background: bucket.color }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{bucket.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', gap: '12px', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>Recommended outreach queue</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Sorted by pitch score, engagement, and recency.</p>
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>{outreachQueue.length} queued leads</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {outreachQueue.length > 0 ? outreachQueue.map((record) => {
              const cadence = getCadenceState(record);
              return (
              <motion.div key={record.id} whileHover={{ y: -2 }} style={{ padding: '16px', borderRadius: '18px', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <div style={{ fontWeight: 900, color: '#0f172a', fontSize: '0.95rem' }}>{record.name}</div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 900, color: record.quality.color, background: `${record.quality.color}18`, border: `1px solid ${record.quality.color}30`, padding: '4px 8px', borderRadius: '999px' }}>{record.quality.label}</span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 900, color: STATUS_COLORS[record.status], background: `${STATUS_COLORS[record.status]}15`, padding: '4px 8px', borderRadius: '999px' }}>{record.status}</span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 900, color: cadence.color, background: `${cadence.color}16`, border: `1px solid ${cadence.color}30`, padding: '4px 8px', borderRadius: '999px' }}>{cadence.label}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <span>{record.niche}</span>
                      <span>{record.location.split(',')[0]}</span>
                      <span>{record.phone || 'No phone'}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '10px', lineHeight: 1.6 }}>
                      {record.hasAI ? 'AI copy ready for personalized outreach.' : 'Needs AI copy refinement before a stronger outbound pitch.'} {cadence.detail}.
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>{record.pitchScore}</div>
                    <div style={{ fontSize: '0.72rem', color: record.temperature.color, fontWeight: 800 }}>{record.temperature.label}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '14px' }}>
                  <button onClick={() => openLeadWorkbench(record.lead, 'outreach')} style={{ padding: '9px 12px', borderRadius: '10px', border: 'none', background: '#0f172a', color: 'white', fontWeight: 800, cursor: 'pointer', fontSize: '0.75rem' }}>Open lead</button>
                  <Link href={record.previewUrl} target="_blank" style={{ padding: '9px 12px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', textDecoration: 'none', fontWeight: 800, fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <ExternalLink size={12} /> Preview
                  </Link>
                  <button onClick={() => copyPitch(record.lead)} style={{ padding: '9px 12px', borderRadius: '10px', border: '1px solid #dbeafe', background: 'white', color: '#2563eb', fontWeight: 800, cursor: 'pointer', fontSize: '0.75rem' }}>Copy pitch</button>
                  <button onClick={() => copyToClipboard(record.previewUrl, record.id)} style={{ padding: '9px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontWeight: 800, cursor: 'pointer', fontSize: '0.75rem' }}>Copy link</button>
                </div>
              </motion.div>
            )}) : (
              <div style={{ padding: '28px', borderRadius: '18px', background: '#f8fafc', color: '#94a3b8', textAlign: 'center', fontWeight: 700 }}>
                No outreach queue yet. Load a batch to start ranking leads.
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gap: '20px', alignItems: 'start' }}>
          <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>Message lab</h3>
            {selectedLead ? (
              <div>
                <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>{selectedLead.Name || selectedLead.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '14px' }}>{selectedLead.address || selectedLead.Address || 'Local Area'}</div>
                <textarea
                  readOnly
                  value={generatePitch(selectedLead)}
                  style={{ width: '100%', minHeight: '220px', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', color: '#334155', fontSize: '0.82rem', lineHeight: 1.65, resize: 'vertical' }}
                />
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '14px' }}>
                  <button onClick={() => copyPitch(selectedLead)} style={{ padding: '10px 14px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#2563eb,#4f46e5)', color: 'white', fontWeight: 800, cursor: 'pointer' }}>Copy pitch</button>
                  <Link href={generatePreviewUrl(selectedLead)} target="_blank" style={{ padding: '10px 14px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', textDecoration: 'none', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <ExternalLink size={14} /> Open preview
                  </Link>
                </div>
              </div>
            ) : (
              <div style={{ padding: '22px', borderRadius: '16px', background: '#f8fafc', color: '#64748b', lineHeight: 1.7 }}>
                Select a lead from the outreach queue to generate a ready-to-send pitch with preview links and personalization.
              </div>
            )}
          </div>

          <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', gap: '12px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>Follow-up sprint</h3>
              <button onClick={() => runDashboardAction('FOLLOW_UP_SEGMENT')} style={{ border: 'none', background: '#fff7ed', color: '#c2410c', padding: '8px 12px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', fontSize: '0.74rem' }}>
                Open queue
              </button>
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
              {staleFollowUps.length > 0 ? staleFollowUps.map((record) => (
                <button key={record.id} onClick={() => openLeadWorkbench(record.lead, 'outreach')} style={{ textAlign: 'left', padding: '14px 16px', borderRadius: '14px', border: '1px solid #fed7aa', background: '#fff7ed', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.84rem' }}>{record.name}</div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 900, color: getCadenceState(record).color }}>{getCadenceState(record).label}</div>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#9a3412', marginTop: '6px' }}>
                    {record.lastActivityMs ? `Last activity ${timeAgo(new Date(record.lastActivityMs).toISOString())}` : 'No recent activity logged'}
                  </div>
                </button>
              )) : (
                <div style={{ padding: '18px', borderRadius: '14px', background: '#f8fafc', color: '#64748b' }}>No aging follow-ups right now.</div>
              )}
            </div>
          </div>

          <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', marginBottom: '14px' }}>Channel readiness</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {channelReadiness.map((item) => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.8rem', fontWeight: 800, color: '#475569' }}>
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </div>
                  <div style={{ height: '8px', borderRadius: '999px', background: '#f1f5f9', overflow: 'hidden', marginBottom: '6px' }}>
                    <div style={{ width: `${item.value}%`, height: '100%', background: item.color }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOperationsView = () => (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.6px', color: '#0f172a' }}>Operations Console</h1>
          <p style={{ color: '#64748b', marginTop: '6px', fontSize: '0.9rem' }}>
            Service health, data quality coverage, batch freshness, and operational risk in one place.
          </p>
        </div>
        <button
          onClick={() => { fetchFiles(); fetchCRMData(); }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 18px', borderRadius: '12px', background: 'white', border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: 800, color: '#0f172a' }}
        >
          <RefreshCcw size={16} /> Refresh ops state
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Services healthy', value: serviceHealthSummary.total > 0 ? `${serviceHealthSummary.healthy}/${serviceHealthSummary.total}` : '0', sub: serviceHealthSummary.unhealthy > 0 ? `${serviceHealthSummary.unhealthy} need attention` : 'All visible services healthy', icon: <Monitor size={18} color="#10b981" /> },
          { label: 'Open alerts', value: operationsAlerts.length, sub: 'Current ops and data warnings', icon: <Info size={18} color="#f59e0b" /> },
          { label: 'Latest batch', value: latestBatchMeta ? timeAgo(latestBatchMeta.date) : 'N/A', sub: latestBatchMeta ? formatBatchName(latestBatchMeta.name) : 'No batch synced', icon: <FileSpreadsheet size={18} color="#2563eb" /> },
          { label: 'Readiness score', value: `${overviewMetrics.readinessScore}%`, sub: 'Combined command health score', icon: <Zap size={18} color="#8b5cf6" /> }
        ].map((item) => (
          <div key={item.label} style={{ padding: '20px', borderRadius: '20px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 4px 18px rgba(15,23,42,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8' }}>{item.label}</div>
              {item.icon}
            </div>
            <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{item.value}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '8px' }}>{item.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {serviceEntries.length > 0 ? serviceEntries.map(([key, service]) => {
          const isHealthy = service.status === 'RUNNING' || service.status === 'ACTIVE' || service.status === 'PROCESSING';
          return (
            <div key={key} style={{ padding: '20px', borderRadius: '20px', background: 'white', border: `1px solid ${isHealthy ? '#bbf7d0' : '#e2e8f0'}`, boxShadow: '0 4px 18px rgba(15,23,42,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8' }}>{service.label}</div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: isHealthy ? '#10b981' : '#94a3b8', boxShadow: isHealthy ? '0 0 12px rgba(16,185,129,0.5)' : 'none' }} />
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{service.status}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '10px' }}>{isHealthy ? 'Automation healthy' : 'Requires attention or restart'}</div>
            </div>
          );
        }) : (
          <div style={{ gridColumn: '1 / -1', padding: '24px', borderRadius: '18px', background: 'white', border: '1px solid #e2e8f0', color: '#64748b', textAlign: 'center' }}>
            System services are not reporting yet.
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', marginBottom: '18px' }}>Data quality coverage</h3>
          <div style={{ display: 'grid', gap: '14px' }}>
            {[
              { label: 'Phone coverage', value: overviewMetrics.phoneCoverage, color: '#10b981' },
              { label: 'AI personalization', value: overviewMetrics.aiCoverage, color: '#8b5cf6' },
              { label: 'Visual proof coverage', value: overviewMetrics.screenshotCoverage, color: '#2563eb' },
              { label: 'Elite + solid lead share', value: leadRecords.length ? Math.round((((qualityBreakdown.ELITE || 0) + (qualityBreakdown.SOLID || 0)) / leadRecords.length) * 100) : 0, color: '#f59e0b' }
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.82rem', fontWeight: 800, color: '#475569' }}>
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div style={{ height: '10px', borderRadius: '999px', background: '#f1f5f9', overflow: 'hidden' }}>
                  <div style={{ width: `${item.value}%`, height: '100%', background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', marginBottom: '18px' }}>Operational radar</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {operationsAlerts.length > 0 ? operationsAlerts.map((alert, index) => (
              <div key={index} style={{ padding: '14px 16px', borderRadius: '14px', background: alert.tone === 'positive' ? '#ecfdf5' : alert.tone === 'warning' ? '#faf5ff' : alert.tone === 'caution' ? '#fff7ed' : '#eff6ff' }}>
                <div style={{ fontWeight: 800, fontSize: '0.84rem', color: '#0f172a' }}>{alert.title}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px', lineHeight: 1.6 }}>{alert.detail}</div>
              </div>
            )) : (
              <div style={{ padding: '18px', borderRadius: '14px', background: '#f8fafc', color: '#64748b' }}>No operation alerts right now.</div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', marginBottom: '18px' }}>Follow-up aging</h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {followUpBuckets.map((bucket) => (
              <div key={bucket.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.82rem', fontWeight: 800, color: '#475569' }}>
                  <span>{bucket.label}</span>
                  <span>{bucket.value}</span>
                </div>
                <div style={{ height: '10px', borderRadius: '999px', background: '#f1f5f9', overflow: 'hidden', marginBottom: '6px' }}>
                  <div style={{ width: `${overviewMetrics.engagedCount ? Math.min(100, Math.round((bucket.value / overviewMetrics.engagedCount) * 100)) : 0}%`, height: '100%', background: bucket.color }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{bucket.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', marginBottom: '18px' }}>Activity pulse</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            {[
              { label: 'Events 24h', value: activityPulse.events24h, sub: `${activityPulse.activeLeads24h} active leads` },
              { label: 'Views 24h', value: activityPulse.views24h, sub: 'Fresh preview demand' },
              { label: 'Events 7d', value: activityPulse.events7d, sub: `${activityPulse.activeLeads7d} active leads` },
              { label: 'Escalations 7d', value: activityPulse.escalations7d, sub: 'Campaign handoffs' }
            ].map((item) => (
              <div key={item.label} style={{ padding: '16px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '8px' }}>{item.label}</div>
                <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{item.value}</div>
                <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '8px', lineHeight: 1.5 }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '16px 18px', borderRadius: '16px', background: '#0f172a', color: 'white' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7 }}>Modeled closes</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1, marginTop: '8px' }}>{forecastModel.modeledWins}</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.78, marginTop: '8px', lineHeight: 1.6 }}>
              {forecastModel.strong} strong opportunities, {forecastModel.nurture} nurture opportunities, and {forecastModel.blocked} currently blocked leads.
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', gap: '12px', flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>Pipeline batches</h3>
            {latestBatchMeta && (
              <button onClick={() => runDashboardAction('LOAD_LATEST_BATCH')} style={{ border: 'none', background: '#eff6ff', color: '#2563eb', padding: '8px 12px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', fontSize: '0.74rem' }}>
                Load latest batch
              </button>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {files.length > 0 ? files.slice(0, 8).map((file) => (
              <div key={file.id} style={{ padding: '14px 16px', borderRadius: '14px', background: selectedFile === file.id ? '#eff6ff' : '#f8fafc', border: `1px solid ${selectedFile === file.id ? '#bfdbfe' : '#e2e8f0'}` }}>
                <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.84rem' }}>{formatBatchName(file.name)}</div>
                <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '6px' }}>{new Date(file.date).toLocaleString()}</div>
              </div>
            )) : (
              <div style={{ padding: '18px', borderRadius: '14px', background: '#f8fafc', color: '#64748b' }}>No batches synced yet.</div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a', marginBottom: '18px' }}>Library utilization</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '16px', borderRadius: '14px', background: '#f8fafc' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '8px' }}>Templates available</div>
                <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#0f172a' }}>{templates.length}</div>
              </div>
              <div style={{ padding: '16px', borderRadius: '14px', background: '#f8fafc' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '8px' }}>Dominant routing</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>{templateCoverage[0]?.label || 'No lead routing yet'}</div>
              </div>
              <div style={{ padding: '16px', borderRadius: '14px', background: '#f8fafc' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '8px' }}>Selected batch</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>{selectedBatchMeta ? formatBatchName(selectedBatchMeta.name) : 'No batch selected'}</div>
              </div>
              <button
                onClick={() => setActiveView('templates')}
                style={{ padding: '12px 14px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#0f172a,#334155)', color: 'white', fontWeight: 800, cursor: 'pointer' }}
              >
                Open template studio
              </button>
            </div>
          </div>

          <div style={{ padding: '24px', borderRadius: '22px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 6px 20px rgba(15,23,42,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', gap: '12px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#0f172a' }}>Risk watchlist</h3>
              <button onClick={() => runDashboardAction('FOLLOW_UP_SEGMENT')} style={{ border: 'none', background: '#fff7ed', color: '#c2410c', padding: '8px 12px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', fontSize: '0.74rem' }}>
                Review follow-ups
              </button>
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
              {staleFollowUps.length > 0 ? staleFollowUps.map((record) => (
                <div key={record.id} style={{ padding: '14px 16px', borderRadius: '14px', background: '#fff7ed', border: '1px solid #fed7aa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.84rem' }}>{record.name}</div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 900, color: getCadenceState(record).color }}>{getCadenceState(record).label}</div>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#9a3412', marginTop: '6px' }}>
                    {record.lastActivityMs ? `Last activity ${timeAgo(new Date(record.lastActivityMs).toISOString())}` : 'No recent activity logged'}
                  </div>
                </div>
              )) : (
                <div style={{ padding: '18px', borderRadius: '14px', background: '#f8fafc', color: '#64748b' }}>No follow-up risks right now.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

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
            { icon: <TrendingUp size={18}/>, label: 'Overview', view: 'overview' as const },
            { icon: <Target size={18}/>, label: 'Pipeline', view: 'pipeline' as const },
            { icon: <Send size={18}/>, label: 'Outreach', view: 'outreach' as const },
            { icon: <Globe size={18}/>, label: 'Templates', view: 'templates' as const },
            { icon: <Monitor size={18}/>, label: 'Operations', view: 'operations' as const },
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

        {renderGlobalCommandStrip()}

        {activeView === 'overview' && renderOverviewView()}

        {activeView === 'outreach' && renderOutreachView()}

        {activeView === 'operations' && renderOperationsView()}

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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
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
                      value={smartFilter}
                      onChange={(e) => setSmartFilter(e.target.value)}
                      style={{ padding: '0 20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 700, color: '#64748b' }}
                    >
                      {SMART_FILTER_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
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
                    <select
                      value={pipelineSort}
                      onChange={(e) => setPipelineSort(e.target.value as 'SCORE' | 'NAME' | 'RATING' | 'RECENT')}
                      style={{ padding: '0 20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 700, color: '#64748b' }}
                    >
                      <option value="SCORE">SORT: SCORE</option>
                      <option value="RECENT">SORT: RECENT</option>
                      <option value="RATING">SORT: RATING</option>
                      <option value="NAME">SORT: NAME</option>
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
                            <div title={temp.label} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '5px 10px', borderRadius: '999px', background: `${temp.color}18`, color: temp.color, fontSize: '0.68rem', fontWeight: 900, letterSpacing: '0.5px' }}>{temp.label}</div>
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
                    <div><div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Pitch Score</div><div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>{score >= 75 ? 'High closeability' : score >= 50 ? 'Good potential' : 'Needs nurturing'}</div></div>
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
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b' }}>{h.type === 'ESCALATION' ? 'Moved to campaign' : 'Preview viewed'}</div>
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
