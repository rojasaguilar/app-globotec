import React, { useState } from "react";
import Header from "../componentes/PantallaUsuarios/Header";
import ListadoProductos from "../componentes/ListadoProductos";

function Productos() {
  const [filtro, setFiltro] = useState("");

  const handleFiltro = (string) => {
    setFiltro(string);
  };

  return (
    <div className="w-full">
      <Header
        handleFiltro={handleFiltro}
        entidad={"Productos"}
        msjSearchInput={"Buscar por código..."}
        btnLink={"/productos/agregar"}
      />

      <ListadoProductos filtro={filtro} />
    </div>
  );
}

export default Productos;
