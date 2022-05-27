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
import Title from "../components/Title";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Movies() {
  const { data, error } = useSWR("/api/movies", fetcher);

  const [searchActive, setSearchActive] = useState(false);

  const checkSearchStatus = (status) => {
    if (status) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  return (
    <>
      <Head></Head>
      <section className=" w-full">
        <SearchBar
          shows={"Movies"}
          data={data}
          onFocusHandler={(status) => checkSearchStatus(status)}
          title={"Movies"}
        />

        {!searchActive && (
          <section className=" grid grid-cols-2 mx-4 gap-4 mb-14 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
            {data.map(
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
        )}
      </section>
    </>
  );
}

Movies.getLayout = getLayout;
