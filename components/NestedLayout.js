// Components
import Navbar from "./Navbar";

// Icons
import { LoadingSpinner } from "./Icons";

export default function NestedLayout({ isLoading, children }) {
  return isLoading ? (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center absolute ">
        <LoadingSpinner />
      </h1>
    </main>
  ) : (
    <main className=" md:flex max-w-screen-xl mx-auto">
      <Navbar />
      {children}
    </main>
  );
}

export const getLayout = (page) => <NestedLayout>{page}</NestedLayout>;
