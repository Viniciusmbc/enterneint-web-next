// Nextjs
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

// Icons
import { HomeIcon, MoviesIcon, TVIcon, BookmarkIcon } from "./Icons";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between bg-semiDarkBlue py-5 px-4 h-1/4 md:flex-col md:ml-8  md:rounded-2xl md:justify-start md:mr-9 md:h-[95vh] md:mt-5 ">
      
      <svg width="33" height="27" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
          fill="#FC4747"
        />
      </svg>
      <div className="flex md:flex-col md:gap-y-10 md:mt-20 ">
        <Link href={"/"}>
          <a>
            <HomeIcon
              color={`${router.pathname === "/" ? "#FFF" : "#5A698F"}`}
            />
          </a>
        </Link>
        <Link href={"/movies"}>
          <a>
            <MoviesIcon
              color={`${router.pathname === "/movies" ? "#FFF" : "#5A698F"}`}
            />
          </a>
        </Link>
        <Link href={"/tvseries"}>
          <a>
            <TVIcon
              color={`${router.pathname === "/tvseries" ? "#FFF" : "#5A698F"}`}
            />
          </a>
        </Link>
        <Link href={"/bookmarkeds/"}>
          <a>
            <BookmarkIcon
              color={`${
                router.pathname === "/bookmarkeds" ? "#FFF" : "#5A698F"
              }`}
            />
          </a>
        </Link>
      </div>
      
      <div className=" md:mt-auto">
        <Image
          width={40}
          height={40}
          src="https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/image-avatar.png?raw=true"
          alt="avatar"
        />
      </div>
      
    </nav>
  );
}
