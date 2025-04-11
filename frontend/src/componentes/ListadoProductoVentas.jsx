import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCardVentas from "./ProductCardVentas";

function ListadoProductoVentas({handleAdd, productos}) {
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
      <input type="text" name="codigo" onChange={(e) => setFiltro(e.target.value)} />
      <div className="h-[530px] overflow-y-scroll px-4 grid grid-cols-4 gap-4 ">
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
