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

export default function Movies({ data, bookmarked }) {
  // Search state
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
            {data.map(({ title, year, category, rating, id }) => (
              <Cards
                bookmarkedShows={bookmarked}
                key={id}
                id={id}
                title={title}
                year={year}
                category={category}
                classificao={rating}
              />
            ))}
          </section>
        )}
      </section>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  // Get user by cookie
  const { user } = await supabase.auth.api.getUserByCookie(req);

  // If user not authenticaded, redirect
  if (!user) {
    console.log("Please login.");
    return { props: {}, redirect: { destination: "/login", permanent: false } };
  }

  // Get Movies shows
  const { data } = await supabase
    .from("Shows")
    .select()
    .eq("category", "Movie");

  // Get bookmarked shows
  const { data: bookmarked } = await supabase
    .from("userfavoriteshows")
    .select("shows_id")
    .eq("user_id", user.id);

  return {
    props: {
      data,
      user,
      bookmarked,
    },
  };
}

Movies.getLayout = getLayout;
