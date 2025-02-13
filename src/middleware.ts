import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminDashboard = createRouteMatcher(['/admin/dashboard'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const isAdmin = sessionClaims?.metadata?.role === 'admin';
  const path = req.nextUrl.pathname;
  
  if (userId && !isAdmin && path === '/admin') {
    // 로그인했지만 관리자가 아닌 경우 (access-denied)로 리다이렉트
    const accessDeniedUrl = new URL('/admin/access-denied', req.url);
    return NextResponse.redirect(accessDeniedUrl);
  }

  // 관리자가 아닌 경우 dashboard 접근 방지
  if (isAdminDashboard(req) && !isAdmin) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  // 로그인한 관리자의 경우
  if (userId && isAdmin && path === '/admin') {
    // /admin으로 접근시 dashboard로 리다이렉트
    const dashboardUrl = new URL('/admin/dashboard', req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}