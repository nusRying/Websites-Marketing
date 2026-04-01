'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useEffect } from 'react';
import { formatPersonalizedContent, LeadData, AICopy } from './personalization';

/**
 * Hook to manage template personalization data and formatting.
 */
export function usePersonalization(defaultData: Partial<LeadData> = {}) {
  const searchParams = useSearchParams();

  const data = useMemo(() => {
    const leadData: LeadData = {
      name: searchParams.get('name') || defaultData.name || 'Your Business',
      niche: searchParams.get('niche') || defaultData.niche || 'Specialist',
      location: searchParams.get('location') || defaultData.location || 'Local Area',
      phone: searchParams.get('phone') || defaultData.phone || '0000 000 000',
      rating: searchParams.get('rating') || defaultData.rating || '5.0',
      booking_url: searchParams.get('booking_url') || searchParams.get('calendly') || 'https://calendly.com/expert-consultation/15min',
    };

    const aiCopy: AICopy = {
      hero_title: searchParams.get('ai_hero_title') || undefined,
      hero_subtitle: searchParams.get('ai_hero_subtitle') || undefined,
      pain_point: searchParams.get('ai_pain_point') || undefined,
      solution: searchParams.get('ai_solution') || undefined,
      niche_cta: searchParams.get('ai_niche_cta') || undefined,
    };

    return { leadData, aiCopy };
  }, [searchParams, defaultData]);

  /**
   * TRACKING: Signal lead interest back to CRM
   */
  useEffect(() => {
    const nameParam = searchParams.get('name');
    const phoneParam = searchParams.get('phone');
    
    // Only track if it looks like a real lead visit from a campaign
    if (nameParam && phoneParam) {
      const leadId = `${nameParam}-${phoneParam}`.replace(/\s+/g, '-');
      
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          leadId, 
          name: nameParam, 
          location: searchParams.get('location') || 'unknown' 
        })
      }).catch(err => console.error('Tracking failed:', err));
    }
  }, [searchParams]);

  /**
   * Translate/Format function for the template.
   */
  const t = (template: string, overrides: Record<string, string> = {}) => {
    return formatPersonalizedContent(template, data.leadData, data.aiCopy, overrides);
  };

  return {
    ...data.leadData,
    ai: data.aiCopy,
    t,
    raw: data
  };
}
