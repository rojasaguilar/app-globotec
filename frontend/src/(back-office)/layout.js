import React from "react";

import Header from "./componentes/Header";
import Sidebar from "./componentes/Sidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-60 w-full bg-slate-100 min-h-screen">
        {<Header />}
        {children}
      </main>
    </div>
  );
}

export default Layout;
