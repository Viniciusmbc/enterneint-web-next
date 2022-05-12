import Navbar from "./Navbar";
import { useState } from "react";

const tabs = [
  { id: "btn1", data: "data1" },
  { id: "btn2", data: "data2" },
  { id: "btn3", data: "data3" },
  { id: "btn4", data: "data4" },
  { id: "btn5", data: "data5" },
];

export default function NestedLayout({ children }) {
  const [activeTab, setActiveTab] = useState(-1);
  return (
    <main className=" md:flex bg-darkBlue">
      <Navbar
        activeTab={activeTab}
        buttons={tabs}
        setActiveTab={setActiveTab}
      />

      {activeTab === -1 ? (
        <div>Social Media</div>
      ) : (
        <div>{tabs[activeTab].data}</div>
      )}

      {children}
    </main>
  );
}
