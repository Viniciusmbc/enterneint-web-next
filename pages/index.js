// next
import Head from "next/head";

// SWR
import useSWR from "swr";

// react
import { useEffect, useState } from "react";

// components
import Cards from "../components/Cards";
import NestedLayout from "../components/NestedLayout";
import Trending from "../components/Trending";
import SearchBar from "../components/SearchBar";

// firebase
import { set, ref, onValue } from "firebase/database";
import { db } from "../firebase/config";

/*
useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setMoviesSeries(data.movies_series);
      }
    });
  }, []);
*/

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data, error } = useSWR("/api/hello", fetcher);

  console.log(data, error);

  return (
    <>
      <Head></Head>
      <main className=" bg-darkBlue">
        <SearchBar shows={"movies or TV series"} />

        <h1 className="pb-4 pl-4 text-xl text-red">Trending</h1>

        <div className="flex  w-full overflow-x-auto">
          <Trending />
        </div>
        <h2 className="text-white text-xl my-6 ml-4">Recommended for you</h2>

        <section className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
          {data &&
            data.map(({ title, year, category, thumbnail, rating }) => (
              <Cards
                key={title}
                bookmark={false}
                title={title}
                year={year}
                category={category}
                image={thumbnail.regular.medium}
                classificao={rating}
              />
            ))}
        </section>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <NestedLayout>{page}</NestedLayout>;
};
