import React, { useEffect, useState } from "react";
import axios from "axios";

function SelectClientes({ handleCliente }) {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8081/clientes")
      .then((res) => {
        setClientes(res.data);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <select onChange={handleCliente}>
        {clientes.map((cliente) => {
          if (cliente.cli_estaActivo === 1) {
            return <option value={cliente.cli_id}>{cliente.cli_nombre}</option>;
          }
          return;
        })}
      </select>
    </div>
  );
}

export default SelectClientes;
