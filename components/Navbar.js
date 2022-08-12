// Nextjs
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

// Icons
import { HomeIcon, MoviesIcon, TVIcon, BookmarkIcon } from "./Icons";

// supabase
import { supabase } from "../utils/supabaseClient";

export default function Navbar() {
  const router = useRouter();

  // Signout Function
  const signOut = () => supabase.auth.signOut();

  return (
    <nav className="flex items-center justify-between bg-semiDarkBlue py-5 px-4 h-1/4 md:flex-col md:ml-8  md:rounded-2xl md:justify-start md:mr-9 md:h-[95vh] md:mt-5 ">
      <svg width="33" height="27" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
          fill="#FC4747"
        />
      </svg>
      <div className="flex md:flex-col md:gap-y-10 md:mt-20 ">
        <Link href={"/dashboard"}>
          <a>
            <HomeIcon pathname={router.pathname === "/dashboard"} />
          </a>
        </Link>
        <Link href={"/dashboard/movies"}>
          <a>
            <MoviesIcon pathname={router.pathname === "/dashboard/movies"} />
          </a>
        </Link>
        <Link href={"/dashboard/tvseries"}>
          <a>
            <TVIcon pathname={router.pathname === "/dashboard/tvseries"} />
          </a>
        </Link>
        <Link href={"/dashboard/bookmarkeds/"}>
          <a>
            <BookmarkIcon
              pathname={router.pathname === "/dashboard/bookmarkeds"}
            />
          </a>
        </Link>
      </div>

      <div className=" flex md:mt-auto">
        <Image
          width={40}
          height={40}
          src="https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/image-avatar.png?raw=true"
          alt="avatar"
        />
      </div>
      <button
        className=" text-white hover:text-red text-sm mt-4 "
        onClick={() => signOut()}
      >
        Logout
      </button>
    </nav>
  );
}
