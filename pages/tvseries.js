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

export default function Series() {
  const { data, error } = useSWR("/api/series", fetcher);

  console.log(data, error);

  return (
    <>
      <Head></Head>
      <main className=" bg-darkBlue">
        <SearchBar shows={"TV Series"} />

        <h1 className=" pb-9 pl-4 text-xl text-red">TV Series</h1>

        <section className=" grid grid-cols-2  gap-4  mx-4 mb-14 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
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

Series.getLayout = getLayout;
