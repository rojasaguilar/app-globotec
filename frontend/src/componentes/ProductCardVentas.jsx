import React from "react";
import { Barcode } from "lucide-react";

function ProductCardVentas({ producto, handleAdd, productos }) {
  const handleProducto = () => {
    if (!productos.find((p) => p.pro_id === producto.pro_id)) {
      handleAdd({...producto, pro_cantidad: 1});
    } else {
      alert("Producto ya agregado");
    }
  };
  return (
    <div
      onClick={handleProducto}
      class="border border-gray-300 rounded-lg shadow-sm  text-black px-4 py-2 space-y-1 h-fit"
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
    </div>
  );
}

export default ProductCardVentas;
