import Head from "next/head";
import Image from "next/image";
import Cards from "../components/Cards";
import NestedLayout from "../components/NestedLayout";
import Trending from "../components/Trending";

export default function Home() {
  return (
    <>
      <Head></Head>
      <main className=" bg-darkBlue">
        <div className="flex p-4 md:pt-16">
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

        <h1 className="pb-4 pl-4 text-xl text-red">Trending</h1>

        <div className="flex  w-full overflow-x-auto">
          <Trending />
        </div>
        <h2 className="text-white text-xl my-6 ml-4">Recommended for you</h2>

        <section className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 ">
          <Cards
            title={"The Great Lands"}
            year={"2019"}
            category={"Movie"}
            image={
              "https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/the-great-lands/regular/medium.jpg?raw=true"
            }
            classificao={"E"}
          />
          <Cards
            title={"The Great Lands"}
            year={"2019"}
            category={"Movie"}
            image={
              "https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/the-great-lands/regular/medium.jpg?raw=true"
            }
            classificao={"E"}
          />
          <Cards
            title={"The Great Lands"}
            year={"2019"}
            category={"Movie"}
            image={
              "https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/the-great-lands/regular/medium.jpg?raw=true"
            }
            classificao={"E"}
          />
          <Cards
            title={"The Great Lands"}
            year={"2019"}
            category={"Movie"}
            image={
              "https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/the-great-lands/regular/medium.jpg?raw=true"
            }
            classificao={"E"}
          />
          <Cards
            title={"The Great Lands"}
            year={"2019"}
            category={"Movie"}
            image={
              "https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/the-great-lands/regular/medium.jpg?raw=true"
            }
            classificao={"E"}
          />
          <Cards
            title={"The Great Lands"}
            year={"2019"}
            category={"Movie"}
            image={
              "https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/the-great-lands/regular/medium.jpg?raw=true"
            }
            classificao={"E"}
          />
          <Cards
            title={"The Great Lands"}
            year={"2019"}
            category={"Movie"}
            image={
              "https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/the-great-lands/regular/medium.jpg?raw=true"
            }
            classificao={"E"}
          />
          <Cards
            title={"The Great Lands"}
            year={"2019"}
            category={"Movie"}
            image={
              "https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/the-great-lands/regular/medium.jpg?raw=true"
            }
            classificao={"E"}
          />
        </section>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
