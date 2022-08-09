// Nextjs
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// React Hooks
import { useRef, useState, useEffect, useCallback } from "react";

// Auth Context
import { useAuth } from "/context/AuthContext";

// Icons
import { LoadingSpinner } from "../components/Icons";

// supabase
import { supabase } from "../utils/supabaseClient";

export default function Login() {
  const { signIn } = useAuth();

  // Error state
  const [error, setError] = useState(null);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Router
  const router = useRouter();

  // UseRef to store the input value
  const emailRef = useRef();
  const passwordRef = useRef();

  // Sign in the user
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Get the email and password from the form
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { data, error } = await signIn({ email, password });

    return router.push("/");
  };

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/");
  }, []);

  return (
    <div className=" min-h-screen bg-darkBlue">
      <Head>
        <title>Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="mx-auto w-full max-w-md ">
        <div className="flex flex-col items-center space-y-6">
          <div className=" py-12">
            <svg width="33" height="27" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
                fill="#FC4747"
              />
            </svg>
          </div>

          <form
            onSubmit={handleLogin}
            className="mx-auto flex flex-col rounded-md bg-semiDarkBlue px-10">
            <label className="mt-6 text-2xl text-white">Login</label>
            <input
              type="email"
              placeholder="Email address"
              className="mt-10 border-b-2 border-greyishBlue bg-semiDarkBlue py-2 text-white"
              id="email"
              name="email"
              ref={emailRef}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="mt-6 border-b-2 border-greyishBlue bg-semiDarkBlue py-2 text-white"
              ref={passwordRef}
              name="password"
              id="password"
              required
            />
            <button
              className="mt-10 rounded-md bg-red py-2 hover:bg-white disabled:bg-greyishBlue disabled:cursor-not-allowed "
              type="submit"
              disabled={isLoading}>
              {isLoading ? (
                <LoadingSpinner className="cursor-wait" color={`#FFF`} />
              ) : (
                <p>Login to your account</p>
              )}
            </button>
            {error?.message && (
              <div className=" text-red pt-6">
                <p> {error.message} </p>
                <p> {`Please, verify your email or password`} </p>
              </div>
            )}

            <div className="py-6">
              <p className="text-white">
                {`Don't have an account?`}
                <Link href="/signup">
                  <a className="text-red "> Sign Up</a>
                </Link>
              </p>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
