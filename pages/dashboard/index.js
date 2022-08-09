// Nextjs
import Head from "next/head";
import Image from "next/image";

// React Hooks
import { useState } from "react";

// Auth Context
import { useAuth } from "/context/AuthContext";

// Components
import Cards from "/components/Cards";
import Trending from "/components/Trending";
import SearchBar from "/components/SearchBar";

// Change IMG src
import { changeImageSrc } from "../../utils/changeImageSrc";

// Layouts
import { getLayout } from "/components/NestedLayout";

// Supabase
import { supabase } from "/utils/supabaseClient";

export default function Home({ trendings, allshows }) {
  const { session } = useAuth();

  console.log(session);

  // Search state
  const [searchActive, setSearchActive] = useState(false);

  // If search state is active, show the data
  const checkSearchStatus = (status) => {
    status ? setSearchActive(true) : setSearchActive(false);
  };

  if (!session) {
    return <div>You are not logged in</div>;
  }

  return (
    <section>
      <Head>
        <title>Home</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <SearchBar
        shows={"movies or TV series"}
        data={allshows}
        onFocusHandler={(status) => checkSearchStatus(status)}
        userId={session.user.id}
      />

      {!searchActive && (
        <section>
          <h1 className=" pl-4 text-xl text-white mb-4">Trending</h1>
          <article className="flex  w-full overflow-x-auto">
            {!!trendings &&
              trendings.map(({ id, title, year, category, rating }) => (
                <Trending
                  key={id}
                  id={id}
                  title={title}
                  year={year}
                  category={category}
                  rating={rating}
                  userId={session.user.id}
                />
              ))}
          </article>

          <h2 className="text-white mt-10 mb-8 text-xl ml-4">
            Recommended for you
          </h2>

          <article className=" grid grid-cols-2 mx-4 gap-4 mb-14 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
            {!!allshows &&
              allshows.map(({ id, title, year, category, rating }) => (
                <Cards
                  key={id}
                  id={id}
                  title={title}
                  year={year}
                  category={category}
                  rating={rating}
                />
              ))}
          </article>
        </section>
      )}
    </section>
  );
}

export async function getServerSideProps({ req, res }) {
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

  return {
    props: {
      allshows,
      trendings,
    },
  };
}

Home.getLayout = getLayout;
