import React, { useEffect, useState } from "react";
import axios from "axios";
import Productcard from "../componentes/Productcard";
// import { Plus } from "lucide-react";

function ListadoProductos({ filtro, categoria, status }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8081/productos")
      .then((res) => setData(res.data))
      .catch((err) => console.log("hubo un error"));
  }, []);

  return (
    <div className="w-full space-y-4 px-6">
      <div
        className="grid grid-cols-5 gap-4 h-[490px] overflow-y-scroll [&::-webkit-scrollbar]:w-2
                      [&::-webkit-scrollbar-track]:rounded-full
                      [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-blue-200
                    [&::-webkit-scrollbar-thumb]:bg-blue-400 px-2"
      >
        {data
          .filter((producto) => (categoria === "Categoria" ? producto : producto.cat_id == categoria))
          .filter((producto) => (filtro === "" ? producto : producto.pro_codigo.includes(filtro)))
          .filter(producto => (status === 2? producto: producto.pro_estaActivo === status))

          .map((producto, index) => {
            return <Productcard key={index} producto={producto} />;
          })}
      </div>
    </div>
  );
}
export default ListadoProductos;
