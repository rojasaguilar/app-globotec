import React, { useState, useEffect } from "react";
import axios from "axios";

function TablaFlujoDinero() {
  const [data, setData] = useState([]);

  function parseTipo(tipo) {
    const tipos = {
      v: "venta",
      d: "devolucion",
      r: "retiro de caja registradora",
      i: "ingreso a caja registradora",
    };

    return tipos[tipo] || "undefined";
  }

  useEffect(() => {
    axios
      .post("http://localhost:8081/entradassalidas")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  if (JSON.parse(localStorage.getItem("empleado")).usu_rol === "g") {
    return (
      <div className="px-4 h-[500px] overflow-y-scroll">
        <table className="table-fixed">
          <thead className="">
            <th className="w-32 pr-4 pb-4 text-sm text-start">Tipo</th>
            <th className="w-40 px-4 pb-4 text-sm">Cantidad</th>
            <th className="w-80 px-4 pb-4 text-sm text-start">Motivo</th>
            <th className="w-32 px-4 pb-4 text-sm">Usuario Responsable</th>
            <th className="w-60 px-4 pb-4 text-sm">Fecha</th>
            <th className="w-8  px-4 pb-4 text-sm">Cancelada</th>
            <th className="w-12 pl-4 pb-4 text-sm">Entrada/Salida</th>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr className="">
                  <td className="pr-4 pb-4 text-sm text-start">{parseTipo(item.entsal_tipo)}</td>
                  <td className="px-4 pb-4  text-sm text-center">{`$${item.entsal_cantidad}`}</td>
                  <td className="px-4 pb-4  text-sm text-start">{item.entsal_motivo}</td>
                  <td className="px-4 pb-4  text-sm text-center">{item.usu_nombreUsuario}</td>
                  <td className="px-4 pb-4  text-sm text-center">
                    {item.entsal_fecha ? item.entsal_fecha.slice(0, 10) : "no disponible"}
                  </td>
                  <td className="px-4 pb-4  text-sm text-center">
                    {item.entsal_estaCancelada === 0 ? "no" : "cancelada"}
                  </td>
                  <td
                    className={
                      item.entsal_EoS == "e"
                        ? "pl-4 pb-4 text-sm text-center text-green-600"
                        : "pl-4  pb-4text-sm text-center text-red-600"
                    }
                  >
                    {item.entsal_EoS == "e" ? "Entrada" : "Salida"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TablaFlujoDinero;
