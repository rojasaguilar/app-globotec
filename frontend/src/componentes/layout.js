import React from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout() {
  return (
    <div className="flex">
     <Sidebar/>
      <main className="ml-60 w-full bg-white h-screen">
       <Header/>
       
        <Outlet/>
      </main>
    </div>
  );
}

export default Layout;
