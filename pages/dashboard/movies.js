// NextJS
import Head from "next/head";

// React Hooks
import { useEffect, useState } from "react";

// Icons
import { LoadingSpinner } from "../../components/Icons";

// Components
import Cards from "../../components/Cards";
import SearchBar from "../../components/SearchBar";
import { getLayout } from "../../components/NestedLayout";

// Supabase
import { supabase } from "../../utils/supabaseClient";
import { useAuth } from "../../context/AuthContext";

export default function Movies({ data }) {
  // Auth context
  const { session, isLoading } = useAuth();

  // Search state
  const [searchActive, setSearchActive] = useState(false);

  // If search state is active, show the data
  const checkSearchStatus = (status) => {
    status ? setSearchActive(true) : setSearchActive(false);
  };

  return isLoading ? (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center absolute ">
        <LoadingSpinner color={"#FFF"} />
      </h1>
    </main>
  ) : (
    <>
      <Head>
        <title>Movies</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <section className=" w-full">
        <SearchBar
          shows={"Movies"}
          data={data}
          onFocusHandler={(status) => checkSearchStatus(status)}
          title={"Movies"}
        />

        {!searchActive && (
          <section className=" grid grid-cols-2 mx-4 gap-4 mb-14 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
            {data &&
              data.map(({ title, year, category, rating, id }) => (
                <Cards
                  key={id}
                  id={id}
                  title={title}
                  year={year}
                  category={category}
                  rating={rating}
                  userId={session?.user.id}
                />
              ))}
          </section>
        )}
      </section>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  // Get Movies shows
  const { data } = await supabase
    .from("Shows")
    .select()
    .eq("category", "Movie");

  return {
    props: {
      data,
    },
  };
}

Movies.getLayout = getLayout;
