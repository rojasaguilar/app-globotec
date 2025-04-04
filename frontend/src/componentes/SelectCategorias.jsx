import React, { useState, useEffect } from "react";
import axios from "axios";

function SelectCategorias({ handleInput }) {
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8081/categorias")
      .then((res) => setCategoria(res.data))
      .catch((err) => {
        console.log("Hubo un error");
      });
  }, []);
  return (
    <div>
      <select
        className="bg-zinc-200 text-zinc-500 w-full"
        name="categoria"
        onChange={handleInput}
      >
        <option selected>Categoria</option>
        {categoria.map((categoria) => (
          <option value={categoria.cat_id}>{categoria.cat_nombre}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectCategorias;
