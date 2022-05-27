// Nextjs
import Head from "next/head";

//SWR
import useSWR from "swr";

//components
import { getLayout } from "../components/NestedLayout";
import SearchBar from "../components/SearchBar";
import Title from "../components/Title";
import Cards from "../components/Cards";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Movies() {
  const { data, error } = useSWR("/api/bookmark", fetcher);

  console.log(data, error);

  return (
    <>
      <Head></Head>
      <main className=" w-full">
        <SearchBar shows={"bookmarked shows"} />

        <Title title={"Bookmarked Movies"} />

        <section className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
          {data &&
            data.map(
              (
                { title, year, category, thumbnail, rating, isBookmarked },
                index
              ) => (
                <Cards
                  key={index}
                  bookmark={isBookmarked}
                  title={title}
                  year={year}
                  category={category}
                  image={thumbnail.regular.medium}
                  classificao={rating}
                />
              )
            )}
        </section>
      </main>
    </>
  );
}

Movies.getLayout = getLayout;
