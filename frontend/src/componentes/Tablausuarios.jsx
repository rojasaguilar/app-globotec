import React, { useEffect, useState } from "react";
import axios from "axios";

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
  useEffect(() => {
    axios
      .post("http://localhost:8081/usuarios")
      .then((res) => setData(res.data))
      .catch((err) => console.log("hubo un error"));
  }, []);

  return (
    <div className="container">
      <div className="mt-2">
        <table className="table-auto">
          <thead className="text-slate-500 font-normal text-xs bg-blue-100">
            <th className="p-2.5">NOMBRE</th>
            <th className="p-2.5">SEXO</th>
            <th className="p-2.5">TELEFONO</th>
            <th className="p-2.5">DIRECCION</th>
            <th className="p-2.5">RFC</th>
            <th className="p-2.5">ROL</th>
            <th className="p-2.5">GERENTE ALTA</th>
            <th className="p-2.5">FECHA ALTA</th>
          </thead>
          <tbody>
            {data.map((user, index) => {
              return (
                <tr key={index}>
                  <td className="px-6 py-2">
                    {concatNombre(
                      user.usu_nombre,
                      user.usu_apellidoPaterno,
                      user.apellidoMaterno
                    )}
                  </td>
                  <td className="px-6 py-2">{user.usu_sexo}</td>
                  <td className="px-6 py-2">{user.usu_telefono}</td>
                  <td className="px-6 py-2">{user.usu_direccion}</td>
                  <td className="px-6 py-2">{user.usu_rfc}</td>
                  <td className="px-6 py-2">{parseRol(user.usu_rol)}</td>
                  <td className="px-6 py-2">
                    {<a href={`/usuario?${user.usu_id}`}>Editar</a>}
                  </td>
                  <td className="px-6 py-2">{user.usu_idGerenteAlta}</td>
                  <td className="px-6 py-2">{user.usu_fechaAlta}</td>
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
