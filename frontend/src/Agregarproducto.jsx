import React, { useState } from "react";
import axios from "axios";

function Agregarproducto() {
  function vaciarInputs() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
  }

  const [values, setValues] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    codigo: "",
  });

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/productos/agregar", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    vaciarInputs();
  };

  return (
    <div className="w-full h-screen bg-slate-200">
      <div className="bg-slate-400 w-1/2 h-4/6 flex justify-center items-center">
        <form
          className="flex-col space-y-8 bg-slate-700 p-8"
          action=""
          onSubmit={handleSubmit}
        >
          <div className="flex-col space-y-2">
            <p className="font-medium text-slate-200 text-sm">Nombre</p>
            <input
              className="bg-slate-500 rounded-md px-2 py-1 focus:ring-blue-500 focus:border-blue-500 "
              type="text"
              placeholder="Nombre Producto"
              name="nombre"
              onChange={handleInput}
            />
          </div>
          <div className="flex-col space-y-2">
            <p className="font-medium text-slate-200 text-sm">Categoria</p>
            <input
              className="bg-slate-500 rounded-md px-2 py-1"
              type="text"
              placeholder="Categoria"
              name="categoria"
              onChange={handleInput}
            />
          </div>
          <div className="flex-col space-y-2">
            <p className="font-medium text-slate-200 text-sm">Precio</p>
            <input
              className="bg-slate-500 rounded-md px-2 py-1"
              type="text"
              placeholder="Nombre Producto"
              name="precio"
              onChange={handleInput}
            />
          </div>
          <div className="flex-col space-y-2">
            <p className="font-medium text-slate-200 text-sm">Stock</p>
            <input
              className="bg-slate-500 rounded-md px-2 py-1"
              type="number"
              placeholder="Stock"
              name="stock"
              onChange={handleInput}
            />
          </div>
          <div className="flex-col space-y-2">
            <p className="font-medium text-slate-200 text-sm">Código</p>
            <input
              className="bg-slate-500 rounded-md px-2 py-1"
              type="text"
              placeholder="Código"
              name="codigo"
              onChange={handleInput}
            />
          </div>
          <button
            className="bg-blue-500 flex justify-center items-center w-full rounded-md py-2 font-medium text-slate-200"
            type="submit"
          >
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Agregarproducto;
