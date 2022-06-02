// Nextjs
import Head from "next/head";

// Components
import { getLayout } from "../components/NestedLayout";
import SearchBar from "../components/SearchBar";
import Cards from "../components/Cards";

// Supabase
import { supabase } from "../utils/supabaseClient";

export default function Bookmarked({ data }) {
 
    // Function to change titles in images cards src
    const changeImageSrc = (title) => {
      if(title === "Earth’s Untouched"){
        const earthsuntouched = "earths-untouched";
        return earthsuntouched;
      }
      const src = title.replace(/([^\w]+|\s+)/g, "-").replace("II", "2").toLowerCase()
      return src;
    }
  
  console.log(data);

  return (
    <>
      <Head></Head>
      <main className=" w-full">
        <SearchBar shows={"bookmarked shows"} title={"Bookmarked Movies"} />

        <section className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
          {data &&
            data.map(
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
                  image={`https://kmzgkstraazrxkyxaejh.supabase.co/storage/v1/object/public/thumbnails/${changeImageSrc(title)}/regular/medium.jpg`}
                  classificao={rating}
                />
              )
            )}
        </section>
        <section className=" grid grid-cols-2 mx-4 gap-4 md:grid-cols-3  lg:grid-cols-4 lg:gap-x-10 lg:gap-y-8 ">
          {data &&
            data.map(
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
                  image={`https://kmzgkstraazrxkyxaejh.supabase.co/storage/v1/object/public/thumbnails/${changeImageSrc(title)}/regular/medium.jpg`}
                  classificao={rating}
                />
              )
            )}
        </section>
      </main>
    </>
  );
}

Bookmarked.getLayout = getLayout;

export async function getStaticProps() {

// Get Bookmarked shows
const {data} = await supabase.from("Shows").select().filter("isBookmarked", "eq", true);
  
  return {
    props: {
      data,
    },
  };
}
