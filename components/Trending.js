import { LoadingSpinner, MoviesIcon, TVIcon } from "./Icons";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { changeImageSrc } from "../utils/changeImageSrc";

export default function Trending({
  year,
  category,
  rating,
  title,
  userId,
  id,
}) {
  const [bookmarkedShowsId, setBookmarkedShowsId] = useState(new Set());
  const [bookmark, setBookmark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const { data, error } = await supabase
        .from("userfavoriteshows")
        .select("*")
        .eq("user_id", userId);
      error ? console.log(`Error: ${error}`) : setIsLoading(false);
      const id = data.map((item) => item.shows_id && item.shows_id);
      setBookmarkedShowsId(new Set(id));
    };

    getData();
    setIsLoading(false);

    return () => {
      setIsLoading(true);
    };
  }, [userId]);

  // If user click on the bookmark button, add the show to the user's bookmarked shows
  const addToBookmarkeds = async (id) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("userfavoriteshows")
      .insert({
        user_id: userId,
        shows_id: id,
      })
      .single();
    if (error) {
      console.log(`Error: ${error}`);
    }

    setBookmarkedShowsId((prev) => new Set(prev).add(data.shows_id));
    setIsLoading(false);
    setBookmark(true);
  };

  // If user click on the bookmark button, remove the show from the user's bookmarked shows
  const removeBookmarkeds = async (id) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("userfavoriteshows")
      .delete()
      .eq("user_id", userId)
      .eq("shows_id", id);
    if (error) {
      console.log(`Error: ${error}`);
    }
    setBookmarkedShowsId((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setIsLoading(false);
    setBookmark(false);
  };

  // If user click on the bookmark button, add the show to the user's bookmarked shows or delete it from the user's bookmarked shows
  const handleBookmarked = async (id) => {
    console.log(id);
    bookmarkedShowsId.has(id) ? removeBookmarkeds(id) : addToBookmarkeds(id);
  };

  return (
    <div className="relative ml-4 mr-2 w-9/12  max-w-md  flex-shrink-0 ">
      <button
        onClick={() => handleBookmarked(id)}
        role="button"
        className="  flex items-center right-2 top-2 absolute bg-darkBlue/50  w-8 h-8 rounded-full z-10 md:right-4 md:top-4">
        {isLoading ? (
          <LoadingSpinner color={"#FFF"} />
        ) : bookmarkedShowsId?.has(id) === true || bookmark ? (
          <svg
            className=" mx-auto"
            width="12"
            height="14"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
              stroke="#FFF"
              strokeWidth="1.5"
              fill="#FFF"
            />
          </svg>
        ) : (
          <svg
            className=" mx-auto"
            width="12"
            height="14"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
              stroke="#FFF"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        )}
      </button>

      <div className=" bottom-10 left-4 absolute flex items-center z-10">
        <p className="text-white/75 text-xs">{year}</p>
        <div className=" bg-white rounded-full w-1 h-1 mx-2"></div>
        {category === "Movie" ? (
          <MoviesIcon color={"#FFF"} />
        ) : (
          <TVIcon color={"#FFF"} />
        )}

        <p className=" text-white/75 ml-2 text-xs">{category}</p>
        <div className=" bg-white rounded-full w-1 h-1 mx-2"></div>
        <p className=" text-white/75 text-xs">{rating}</p>
      </div>
      <div>
        {" "}
        <p className="absolute left-4 bottom-4 text-white text-sm z-10">
          {title}
        </p>
      </div>

      <Image
        className="rounded"
        src={`https://kmzgkstraazrxkyxaejh.supabase.co/storage/v1/object/public/thumbnails/${changeImageSrc(
          title
        )}/trending/large.jpg`}
        alt={`${title} poster`}
        width={470}
        height={230}
      />
    </div>
  );
}
