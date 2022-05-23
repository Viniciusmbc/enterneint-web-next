import Navbar from "./Navbar";
import { useState } from "react";

export default function NestedLayout({ children, activePage }) {
  return (
    <main className=" md:flex bg-darkBlue">
      <Navbar activePage={"home"} />
      {children}
    </main>
  );
}

export const getLayout = (page) => <NestedLayout>{page}</NestedLayout>;
