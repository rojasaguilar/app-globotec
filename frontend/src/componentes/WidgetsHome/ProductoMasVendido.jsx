import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, DollarSign } from "lucide-react";

function ProductoMasVendido() {
  const [producto, setProducto] = useState(0.0);
    console.log(producto.pro_codigo)
  useEffect(() => {
    const date = { date: new Date().toJSON().slice(0, 10) };
    axios
      .post("http://localhost:8081/topproductos")
      .then((res) => setProducto(res.data[0]))
      .catch((err) => console.log(err));
  });

  return (
    <div className="bg-slate-100 flex w-full h-full px-4 rounded-xl items-center gap-2">
      <div className="p-[0.12rem] rounded-full border border-blue-200">
        <div className="p-4 bg-white rounded-full">
        {/* <Box size={32} strokeWidth={1} color="#0063eb" /> */}
        <img src={`/images/${producto.pro_codigo}.webp`} alt=""  className="w-10 h-10 object-contain"/>
        </div>
      </div>

      <div>
        <p className="text-xl">{producto.pro_nombre}</p>
        <p className="text-xs text-gray-500">{producto.pro_marca}</p>
        <p className="text-gray-500 text-sm">Producto mas vendido</p>
      </div>
    </div>
  );
}

export default ProductoMasVendido;
