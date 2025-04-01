import React from "react";

function SelectRoles({ handleInput }) {
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
      <select name="rol" onChange={handleInput}>
        <option selected>Rol</option>
        {roles.map((rol) => (
          <option value={rol.identificador}>{rol.rol}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectRoles;
