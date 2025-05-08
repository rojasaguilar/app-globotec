import React from "react";
import Header from "../componentes/Header";
import Sidebar from "../componentes/Sidebar";
import BajoStock from "../componentes/WidgetsHome/BajoStock";
import TotalVentasHoy from "../componentes/WidgetsHome/TotalVentasHoy";
import ContenedorWidgetsSuperior from "../componentes/PantallaHome/ContenedorWidgetsSuperior";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-60 w-full bg-slate-100 min-h-screen">
        <Header />
        <ContenedorWidgetsSuperior/>
        <BajoStock />
      </main>
    </div>
  );
}
