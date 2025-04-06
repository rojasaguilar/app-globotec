import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BajoStock() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8081/productos/pocostock")
      .then((res) => {
        setProductos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>BajoStock</h1>

      <div className="flex-col bg-gray-200 w-fit p-4 rounded-xl shadow-md space-y-4">
        <p className="font-semibold">Productos con bajo stock</p>
        <div className="space-y-2">
        <div className="pl-2 space-x-4 grid grid-cols-11">
                <p className="text-sm font-medium col-span-5 items-center flex">Producto</p>
                <p className="text-sm pl-1 font-medium col-span-3  items-center flex">Stock Actual</p>
                <p className="text-sm px-1 font-medium col-span-3 items-center flex">Stock Minimo</p>
        </div>
          {productos.map((producto) => {
            return (
              <div className="bg-white p-2 rounded-xl space-x-4 grid grid-cols-11">
                <p className="pl-1 text-sm col-span-5">{producto.pro_nombre}</p>
                <p className="text-sm col-span-2 bg-red-300 rounded-full h-6 p-2 w-fit items-center flex col-start-7">{producto.pro_stock}</p>
                <p className="text-sm col-span-2  rounded-full h-6 p-2 items-center w-fit flex col-start-10">{producto.pro_stockMinimo}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BajoStock;
