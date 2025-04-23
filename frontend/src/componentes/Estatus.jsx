import React from "react";

function Estatus({ estado }) {
  const params = {
    1: {
      text: "Activo",
      color: "blue",
    },
    0: {
      text: "Inactivo",
      color: "zinc",
    },
  };
  return (
    <div
      className={`px-2 py-1 bg-${params[estado].color}-300 w-fit rounded-xl text-sm text-${params[estado].color}bg-red-800
      flex items-center`}
    >
      {params[estado].text}
    </div>
  );
}

export default Estatus;
