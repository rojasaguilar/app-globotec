import React, { useState } from "react";
import TablaProveedor from "../componentes/PantallaProveedor/TablaProveedor";
import Header from "../componentes/PantallaUsuarios/Header";
import { Plus } from "lucide-react";

function Proveedores() {
  const [status, setStatus] = useState(1);
  const [filtro, setFiltro] = useState('');

  const handleFiltro = (string) => {
    setFiltro(string)
  }

  const handleStatus = () => {
    setStatus(status === 1 ? 0 : 1);
  };

  return (
    <div className="w-full">
      <Header
        entidad={"Proveedor"}
        msjSearchInput={"Buscar por nombre..."}
        btnLink={"/proveedores/agregar"}
        status={status}
        handleStatus={handleStatus}
        icono={<Plus className="w-4 h-4"/>}
        handleFiltro={handleFiltro}
      />

      <TablaProveedor status={status} filtro={filtro} />
    </div>
  );
}

export default Proveedores;