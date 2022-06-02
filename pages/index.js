// Nextjs
import Head from "next/head";
import { useRouter } from "next/router";

// React
import { useEffect, useState } from "react";

// Auth Context
import { useAuth } from "../context/AuthContext";

// Components
import Cards from "../components/Cards";
import Trending from "../components/Trending";
import SearchBar from "../components/SearchBar";

// Layouts
import { getLayout } from "../components/NestedLayout";

// Supabase
import { supabase } from "../utils/supabaseClient";

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

  // Function to change titles in images cards src
  const changeImageSrc = (title) => {
    if(title === "Earth’s Untouched"){
      const earthsuntouched = "earths-untouched";
      return earthsuntouched;
    }
    const src = title.replace(/([^\w]+|\s+)/g, "-").replace("II", "2").toLowerCase()
    return src;
  }


  return (
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
                      image={`https://kmzgkstraazrxkyxaejh.supabase.co/storage/v1/object/public/thumbnails/${changeImageSrc(title)}/trending/large.jpg`}
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
                { title, year, category, rating, isBookmarked },
                index
              ) => (
                <Cards
                  key={index}
                  bookmark={isBookmarked}
                  title={title}
                  year={year}
                  category={category}
                  image={`https://kmzgkstraazrxkyxaejh.supabase.co/storage/v1/object/public/thumbnails/${changeImageSrc(title) }/regular/medium.jpg`}
                  classificao={rating}
                />
              )
            )}
          </section>
        )}
      </section>
    </>
  );
}

export async function getStaticProps() {

  // Get all shows
 const {data: allshows, error} = await supabase.from("Shows").select();
  if(error){
    throw new Error(error);}

 // Get trending shows
 const {data: trendings} = await supabase.from("Shows").select().filter("isTrending", "eq", true);

  return {
    props: {
      allshows,
      trendings
    },
  };
}

Home.getLayout = getLayout;
