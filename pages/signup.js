// import from react
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

// import Nextjs
import Link from "next/link";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();

  const { user, signup } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(data.email, data.password);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }

    console.log(data);
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
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="mt-6 border-b-2 border-greyishBlue bg-semiDarkBlue py-2 text-white"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <input
              type="password"
              required
              placeholder="Repeat Password"
              className="mt-6 border-b-2 border-greyishBlue bg-semiDarkBlue py-2 text-white"
              onChange={(e) => {
                if (e.target.value === data.password) {
                  setData({ ...data, password: e.target.value });
                } else {
                  ("Passwords do not match");
                }
              }}
            />

            <button className="mt-10 rounded-md bg-red py-2" type="submit">
              Create an account
            </button>
            {error && <p className="text-red text-sm mt-4">{error.message}</p>}

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
