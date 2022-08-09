// <root>/middleware.ts
import { redirect } from "next/dist/server/api-utils";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse, NextRequest } from "next/server";
import { supabase } from "./utils/supabaseClient";

export async function middleware(request) {
  const user = (await supabase.auth.api.getUserByCookie(request)) ?? false;
  const refreshToken =
    request.cookies.getWithOptions("sb-refresh-token").value ?? false;
  console.log(`refreshToken: ${refreshToken}`);
  console.log(`user: ${user}`);
  const sbAcessToken =
    request.cookies.getWithOptions("sb-access-token").value ?? false;
  console.log(`sbtoken: ${sbAcessToken}`);
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    console.log(url);
    return sbAcessToken && refreshToken && userId
      ? NextResponse.rewrite(new URL("/dashboard", request.url))
      : NextResponse.rewrite(new URL("/login", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/login")
  ) {
    if (sbAcessToken && refreshToken && user) {
      const url = request.nextUrl.clone();
      console.log(url);
      return NextResponse.rewrite(new URL(url));
    }
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}
