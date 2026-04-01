/**
 * Advanced personalization library for dynamic site templates.
 * Supports AI-generated copy, fallbacks, and data transformations.
 */

export interface LeadData {
  name: string;
  niche: string;
  location: string;
  phone?: string;
  rating?: string;
  reviews_count?: number;
  booking_url?: string;
  [key: string]: any;
}

export interface AICopy {
  hero_title?: string;
  hero_subtitle?: string;
  pain_point?: string;
  solution?: string;
  [key: string]: any;
}

/**
 * Formats content with lead data and AI copy support.
 * Template format: {key} for standard data, {ai:key} for AI-generated copy.
 */
export function formatPersonalizedContent(
  template: string, 
  data: LeadData, 
  aiCopy: AICopy = {}, 
  defaults: Record<string, string> = {}
): string {
  if (!template) return "";

  return template.replace(/{(\w+)}|{ai:(\w+)}/g, (match, standardKey, aiKey) => {
    // 1. Handle AI-generated copy placeholders
    if (aiKey) {
      return aiCopy[aiKey] || defaults[`ai:${aiKey}`] || data[aiKey] || match;
    }

    // 2. Handle standard data placeholders
    if (standardKey) {
      const value = data[standardKey] || defaults[standardKey];
      if (value !== undefined) {
        return transformData(standardKey, String(value));
      }
    }

    return match;
  });
}

/**
 * Utility for common data transformations.
 */
function transformData(key: string, value: string): string {
  switch (key) {
    case 'niche':
      // Capitalize first letter of each word
      return value.replace(/\b\w/g, l => l.toUpperCase());
    case 'phone':
      // Basic phone formatting if needed (placeholder for now)
      return value;
    default:
      return value;
  }
}

/**
 * Selects the best template path based on niche keywords.
 */
export function autoSelectTemplate(niche: string): string {
  const n = niche.toLowerCase();
  
  if (n.includes('locksmith') || n.includes('plumber')) return '/preview';
  if (n.includes('landscaping') || n.includes('roofing')) return '/showcase';
  if (n.includes('cleaning') || n.includes('handyman')) return '/local-pro';
  if (n.includes('beauty') || n.includes('salon')) return '/aura';
  if (n.includes('restaurant') || n.includes('cafe')) return '/gusto';
  if (n.includes('mechanic') || n.includes('car')) return '/auto';
  if (n.includes('design') || n.includes('interior')) return '/harmony';
  if (n.includes('solicitor') || n.includes('lawyer')) return '/law';
  if (n.includes('security') || n.includes('cctv')) return '/security';
  if (n.includes('pest')) return '/pest';
  if (n.includes('event')) return '/event';
  if (n.includes('print')) return '/print';
  if (n.includes('dental') || n.includes('dentist')) return '/dental';
  if (n.includes('fitness') || n.includes('gym')) return '/fit';
  
  return '/preview'; // Default "Lead Machine"
}
