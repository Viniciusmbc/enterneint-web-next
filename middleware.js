// <root>/middleware.ts
import { redirect } from "next/dist/server/api-utils";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse, NextRequest } from "next/server";
import { supabase } from "./utils/supabaseClient";

export async function middleware(request) {
  const user = await supabase.auth.api.getUserByCookie(request);
  const refreshToken =
    request.cookies.getWithOptions("sb-refresh-token").value ?? false;
  console.log(refreshToken);
  const cookies = request.cookies.entries().next();
  const sbtoken = cookies?.value === undefined ? false : true;
  if (request.nextUrl.pathname === "/") {
    if (cookies.value !== undefined && !user.error) {
      const url = request.nextUrl.clone();
      console.log(url);
      return sbtoken && refreshToken
        ? NextResponse.rewrite(new URL("/dashboard", request.url))
        : NextResponse.rewrite(new URL("/login", request.url));
    }
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/login")
  ) {
    if (sbtoken && refreshToken) {
      const url = request.nextUrl.clone();

      return NextResponse.rewrite(new URL(url));
    }
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}
