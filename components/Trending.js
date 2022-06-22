import { LoadingSpinner, MoviesIcon, TVIcon } from "./Icons";
import Image from "next/image";

export default function Trending({ year, category, rating, title, image }) {

  return (
    <>
      <div className="relative ml-4 mr-2 w-9/12  max-w-md  flex-shrink-0 ">
        <button className=" flex items-center right-2 absolute bg-darkBlue/50 top-2  w-8 h-8 rounded-full z-10">
          <svg
            className=" mx-auto"
            width="12"
            height="14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
              stroke="#FFF"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
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
          src={image}
          alt={`${title} poster`}
          width={470}
          height={230}
        />
      </div>
    </>
  );
}
