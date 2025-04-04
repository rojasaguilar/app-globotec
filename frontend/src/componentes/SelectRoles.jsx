import React from "react";

function SelectRoles({ nombre, handleInput }) {
  const roles = [
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
      <select name={nombre} onChange={handleInput}>
        {roles.map((rol) => (
          <option value={rol.identificador}>{rol.rol}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectRoles;
