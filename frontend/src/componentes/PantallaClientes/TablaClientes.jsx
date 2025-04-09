import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TablaClientes({status}) {
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
console.log(status)
  return (
    <div className="pt-4">
     <table className="table-auto">
        <thead>
            <th className="px-6 text-base">Nombre Cliente</th>
            <th className="px-6 text-base">Nombre Correo</th>
            <th className="px-6 text-base">Nombre RFC</th>
            <th className="px-6 text-base">Nombre Codigo Postal</th>
            <th className="px-6 text-base">Accion</th>
        </thead>
        <tbody>
            {data.filter( cliente => cliente.cli_estaActivo === status )
            .map((cliente,index)=> {
              return(
                  <tr key={index}>
                      <td className="px-6 py-1 text-sm">{cliente.cli_nombre}</td>
                      <td className="px-6 py-1 text-sm">{cliente.cli_correo}</td>
                      <td className="px-6 py-1 text-sm">{cliente.cli_rfc}</td>
                      <td className="px-6 py-1 text-sm">{cliente.cli_cp}</td>
                      <td className="px-6 py-1 text-sm">{<Link to={"/clientes/editar"} state={cliente}>editar</Link>}</td>
                  </tr>
              )
          })}
        </tbody>
     </table>
    </div>
  );
}

export default TablaClientes;
