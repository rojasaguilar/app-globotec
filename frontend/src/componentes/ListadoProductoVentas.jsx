import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCardVentas from "./ProductCardVentas";
import { ScanBarcode } from "lucide-react";

function ListadoProductoVentas({ handleAdd, productos }) {
  const [data, setData] = useState([]);
  const [filtro, setFiltro] = useState("");
  console.log(filtro);

  useEffect(() => {
    axios
      .post("http://localhost:8081/productos")
      .then((res) => setData(res.data))
      .catch((err) => console.log("hubo un error"));
  }, []);

  return (
    <div className="w-full space-y-4">
      <div class= "relative w-1/2 ml-4">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <ScanBarcode strokeWidth={1} size={22} className="text-slate-800" />
        </div>
        <input
          type="text"
          name="codigo"
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Código de barras..."
          className=" border text-sm rounded-xl block w-full ps-10 px-20 py-1.5 bg-gray-200 border-gray-400 placeholder-gray-500 text-gray-700 focus:outline-blue-500" 
        />
      </div>

      <div
        className="h-[510px] overflow-y-scroll
                      [&::-webkit-scrollbar]:w-2
                      [&::-webkit-scrollbar-track]:rounded-full
                      [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-blue-200
                    [&::-webkit-scrollbar-thumb]:bg-blue-400 px-4 grid grid-cols-4 gap-4 "
      >
        {data
          .filter((producto) => (filtro === "" ? producto : producto.pro_codigo.includes(filtro)))
          .map((producto, index) => {
            return (
              <ProductCardVentas
                key={index}
                nombre={producto.pro_nombre}
                precio={producto.pro_precio}
                stock={producto.pro_stock}
                id={producto.pro_id}
                codigo={producto.pro_codigo}
                descripcion={producto.pro_descripcion}
                handleAdd={handleAdd}
                productos={productos}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ListadoProductoVentas;
