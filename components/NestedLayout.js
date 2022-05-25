import Navbar from "./Navbar";
import { useState } from "react";

export default function NestedLayout({ children }) {
  return (
    <main className=" md:flex bg-darkBlue min-h-screen">
      <Navbar />
      {children}
    </main>
  );
}

export const getLayout = (page) => <NestedLayout>{page}</NestedLayout>;
