import React, { useState } from "react";
import axios from "axios";
import { Check } from "lucide-react";
import SelectCategorias from "../componentes/SelectCategorias";
import BasicModal from "../componentes/MasicModal";
import { useNavigate } from "react-router-dom";
import SelectProveedores from "../componentes/SelectProveedores";

function Agregarproducto() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    codigo: "",
    marca: "",
    descripcion: "",
    stockMinimo: "",
    prove_id: "",
  });
console.log(values)
  const [imagen, setImagen] = useState(null);
 
  function vaciarInputs() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
  }

  var loadFile = function(event) {
  setImagen(event.target.files[0]);
  const image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0])
};

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

const formData = new FormData();
const nombreImagen = `${values.codigo}.webp`

formData.append("imagen",imagen, nombreImagen); //imagen 
formData.append("producto",JSON.stringify(values));

for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}

    axios
      .post("http://localhost:8081/productos/agregar", formData)
      .then((res) => {
        if (res.data.affectedRows === 1) {
          alert("Producto agregado correctamente");
          navigate("/productos");
        }
      })
      .catch((err) => console.log(err));
    vaciarInputs();
  };

  return (
    <div className="w-full  ">
      <form className="" action="" onSubmit={handleSubmit}>
        {/*MENSAJE Y BOTON AGREGAR*/}
        <div className=" flex justify-between items-center py-8 px-3">
          <p className=" flex-col justify-center items-center font-normal text-lg ">Agregar Nuevo Producto</p>
          <button
            className="bg-blue-500 flex justify-center items-center rounded-xl py-2.5 px-8 font-medium text-white gap-2"
            type="submit"
          >
            {<Check className="w-6 h-6" />}
            Agregar Producto
          </button>
        </div>
        <div className="grid grid-flow-row grid-rows-5 space-y-8">
          {/*PRIMERA COLUMNA */}
          <div className="grid grid-flow-col grid-cols-11 gap-8 px-4 row-span-3">
            {/* INFORMACION GENERAL*/}
            <div className=" bg-zinc-200 col-span-6 rounded-xl p-3 space-y-3">
              <p className="font-semibold text-base">Información General</p>
              {/* INPUT NOMBRE*/}
              <div className="flex-col space-y-1.5">
                <p className="font-normal text-zinc-600 text-sm">Nombre del producto</p>
                <input
                  className="bg-zinc-300 w-full   rounded-md px-2 py-1 focus:ring-blue-500 focus:border-blue-500 "
                  type="text"
                  placeholder="Nombre Producto"
                  name="nombre"
                  onChange={handleInput}
                />
              </div>
              {/* INPUT DESCRIPCION*/}
              <div className="flex-col space-y-1.5">
                <p className="font-medium text-zinc-600 text-sm">Descripcion</p>
                <textarea
                  className="bg-zinc-300 w-full rounded-md px-2 py-1 text-start resize-none
                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-track]:bg-blue-200
                [&::-webkit-scrollbar-thumb]:bg-blue-400"
                  type="text"
                  placeholder=""
                  name="descripcion"
                  rows={3}
                  onChange={handleInput}
                />
              </div>
              {/* INPUT MARCA*/}
              <div className="flex-col space-y-2">
                <p className="font-medium text-zinc-600 text-sm">Marca</p>
                <input
                  className="bg-zinc-300 rounded-md px-2 py-1 w-1/2"
                  type="text"
                  placeholder="Apple"
                  name="marca"
                  onChange={handleInput}
                />
              </div>
            </div>

            {/* IMAGEN*/}
            <div className=" bg-zinc-200 col-span-5 rounded-xl">
              <div className="p-3">
                <p className="font-medium">Agregar Imagenes</p>
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  name="imagen"
                  id="file"
                  onChange={loadFile}
                />
                <label for="file">
                  Upload Image
                </label>
                <img id="output" width="200" />
              </div>
            </div>
          </div>

          {/*SEGUNDA COLUMNA */}
          <div className="grid grid-flow-col grid-cols-11 gap-8 px-4 row-span-2">
            <div className="bg-zinc-200 col-span-6 p-4 rounded-lg grid grid-2">
              {/*SUBCOLUMNA 1 PRECIO Y STOCK */}
              <div className="grid grid-cols-2 gap-4">
                {" "}
                {/* INPUT PRECIO*/}
                <div className="flex-col space-y-2">
                  <p className="font-medium text-zinc-600 text-sm">Precio</p>
                  <input
                    className="bg-zinc-300 rounded-md px-2 py-1 w-1/2 "
                    type="text"
                    placeholder="200.99"
                    name="precio"
                    onChange={handleInput}
                  />
                </div>
                {/* INPUT STOCK*/}
                <div className="flex-col space-y-2">
                  <p className="font-medium text-zinc-600 text-sm ">Stock</p>
                  <input
                    className="bg-zinc-300 rounded-md px-2 py-1 w-1/2"
                    type="number"
                    placeholder="5"
                    name="stock"
                    onChange={handleInput}
                  />
                </div>
              </div>
              {/*SUBCOLUMNA 2 DESCUENTO Y STOCK MINIMO */}
              <div className="grid grid-cols-2 gap-4 justify-end">
                {/* INPUT STOCK MINIMO*/}
                <div className="flex-col space-y-2">
                  <p className="font-medium text-zinc-600 text-sm">Stock mínimo</p>
                  <input
                    className="bg-zinc-300 rounded-md px-2 py-1"
                    type="number"
                    placeholder="2"
                    name="stockMinimo"
                    onChange={handleInput}
                  />
                </div>
                {/* INPUT PROVEEDOR*/}
                <div className="flex-col space-y-2">
                  <p className="font-medium text-zinc-600 text-sm">Proveedor</p>
                  <SelectProveedores nombre={"prove_id"} handleInput={handleInput}/>
                </div>
              </div>
            </div>
            <div className="bg-zinc-200 col-span-5 p-4 rounded-lg grid grid-2 gap-4">
              {/* INPUT CATEGORIA*/}
              <div className="flex-col space-y-2">
                <p className="font-medium text-zinc-600 text-sm ">Categoria</p>
                <div className="flex space-x-12 items-center ">
                  <SelectCategorias className="w-full" handleInput={handleInput} />
                  <BasicModal />
                </div>
              </div>

              {/* INPUT CODIGO*/}
              <div className="flex-col space-y-2 ">
                <p className="font-medium text-zinc-600 text-sm">Código</p>
                <input
                  className="bg-zinc-300 rounded-md px-2 py-1 w-3/4"
                  type="text"
                  placeholder="Código"
                  name="codigo"
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Agregarproducto;
