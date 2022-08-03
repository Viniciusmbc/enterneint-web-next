
// <root>/middleware.ts
import { redirect } from 'next/dist/server/api-utils';
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from './utils/supabaseClient';

export async function middleware(request: NextRequest) {
  const  user  = await supabase.auth.api.getUserByCookie(request);
  const cookies = request.cookies.entries().next()
  const sbtoken = cookies?.value[1] 
    if(request.nextUrl.pathname === '/') {
      if (sbtoken) {
        return NextResponse.rewrite(new URL('/dashboard', request.url))
      }
      return NextResponse.rewrite(new URL('/login', request.url))
    }

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (sbtoken) {
      return NextResponse.rewrite(new URL('/dashboard', request.url))
    }
    console.log(sbtoken, user)
  

    return NextResponse.rewrite(new URL('/login', request.url))
}

}