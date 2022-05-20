import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { user, signup } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(data.email, data.password);
    } catch (err) {
      console.log(err);
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
          <form onSubmit={handleSubmit}>
            <div className="mx-auto flex w-80 flex-col rounded-md bg-semiDarkBlue px-6">
              <h1 className="mt-6 text-2xl text-white">Sign Up</h1>
              <input
                required
                type="email"
                placeholder="Email address"
                className="mt-10 border-b-2 border-greyishBlue bg-semiDarkBlue py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="mt-6 border-b-2 border-greyishBlue bg-semiDarkBlue py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Repeat Password"
                className="mt-6 border-b-2 border-greyishBlue bg-semiDarkBlue py-2"
              />
              <button className="mt-10 rounded-md bg-red py-2">
                Create an account
              </button>

              <div className="mx-auto py-6">
                <p className="text-white">
                  Alread have an account?
                  <a className="text-red"> Login</a>
                </p>
              </div>
              {error && <p className="text-red">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
