import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../componentes/PantallaUsuarios/Header";
import { Barcode } from "lucide-react";

function Producto() {
  const location = useLocation();
  const [producto, setProducto] = useState(location.state);
  return (
    <div className="bg-white grid grid-cols-2 p-6">
      {/*IMAGEN*/}
      <div className="w-full items-center justify-center flex">
        <img src={`/images/${producto.codigo}.webp`} alt="" className="h-[300px]" />
      </div>

      <div className="space-y-3 pt-4">
        {/*NOMBRE*/}
        <div className="w-full">
          <input type="text" name="nombre" value={producto.nombre} className="text-xl w-full font-semibold" disabled />
        </div>

        {/*CODIGO*/}
        <div className="w-full flex items-center gap-2 text-slate-400">
          <Barcode size={18} />
          <input type="text" name="codigo" value={producto.codigo} className="text-base w-full" disabled />
        </div>

        {/*DESCRIPCION*/}
        <div className="w-full flex items-center gap-2 text-slate-400">
          <textarea
            type="text"
            name="codigo"
            value={producto.descripcion}
            className="text-base w-full h-24 text-start resize-none"
            disabled
          />
        </div>

        {/*STOCK Y PRECIO*/}
        <div className="w-full flex justify-between gap-2 text-slate-400">
          <div>
            <p>Unidades en stock:</p>
            <input type="text" name="stock" value={producto.stock} className="text-base w-full" disabled />
          </div>

          <div>
            <p>Precio:</p>
            <input type="text" name="stock" value={producto.precio} className="text-base w-full" disabled />
          </div>
          <div>
            <p>Precio:</p>
            <input type="text" name="stock" value={producto.precio} className="text-base w-full" disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Producto;
