import React from "react";
import SearchInput from "../SearchInput";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

function Header({ status, handleStatus }) {
  return (
    <div className="flex flex-col gap-4 w-full pt-4 px-8 rounded-lg">
      {/* Primera columna */}
      <div className="w-full flex justify-between">
        <div className="flex-col space-y-1">
          <p className="text-2xl font-semibold">Clientes</p>
          <p className="className text-sm text-gray-500">Listado de Clientes</p>
        </div>
        <Link
          to={"/clientes/agregar"}
          className="flex gap-2 bg-blue-500 items-center h-fit rounded-md px-4 py-1 text-white font-medium"
        >
          {" "}
          <UserPlus className="w-5 h-5" /> Agregar Cliente
        </Link>
      </div>

      {/* Activos/inactivos */}
      <div className="w-full flex justify-between">
        <div className="flex space-x-6 text-gray-600">
          <p
            className={status === 1 ? "text-blue-600 font-medium border-b-2 border-b-blue-600" : ""}
            onClick={handleStatus}
          >
            Clientes Activos
          </p>
          <p
            className={status === 0 ? "text-blue-600 font-medium border-b-2 border-b-blue-600" : ""}
            onClick={handleStatus}
          >
            Clientes Inactivos
          </p>
        </div>
        <div className="pb-2 ">
          <SearchInput />
        </div>
      </div>
    </div>
  );
}

export default Header;
