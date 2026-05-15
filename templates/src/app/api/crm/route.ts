import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { DEMO_SESSION_COOKIE, demoCrmData, isDemoRequest } from '@/lib/demo'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  if (isDemoRequest(request.headers.get('host'), cookieStore.get(DEMO_SESSION_COOKIE)?.value)) {
    return NextResponse.json(demoCrmData)
  }

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Not strictly needed anymore as leads are fetched via api/leads
  // but we can return an empty object or current session for compatibility
  return NextResponse.json({})
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  if (isDemoRequest(request.headers.get('host'), cookieStore.get(DEMO_SESSION_COOKIE)?.value)) {
    const { leadId, status, notes, ai_copy } = await request.json()

    if (!leadId) {
      return NextResponse.json({ error: 'Lead ID required' }, { status: 400 })
    }

    const existing = demoCrmData[leadId] || { id: leadId, history: [] }
    return NextResponse.json({
      success: true,
      entry: {
        ...existing,
        id: leadId,
        status: status || existing.status || 'NEW',
        notes: notes !== undefined ? notes : existing.notes || '',
        ai_copy: ai_copy || existing.ai_copy,
      }
    })
  }

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { leadId, status, notes, ai_copy } = await request.json()

    if (!leadId) {
      return NextResponse.json({ error: 'Lead ID required' }, { status: 400 })
    }

    const updateData: any = {}
    if (status) updateData.status = status
    if (notes !== undefined) updateData.notes = notes
    if (ai_copy) updateData.ai_copy = ai_copy

    const { data, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', leadId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, entry: data })
  } catch (error: any) {
    console.error('CRM Update Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
