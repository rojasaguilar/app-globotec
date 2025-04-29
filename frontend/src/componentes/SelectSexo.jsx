import React from "react";

function SelectSexo({ nombre, handleInput, value }) {
  const sexos = [
    {
      identificador: "",
      sexo: "Seleccione el sexo"
    },
    {
      identificador: "h",
      sexo: "Hombre",
    },
    {
      identificador: "m",
      sexo: "Mujer",
    },
  ];

  return (
    <div>
      <select name={nombre} onChange={handleInput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        {sexos.map((sexo) => (
          <option value={sexo.identificador}>{sexo.sexo}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectSexo;