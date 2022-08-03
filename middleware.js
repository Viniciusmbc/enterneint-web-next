// <root>/middleware.ts
import { redirect } from "next/dist/server/api-utils";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from "next/server";
import { supabase } from "./utils/supabaseClient";

export async function middleware(request) {
  const user = await supabase.auth.api.getUserByCookie(request);
  const cookies = request.cookies.entries().next();
  console.log(cookies);
  if (request.nextUrl.pathname === "/") {
    if (cookies.value !== undefined) {
      const sbtoken = cookies?.value[1];

      if (sbtoken) {
        return NextResponse.rewrite(new URL("/dashboard", request.url));
      }
    }

    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      if (sbtoken) {
        const url = request.nextUrl.clone();
        console.log(url);
        return NextResponse.rewrite(url);
      }
    }
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}
