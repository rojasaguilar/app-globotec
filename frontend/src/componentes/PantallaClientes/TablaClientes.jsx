import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TablaClientes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8081/clientes")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
     <table>
        <thead>
            <th>Nombre Cliente</th>
            <th>Nombre Correo</th>
            <th>Nombre RFC</th>
            <th>Nombre Codigo Postal</th>
            <th>Accion</th>
        </thead>
        <tbody>
            {data.map((cliente,index)=> {
                return(
                    <tr key={index}>
                        <td>{cliente.cli_nombre}</td>
                        <td>{cliente.cli_correo}</td>
                        <td>{cliente.cli_rfc}</td>
                        <td>{cliente.cli_cp}</td>
                        <td>{<Link to={"/clientes/editar"} state={cliente}>editar</Link>}</td>
                    </tr>
                )
            })}
        </tbody>
     </table>
    </div>
  );
}

export default TablaClientes;
