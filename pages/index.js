// Nextjs
import Head from "next/head";
import { useRouter } from "next/router";

// React
import { useEffect, useState, useCallback } from "react";

// Auth Context
import { useAuth } from "../context/AuthContext";

// Components
import Cards from "../components/Cards";
import Trending from "../components/Trending";
import SearchBar from "../components/SearchBar";

// Layouts
import { getLayout } from "../components/NestedLayout";


export default function Home({ allshows, trendings }) {
  // Router
  const router = useRouter();

  // Auth
  const { user, signOut } = useAuth();

  // Search state
  const [searchActive, setSearchActive] = useState(false);

  // If search is active, show the data
  const checkSearchStatus = (status) => {
    if (status) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  // Redirect to the login page if the user is not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);


  return (
      <>
      {user && (
        <>
        <Head></Head>
        <section>
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
                  trendings.map(
                    ({ title, year, category, thumbnail, rating }, index) => (
                      <Trending
                        key={index}
                        title={title}
                        year={year}
                        category={category}
                        rating={rating}
                        image={thumbnail.trending.large}
                      />
                    )
                  )}
              </div>
  
              <h2 className="text-white text-xl my-6 ml-4">
                Recommended for you
              </h2>
            </>
          )}
  
          {!searchActive && (
            <section className=" grid grid-cols-2 mx-4 gap-4 mb-14 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
              {allshows.map(
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
                    image={thumbnail.regular.medium}
                    classificao={rating}
                  />
                )
              )}
            </section>
          )}
        </section>
      </>
      )}
      </>

   );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/hello");
  const data = await res.json();

  const trendings = data.filter((show) => show.isTrending === true);

  return {
    props: {
      allshows: data,
      trendings,
    },
  };
}

Home.getLayout = getLayout;
