import React, { useEffect, useState } from "react";
import Header from "../componentes/Header";
import Sidebar from "../componentes/Sidebar";
import BajoStock from "../componentes/WidgetsHome/BajoStock";
import ContenedorWidgetsSuperior from "../componentes/PantallaHome/ContenedorWidgetsSuperior";
import MasVendidos from "../componentes/WidgetsHome/MasVendidos";
import ModalAbrirCaja from "../componentes/ModalAbrirCaja";
import ModalAvisoAbrirCaja from "../componentes/ModalAvisoAbrirCaja";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("empleado"));
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [mostrarAbrirCaja, setMostrarAbrirCaja] = useState(false);

  const [cajaAbierta, setCajaAbierta] = useState(() => {
    const caja = JSON.parse(localStorage.getItem("Caja"));
    return caja?.state || false;
  });

  useEffect(() => {
    if (!cajaAbierta) {
      setMostrarAviso(true);
    }
  }, []);

  const handleAbrirCaja = (cantidad) => {
    const nuevaCaja = {
      cantidadInicial: parseFloat(cantidad),
      state: true,
    };
    localStorage.setItem("Caja", JSON.stringify(nuevaCaja));
    setCajaAbierta(true);
    setMostrarAbrirCaja(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-60 w-full bg-white min-h-screen flex flex-col space-y-24">
        <div>
          <Header />
          {user.usu_rol === "g" && <ContenedorWidgetsSuperior />}
        </div>
        {user.usu_rol === "g" && (
          <div className="grid grid-cols-2 gap-24 px-8 items-center pb-8">
            <BajoStock />
            <MasVendidos />
          </div>
        )}
      </main>
    </div>
  );
}