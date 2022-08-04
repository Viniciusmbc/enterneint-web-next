// <root>/middleware.ts
import { redirect } from "next/dist/server/api-utils";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from "next/server";
import { supabase } from "./utils/supabaseClient";

export async function middleware(request) {
  const user = await supabase.auth.api.getUserByCookie(request);
  const cookies = request.cookies.entries().next();
  console.log(request.cookies.entries().next());
  if (request.nextUrl.pathname === "/") {
    if (cookies.value !== undefined && !user.error) {
      const sbtoken = cookies?.value[1];

      return sbtoken
        ? NextResponse.rewrite(new URL("/dashboard", request.url))
        : NextResponse.rewrite(new URL("/login", request.url));
    }
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const sbtoken = cookies?.value === undefined ? false : true;
    if (sbtoken) {
      const url = request.nextUrl.clone();
      console.log(url);
      return NextResponse.rewrite(url);
    }
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}
