// Components
import Navbar from "./Navbar";

export default function NestedLayout({ children }) {

  return (
     <main className=" md:flex max-w-screen-xl mx-auto">
      <Navbar />
      {children}
    </main>
  );
}

export const getLayout = (page) => <NestedLayout>{page}</NestedLayout>;
