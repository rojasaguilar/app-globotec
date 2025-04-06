import { Barcode } from "lucide-react";
import React from "react";

function Productcard({ nombre, precio, stock, id, codigo, descripcion }) {
  return (
    <div class="border border-gray-700 rounded-lg shadow-sm bg-gray-800  text-white p-4 space-y-4">
      <div>
        <span className="text-lg font-semibold">{nombre}</span>
      </div>
      <div className="bg-zinc-600 rounded-lg"></div>
      <img src="" alt="img" className="w-12 h-40" />

      <div>
        <p className="flex items-center gap-1">
          <Barcode className="w-4 h-4" /> {codigo}
        </p>
      </div>

      <div className="w-full h-12">
        <span className="text-sm font-normal">{descripcion}</span>
      </div>

      <div className="flex col justify-between px-2">

        <div>
          <span className="text-2xl font-semibold">{`$${precio}`}</span>
        </div>
        <div className="">
          <span>Stock: </span>
          <p className="flex items-center justify-center w-full">{stock}</p>
        </div>
      </div>
    </div>
  );
}

export default Productcard;
