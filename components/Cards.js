// Nextjs
import Image from "next/image";

// React Hooks
import { useEffect, useState } from "react";

// Auth Context
import { useAuth } from "/context/AuthContext";

// supabase
import { supabase } from "../utils/supabaseClient";

// Icons
import { LoadingSpinner } from "./Icons";

export default function Cards({ id, title, year, category, rating }) {
  const { session } = useAuth();

  const [bookmarkedShowsId, setBookmarkedShowsId] = useState(new Set());
  const [bookmark, setBookmark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mouse enter event
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from("userfavoriteshows")
        .select("*")
        .eq("user_id", session?.user.id);
      if (error) {
        console.log(`Error: ${error}`);
      }
      setIsLoading(false);
      const id = data.map((item) => item.shows_id && item.shows_id);
      setBookmarkedShowsId(new Set(id));
    };

    session.user.id ? getData() && setIsLoading(false) : setIsLoading(true);
  }, [session.user.id]);

  // console.log(`user: ${session?.user.id ?? "no user"}`);

  // If user click on the bookmark button, add the show to the user's bookmarked shows
  const addToBookmarkeds = async (id) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("userfavoriteshows")
      .insert({
        user_id: session?.user.id,
        shows_id: id,
      })
      .single();
    if (error) {
      console.log(`Error: ${error}`);
    }
    setBookmarkedShowsId((prev) => new Set(prev).add(data.shows_id));
    setBookmark(true);
    setIsLoading(false);
  };

  // If user click on the bookmark button, remove the show from the user's bookmarked shows
  const removeBookmarkeds = async (id) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("userfavoriteshows")
      .delete()
      .eq("user_id", session?.user.id)
      .eq("shows_id", id);
    if (error) {
      console.log(`Error: ${error}`);
    }
    setBookmarkedShowsId((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

    setBookmark(false);
    setIsLoading(false);
  };

  // If user click on the bookmark button, add the show to the user's bookmarked shows or delete it from the user's bookmarked shows
  const handleBookmarked = async (id) => {
    console.log(id);
    bookmarkedShowsId.has(id) ? removeBookmarkeds(id) : addToBookmarkeds(id);
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
    <div className=" flex-shrink-0">
      <div
        className="relative h-28 md:h-36 lg:h-[174px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <button
          onClick={() => handleBookmarked(id)}
          role="button"
          className="group flex items-center right-2 top-2 absolute bg-darkBlue/50 hover:bg-white/40  w-8 h-8 rounded-full z-10 md:right-4 md:top-4">
          {isLoading ? (
            <LoadingSpinner color={"#FFF"} />
          ) : bookmarkedShowsId.has(id) === true || bookmark ? (
            <svg
              className="mx-auto group-hover:stroke-darkBlue"
              width="12"
              height="14"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                strokeWidth="1.5"
                fill="#FFF"
              />
            </svg>
          ) : (
            <svg
              className=" mx-auto stroke-white group-hover:stroke-darkBlue"
              width="12"
              height="14"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          )}
        </button>
        <Image
          src={`https://kmzgkstraazrxkyxaejh.supabase.co/storage/v1/object/public/thumbnails/${changeImageSrc(
            title
          )}/regular/small.jpg`}
          alt={`${title} poster`}
          layout="fill"
          priority
        />
      </div>

      <div className="flex items-center mt-2 ">
        <p className="text-white/75 text-xs">{year}</p>
        <div className=" bg-white rounded-full w-1 h-1 mx-2"></div>
        <div>
          {category === "Movie" ? (
            <svg
              className=" fill-grey"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              className=" fill-grey">
              <path d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z" />
            </svg>
          )}
        </div>

        <p className=" text-white/75 ml-2 text-xs">{category}</p>
        <div className=" bg-white rounded-full w-1 h-1 mx-2"></div>
        <p className=" text-white/75 text-xs">{rating}</p>
      </div>
      <p className="text-white text-sm font-medium  mt-1">{title}</p>
    </div>
  );
}
