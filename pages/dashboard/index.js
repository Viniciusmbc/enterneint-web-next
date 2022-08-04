// Nextjs
import Head from "next/head";
import Image from "next/image";

// React Hooks
import { useState } from "react";

// Components
import Cards from "/components/Cards";
import Trending from "/components/Trending";
import SearchBar from "/components/SearchBar";

// Layouts
import { getLayout } from "/components/NestedLayout";

// Supabase
import { supabase } from "/utils/supabaseClient";

// BlurURL Placeholder
import { getPlaiceholder } from "plaiceholder";
import { LoadingSpinner } from "../../components/Icons";

// Image src
import { changeImageSrc } from "../../utils/changeImageSrc";

const getImagesFromPlaiceholders = (...classNames) =>
  Promise.all(
    classNames.map(async (className) => {
      const { img } = await getPlaiceholder(extractImgSrc(className));

      return { className, ...img };
    })
  );

export default function Home({ trendings, allshows, userId, images }) {
  // Search state
  const [searchActive, setSearchActive] = useState(false);

  // If search state is active, show the data
  const checkSearchStatus = (status) => {
    status ? setSearchActive(true) : setSearchActive(false);
  };

  if (!userId) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
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
        userId={userId}
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
                  userId={userId}
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
                  userId={userId}
                />
              ))}
          </article>
        </section>
      )}
      {images.map(({ className, ...image }) => (
        <Image {...image} />
      ))}
    </section>
  );
}

export async function getServerSideProps({ req, res }) {
  // Get user by cookie
  const { user } = await supabase.auth.api.getUserByCookie(req);

  console.log(user);
  // Get all shows
  const { data: allshows, error } = await supabase.from("Shows").select();

  const images = await getImagesFromPlaiceholders(
    "plaiceholder-[https://kmzgkstraazrxkyxaejh.supabase.co/storage/v1/object/public/thumbnails/asia-in-24-days/regular/medium.jpg]",
    "plaiceholder-[https://kmzgkstraazrxkyxaejh.supabase.co/storage/v1/object/public/thumbnails/asia-in-24-days/regular/medium.jpg]"
  );

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
      userId: user?.id,
      allshows,
      trendings,
      images,
    },
  };
}

Home.getLayout = getLayout;
