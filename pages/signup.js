// import from react
import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";

// import Nextjs
import Link from "next/link";
import { useRouter } from "next/router";

export default function Signup() {
  // Router
  const router = useRouter();

  // useRef to store the input element
  const emailRef = useRef();
  const passwordRef = useRef();

  // Auth
  const { signUp } = useAuth();

  // error state
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the email and password from the form
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { error } = await signUp({ email, password });

    if (error) {
      setError(error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen  bg-darkBlue">
      <div className="mx-auto w-full max-w-md px-8">
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
            onSubmit={handleSubmit}
            className="mx-auto flex w-80 flex-col rounded-md bg-semiDarkBlue px-10"
          >
            <h1 className="mt-6 text-2xl text-white">Sign Up</h1>
            <input
              required
              type="email"
              placeholder="Email address"
              className="mt-10 border-b-2 border-greyishBlue bg-semiDarkBlue py-2 text-white"
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="mt-6 border-b-2 border-greyishBlue bg-semiDarkBlue py-2 text-white"
              ref={passwordRef}
            />
            <input
              type="password"
              required
              placeholder="Repeat Password"
              className="mt-6 border-b-2 border-greyishBlue bg-semiDarkBlue py-2 text-white"
            />

            <button className="mt-10 rounded-md bg-red py-2" type="submit">
              Create an account
            </button>
            {error && <p className="text-red text-sm mt-4">{error}</p>}

            <div className="mx-auto py-6">
              <p className="text-white">
                Alread have an account?
                <Link href={"/login"}>
                  <a className="text-red"> Login</a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
