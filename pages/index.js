// next
import Head from "next/head";

// React
import { useEffect, useState } from "react";

// Components
import Cards from "../components/Cards";
import Trending from "../components/Trending";
import SearchBar from "../components/SearchBar";

// Layouts
import { getLayout } from "../components/NestedLayout";

// Firebase
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

export default function Home({ allshows, trendings }) {
  return (
    <>
      <Head></Head>
      <main className=" bg-darkBlue">
        <SearchBar shows={"movies or TV series"} />

        <h1 className=" pl-4 text-xl text-white">Trending</h1>
        {trendings &&
          trendings.map(
            ({ title, year, category, thumbnail, rating }, index) => (
              <Trending
                key={index}
                title={title}
                year={year}
                category={category}
                rating={rating}
                image={thumbnail.trending.large}
              />
            )
          )}

        <h2 className="text-white text-xl my-6 ml-4">Recommended for you</h2>

        <section className=" grid grid-cols-2 mx-4 gap-4 mb-14 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
          {allshows &&
            allshows.map(({ title, year, category, thumbnail, rating }) => (
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

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/hello");
  const data = await res.json();

  const trendings = data.filter((show) => show.isTrending === true);

  return {
    props: {
      allshows: data,
      trendings,
    },
  };
}

Home.getLayout = getLayout;
