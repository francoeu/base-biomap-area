export { default } from 'next-auth/middleware'

export const config = {
  matcher: [ '/panel', '/projects/:path*', '/admin/dashboard', '/app/:path*', '/other/:path*', '/help/:path*']
}
