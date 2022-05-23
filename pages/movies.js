// next
import Head from "next/head";

// SWR
import useSWR from "swr";

// react
import { useEffect, useState } from "react";

// components
import Cards from "../components/Cards";

import SearchBar from "../components/SearchBar";
import { getLayout } from "../components/NestedLayout";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Movies() {
  const { data, error } = useSWR("/api/movies", fetcher);

  console.log(data, error);

  return (
    <>
      <Head></Head>
      <main className=" bg-darkBlue">
        <SearchBar shows={"movies"} />

        <h1 className=" pb-9 pl-4 text-xl text-red">Movies</h1>

        <section className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
          {data &&
            data.map(({ title, year, category, thumbnail, rating }, index) => (
              <Cards
                key={index}
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

Movies.getLayout = getLayout;
