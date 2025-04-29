import React from "react";

function SelectRoles({ nombre, handleInput, value }) {
  const roles = [
    {
      identificador: "",
      rol: "Seleccione el rol"
    },
    {
      identificador: "g",
      rol: "Gerente",
    },
    {
      identificador: "e",
      rol: "Empleado de Mostrador",
    },
    {
      identificador: "i",
      rol: "Gestor de Inventario",
    },
  ];

  return (
    <div>
      <select name={nombre} onChange={handleInput} value={value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        {roles.map((rol) => (
          <option value={rol.identificador}>{rol.rol}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectRoles;