// NextJS
import Head from "next/head";

// SWR
import useSWR from "swr";

// React Hooks
import { useEffect, useState } from "react";

// Components
import Cards from "../components/Cards";
import SearchBar from "../components/SearchBar";
import { getLayout } from "../components/NestedLayout";

// Supabase
import { supabase } from "../utils/supabaseClient";

export default function Movies({ data }) {
  
  // Search state
  const [searchActive, setSearchActive] = useState(false);
  const checkSearchStatus = (status) => {
    if (status) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

    // Function to change titles in images cards src
  const changeImageSrc = (title) => {
      if(title === "Earth’s Untouched"){
        const earthsuntouched = "earths-untouched";
        return earthsuntouched;
      }
      const src = title?.replace(/([^\w]+|\s+)/g, "-").replace("II", "2").toLowerCase()
      return src;
    }

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
                { title, year, category, rating, isBookmarked },
                index
              ) => (
                <Cards
                  key={index}
                  bookmark={isBookmarked}
                  title={title}
                  year={year}
                  category={category}
                  image={`https://kmzgkstraazrxkyxaejh.supabase.co/storage/v1/object/public/thumbnails/${changeImageSrc(title)}/regular/medium.jpg`}
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

export async function getStaticProps() {
  // Get Movies shows
  const {data} = await supabase.from("Shows").select().filter("category", "eq", "Movie");
  console.log(data)
  return {
    props: {
      data,
    },
  };
}

Movies.getLayout = getLayout;
