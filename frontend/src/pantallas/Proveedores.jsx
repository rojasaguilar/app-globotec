import React from "react";
import TablaProveedor from "../componentes/PantallaProveedor/TablaProveedor";
import { Plus } from "lucide-react";
import Header from "../componentes/PantallaUsuarios/Header";

function Proveedores() {
  return (
    <div className="w-full">
     <Header entidad={"Proveedores"} msjSearchInput={"Buscar por nombre..."} btnLink={"/proveedores/agregar"}/>

      <TablaProveedor />
    </div>
  );
}

export default Proveedores;
