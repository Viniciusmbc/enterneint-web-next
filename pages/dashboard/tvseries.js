// next
import Head from "next/head";

// Auth Context
import { useAuth } from "/context/AuthContext";

// React Hooks
import { useEffect, useState } from "react";

// Components
import Cards from "../../components/Cards";
import SearchBar from "../../components/SearchBar";

// Layouts
import { getLayout } from "../../components/NestedLayout";

// supabase
import { supabase } from "../../utils/supabaseClient";

export default function TVSeries({ tvseries }) {
  const { session, isLoading } = useAuth();

  // Search State
  const [searchActive, setSearchActive] = useState(false);

  // If search state is active, show the data
  const checkSearchStatus = (status) => {
    status ? setSearchActive(true) : setSearchActive(false);
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <section className=" w-full">
      <Head>
        <title>TV Series</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SearchBar
        shows={"Series"}
        data={tvseries}
        onFocusHandler={(status) => checkSearchStatus(status)}
        title={"Series"}
      />

      {!searchActive && (
        <article className=" grid grid-cols-2 mx-4 gap-4 mb-14 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
          {tvseries &&
            tvseries.map(({ title, year, category, id, rating }) => (
              <Cards
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
      )}
    </section>
  );
}

export async function getServerSideProps({ req, res }) {
  // Get trending shows
  const { data: tvseries } = await supabase
    .from("Shows")
    .select()
    .filter("category", "eq", "TV Series");

  return {
    props: {
      tvseries,
    },
  };
}

TVSeries.getLayout = getLayout;
