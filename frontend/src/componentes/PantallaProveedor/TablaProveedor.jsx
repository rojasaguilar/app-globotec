import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TablaProveedor({ status,filtro }) {
  const [data, setData] = useState([]);

  const entries = Object.entries;

  useEffect(() => {
    axios
      .post("http://localhost:8081/proveedores")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log("Hubo un error");
      });
      console.log(`soy filtro ${typeof(filtro)}`)
  });
  return (
    <div className="w-full justify-center flex mt-4">
      <div className="overflow-hidden w-full max-w-6xl">
        <table className="table-auto mx-auto text-sm">
          <thead className="text-slate-500 font-normal text-xs bg-blue-100">
            <th className="p-2.5">NOMBRE</th>
            <th className="p-2.5">CORREO</th>
            <th className="p-2.5">TELÉFONO</th>
            <th className="p-2.5">DIRECCIÓN</th>
            <th className="p-2.5">ESTADO</th>
            <th className="p-2.5">FECHA ALTA</th>
            <th className="p-2.5">ACCIÓN</th>
          </thead>
          <tbody>
          {data
            .filter(proveedor => {
              if (filtro === '') return true;
              const nombre = proveedor.prove_nombre.toLowerCase();
              const estado = proveedor.prove_estado.toLowerCase();
              return nombre.includes(filtro.toLowerCase()) || estado.includes(filtro.toLowerCase());
            })
            .filter((proveedor) => proveedor.prove_activo === status)
              .map((proveedor, index) => {
                return (
                  <tr key={index} className="text-sm group hover:bg-blue-100 transition-all duration-200">
                    <td className="px-6 py-2 group-hover:text-blue-800">{proveedor.prove_nombre}</td>
                    <td className="px-6 py-2 group-hover:text-blue-800">{proveedor.prove_correo}</td>
                    <td className="px-6 py-2 group-hover:text-blue-800">{proveedor.prove_telefono}</td>
                    <td className="px-6 py-2 group-hover:text-blue-800">{proveedor.prove_direccion}</td>
                    <td className="px-6 py-2 group-hover:text-blue-800">{proveedor.prove_estado}</td>
                    <td className="px-6 py-2 group-hover:text-blue-800">{proveedor.prove_fechaAlta.slice(0,10)}</td>
                    <td className="px-6 py-2 group-hover:text-blue-800">
                      {
                        <Link
                          to={`/proveedores/editar`}
                          className="hover:underline text-blue-700 font-medium"
                          state={proveedor}
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
    </div>
  );
}

export default TablaProveedor;

