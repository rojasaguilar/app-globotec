import React, { useState } from "react";
import axios from "axios";
import HeaderAgregarProveedor from "../componentes/PantallaAgregarProveedor/HeaderAgregarProveedor";

function Agregarproveedor() {
  function vaciarInputs() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
  }
  const [values, setValues] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    usuario: JSON.parse(localStorage.getItem("empleado")).usu_id,
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
      .post("http://localhost:8081/proveedores/agregar", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    vaciarInputs();
  };

  return (
    <div className="bg-zinc-100">
      <form action="" onSubmit={handleSubmit}>
      {/*HEADER */}
    <HeaderAgregarProveedor/>
<div className="mt-6 ml-4 p-6 bg-slate-100 rounded-lg space-y-6 h-fit">
  {/*INPUT NOMBRE */}       
  <div className="space-y-2">
          <p className=" text-gray-500 font-normal">Nombre</p>
          <input
            type="text"
            className="py-1.5 w-full rounded-md p-2"
            name="nombre"
            placeholder="Nombre Proveedor"
            onChange={handleInput}
          />
        </div>
     {/*INPUT CORREO */}       
        <div className="space-y-2">
          <p className=" text-gray-500 font-normal">Correo</p>
          <input
            type="text"
            className="py-1.5 w-full rounded-md p-2"
            name="correo"
            placeholder="Correo Proveedor"
            onChange={handleInput}
          />
        </div>
         {/*INPUT TELEFONO */}   
        <div className="space-y-2">
          <p className=" text-gray-500 font-normal">Telefono</p>
          <input
            type="text"
            className="py-1.5 w-full rounded-md p-2"
            name="telefono"
            placeholder="Telefono Proveedor"
            onChange={handleInput}
          />
        </div>
         {/*INPUT DIRECCION */}   
        <div className="space-y-2">
          <p className=" text-gray-500 font-normal">Direccion</p>
          <input
            type="text"
            className="py-1.5 w-full rounded-md p-2"
            name="direccion"
            placeholder="Direccion Proveedor"
            onChange={handleInput}
          />
        </div>
        {/* INPUT ESTADO    */}
        <div className="space-y-2">
          <p className=" text-gray-500 font-normal">Estado</p>
          <input
            type="text"
            className="py-1.5 w-full rounded-md p-2"
            name="estado"
            placeholder="Estado en que se ubica el Proveedor"
            onChange={handleInput}
          />
        </div>
</div>
      
  
      </form>
    </div>
  );
}

export default Agregarproveedor;
