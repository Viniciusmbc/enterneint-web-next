// Nextjs
import Image from "next/image";

// supabase
import { supabase } from "../utils/supabaseClient";

export default function Cards({
  id,
  title,
  year,
  category,
  image,
  bookmark,
  classificao,
  session,
}) {
  // Add bookmarked to user
  const insertBookmarked = async (id) => {
    const { data, error } = await supabase
      .from("userfavoriteshows")
      .select()
      .eq("user_id", session.user.id);

    const bookmarked = data.map((item) => item.shows_id);
    console.log(bookmarked);

    if (bookmarked.includes(id)) {
      console.log(`${id} is allready bookmarked`);
      const updateData = await supabase
        .from("userfavoriteshows")
        .delete()
        .eq("user_id", session.user.id)
        .eq("shows_id", id);
      return updateData;
    } else {
      await supabase.from("userfavoriteshows").insert({
        user_id: session.user.id,
        shows_id: id,
        isBookmarked: true,
      });
    }
  };

  return (
    <div className=" flex-shrink-0">
      <div className="relative h-28 md:h-36 lg:h-[174px]">
        <button
          onClick={() => insertBookmarked(id)}
          className=" flex items-center right-2 top-2 absolute bg-darkBlue/50  w-8 h-8 rounded-full z-10 md:right-4 md:top-4"
        >
          {bookmark ? (
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
                fill="#FFF"
              />
            </svg>
          ) : (
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
          )}
        </button>
        <Image
          className="rounded "
          objectFit="cover"
          src={image}
          alt={`${title} poster`}
          layout="fill"
        />
      </div>

      <div className="flex items-center mt-2 ">
        <p className="text-white/75 text-xs">{year}</p>
        <div className=" bg-white rounded-full w-1 h-1 mx-2"></div>
        <div>
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        <p className=" text-white/75 ml-2 text-xs">{category}</p>
        <div className=" bg-white rounded-full w-1 h-1 mx-2"></div>
        <p className=" text-white/75 text-xs">{classificao}</p>
      </div>
      <p className="text-white text-sm font-medium  mt-1">{title}</p>
    </div>
  );
}
