import React from "react";
import TablaProveedor from "./componentes/TablaProveedor";
import { Plus } from "lucide-react";

function Proveedores() {
  return (
    <div className="w-full pt-6">
      <div className="flex justify-between">
        <div className="flex-row space-y-0.5 pl-6">
          <span className="text-xl font-semibold">Proveedores</span>
          <p className="text-xs text-slate-500">Listado de proveedores</p>
          <div className="flex space-x-5 pt-4">
            <a
              href="/proveedores"
              className=" text-blue-600 font-medium border-b-2 border-b-blue-600 pb-2"
            >
              Proveedores activos
            </a>
            <a href="/proveedores" className="text-slate-500">
              Proveedores inactivos
            </a>
          </div>
        </div>
        <a href="/proveedores/agregar " className="pr-6">
          <div className="bg-blue-600 px-4 py-2 rounded-md flex justify-center items-center space-x-3 ">
            <Plus className="w-6 h-6 text-white" />
            <p className="text-white font-semibold">Agregar proveedor</p>
          </div>
        </a>
      </div>

      <TablaProveedor />
    </div>
  );
}

export default Proveedores;
