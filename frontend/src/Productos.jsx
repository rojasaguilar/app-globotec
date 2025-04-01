import React, { useEffect, useState } from "react";
import axios from "axios";
import Productcard from "./componentes/Productcard";
import { Plus } from "lucide-react";

function Productos() {
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
    <div>
      Productos
      <input
        type="text"
        name="codigo"
        onChange={(e) => setFiltro(e.target.value)}
      />
      <div className=" px-4 mt-4 grid grid-cols-4 gap-4">
        {data
          .filter((producto) =>
            filtro === "" ? producto : producto.pro_codigo.includes(filtro)
          )
          .map((producto, index) => {
            return (
              <Productcard
                key={index}
                nombre={producto.pro_nombre}
                precio={producto.pro_precio}
                stock={producto.pro_stock}
                id={producto.pro_id}
                codigo={producto.pro_codigo}
              />
            );
          })}
        <div className="w-fit p-2">
          <a href="/productos/agregar " className="pr-6">
            <div className="bg-blue-600 px-4 py-2 rounded-md flex justify-center items-center space-x-3 ">
              <Plus className="w-6 h-6 text-white" />
              <p className="text-white font-semibold">Agregar producto</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Productos;
