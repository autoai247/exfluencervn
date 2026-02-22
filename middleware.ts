import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// 인증이 필요한 경로 목록
const PROTECTED_PATHS = [
  '/main/influencer',
  '/main/advertiser',
  '/main/messages',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 관리자 경로 보호
  if (pathname.startsWith('/main/admin')) {
    const adminSession = request.cookies.get('admin_session')?.value;
    const sessionSecret = process.env.ADMIN_SESSION_SECRET;
    if (!sessionSecret || adminSession !== sessionSecret) {
      return NextResponse.redirect(new URL('/auth/admin/login', request.url));
    }
  }

  // 인증이 필요한 경로 보호 (influencer, advertiser, messages)
  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  if (isProtected) {
    // Supabase 세션 확인
    let response = NextResponse.next({
      request: { headers: request.headers },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({
              request: { headers: request.headers },
            });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options });
            response = NextResponse.next({
              request: { headers: request.headers },
            });
            response.cookies.set({ name, value: '', ...options });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // 미인증 사용자 → /auth/login으로 리다이렉트
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return await updateSession(request);
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
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
