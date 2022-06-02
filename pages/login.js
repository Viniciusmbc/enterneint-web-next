import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

// import context
import { useAuth } from "../context/AuthContext";

export default function Login() {
  // Error state
  const [error, setError] = useState(null);

  // useAuth from context
  const { user, signIn } = useAuth();

  // Router
  const router = useRouter();

  // UseRef to store the input value
  const emailRef = useRef();
  const passwordRef = useRef();

  console.log(user);

  // Sign in the user
  const handleLogin = async (e) => {
    e.preventDefault();

    // Get the email and password from the form
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { error } = await signIn({ email, password });

    if (!error) {
      router.push("/");
    }
  };

  return (
    <div className=" min-h-screen bg-darkBlue">
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
            className="mx-auto flex flex-col rounded-md bg-semiDarkBlue px-10"
          >
            <label className="mt-6 text-2xl text-white">Login</label>
            <input
              type="email"
              placeholder="Email address"
              className="mt-10 border-b-2 border-greyishBlue bg-semiDarkBlue py-2 text-white"
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="Password"
              className="mt-6 border-b-2 border-greyishBlue bg-semiDarkBlue py-2 text-white"
              ref={passwordRef}
            />
            <button className="mt-10 rounded-md bg-red py-2" type="submit">
              Login to your account
            </button>
            <div className="py-6">
              <p className="text-white">
                {`Dont have an account?`}
                <Link href="/signup">
                  <a className="text-red"> Sign Up</a>
                </Link>
              </p>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
