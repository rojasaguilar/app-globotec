import React from "react";
import BTN_AgregarUsuario from "../BTN_Agregar";
import SearchInput from "../SearchInput";

function Header({ entidad, msjSearchInput, btnLink, status, handleStatus,icono,filtro,handleFiltro }) {

  return (
    <div className="flex flex-col gap-4 w-full pt-4 px-8 rounded-lg">
      {/* Primera columna */}
      <div className="w-full flex justify-between">
        <div className="flex-col space-y-1">
          <p className="text-2xl font-semibold">{entidad}</p>
          <p className="className text-sm text-gray-500">Listado de {entidad}</p>
        </div>
        <BTN_AgregarUsuario queAgregar={entidad} link={btnLink} icono={icono} />
      </div>

      {/* Activos/inactivos */}
      <div className="w-full flex justify-between">
        <div className="flex space-x-6 text-gray-600">
          <p
            className={status === 1 ? "text-blue-600 font-medium border-b-2 border-b-blue-600" : ""}
            onClick={handleStatus}
          >
            {entidad} Activos
          </p>
          <p
            className={status === 0 ? "text-blue-600 font-medium border-b-2 border-b-blue-600" : ""}
            onClick={handleStatus}
          >
            {entidad} Inactivos
          </p>
        </div>
        <div className="pb-2 ">
          <SearchInput msjMuestra={msjSearchInput} handleFiltro={handleFiltro} />
        </div>
      </div>
    </div>
  );
}

export default Header;
