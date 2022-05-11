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

        <h1 className="px-4 text-xl text-white">Trending</h1>

        <div className="flex  w-full overflow-x-auto">
          <div className=" ml-4 relative">
            <div className=" bottom-4 left-4 absolute">
              <p className=" mb-1  text-white  text-xs">2019</p>
              <div className=" bg-red rounded-full w-1 h-1"></div>
              <svg
                className="mx-2"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
                  fill="#FFFFFF"
                />
              </svg>
              <p className="bottom-4 text-white text-sm">Beyond Earth</p>
            </div>
            <img
              className="max-w-sm rounded"
              src="https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/beyond-earth/trending/large.jpg?raw=true"
              alt="beyond-earth"
            />
          </div>
          <div className=" mx-4">
            <img
              className="max-w-sm rounded"
              src="https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/beyond-earth/trending/large.jpg?raw=true"
              alt="beyond-earth"
            />
          </div>
          <div className=" mr-4">
            <img
              className="max-w-sm rounded"
              src="https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/beyond-earth/trending/large.jpg?raw=true"
              alt="beyond-earth"
            />
          </div>
          <div>
            <img
              className="max-w-sm"
              src="https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/beyond-earth/trending/large.jpg?raw=true"
              alt="beyond-earth"
            />
          </div>
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
