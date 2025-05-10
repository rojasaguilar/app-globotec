import React, { useState } from "react";
import ListadoProductos from "../componentes/ListadoProductos";
import HeaderListadoProductos from "../componentes/PantallaProductos/HeaderListadoProductos";

function Productos() {
  const [filtro, setFiltro] = useState("");
  const [status, setStatus] = useState(2);
  const [categoria, setCategoria] = useState("Categoria");

  const handleFiltro = (string) => {
    setFiltro(string);
  };

  const handleCategoria = (e) => {
    setCategoria(e.target.value);
  };

  const handleStatus = (value) => {
    if ([0, 1, 2].includes(value)) {
      setStatus(value);
    }
  };

  return (
    <div className="w-full">
      <HeaderListadoProductos
        handleFiltro={handleFiltro}
        status={status}
        handleCategoria={handleCategoria}
        handleStatus={handleStatus}
      />

      <div className="mt-1">
        <ListadoProductos filtro={filtro} categoria={categoria} status={status} />
      </div>
    </div>
  );
}

export default Productos;
