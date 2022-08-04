// next
import Head from "next/head";

// SWR
import useSWR from "swr";

// react
import { useEffect, useState } from "react";

// components
import Cards from "../../components/Cards";
import SearchBar from "../../components/SearchBar";

// layouts
import { getLayout } from "../../components/NestedLayout";

// supabase
import { supabase } from "../../utils/supabaseClient";

export default function Series({ tvseries, userId }) {
  const [searchActive, setSearchActive] = useState(false);
  // Store the message if the bookmarked shows is add
  const [message, setMessage] = useState("");

  console.log(userId);

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
        <section className=" grid grid-cols-2 mx-4 gap-4 mb-14 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
          {tvseries.map(({ title, year, category, id, rating }) => (
            <Cards
              key={id}
              id={id}
              title={title}
              year={year}
              category={category}
              rating={rating}
              userId={userId}
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

  // Get trending shows
  const { data: tvseries } = await supabase
    .from("Shows")
    .select()
    .filter("category", "eq", "TV Series");

  return {
    props: {
      tvseries,
      userId: user.id,
    },
  };
}

Series.getLayout = getLayout;
