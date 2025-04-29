import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Tablausuarios({ status, filtro }) {
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
  console.log(filtro);

  return (
    <div className="w-full justify-center flex mt-4">
      <div className="overflow-hidden w-full max-w-6xl">
        {/*<input type="text" onChange={(e) => setFilter(e.target.value)} />*/}
        <table className="table-auto mx-auto text-sm">
          <thead className="text-slate-500 font-normal text-xs bg-blue-100">
            <th className="p-2.5">NOMBRE</th>
            <th className="p-2.5">TELÉFONO</th>
            <th className="p-2.5">DIRECCIÓN</th>
            <th className="p-2.5">RFC</th>
            <th className="p-2.5">ROL</th>
            <th className="p-2.5">GERENTE ALTA</th>
            <th className="p-2.5">FECHA ALTA</th>
            <th className="p-2.5">ACCIÓN</th>
          </thead>
          <tbody>
            {data
              .filter((user) => user.usu_estaActivo === status)
              .filter((user) =>
                filtro === ""
                  ? user
                  : `${user.usu_nombre}${user.usu_apellidoPaterno}${user.usu_apellidoMaterno}`
                      .toLowerCase()
                      .includes(filtro.toLowerCase())
              )
              .map((user, index) => {
                return (
                  <tr key={index} className="text-sm group hover:bg-blue-100 transition-all duration-200">
                    <td className="px-6 py-2 group-hover:text-blue-800">
                      {concatNombre(user.usu_nombre, user.usu_apellidoPaterno, user.usu_apellidoMaterno)}
                    </td>
                    <td className="px-6 py-2 group-hover:text-blue-800">{user.usu_telefono}</td>
                    <td className="px-6 py-2 group-hover:text-blue-800">{user.usu_direccion}</td>
                    <td className="px-6 py-2 group-hover:text-blue-800">{user.usu_rfc}</td>
                    <td className="px-6 py-2 group-hover:text-blue-800">{parseRol(user.usu_rol)}</td>
                    <td className="px-6 py-2 group-hover:text-blue-800">{user.gerenteAlta}</td>
                    <td className="px-6 py-2 group-hover:text-blue-800">
                      {user.usu_fechaAlta ? user.usu_fechaAlta.slice(0, 10) : "Fecha no disponible"}
                    </td>
                    <td className="px-6 py-2 group-hover:text-blue-800">
                      {
                        <Link className="hover:underline text-blue-700 font-medium" to="/usuarios/editar" state={user}>
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
    </div>
  );
}

export default Tablausuarios;
