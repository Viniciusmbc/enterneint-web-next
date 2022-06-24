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

export default function Series({ data, user, bookmarked }) {
  const [searchActive, setSearchActive] = useState(false);
  // Store the message if the bookmarked shows is add
  const [message, setMessage] = useState("");

  console.log(user);

  const checkSearchStatus = (status) => {
    if (status) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  const pull_data = (data) => {
    console.log(data);
    setMessage(data);
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
            {data.map(({ title, year, category, id, rating }) => (
              <Cards
                bookmarkedShows={bookmarked}
                key={id}
                id={id}
                title={title}
                year={year}
                category={category}
                classificao={rating}
                addMessage={pull_data}
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

  // Get trending shows
  const { data } = await supabase
    .from("Shows")
    .select()
    .filter("category", "eq", "TV Series");

  // Get bookmarked shows
  const { data: bookmarked } = await supabase
    .from("userfavoriteshows")
    .select("shows_id, Shows(*)")
    .eq("user_id", user.id);

  return {
    props: {
      data,
      user,
      bookmarked,
    },
  };
}

Series.getLayout = getLayout;
