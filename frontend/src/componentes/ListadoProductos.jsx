import React, { useEffect, useState } from "react";
import axios from "axios";
import Productcard from "../componentes/Productcard";
// import { Plus } from "lucide-react";
import Header from "../componentes/PantallaUsuarios/Header";

function ListadoProductos() {
  const [data, setData] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8081/productos")
      .then((res) => setData(res.data))
      .catch((err) => console.log("hubo un error"));
  });

  return (
    <div className="w-full space-y-4 bg-white px-6">
      <input type="text" name="codigo" onChange={(e) => setFiltro(e.target.value)} className="bg-slate-200" />
      <div
        className="grid grid-cols-5 gap-4 h-[490px] overflow-y-scroll [&::-webkit-scrollbar]:w-2
                      [&::-webkit-scrollbar-track]:rounded-full
                      [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-blue-200
                    [&::-webkit-scrollbar-thumb]:bg-blue-400 px-2"
      >
        {data
          .filter((producto) => (filtro === "" ? producto : producto.pro_codigo.includes(filtro)))
          .map((producto, index) => {
            return <Productcard key={index} producto={producto} />;
          })}
      </div>
    </div>
  );
}

export default ListadoProductos;
