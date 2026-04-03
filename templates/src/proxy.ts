import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Proxy: CRITICAL ERROR - Supabase URL or Anon Key is missing from environment variables.");
    return NextResponse.next();
  }

  let supabase;
  try {
    supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )
  } catch (initError: any) {
    console.error("Proxy: Supabase Init Error:", initError.message);
    return NextResponse.next();
  }

  console.log("Proxy: Intercepting request for", request.nextUrl.pathname);
  const { data, error: authError } = await supabase.auth.getUser()
  const user = data?.user
  if (authError) console.error("Proxy: Auth error", authError.message);

  // Protect dashboard and internal API routes
  const isProtectedRoute = request.nextUrl.pathname === '/' || request.nextUrl.pathname.startsWith('/api/')
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login')
  
  // SECURITY HEADERS
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')

  // ... (isPublicTemplate checks kept)

  // Special case: Tracking and Site Templates are public
  const isPublicTemplate = [
    '/aqua', '/aura', '/auto', '/barber', '/cleaning', '/counsel', '/dental', 
    '/eternal', '/event', '/fit', '/green', '/gusto', '/harmony', '/industrial', 
    '/law', '/local-pro', '/logistics', '/paw', '/pest', '/preview', '/print', 
    '/property', '/roofing', '/scholastic', '/security', '/showcase', '/smart-living', 
    '/spark', '/titan', '/vitality'
  ].some(p => request.nextUrl.pathname.startsWith(p))
  
  const isPublicApi = request.nextUrl.pathname === '/api/status' || request.nextUrl.pathname === '/api/track' || request.nextUrl.pathname === '/api/proxy-image'

  if (isProtectedRoute && !isPublicApi && !user && !isPublicTemplate) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
