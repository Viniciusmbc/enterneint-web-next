import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(user);
    try {
      await login(data.email, data.password);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
    console.log("login:", data.email, data.password);
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
            onClick={handleLogin}
            className="mx-auto flex flex-col rounded-md bg-semiDarkBlue px-10"
          >
            <label className="mt-6 text-2xl text-white">Login</label>
            <input
              type="email"
              placeholder="Email address"
              className="mt-10 border-b-2 border-greyishBlue bg-semiDarkBlue py-2 text-white"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="mt-6 border-b-2 border-greyishBlue bg-semiDarkBlue py-2 text-white"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <button className="mt-10 rounded-md bg-red py-2" type="submit">
              Login to your account
            </button>
            <div className="py-6">
              <p className="text-white">
                Don't have an account?
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
