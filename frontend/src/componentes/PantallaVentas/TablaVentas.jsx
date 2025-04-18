import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TablaVentas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8081/ventas")
      .then((res) => {
        setVentas(res.data);
      })
      .catch((err) => console.log(err));
  });

  const parsePago = (tipoPago) => {
    const object = {
      e: "Efectivo",
      t: "Tarjeta",
      b: "Transferencia",
    };
    return object[tipoPago] || "desconocido";
  };

  return (
    <div className="h-[530px] overflow-y-scroll">
      <table className="table-fixed">
        <thead>
          <th className="text-start px-4 text-sm w-56 bg-blue-100">ID de Venta</th>
          <th className="text-start px-4 text-sm w-32 bg-blue-100">Subtotal</th>
          <th className="text-start px-4 text-sm w-24 bg-blue-100">Tipo de Pago</th>
          <th className="text-start px-4 text-sm w-44 bg-blue-100">Nombre de Cliente</th>
          <th className="text-start px-4 text-sm w-36 bg-blue-100">Usuario Responsable</th>
          <th className="text-start px-4 text-sm w-32 bg-blue-100">Fecha de Venta</th>
          <th className="text-start px-4 text-sm w-28 bg-blue-100">Cancelada</th>
          <th className="text-start px-4 w-32 bg-blue-100"></th>
        </thead>
        <tbody>
          {ventas.map((venta) => {
            return (
              <tr className="text-sm">
                <td className=" py-3">{venta.ve_id}</td>
                <td className="px-4 py-3">{`$${venta.ve_total}`}</td>
                <td className="px-4 py-3">{parsePago(venta.ve_tipoPago)}</td>
                <td className="px-4 py-3">{venta.cli_nombre}</td>
                <td className="px-4 py-3">{venta.usu_nombreUsuario}</td>
                <td className="px-4 py-3">{venta.ve_fecha.slice(0, 10)}</td>
                <td className="px-4 py-3">{venta.ve_estaCancelada === 0 ? "No" : "Si"}</td>
                <td className="py-3">{<Link to={"venta"} state={venta} className="text-blue-600 hover:underline">Más información</Link>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TablaVentas;
