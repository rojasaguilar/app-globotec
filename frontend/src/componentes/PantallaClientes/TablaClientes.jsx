import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TablaClientes({status,filtro}) {
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
    <div className="w-full justify-center flex mt-4">
      <div className="overflow-hidden w-full max-w-6xl">
      <table className="table-auto mx-auto text-sm">
          <thead className="text-slate-600 text-xs bg-blue-100">
              <th className="p-2.5">NOMBRE CLIENTE</th>
              <th className="p-2.5">CORREO</th>
              <th className="p-2.5">RFC</th>
              <th className="p-2.5">CÓDIGO POSTAL</th>
              <th className="p-2.5">ACCIÓN</th>
          </thead>
          <tbody>
              {data
              .filter(cliente => ( filtro === '' ?  cliente : cliente.cli_nombre.toLowerCase().includes(filtro.toLowerCase()) ) )
              .filter( cliente => cliente.cli_estaActivo === status )
              .map((cliente,index)=> {
                return(
                    <tr key={index} className="text-sm group hover:bg-blue-100 transition-all duration-200">
                        <td className="px-6 py-2 group-hover:text-blue-800">{cliente.cli_nombre}</td>
                        <td className="px-6 py-2 group-hover:text-blue-800">{cliente.cli_correo}</td>
                        <td className="px-6 py-2 group-hover:text-blue-800">{cliente.cli_rfc}</td>
                        <td className="px-6 py-2 group-hover:text-blue-800">{cliente.cli_cp}</td>
                        <td className="px-6 py-2 group-hover:text-blue-800">{<Link to={"/clientes/editar"} state={cliente} className="text-blue-600 font-medium hover:underline">Editar</Link>}</td>
                    </tr>
                )
            })}
          </tbody>
      </table>
     </div>
    </div>
  );
}
export default TablaClientes;