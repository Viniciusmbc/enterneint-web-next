import Head from "next/head";
import Image from "next/image";
import NestedLayout from "../components/NestedLayout";

export default function Home() {
  return (
    <>
      <Head></Head>
      <main className=" bg-darkBlue">
        <div className="flex px-4">
          <svg
            className="mr-4"
            width="32"
            height="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.613 25.72 23.08 21.2a10.56 10.56 0 0 0 2.253-6.533C25.333 8.776 20.558 4 14.667 4S4 8.776 4 14.667c0 5.89 4.776 10.666 10.667 10.666A10.56 10.56 0 0 0 21.2 23.08l4.52 4.533a1.333 1.333 0 0 0 1.893 0 1.333 1.333 0 0 0 0-1.893ZM6.667 14.667a8 8 0 1 1 16 0 8 8 0 0 1-16 0Z"
              fill="#FFF"
            />
          </svg>
          <input
            placeholder="Search for a movies or TV series"
            className="bg-darkBlue"
          />
        </div>
        <div>
          <p className="px-4 text-xl text-white">Trending</p>
          <img src="/app/styles/image-avatar.png" alt="user" />
        </div>
        <div className=" flex  overflow-x-auto">
          <img
            src="https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/beyond-earth/trending/large.jpg?raw=true"
            width={240}
            height={140}
            alt="beyond-earth"
          />
          <img
            src="https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/bottom-gear/trending/large.jpg?raw=true"
            width={240}
            height={140}
            alt="bottom-gear"
          />
          <img
            src="https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/1998/trending/large.jpg?raw=true"
            width={240}
            height={140}
            alt="1998"
          />
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
