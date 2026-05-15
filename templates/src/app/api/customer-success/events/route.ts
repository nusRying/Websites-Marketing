import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { DEMO_SESSION_COOKIE, isDemoRequest } from '@/lib/demo'

export const dynamic = 'force-dynamic'

const ALLOWED_EVENTS = new Set([
  'SCRAPE_STARTED',
  'BATCH_COMPLETED',
  'OUTREACH_EXPORTED',
  'PITCH_COPIED',
  'SITE_PREVIEWED',
  'BOOKING_ATTEMPTED',
  'BILLING_PORTAL_OPENED',
  'CANCELLATION_REASON_SELECTED',
  'CANCELLATION_OFFER_CLAIMED',
  'CANCELLATION_CONFIRMED',
  'SUPPORT_OPTION_CLICKED',
  'SUPPORT_FEEDBACK_STARTED',
])

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const isDemo = isDemoRequest(request.headers.get('host'), cookieStore.get(DEMO_SESSION_COOKIE)?.value)
  const payload = await request.json()
  const eventType = String(payload.event_type || payload.event || '')
  if (!ALLOWED_EVENTS.has(eventType)) {
    return NextResponse.json({ error: 'Unsupported event type' }, { status: 400 })
  }

  const metadata =
    payload.metadata && typeof payload.metadata === 'object' && !Array.isArray(payload.metadata)
      ? payload.metadata
      : {}

  if (isDemo) {
    return NextResponse.json({ success: true, demo: true })
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key',
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('customer_success_events')
    .insert({
      user_id: user.id,
      event_type: eventType,
      metadata,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const webhookUrl = process.env.CUSTOMER_SUCCESS_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          email: user.email,
          event_type: eventType,
          metadata,
        }),
      })
    } catch (error) {
      console.error('Customer success webhook failed:', error)
    }
  }

  return NextResponse.json({ success: true })
}
