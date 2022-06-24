// Nextjs
import Head from "next/head";

// React hooks
import { useState, useEffect } from "react";

// Auth Context
import { useAuth } from "../context/AuthContext";

// Layout
import { getLayout } from "../components/NestedLayout";

// Components
import SearchBar from "../components/SearchBar";
import Cards from "../components/Cards";
import Title from "../components/Title";

// Supabase
import { supabase } from "../utils/supabaseClient";

export default function Bookmarked({ data, bookmarkedShows, user }) {
  const bookmarkedMovies = bookmarkedShows?.filter(({ category }) => {
    return category && category === "Movie";
  });

  const bookmarkedTVseries = bookmarkedShows?.filter(({ category }) => {
    return category && category === "TV Series";
  });

  console.log(bookmarkedShows.length, bookmarkedTVseries);

  // Search state
  const [searchActive, setSearchActive] = useState(false);

  // If search state is active, show the data
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

      {bookmarkedShows.length === 0 ? (
        <Title title={"You don't have a bookmarked shows!"} />
      ) : (
        <main className=" w-full">
          <SearchBar
            shows={"bookmarked shows"}
            data={bookmarkedShows}
            onFocusHandler={(status) => checkSearchStatus(status)}
          />
          {bookmarkedMovies.length > 0 && (
            <>
              <Title title={"Bookmarked Movies"} />
              <section className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
                {bookmarkedMovies.map(
                  ({ title, year, category, rating, id }) => (
                    <Cards
                      key={id}
                      id={id}
                      bookmarkedShows={data}
                      title={title}
                      year={year}
                      category={category}
                      classificao={rating}
                    />
                  )
                )}
              </section>
            </>
          )}
          {bookmarkedTVseries.length > 0 && (
            <>
              <Title
                title={"Bookmarked TV Series"}
                bookmarkedtvSeries={bookmarkedMovies.length > 0 ? true : false}
              />
              <section className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
                {bookmarkedTVseries.map(
                  ({ title, year, category, rating, id }) => (
                    <Cards
                      key={id}
                      id={id}
                      bookmarkedShows={data}
                      title={title}
                      year={year}
                      category={category}
                      classificao={rating}
                    />
                  )
                )}
              </section>
            </>
          )}
        </main>
      )}
    </>
  );
}

Bookmarked.getLayout = getLayout;

export async function getServerSideProps({ req, res }) {
  // Get user by cookie
  const { user } = await supabase.auth.api.getUserByCookie(req);
  console.log(user);

  // If user not authenticaded, redirect
  if (!user) {
    console.log("Please login.");
    return { props: {}, redirect: { destination: "/login", permanent: false } };
  }

  // Get all favorite shows
  const { data, error } = await supabase
    .from("userfavoriteshows")
    .select("shows_id, Shows(*)")
    .eq("user_id", user.id);

  const bookmarkedShows = data.map(({ Shows }) => {
    return Shows;
  });

  if (error) {
    return console.log(`Error: ${error}`);
  }

  console.log(data);

  return {
    props: {
      data,
      user,
      bookmarkedShows,
    },
  };
}
