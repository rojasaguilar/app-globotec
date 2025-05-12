import React, { useEffect, useState } from "react";
import axios from "axios";
import { Barcode } from "lucide-react";
export default function MasVendidos() {
  const [productos, setProductos] = useState([]);
console.log(productos)
  useEffect(() => {
    axios
      .post("http://localhost:8081/topproductos")
      .then((res) => setProductos(res.data))
      .catch((err) => console.log(err));
  }, []);

  return productos.length === 0 ? null : ( //CAMBIAR OTOR DISENIO
    <div className="bg-gray-200 w-full h-full rounded-xl p-4 space-y-2">
      {/* <div className="flex-col bg-gray-200 w-full p-4 rounded-xl shadow-md space-y-4">

        <div className="space-y-2">
          <div className="pl-2 space-x-4 grid grid-cols-11">
            <p className="text-sm font-medium col-span-5 items-center flex">Codigo Producto</p>
            <p className="text-sm pl-1 font-medium col-span-3  items-center flex">Cantidad Vendidos</p>
            <p className="text-sm px-1 font-medium col-span-3 items-center flex">Ventas</p>
          </div>
          {productos?.map((producto) => {
            return (
              <div className="bg-white p-2 rounded-xl space-x-4 grid grid-cols-11">
                <div className="flex col-span-5 items-center">
                  <Barcode strokeWidth={1.5} size={20} />
                  <p className="pl-1 text-sm ">{producto.pro_codigo}</p>
                </div>
                <div className="col-span-2 flex col-start-6 items-center justify-center">
                <p className="text-sm rounded-full h-6 p-2 w-fit items-center flex ">
                  {producto.cantidadVendidos}
                </p>
                </div>
              <div className="flex col-span-2 col-start-9 items-center justify-center">
              <p className="text-sm">
              {producto.ventas}
              </p>
              </div>
                
              </div>
            );
          })}
        </div>
      </div> */}
      <p className="font-semibold">Top Productos más vendidos</p>
      <table>
        <thead>
          <th className="text-sm font-medium px-2 text-start">Codigo de Barras</th>
          <th className="text-sm font-medium px-2 text-start">Nombre Producto</th>
          <th className="text-sm font-medium px-2 text-start">Marca</th>
          <th className="text-sm font-medium px-2 text-center">Cantidad Vendidos</th>
          <th className="text-sm font-medium px-2 text-center">Ventas</th>
        </thead>
        <tbody>
          {productos?.map(producto => {return(
            <tr>
              <td className="text-xs w-fit  font-light px-2 py-1">{producto.pro_codigo}</td>
              <td className="text-xs w-fit font-light px-2 py-1">{producto.pro_nombre}</td>
              <td className="text-xs w-fit font-light px-2 py-1">{producto.pro_marca}</td>
              <td className="text-xs w-fit text-center font-light px-2 py-1">{producto.cantidadVendidos}</td>
              <td className="text-xs w-fit text-center font-light px-2 py-1">{producto.ventas}</td>
            </tr>
          )
          }) }
        </tbody>
      </table>
    </div>
  );
}
