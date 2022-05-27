// next
import Head from "next/head";

// SWR
import useSWR from "swr";

// react
import { useEffect, useState } from "react";

// components
import Cards from "../components/Cards";
import SearchBar from "../components/SearchBar";
import Title from "../components/Title";
import { getLayout } from "../components/NestedLayout";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Series() {
  const { data, error } = useSWR("/api/series", fetcher);
  const [searchActive, setSearchActive] = useState(false);

  const checkSearchStatus = (status) => {
    if (status) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  console.log(data, error);

  return (
    <>
      <section className=" w-full">
        <SearchBar
          shows={"Series"}
          data={data}
          onFocusHandler={(status) => checkSearchStatus(status)}
          title={"Series"}
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

Series.getLayout = getLayout;
