// Styles
import "../styles/globals.css";

// Nextjs Router
import { useRouter } from "next/router";

// React Hooks
import { useState, useEffect } from "react";

// Supabase
import { supabase } from "/utils/supabaseClient";

// Context
import { AuthProvider } from "../context/AuthContext";
import Link from "next/link";

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState();

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.session();
    setSession(session);

    // If refresh token is expired, sign out

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (session) => {
        setSession(session);
      }
    );
    setIsLoading(false);

    return () => {
      authListener?.unsubscribe();
    };
  }, [session]);

  return (session?.access_token && session?.refresh_token) ||
    router.pathname === "/login" ||
    router.pathname === "/signup" ? (
    getLayout(
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    )
  ) : (
    <main className="flex flex-col justify-center items-center ">
      <h1 className="text-3xl font-bold text-center text-white pt-28">
        You need to be logged in to view this page
      </h1>
      <div className="mx-auto py-10">
        <p className="text-white text-2xl">
          Alread have an account?
          <Link href={"/login"}>
            <a className="text-red"> Login</a>
          </Link>
        </p>
      </div>
      <p className="text-white text-center text-2xl">
        {`Don't have an account?`}
        <Link href="/signup">
          <a className="text-red "> Sign Up</a>
        </Link>
      </p>{" "}
    </main>
  );
}
