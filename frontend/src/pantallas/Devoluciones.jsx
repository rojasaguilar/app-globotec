import React from "react";
import Header from "../componentes/PantallaDevoluciones/Header";
import TablaDevoluciones from "../componentes/PantallaDevoluciones/TablaDevoluciones";

function Devoluciones() {
  return (
    <div>
      <Header />
      <div className="px-8 py-2">
      <TablaDevoluciones/>
      </div>
    </div>
  );
}

export default Devoluciones;
