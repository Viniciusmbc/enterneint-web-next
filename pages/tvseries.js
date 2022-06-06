// next
import Head from "next/head";

// SWR
import useSWR from "swr";

// react
import { useEffect, useState } from "react";

// components
import Cards from "../components/Cards";
import SearchBar from "../components/SearchBar";

// layouts
import { getLayout } from "../components/NestedLayout";

// supabase
import { supabase } from "../utils/supabaseClient";

export default function Series({ data, user }) {
  const [searchActive, setSearchActive] = useState(false);

  console.log(user);

  const checkSearchStatus = (status) => {
    if (status) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  // Function to change titles in images cards src
  const changeImageSrc = (title) => {
    if (title === "Earth’s Untouched") {
      const earthsuntouched = "earths-untouched";
      return earthsuntouched;
    }
    const src = title
      ?.replace(/([^\w]+|\s+)/g, "-")
      .replace("II", "2")
      .toLowerCase();
    return src;
  };

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
                  image={`https://kmzgkstraazrxkyxaejh.supabase.co/storage/v1/object/public/thumbnails/${changeImageSrc(
                    title
                  )}/regular/medium.jpg`}
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

export async function getStaticProps({ req, res }) {
  // Get user by cookie
  const { user } = await supabase.auth.api.getUserByCookie(req);

  // If user not authenticaded, redirect
  if (!user) {
    console.log("Please login.");
    return { props: {}, redirect: { destination: "/login", permanent: false } };
  }

  // Get trending shows
  const { data } = await supabase
    .from("Shows")
    .select()
    .filter("category", "eq", "TV Series");

  return {
    props: {
      data,
      user,
    },
  };
}

Series.getLayout = getLayout;
