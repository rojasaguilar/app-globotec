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
      <div className="">
        <table className="table-auto ">
          <thead className="text-slate-500 font-normal text-xs bg-blue-100">
            <th className="p-2.5">NOMBRE</th>
            <th className="p-2.5">CORREO</th>
            <th className="p-2.5">TELEFONO</th>
            <th className="p-2.5">DIRECCION</th>
            <th className="p-2.5">FECHA ALTA</th>
            <th className="p-2.5">ACCION</th>
          </thead>
          <tbody>
            {data
              .filter(proveedor => ( filtro === '' ?  proveedor : proveedor.prove_nombre.toLowerCase().includes(filtro.toLowerCase()) ) ) 
              .filter((proveedor) => proveedor.prove_activo === status)
              .map((proveedor, index) => {
                return (
                  <tr key={index} className="text-sm">
                    <td className="px-6 py-2">{proveedor.prove_nombre}</td>
                    <td className="px-6 py-2">{proveedor.prove_correo}</td>
                    <td className="px-6 py-2">{proveedor.prove_telefono}</td>
                    <td className="px-6 py-2">{proveedor.prove_direccion}</td>
                    <td className="px-6 py-2">{proveedor.prove_fechaAlta.slice(0,10)}</td>
                    <td className="px-6 py-2">
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


