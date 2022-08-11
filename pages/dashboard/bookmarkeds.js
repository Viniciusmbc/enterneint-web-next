// Nextjs
import Head from "next/head";

// React hooks
import { useState, useEffect } from "react";

// Auth Context
import { useAuth } from "../../context/AuthContext";

// SWR
import useSWR from "swr";

// Layout
import { getLayout } from "../../components/NestedLayout";

// Components
import SearchBar from "../../components/SearchBar";
import Cards from "../../components/Cards";
import Title from "../../components/Title";

// Supabase
import { supabase } from "../../utils/supabaseClient";

export default function Bookmarkeds() {
  // auth context
  const { session } = useAuth();

  // State
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarkedShows, setBookmarkedShows] = useState();
  const [bookmarkedMovies, setBookmarkedMovies] = useState();
  const [bookmarkedTVSeries, setBookmarkedTVSeries] = useState();

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("userfavoriteshows")
        .select("shows_id, Shows(*)")
        .eq("user_id", session?.user.id);

      console.log(data);
      data && data.length === 0
        ? setBookmarkedShows([false])
        : setBookmarkedShows(
            data.map(({ Shows }) => {
              return Shows;
            })
          );

      if (error) {
        return console.log(`Error: ${error}`);
      }

      const bookmarkedMovies = bookmarkedShows?.filter(
        ({ category }) => category === "Movie"
      );

      setBookmarkedMovies(bookmarkedMovies);
      const bookmarkedTVSeries = bookmarkedShows?.filter(
        ({ category }) => category === "TV Series"
      );

      setBookmarkedTVSeries(bookmarkedTVSeries);
    };

    session?.user.id ? getData() && setIsLoading(false) : setIsLoading(true);
  }, [session]);

  console.log(bookmarkedShows);

  // Search state
  const [searchActive, setSearchActive] = useState(false);

  // If search state is active, show the data
  const checkSearchStatus = (status) => {
    status ? setSearchActive(true) : setSearchActive(false);
  };

  return (
    <>
      <Head>
        <title>Bookmarked Shows</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : bookmarkedShows && !bookmarkedShows[0] ? (
        <Title title={"You don't have a bookmarked shows!"} />
      ) : (
        <section className=" w-full">
          <SearchBar
            shows={"bookmarked shows"}
            data={bookmarkedShows}
            onFocusHandler={(status) => checkSearchStatus(status)}
            userId={session?.user.id}
          />
          {!searchActive && bookmarkedMovies && bookmarkedMovies.length > 0 && (
            <>
              <Title
                title={"Bookmarked Movies"}
                bookmarkedtvSeries={bookmarkedMovies.length > 0 ? true : false}
              />
              <article className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
                {bookmarkedMovies.map(
                  ({ title, year, category, rating, id }, index) => (
                    <Cards
                      key={index}
                      id={id}
                      title={title}
                      year={year}
                      category={category}
                      rating={rating}
                      userId={session?.user.id}
                    />
                  )
                )}
              </article>
            </>
          )}
          {!searchActive &&
            bookmarkedTVSeries &&
            bookmarkedTVSeries.length > 0 && (
              <>
                <Title
                  title={"Bookmarked Tv Series"}
                  bookmarkedtvSeries={
                    bookmarkedMovies.length > 0 ? true : false
                  }
                />
                <article className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
                  {bookmarkedTVSeries.map(
                    ({ title, year, category, rating, id }, index) => (
                      <Cards
                        key={index}
                        id={id}
                        title={title}
                        year={year}
                        category={category}
                        rating={rating}
                        userId={session?.user.id}
                      />
                    )
                  )}
                </article>
              </>
            )}
        </section>
      )}
    </>
  );
}

Bookmarkeds.getLayout = getLayout;

/*
export async function getServerSideProps({ req, res }) {
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
      bookmarkedShows,
    },
  };
}
*/
