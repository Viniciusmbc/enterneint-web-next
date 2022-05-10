import Head from "next/head";
import Image from "next/image";
import NestedLayout from "../components/NestedLayout";


export default function Home() {

  return (
    <div>
      <Head>
      
      </Head>
      <section>
        <div>
          <input type="text" placeholder="Search" />
        </div>
        <h1>
          Trending
        </h1>
        <div className=" flex  overflow-x-auto">
        <img src="https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/beyond-earth/trending/large.jpg?raw=true" width={240} height={140} alt="beyond-earth"/>
        <img src="https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/bottom-gear/trending/large.jpg?raw=true" width={240} height={140} alt="bottom-gear"/>
        <img src="https://github.com/Viniciusmbc/enterneint-web-next/blob/main/public/thumbnails/1998/trending/large.jpg?raw=true" width={240} height={140} alt="1998"/>
        </div>
        
      </section>
            </div>
  )
}

Home.getLayout = function getLayout (page) {
  return (
        <NestedLayout>{page}</NestedLayout>
        )
}