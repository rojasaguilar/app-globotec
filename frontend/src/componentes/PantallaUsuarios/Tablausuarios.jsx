import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Tablausuarios() {
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

  useEffect(() => {
    axios
      .post("http://localhost:8081/usuarios")
      .then((res) => setData(res.data))
      .catch((err) => console.log("hubo un error"));
  }, []);

  return (
    <div className="container px-8" >
        <input type="text" onChange={(e) => setFilter(e.target.value)} />
        <table className="table-auto bg-zinc-50 rounded-md ">
          <thead className="text-slate-500 font-normal text-xs border-b-2 border-blue-100" >
            <th className="pl-4 py-1  text-left">NOMBRE</th>
            <th className="pl-4 py-1  text-left">SEXO</th>
            <th className="pl-4 py-1  text-left">TELEFONO</th>
            <th className="pl-4 py-1  text-left">DIRECCION</th>
            <th className="pl-4 py-1  text-left">RFC</th>
            <th className="pl-4 py-1  text-left">ROL</th>
            <th className="pl-4 py-1  text-left">GERENTE ALTA</th>
            <th className="pl-4 py-1  text-left">FECHA ALTA</th>
            <th className="pl-4 py-1  text-left">ACCION</th>
          </thead>
          <tbody>
            {data
              .filter((user) => {
                return filter.toLowerCase() === ""
                  ? user
                  : user.usu_nombre
                      .toLowerCase()
                      .includes(filter.toLowerCase());
              })
              .map((user, index) => {
                return (
                  <tr key={index} className=" ">
                    <td className="pr-12 pl-4 py-2.5 text-sm">
                      {concatNombre(
                        user.usu_nombre,
                        user.usu_apellidoPaterno,
                        user.usu_apellidoMaterno
                      )}
                    </td>
                    <td className="pr-12 pl-4 py-2.5 text-sm">{user.usu_sexo}</td>
                    <td className="pr-12 pl-4 py-2.5 text-sm">{user.usu_telefono}</td>
                    <td className="pr-12 pl-4 py-2.5 text-sm">{user.usu_direccion}</td>
                    <td className="pr-12 pl-4 py-2.5 text-sm">{user.usu_rfc}</td>
                    <td className="pr-12 pl-4 py-2.5 text-sm">{parseRol(user.usu_rol)}</td>
                    <td className="pr-12 pl-4 py-2.5 text-sm">{user.usu_idGerenteAlta}</td>
                    <td className="pr-12 pl-4 py-2.5 text-sm">{user.usu_fechaAlta}</td>
                    <td className="pr-12 pl-4 py-2.5 text-sm">
                      {
                        <Link
                          className="text-blue-600 font-medium "
                          to="/usuarios/usuario"
                          state={user}
                        >
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
