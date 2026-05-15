/**
 * Customer Success Analytics Utility
 * Tracks high-value user actions to calculate health scores and churn risk.
 */

import { supabase } from './supabase';
import { isBrowserDemoSession } from './demo';

export type AnalyticsEvent = 
  | 'SCRAPE_STARTED'
  | 'BATCH_COMPLETED'
  | 'OUTREACH_EXPORTED'
  | 'PITCH_COPIED'
  | 'SITE_PREVIEWED'
  | 'BOOKING_ATTEMPTED'
  | 'BILLING_PORTAL_OPENED'
  | 'CANCELLATION_REASON_SELECTED'
  | 'CANCELLATION_OFFER_CLAIMED'
  | 'CANCELLATION_CONFIRMED'
  | 'SUPPORT_OPTION_CLICKED'
  | 'SUPPORT_FEEDBACK_STARTED';

export async function trackEvent(event: AnalyticsEvent, metadata: Record<string, unknown> = {}) {
  try {
    if (isBrowserDemoSession()) {
      console.log(`[DEMO ANALYTICS] ${event}`, metadata);
      return;
    }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const eventMetadata = {
      ...metadata,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      demo: !user,
    };

    const response = await fetch('/api/customer-success/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: event,
        metadata: eventMetadata,
      }),
    });

    if (!response.ok) {
      console.warn(`[ANALYTICS] ${event} was not persisted.`);
    }

  } catch (error) {
    console.error('Failed to track analytics event:', error);
  }
}
