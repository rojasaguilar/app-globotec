import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

function FormularioEditarCliente() {
  const location = useLocation();
  const navigator = useNavigate();

  const [cliente, setCliente] = useState(location.state);

  const handleInput = (event) => {
    setCliente((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  console.log(cliente)

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/clientes/editar", cliente)
      .then((res) => {
        if (res.data.affectedRows === 1) {
          alert("Cliente actualizado correctamente");
          navigator("/clientes");
        } else {
          alert("Error al actualizar cliente");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header></Header>
      <h1>FormularioEditarCliente</h1>
      <form action="" onSubmit={handleSubmit}>
        {/* INPUT NOMBRE*/}
        <div>
          <p>Nombre Cliente</p>
          <input
            type="text"
            name="cli_nombre"
            onChange={handleInput}
            value={cliente.cli_nombre}
          />
        </div>
        {/* INPUT CORREO*/}
        <div>
          <p>Correo Cliente</p>
          <input
            type="text"
            name="cli_correo"
            onChange={handleInput}
            value={cliente.cli_correo}
          />
        </div>
        {/* INPUT RFC*/}
        <div>
          <p>RFC Cliente</p>
          <input
            type="text"
            name="cli_rfc"
            onChange={handleInput}
            value={cliente.cli_rfc}
          />
        </div>
        {/* INPUT CODIGO POSTAL*/}
        <div>
          <p>Código Postal Cliente</p>
          <input
            type="text"
            name="cli_cp"
            onChange={handleInput}
            value={cliente.cli_cp}
          />
        </div>
        {/* INPUT RADIO BUTTON STATUS */}
        { //ANIMACION SE DETIENE PERO SI MANDA VALOR BIEN
        }
          <div className="flex space-x-8">
            <div className="flex space-x-2">
              <input checked={cliente.cli_estaActivo === 1} id="activo" type="radio" value={1} name="cli_estaActivo" onChange={handleInput} />
              <p>Activo</p>
            </div>
            <div className="flex space-x-2">
              <input checked={!cliente.cli_estaActivo} type="radio" value={0} name="cli_estaActivo"  onChange={handleInput}/>
              <p>Inactivo</p>
            </div>
          </div>
        <button type="submit">agregar</button>
      </form>
    </div>
  );
}

export default FormularioEditarCliente;
