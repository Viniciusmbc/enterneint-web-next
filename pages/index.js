// Nextjs
import Head from "next/head";
import { useRouter } from "next/router";

// React Hooks
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

export default function Home({ trendings, allshows, user, bookmarked }) {
  // Auth
  const { session, signOut } = useAuth();

  // Store the Bookmarkeds shows in a state
  const [bookmarkedShows, setBookmarkedShows] = useState([]);

  // Store the message if the bookmarked shows is add 
  const [message, setMessage] = useState("")

  // Search state
  const [searchActive, setSearchActive] = useState(false);

  console.log(bookmarked)

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

  const pull_data = (data) => {
    console.log(data)
    setMessage(data)
  }

    
  return (
    <>
      <Head></Head>


      <div className="flex items-center right-1/2 top-3 absolute p-4 mb-4 text-sm text-red  bg-white rounded-lg border-b-8" role="alert">
        <svg className="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
      <div>
         <span className="font-medium">{message}</span> 
      </div>
    </div>
    
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
                  />
                ))}
            </div>

            <h2 className="text-white text-xl my-6 ml-4">
              Recommended for you
            </h2>
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
                  addMessage={pull_data}
                />
              ))}
          </section>
        )}
      </section>
    </>
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
