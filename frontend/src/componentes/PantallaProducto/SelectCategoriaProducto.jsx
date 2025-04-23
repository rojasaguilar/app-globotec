import React, { useState, useEffect } from "react";
import axios from "axios";

function SelectCategoriaProducto({ handleInput }) {
  const [categorias, setCategorias] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:8081/categorias")
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setUpdate(false);
  }, []);

    return (
      <div>
        <select name={"pro_categoria"} onChange={handleInput} id="">
          {categorias.map((categoria) => {
            return <option value={categoria.cat_id}>{categoria.cat_nombre}</option>;
          })}
        </select>
      </div>
    );

 
}

export default SelectCategoriaProducto;
