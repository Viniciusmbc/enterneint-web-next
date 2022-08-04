// Nextjs
import Head from "next/head";

// React hooks
import { useState, useEffect } from "react";

// Auth Context
import { useAuth } from "../../context/AuthContext";

// Layout
import { getLayout } from "../../components/NestedLayout";

// Components
import SearchBar from "../../components/SearchBar";
import Cards from "../../components/Cards";
import Title from "../../components/Title";

// Supabase
import { supabase } from "../../utils/supabaseClient";

export default function Bookmarked({ bookmarkedShows, userId }) {
  const bookmarkedMovies = bookmarkedShows?.filter(({ category }) => {
    return category === "Movie";
  });

  const bookmarkedTVseries = bookmarkedShows?.filter(({ category }) => {
    return category === "TV Series";
  });

  // Search state
  const [searchActive, setSearchActive] = useState(false);

  // If search state is active, show the data
  const checkSearchStatus = (status) => {
    if (status) {
      return setSearchActive(true);
    }
    return setSearchActive(false);
  };

  return (
    <>
      <Head>
        <title>Bookmarked Shows</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {bookmarkedShows.length === 0 ? (
        <Title title={"You don't have a bookmarked shows!"} />
      ) : (
        <main className=" w-full">
          <SearchBar
            shows={"bookmarked shows"}
            data={bookmarkedShows}
            onFocusHandler={(status) => checkSearchStatus(status)}
            userId={userId}
          />
          {!searchActive && bookmarkedMovies.length > 0 && (
            <>
              <Title title={"Bookmarked Movies"} />
              <section className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
                {bookmarkedMovies.map(
                  ({ title, year, category, rating, id }, index) => (
                    <Cards
                      key={index}
                      id={id}
                      title={title}
                      year={year}
                      category={category}
                      rating={rating}
                      userId={userId}
                    />
                  )
                )}
              </section>
              {bookmarkedTVseries.length > 0 && (
                <>
                  <Title
                    title={"Bookmarked TV Series"}
                    bookmarkedtvSeries={
                      bookmarkedMovies.length > 0 ? true : false
                    }
                  />
                  <section className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
                    {bookmarkedTVseries.map(
                      ({ title, year, category, rating, id }, index) => (
                        <Cards
                          key={index}
                          id={id}
                          title={title}
                          year={year}
                          category={category}
                          rating={rating}
                          userId={userId}
                        />
                      )
                    )}
                  </section>
                </>
              )}
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

  return {
    props: {
      userId: user.id,

      bookmarkedShows,
    },
  };
}
