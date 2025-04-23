import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Tablausuarios({ status }) {
  function parseRol(rol) {
    if (rol === "g") return "Gerente";
    if (rol === "e") return "Empleado de Mostrador";
    if (rol === "i") return "Gestor de Inventario";
    return "Desconocido";
  }

  function concatNombre(nombre, a1, a2) {
    return `${nombre} ${a1} ${a2}`;
  }
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  console.log(status);

  useEffect(() => {
    axios
      .post("http://localhost:8081/usuarios")
      .then((res) => setData(res.data))
      .catch((err) => console.log("hubo un error"));
  }, []);

  console.log(data);

  return (
    <div className="container px-8">
      <input type="text" onChange={(e) => setFilter(e.target.value)} />
      <table className="table-fixed rounded-md ">
        <thead className="text-slate-500 font-normal text-xs bg-blue-100">
          <th className="px-3 py-2 w-48 rounded-l-xl text-left">NOMBRE</th>
          <th className="px-3 py-2 w-24 text-left">TELEFONO</th>
          <th className="px-3 py-2 w-40 text-left">DIRECCION</th>
          <th className="px-3 py-2 w-32 text-left">RFC</th>
          <th className="px-3 py-2 w-40 text-left">ROL</th>
          <th className="px-3 py-2 w-32 text-left">GERENTE ALTA</th>
          <th className="px-3 py-2 w-36 text-left">FECHA ALTA</th>
          <th className="px-3 py-2 w-20 rounded-r-xl text-left">ACCION</th>
        </thead>
        <tbody>
          {data
            .filter((user) => user.usu_estaActivo === status)
            .filter((user) => {
              return filter.toLowerCase() === "" ? user : user.usu_nombre.toLowerCase().includes(filter.toLowerCase());
            })
            .map((user, index) => {
              return (
                <tr key={index} className=" ">
                  <td className="px-3 py-2 text-sm">
                    {concatNombre(user.usu_nombre, user.usu_apellidoPaterno, user.usu_apellidoMaterno)}
                  </td>
                  <td className="px-3 py-2 text-sm">{user.usu_telefono}</td>
                  <td className="px-3 py-2 text-sm">{user.usu_direccion}</td>
                  <td className="px-3 py-2 text-sm">{user.usu_rfc}</td>
                  <td className="px-3 py-2 text-sm">{parseRol(user.usu_rol)}</td>
                  <td className="px-3 py-2 text-sm">{user.gerenteAlta}</td>
                  <td className="px-3 py-2 text-sm">{user.usu_fechaAlta}</td>
                  <td className="px-3 py-2 text-sm">
                    {
                      <Link className="text-blue-600 font-medium " to="/usuarios/editar" state={user}>
                        Editar
                      </Link>
                    }
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Tablausuarios;
