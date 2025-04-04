import React from "react";

function Productcard({ nombre, precio, stock, id, codigo,descripcion }) {
  return (
    <div class="border border-gray-700 rounded-lg shadow-sm bg-gray-800  text-white p-4 space-y-4">
     
    <div className="bg-zinc-600 rounded-lg">
    <img src="" alt="img" className="w-20 h-48"/>
    </div>

    <div>
      <span className="text-lg font-semibold">{nombre}</span>
    </div>

    <div className="w-full h-12">
      <span className="text-sm font-normal">{descripcion}</span>
    </div>

    <div >
      <span>Unidades en stock: </span>
      <p>{stock}</p>
    </div>
     
    <div>
      <span>Código: </span>
      <p>{`#${codigo}`}</p>
    </div>
    <div>
      <span className="text-2xl font-semibold">{`$${precio}`}</span>
    </div>

     
    </div>
  );
}

export default Productcard;
