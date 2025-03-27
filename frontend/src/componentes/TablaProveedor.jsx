import React, { useState, useEffect } from "react";
import axios from "axios";

function TablaProveedor() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8081/proveedores")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log("Hubo un error");
      });
  }, []);
  return (
    <div className="">
      <div className="mt-2">
        <table className="table-auto ">
          <thead className="text-slate-500 font-normal text-xs bg-blue-100 ">
            <th className="p-2.5">NOMBRE</th>
            <th className="p-2.5">CORREO</th>
            <th className="p-2.5">TELEFONO</th>
            <th className="p-2.5">DIRECCION</th>
            <th className="p-2.5">FECHA ALTA</th>
            <th className="p-2.5">ACCION</th>
          </thead>
          <tbody>
            {data.map((proveedor, index) => {
              return (
                <tr key={index}>
                  <td className="px-6 py-2">{proveedor.prove_nombre}</td>
                  <td className="px-6 py-2">{proveedor.prove_correo}</td>
                  <td className="px-6 py-2">{proveedor.prove_telefono}</td>
                  <td className="px-6 py-2">{proveedor.prove_direccion}</td>
                  <td className="px-6 py-2">{proveedor.prove_fechaAlta}</td>
                  <td className="px-6 py-2">
                    {
                      <a
                        href={`/proveedor?${proveedor.prove_id}`}
                        className="hover:underline text-blue-700 font-medium"
                      >
                        {" "}
                        Editar{" "}
                      </a>
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
