import { Barcode } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Productcard({ nombre, precio, stock, codigo, descripcion }) {
  return (
    <Link
    to={"producto"}
      state={{ nombre, precio, stock, codigo, descripcion }}
      class="border border-gray-300 rounded-lg shadow-sm  text-black px-4 py-2 space-y-1 h-fit"
    >
      <div>
        <span className="text-lg font-semibold">{nombre}</span>
      </div>
      <img src={`/images/${codigo}.webp`} alt="img" className="w-24 h-20" />

      <div className="w-full h-12">
        <span className="text-sm font-normal text-gray-500">{descripcion}</span>
      </div>

      <div className="flex col justify-between">
        <div>
          <p className="text-lg font-semibold">{`$${precio}`}</p>
        </div>
        <div className="">
          <p className="flex items-center justify-center w-full">{`Stock: ${stock}`}</p>
        </div>
      </div>
      <div>
        <p className="flex items-center gap-1">
          <Barcode className="w-4 h-4" /> {codigo}
        </p>
      </div>
    </Link>
  );
}

export default Productcard;
