import React from "react";

function SelectSexo({ name, handleInput }) {
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
      <select name={name} onChange={handleInput}>
        <option selected>Sexo</option>
        {sexos.map((sexo) => (
          <option value={sexo.identificador}>{sexo.sexo}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectSexo;
