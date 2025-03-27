import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <p>Nombre</p>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre Proveedor"
            onChange={handleInput}
          />
        </div>
        <div>
          <p>Correo</p>
          <input
            type="text"
            name="correo"
            placeholder="Correo Proveedor"
            onChange={handleInput}
          />
        </div>
        <div>
          <p>Telefono</p>
          <input
            type="text"
            name="telefono"
            placeholder="Telefono Proveedor"
            onChange={handleInput}
          />
        </div>
        <div>
          <p>Direccion</p>
          <input
            type="text"
            name="direccion"
            placeholder="Direccion Proveedor"
            onChange={handleInput}
          />
        </div>
        <button type="submit">Agregar Proveedor</button>
      </form>
    </div>
  );
}

export default Agregarproveedor;
