import React from "react";

function SelectSexo({ nombre, handleInput }) {
  const sexos = [
    {
      identificador: "h",
      sexo: "hombre",
    },
    {
      identificador: "m",
      sexo: "mujer",
    },
  ];

  return (
    <div>
      <select name={nombre} onChange={handleInput}>
        {sexos.map((sexo) => (
          <option value={sexo.identificador}>{sexo.sexo}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectSexo;
