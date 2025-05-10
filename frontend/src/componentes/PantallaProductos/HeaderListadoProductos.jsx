import React from "react";
import SearchInput from "../SearchInput";
import { Link } from "react-router-dom";
import SelectCategorias from "../SelectCategorias";

export default function HeaderListadoProductos({ status, handleStatus, handleFiltro, handleCategoria }) {
  return (
    <div className="flex flex-col gap-4 w-full pt-4 px-8 rounded-lg">
      {/* Primera columna */}
      <div className="w-full flex justify-between">
        <div className="flex-col space-y-1">
          <p className="text-2xl font-semibold">Productos</p>
          <p className="className text-sm text-gray-500">Productos / Listado de Productos</p>
        </div>
        {/* <BTN_AgregarUsuario queAgregar={entidad} link={btnLink} icono={icono} />
         */}
        <Link
          to={"/productos/agregar"}
          className="bg-blue-600 text-white px-8 rounded-xl flex items-center h-fit py-1.5 font-semibold"
        >
          Agregar producto
        </Link>
      </div>

      {/* Activos/inactivos */}
      <div className="w-full flex justify-between">
        <div className="flex space-x-6 text-gray-600">
          <p
            className={status === 2? "text-blue-600 font-medium border-b-2 border-b-blue-600" : ""}
            onClick={()=>handleStatus(2)}
          >
            Todos los productos
          </p>
          <p
            className={status === 1 ? "text-blue-600 font-medium border-b-2 border-b-blue-600" : ""}
            onClick={()=>handleStatus(1)}
          >
            Productos Activos
          </p>
          <p
            className={status === 0 ? "text-blue-600 font-medium border-b-2 border-b-blue-600" : ""}
            onClick={()=>handleStatus(0)}
          >
            Productos Inactivos
          </p>
          <SelectCategorias handleInput={handleCategoria} />
        </div>
        <div className="pb-2 ">
          <SearchInput handleFiltro={handleFiltro} />
        </div>
      </div>
    </div>
  );
}
