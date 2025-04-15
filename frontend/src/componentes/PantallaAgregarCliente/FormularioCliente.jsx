import React, { useState } from "react";
import axios from "axios";

function FormularioCliente() {
  const [cliente, setCliente] = useState({
    cli_nombre: "",
    cli_correo: "",
    cli_rfc: "",
    cli_cp: "",
  });

  const handleInput = (event) => {
    setCliente((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(cliente)
    axios
      .post("http://localhost:8081/clientes/agregar", cliente)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>FormularioCliente</h1>
      <form action="" onSubmit={handleSubmit}>
        {/* INPUT NOMBRE*/}
        <div>
          <p>Nombre Cliente</p>
          <input type="text" name="cli_nombre" onChange={handleInput} />
        </div>
        {/* INPUT CORREO*/}
        <div>
          <p>Correo Cliente</p>
          <input type="text" name="cli_correo" onChange={handleInput} />
        </div>
        {/* INPUT RFC*/}
        <div>
          <p>RFC Cliente</p>
          <input type="text" name="cli_rfc" onChange={handleInput} />
        </div>
        {/* INPUT CODIGO POSTAL*/}
        <div>
          <p>Código Postal Cliente</p>
          <input type="text" name="cli_cp" onChange={handleInput} />
        </div>
        {/* */}
        <button type="submit">agregar</button>
      </form>
    </div>
  );
}

export default FormularioCliente;
