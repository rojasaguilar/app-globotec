import { ArchiveRestore } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-full bg-slate-200 flex justify-between p-8 shadow-md">
      <div>
        <p className="text-xl font-semibold">Devoluciones</p>
        <Link to={"#"} className="text-sm text-gray-500">
          Listado de devoluciones
        </Link>
      </div>
      <div>
        <Link
          to={"solicitar"}
          className="text-lg px-8 py-1.5 bg-blue-600 text-white font-semibold rounded-xl items-center flex gap-3">
          {<ArchiveRestore className="w-5 h-5" />}Solicitar devolucion
        </Link>
      </div>
    </div>
  );
}

export default Header;
