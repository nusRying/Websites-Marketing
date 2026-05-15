export const DEMO_SESSION_COOKIE = 'lead_demo_session';

export function isLocalDemoHost(host: string | null | undefined) {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') return true;
  if (!host) return false;

  const normalizedHost = host.toLowerCase().split(':')[0];
  return normalizedHost === 'localhost' || normalizedHost === '127.0.0.1' || normalizedHost === '[::1]';
}

export function hasDemoCookie(cookieValue: string | undefined | null) {
  return cookieValue === '1';
}

export function hasDemoSessionCookie(cookieHeader: string | null | undefined) {
  return Boolean(cookieHeader?.split(';').some((part) => part.trim() === `${DEMO_SESSION_COOKIE}=1`));
}

export function isDemoRequest(host: string | null | undefined, cookieValue: string | undefined | null) {
  return isLocalDemoHost(host);
}

export function isBrowserDemoSession() {
  if (typeof window === 'undefined') return false;
  // Aggressively enable demo mode on local if we can't reach Supabase 
  return isLocalDemoHost(window.location.host);
}

export function startBrowserDemoSession() {
  if (typeof window === 'undefined') return;
  document.cookie = `${DEMO_SESSION_COOKIE}=1; path=/; max-age=86400; SameSite=Lax`;
}

export const demoBatches = [
  {
    id: 'demo-batch-local-services',
    name: 'Bradford Local Services Demo',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'demo-batch-home-improvement',
    name: 'Home Improvement Demo',
    date: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
  },
];

export const demoCrmData: Record<string, any> = {
  'demo-1': {
    id: 'demo-1',
    status: 'INTERESTED',
    notes: 'Viewed sample page. Follow up with the visual proof angle.',
    history: [{ type: 'VIEW', timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString() }],
  },
  'demo-2': {
    id: 'demo-2',
    status: 'CONTACTED',
    notes: 'Send one short follow-up around missed emergency calls.',
    history: [{ type: 'PITCH_SENT', timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString() }],
  },
  'demo-3': {
    id: 'demo-3',
    status: 'NEW',
    notes: '',
    history: [],
  },
};

export const demoLeads = [
  {
    id: 'demo-1',
    batch_id: 'demo-batch-local-services',
    name: 'Aire Valley Plumbing',
    Name: 'Aire Valley Plumbing',
    category: 'Plumber',
    Category: 'Plumber',
    address: 'Bradford, West Yorkshire',
    Address: 'Bradford, West Yorkshire',
    phone: '01274 555 014',
    Phone: '01274 555 014',
    rating: '4.9',
    Rating: '4.9',
    website: '',
    Website: '',
    quality: 'ELITE',
    'Lead Quality': 'ELITE',
    no_website: true,
    'No Website': 'Yes',
    screenshot_path: 'exports/screenshots/demo/aire-valley.png',
    'Screenshot Path': 'exports/screenshots/demo/aire-valley.png',
    status: 'INTERESTED',
    ai_hero_title: 'Emergency Plumbing Help, Booked Before Competitors Answer',
    ai_hero_subtitle: 'A fast local website for Bradford homeowners who need urgent repairs.',
    ai_pain_point: 'Strong reviews are hidden inside Google Maps instead of converting urgent searches into calls.',
    ai_solution: 'A focused landing page turns emergency intent into calls, bookings, and quote requests.',
    ai_niche_cta: 'Request Emergency Help',
  },
  {
    id: 'demo-2',
    batch_id: 'demo-batch-local-services',
    name: 'North Star Dental Care',
    Name: 'North Star Dental Care',
    category: 'Dental clinic',
    Category: 'Dental clinic',
    address: 'Leeds, West Yorkshire',
    Address: 'Leeds, West Yorkshire',
    phone: '0113 555 018',
    Phone: '0113 555 018',
    rating: '4.6',
    Rating: '4.6',
    website: '',
    Website: '',
    quality: 'ELITE',
    'Lead Quality': 'ELITE',
    no_website: true,
    'No Website': 'Yes',
    status: 'CONTACTED',
    ai_hero_title: 'Private Dental Bookings Without Phone Tag',
    ai_hero_subtitle: 'A clean patient-first site that turns local searches into appointments.',
    ai_pain_point: 'High-intent patients need trust signals and booking access before they call.',
    ai_solution: 'A polished website makes treatments, reviews, and booking options instantly clear.',
    ai_niche_cta: 'Book A Consultation',
  },
  {
    id: 'demo-3',
    batch_id: 'demo-batch-home-improvement',
    name: 'Oak & Stone Roofing',
    Name: 'Oak & Stone Roofing',
    category: 'Roofing contractor',
    Category: 'Roofing contractor',
    address: 'Huddersfield, West Yorkshire',
    phone: '01484 555 022',
    Phone: '01484 555 022',
    rating: '4.2',
    Rating: '4.2',
    website: '',
    Website: '',
    quality: 'SOLID',
    'Lead Quality': 'SOLID',
    no_website: true,
    'No Website': 'Yes',
    status: 'NEW',
    ai_hero_title: 'Trusted Roof Repairs With Proof Up Front',
    ai_hero_subtitle: 'Show homeowners your work, reviews, and quote path before they compare.',
    ai_pain_point: 'Good local reputation is not packaged into a page that wins quote requests.',
    ai_solution: 'A project-led site builds confidence and sends serious prospects straight to quote.',
    ai_niche_cta: 'Request A Roof Quote',
  },
];
