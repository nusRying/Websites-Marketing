/**
 * Customer Success Analytics Utility
 * Tracks high-value user actions to calculate health scores and churn risk.
 */

import { supabase } from './supabase';

export type AnalyticsEvent = 
  | 'SCRAPE_STARTED'
  | 'BATCH_COMPLETED'
  | 'OUTREACH_EXPORTED'
  | 'PITCH_COPIED'
  | 'SITE_PREVIEWED'
  | 'BOOKING_ATTEMPTED';

export async function trackEvent(event: AnalyticsEvent, metadata: Record<string, any> = {}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const entry = {
      user_id: user.id,
      event_type: event,
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString(),
        url: window.location.href,
      }
    };

    // 1. Log to internal audit table (Optional, using crm_history logic for now)
    console.log(`[ANALYTICS] ${event}:`, metadata);

    // 2. Integration: Future PostHog/Mixpanel push
    // pushToPostHog(entry);

  } catch (error) {
    console.error('Failed to track analytics event:', error);
  }
}
