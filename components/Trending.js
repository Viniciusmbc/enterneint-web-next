export default function Trending() {
  return (
    <div className="flex  w-full overflow-x-auto">
      <div className="relative ml-4 mr-2 w-9/12 max-w-md flex-shrink-0 ">
        <div className=" flex items-center right-0 absolute bg-darkBlue/50  w-8 h-8 rounded-full">
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
        </div>

        <div className=" bottom-10 left-4 absolute flex items-center">
          <p className="text-white/75 text-xs">2019</p>
          <div className=" bg-white rounded-full w-1 h-1 mx-2"></div>
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
              fill="#FFFFFF"
            />
          </svg>
          <p className=" text-white/75 ml-2 text-xs">Movies</p>
          <div className=" bg-white rounded-full w-1 h-1 mx-2"></div>
          <p className=" text-white/75 text-xs">PG</p>
        </div>
        <div>
          {" "}
          <p className="absolute left-4 bottom-4 text-white text-sm">
            Beyond Earth
          </p>
        </div>
        <img
          className="rounded"
          src="https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/beyond-earth/trending/large.jpg?raw=true"
          alt="beyond-earth"
        />
      </div>
      <div className=" relative  mx-2   w-9/12 max-w-md flex-shrink-0 ">
        <button className="flex items-center right-0  absolute bg-darkBlue/50 w-8 h-8 rounded-full">
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

        <div className=" bottom-10 left-4 absolute flex items-center">
          <p className="text-white  text-xs">2019</p>
          <div className=" bg-white rounded-full w-1 h-1 mx-2"></div>
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z"
              fill="#FFFFFF"
            />
          </svg>
          <p className=" text-white ml-2">Movies</p>
          <div className=" bg-white rounded-full w-1 h-1 mx-2"></div>
          <p className=" text-white">PG</p>
        </div>
        <div>
          {" "}
          <p className="absolute left-4 bottom-4 text-white text-sm">
            Beyond Earth
          </p>
        </div>
        <img
          className="rounded"
          src="https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/beyond-earth/trending/large.jpg?raw=true"
          alt="beyond-earth"
        />
      </div>
    </div>
  );
}
