import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const dashboardPaths = [
    '/tableau-de-bord',
    '/avis',
    '/etablissements',
    '/parametres',
    '/abonnement',
  ]

  const isDashboard = dashboardPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  const isPaiement = request.nextUrl.pathname.startsWith('/paiement')

  // Non connecté → redirect vers la landing page
  // /demo/* est toujours accessible sans auth
  if (!user && (isDashboard || isPaiement)) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if (user) {
    const hasPaid = user.user_metadata?.has_paid === true

    const authPaths = ['/connexion', '/inscription']
    const isAuthPath = authPaths.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    )

    // Connecté + page auth → redirect selon paiement
    if (isAuthPath) {
      const url = request.nextUrl.clone()
      url.pathname = hasPaid ? '/tableau-de-bord' : '/paiement'
      return NextResponse.redirect(url)
    }

    // Connecté + pas payé + dashboard → redirect paiement
    if (!hasPaid && isDashboard) {
      const url = request.nextUrl.clone()
      url.pathname = '/paiement'
      return NextResponse.redirect(url)
    }

    // Connecté + déjà payé + page paiement → redirect dashboard
    if (hasPaid && isPaiement) {
      const url = request.nextUrl.clone()
      url.pathname = '/tableau-de-bord'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo.svg|og-image.png|api/webhooks|api/cron).*)',
  ],
}
