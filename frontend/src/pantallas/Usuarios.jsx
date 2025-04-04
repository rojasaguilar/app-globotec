import React from "react";
import Tablausuarios from "../componentes/PantallaUsuarios/Tablausuarios";
import Header from "../componentes/PantallaUsuarios/Header";

function Usuarios() {
  return (
    <div className="w-full">
      <Header entidad={"Usuarios"} msjSearchInput={"Buscar por nombre..."}/>
      <Tablausuarios />
    </div>
  );
}

export default Usuarios;
