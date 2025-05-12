import React from "react";
import Header from "../componentes/Header";
import Sidebar from "../componentes/Sidebar";
import BajoStock from "../componentes/WidgetsHome/BajoStock";
import ContenedorWidgetsSuperior from "../componentes/PantallaHome/ContenedorWidgetsSuperior";
import MasVendidos from "../componentes/WidgetsHome/MasVendidos";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-60 w-full bg-white min-h-screen flex flex-col space-y-24">
        <div>
        <Header />
        <ContenedorWidgetsSuperior/>
        </div>
       <div className="grid grid-cols-2 gap-24 px-8 items-center pb-8">
       <BajoStock />
       <MasVendidos/>
       </div>
      </main>
    </div>
  );
}
