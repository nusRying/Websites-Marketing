import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const { searchParams } = new URL(request.url)
  const batchId = searchParams.get('batchId')

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
    if (!batchId) {
      // 1. Fetch Batches for the user
      const { data: batches, error: batchError } = await supabase
        .from('batches')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (batchError) throw batchError
      
      // Map to backward compatible format for the frontend
      const files = batches.map(b => ({
        id: b.id,
        name: b.file_name || `${b.niche}_${b.location}`,
        date: b.created_at
      }))

      return NextResponse.json({ files })
    } else {
      // 2. Fetch Leads for a specific batch
      const { data: leads, error: leadError } = await supabase
        .from('leads')
        .select('*')
        .eq('batch_id', batchId)
        .eq('user_id', user.id)

      if (leadError) throw leadError

      return NextResponse.json({ leads })
    }
  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
