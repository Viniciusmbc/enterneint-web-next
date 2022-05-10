import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img src="gs://entertainment-web-app-9795d.appspot.com/thumbnails/112/regular/large.jpg" alt="logo" />
      </div>
  )
  

}
