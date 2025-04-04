import React, { useEffect, useState } from "react";
import axios from "axios";
import Productcard from "../componentes/Productcard";
// import { Plus } from "lucide-react";
import Header from "../componentes/PantallaUsuarios/Header";
import ListadoProductos from "../componentes/ListadoProductos";

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
        <div className="w-full pt-6">
       <Header entidad={"Productos"} msjSearchInput={"Buscar por código..."} btnLink={"/productos/agregar"}/>

       <ListadoProductos/>
          </div>
          
      
  );
}

export default Productos;
