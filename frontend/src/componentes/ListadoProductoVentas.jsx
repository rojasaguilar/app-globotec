import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCardVentas from "./ProductCardVentas";
import { ScanBarcode } from "lucide-react";

function ListadoProductoVentas({ handleAdd, productos }) {
  const [data, setData] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8081/productos")
      .then((res) => setData(res.data))
      .catch((err) => console.log("hubo un error"));
  }, []);

  return (
    <div className="w-full space-y-4 bg-white">
      <div class="relative w-1/2 ml-4">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <ScanBarcode strokeWidth={1} size={22} className="text-slate-800" />
        </div>
        <input
          type="text"
          name="codigo"
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Código de barras..."
          className=" border text-sm rounded-xl block w-full ps-10 px-20 py-1.5 bg-slate-100 border-slate-200 placeholder-gray-500 text-gray-700 focus:outline-blue-500"
        />
      </div>

      <div
        className="h-[515px] overflow-y-scroll
                      [&::-webkit-scrollbar]:w-2
                      [&::-webkit-scrollbar-track]:rounded-full
                      [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-blue-200
                    [&::-webkit-scrollbar-thumb]:bg-blue-400 px-4 grid grid-cols-3 gap-4 "
      >
        {data
          .filter((producto) => (filtro === "" ? producto : producto.pro_codigo.includes(filtro)))
          .map((producto, index) => {
            console.log(producto)
            if (producto.pro_estaActivo === 1) {
              return (
                <ProductCardVentas
                  key={index}
                  producto={producto}
                  handleAdd={handleAdd}
                  productos={productos}
                />
              );
            } else {
              return null;
            }
          })}
      </div>
    </div>
  );
}

export default ListadoProductoVentas;
