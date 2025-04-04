import React from "react";

function Saludador({ nombre, rol }) {
  function parseRol(rol) {
    if (rol === "g") return "Gerente";
    if (rol === "e") return "Empleado de Mostrador";
    if (rol === "i") return "Gestor de Inventario";
    return undefined;
  }
  return (
    <div className="flex flex-col text-black">
      <p className=" font-medium text-base">{`Hello, ${nombre}`}</p>
      <p className="text-sm">{`${parseRol(rol)}`}</p>
    </div>
  );
}

export default Saludador;
