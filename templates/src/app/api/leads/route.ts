import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const { searchParams } = new URL(request.url)
  
  const batchId = searchParams.get('batchId')
  const query = searchParams.get('q')
  const status = searchParams.get('status')
  const quality = searchParams.get('quality')
  const limit = parseInt(searchParams.get('limit') || '50')
  const offset = parseInt(searchParams.get('offset') || '0')

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
    // 1. Global Full-Text Search
    if (query) {
      const { data: leads, count, error: searchError } = await supabase
        .from('leads')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .textSearch('search_vector', query, {
          config: 'english',
          type: 'websearch'
        })
        .range(offset, offset + limit - 1)

      if (searchError) throw searchError
      return NextResponse.json({ leads, total: count })
    }

    // 2. Fetch Batches (Sidebar)
    if (!batchId) {
      const { data: batches, error: batchError } = await supabase
        .from('batches')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (batchError) throw batchError
      
      const files = batches.map(b => ({
        id: b.id,
        name: b.file_name || `${b.niche}_${b.location}`,
        date: b.created_at
      }))

      return NextResponse.json({ files })
    } 
    
    // 3. Fetch Leads for a specific batch with filters and pagination
    let dbQuery = supabase
      .from('leads')
      .select('*', { count: 'exact' })
      .eq('batch_id', batchId)
      .eq('user_id', user.id)

    if (status && status !== 'ALL') dbQuery = dbQuery.eq('status', status)
    if (quality && quality !== 'ALL') dbQuery = dbQuery.eq('quality', quality)

    const { data: leads, count, error: leadError } = await dbQuery
      .range(offset, offset + limit - 1)
      .order('name', { ascending: true })

    if (leadError) throw leadError

    return NextResponse.json({ leads, total: count })

  } catch (error: any) {
    console.error('API Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
