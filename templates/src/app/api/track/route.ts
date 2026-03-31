import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { leadId, name, location } = await request.json()
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    if (!leadId) {
      return NextResponse.json({ error: 'Lead ID required' }, { status: 400 })
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )

    // 1. Log to CRM History Table
    const { error: historyError } = await supabase
      .from('crm_history')
      .insert({
        lead_id: leadId,
        type: 'VIEW',
        metadata: { userAgent, name, location }
      })

    if (historyError) throw historyError

    // 2. Update Lead Status to 'INTERESTED'
    const { error: leadError } = await supabase
      .from('leads')
      .update({ status: 'INTERESTED' })
      .eq('id', leadId)
      // Note: RLS will handle security if we had a user session, 
      // but tracking is public. Our policy "System can log history" and public update needs care.
      // For now, we allow the update if the leadId is valid.

    if (leadError) throw leadError

    console.log(`🔥 CLOUD TRACKING: ${name} from ${location} viewed their site.`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Tracking Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
