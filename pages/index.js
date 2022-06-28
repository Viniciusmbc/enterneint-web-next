// Nextjs
import Head from "next/head";

// React Hooks
import { useEffect, useState, useRef } from "react";

// Auth Context
import { useAuth } from "../context/AuthContext";

// Components
import Cards from "../components/Cards";
import Trending from "../components/Trending";
import SearchBar from "../components/SearchBar";
import AlertMessage from "../components/AlertMessage";

// Layouts
import { getLayout } from "../components/NestedLayout";

// Supabase
import { supabase } from "../utils/supabaseClient";

export default function Home({ trendings, allshows, bookmarked }) {
  // Search state
  const [searchActive, setSearchActive] = useState(false);

  const [bookmarkedShows, setBookmarkedShows] = useState();

  // If the user is logged in, get the user's bookmarked shows

  /*
  useEffect(() => {
    const getBookmarkedShowsID = async () => {
      const { data, error } = await supabase
        .from("userfavoriteshows")
        .select()
        .eq("user_id", session.user.id);
      if (error) {
        console.log(error);
      } else {
        const bookmarkedShowsId = data?.map((item) => item.shows_id);
        setBookmarkedShows(bookmarkedShowsId);
        console.log(bookmarkedShowsId);
      }
    };

    if (session) {
      console.log(session.user.id);
      getBookmarkedShowsID();
    }
  }, [session]);
*/

  // If search state is active, show the data
  const checkSearchStatus = (status) => {
    status ? setSearchActive(true) : setSearchActive(false);
  };

  // Function to change titles in images cards src
  const changeImageSrc = (title) => {
    if (title === "Earth’s Untouched") {
      const earthsuntouched = "earths-untouched";
      return earthsuntouched;
    }
    const src = title
      .replace(/([^\w]+|\s+)/g, "-")
      .replace("II", "2")
      .toLowerCase();
    return src;
  };

  return (
    <section>
      <Head>
        <title></title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <SearchBar
        shows={"movies or TV series"}
        data={allshows}
        onFocusHandler={(status) => checkSearchStatus(status)}
      />

      {!searchActive && (
        <>
          <h1 className=" pl-4 text-xl text-white mb-4">Trending</h1>
          <div className="flex  w-full overflow-x-auto">
            {trendings &&
              trendings.map(({ title, year, category, rating }, index) => (
                <Trending
                  key={index}
                  title={title}
                  year={year}
                  category={category}
                  rating={rating}
                  image={`https://kmzgkstraazrxkyxaejh.supabase.co/storage/v1/object/public/thumbnails/${changeImageSrc(
                    title
                  )}/trending/large.jpg`}
                  bookmarkShows={bookmarkedShows}
                />
              ))}
          </div>

          <h2 className="text-white text-xl my-6 ml-4">Recommended for you</h2>
        </>
      )}

      {!searchActive && (
        <section className=" grid grid-cols-2 mx-4 gap-4 mb-14 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
          {allshows &&
            allshows.map(({ id, title, year, category, rating }) => (
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
  );
}

export async function getServerSideProps({ req, res }) {
  // Get user by cookie
  const { user } = await supabase.auth.api.getUserByCookie(req);

  // If user not authenticaded, redirect to login page
  if (!user) {
    console.log("Please login.");
    return { props: {}, redirect: { destination: "/login", permanent: false } };
  }

  console.log(user);

  // Get all shows
  const { data: allshows, error } = await supabase.from("Shows").select();

  if (error) {
    throw new Error(error);
  }

  // Get trending shows
  const { data: trendings } = await supabase
    .from("Shows")
    .select()
    .eq("isTrending", true);

  // Get bookmarked shows
  const { data: bookmarked } = await supabase
    .from("userfavoriteshows")
    .select("shows_id, Shows(*)")
    .eq("user_id", user.id);

  return {
    props: {
      user,
      allshows,
      trendings,
      bookmarked,
    },
  };
}

Home.getLayout = getLayout;
