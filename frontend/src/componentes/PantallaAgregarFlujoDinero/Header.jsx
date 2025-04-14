import React from "react";

function Header({titulo, link, etiquetaBoton}) {
  return (
    <div className="w-full px-8 py-6 flex-col bg-slate-100 shadow-md rounded-md ">
      <div className="w-full flex justify-between">
        <p className="text-2xl font-semibold">{titulo}</p>
        <button type="submit" className="bg-blue-600 py-1.5 px-8 rounded-xl text-white font-semibold">
          {" "}
          {etiquetaBoton}
        </button>
      </div>

      <div>
        <a href={link} className="text-sm font-medium text-gray-400">
        Listado de Flujo de efectivo
        </a>
        <span className="font-medium text-gray-800"> / Agregar entrada o salida de efectivo</span>
      </div>
    </div>
  );
}

export default Header;
