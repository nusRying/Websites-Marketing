import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { DEMO_SESSION_COOKIE, demoBatches, demoLeads, isDemoRequest } from '@/lib/demo'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const { searchParams } = new URL(request.url)
  
  const batchId = searchParams.get('batchId')
  const query = searchParams.get('q')
  const status = searchParams.get('status')
  const quality = searchParams.get('quality')
  const limit = parseInt(searchParams.get('limit') || '50')
  const offset = parseInt(searchParams.get('offset') || '0')

  if (isDemoRequest(request.headers.get('host'), cookieStore.get(DEMO_SESSION_COOKIE)?.value)) {
    let leads = demoLeads;

    if (query) {
      const normalizedQuery = query.toLowerCase();
      leads = leads.filter((lead) =>
        [lead.name, lead.category, lead.address]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalizedQuery))
      );
      return NextResponse.json({ leads: leads.slice(offset, offset + limit), total: leads.length });
    }

    if (!batchId) {
      return NextResponse.json({ files: demoBatches });
    }

    leads = leads.filter((lead) => lead.batch_id === batchId);
    if (status && status !== 'ALL') leads = leads.filter((lead) => lead.status === status);
    if (quality && quality !== 'ALL') leads = leads.filter((lead) => lead.quality === quality);

    return NextResponse.json({ leads: leads.slice(offset, offset + limit), total: leads.length });
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
