import React from "react";
import Header from "../componentes/PantallaUsuarios/Header";
import ListadoProductos from "../componentes/ListadoProductos";

function Productos() {
 
  return (
        <div className="w-full">
       <Header entidad={"Productos"} msjSearchInput={"Buscar por código..."} btnLink={"/productos/agregar"}/>

       <ListadoProductos/>
          </div>
          
      
  );
}

export default Productos;
