import { Barcode } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Productcard({ producto }) {
  const estilo = "border border-gray-300 rounded-lg shadow-sm  text-black px-4 py-2 space-y-1 h-fit";
  console.log(producto);
  return (
    <Link
      to={"producto"}
      state={producto}
      class={
        producto.pro_estaActivo === 1
          ? estilo
          : `${estilo} opacity-40`
      }
    >
      <div>
        <span className="text-lg font-semibold">{producto.pro_nombre}</span>
      </div>
      <img src={`/images/${producto.pro_codigo}.webp`} alt="img" className="w-24 h-20 object-contain" />

      <div className="w-full h-10 text-sm font-normal text-gray-500 bg-white line-clamp-2">
        {producto.pro_descripcion}
      </div>

      <div className="flex col justify-between">
        <div>
          <p className="text-lg font-semibold">{`$${producto.pro_precio}`}</p>
        </div>
        <div className="">
          <p className="flex items-center justify-center w-full">{`Stock: ${producto.pro_stock}`}</p>
        </div>
      </div>
      <div>
        <p className="flex items-center gap-1">
          <Barcode className="w-4 h-4" /> {producto.pro_codigo}
        </p>
      </div>
    </Link>
  );
}

export default Productcard;
