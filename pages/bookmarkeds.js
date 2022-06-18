// Nextjs
import Head from "next/head";

// React hooks
import { useState } from "react";

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

export default function Bookmarked({ data, user }) {
  // Get bookmarked shows
  const shows = data.map(({ Shows }) => {
    return Shows;
  });

  // Auth Context
  const { session, signOut } = useAuth();

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
    <>
      <Head></Head>
      <main className=" w-full">
        <SearchBar
          shows={"bookmarked shows"}
          data={data}
          onFocusHandler={(status) => checkSearchStatus(status)}
          title={"Bookmarked Shows"}
        />

        <section className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
          {shows &&
            shows.map(
              ({ title, year, category, rating, isBookmarked }, index) => (
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
                  session={session}
                />
              )
            )}
        </section>

        <Title title={"Bookmarked TV Series"} />

        <section className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
          {shows &&
            shows.map(
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
                  session={session}
                />
              )
            )}
        </section>
      </main>
    </>
  );
}

Bookmarked.getLayout = getLayout;

export async function getServerSideProps({ req, res }) {
  // Get user by cookie
  const { user } = await supabase.auth.api.getUserByCookie(req);

  // If user not authenticaded, redirect
  if (!user) {
    console.log("Please login.");
    return { props: {}, redirect: { destination: "/login", permanent: false } };
  }

  // Get bookmarked movies
  const { data } = await supabase
    .from("userfavoriteshows")
    .select("shows_id, Shows (*)");

  return {
    props: {
      data,
      user,
    },
  };
}
