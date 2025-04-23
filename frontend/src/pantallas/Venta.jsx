import React, { useEffect, useState, useRef } from "react";
import Header from "../componentes/PantallaVenta/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Banknote, Barcode, ContactRound, CreditCard, Landmark, UserRound } from "lucide-react";

import html2pdf from "html2pdf.js";
import TicketVenta from "./TicketVenta";

function Venta() {
  const location = useLocation();
  const ticketRef = useRef(null);
  const objTipoPago = {
    e: {
      Tipo: "Efectivo",
      Icono: <Banknote className="w-4 h-4" />,
    },
    t: {
      Tipo: "Tarjeta",
      Icono: <CreditCard className="w-4 h-4" />,
    },
    b: {
      Tipo: "Transferencia",
      Icono: <Landmark className="w-4 h-4" />,
    },
  };

  const [dataVenta, setDataVenta] = useState({
    ...location.state,
    productos: [],
  });


  useEffect(() => {
    const ve_id = dataVenta.ve_id;
    axios
      .post("http://localhost:8081/ventas/venta", { ve_id: ve_id })
      .then((res) =>  setDataVenta((prev) => (
        { ...prev, 
          productos: res.data.productos, 
          ve_fecha : res.data.venta.ve_fecha,
          cli_nombre: res.data.venta.cli_nombre,
          usu_nombreUsuario: res.data.venta.usu_nombreUsuario
        })))
      .catch((err) => console.log(err));
  },[]);

  const handleTicket = () => {
    const imprime = ticketRef.current;
    if (!imprime) return;

    html2pdf()
      .from(imprime)
      .outputPdf("blob")
      .then((pdfBlob) => {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
      });
  };
  console.log(dataVenta)

  return (
    <div className="bg-slate-100">
      <Header />

      <div className="w-full px-8">
        {/*ID Y FECHA */}
        <div className="w-full mb-4">
          <p className="text-xl font-medium">{`ID de Venta: ${dataVenta.ve_id}`}</p>
          <p className="text-sm text-gray-400">
            {`${dataVenta.ve_fecha.slice(0, 10)} a las ${dataVenta.ve_fecha.slice(11, 19)}`}
          </p>
        </div>

        <div className=" grid grid-cols-12 gap-8 ">
          {/* PRODUCTOS */}
          <div
            className="h-[300px] overflow-y-scroll col-span-9
                      [&::-webkit-scrollbar]:w-2
                      [&::-webkit-scrollbar-track]:rounded-full
                      [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-blue-200
                    [&::-webkit-scrollbar-thumb]:bg-blue-400"
          >
            {dataVenta.productos.map((producto) => {
              return (
                <div className="px-4 py-2 border-b shadow-sm">
                  <p className="flex gap-2 text-sm items-center">
                    {<Barcode className="w-4 h-4" />}
                    {producto.pro_codigo}
                  </p>
                  <div className="flex space-x-6 justify-between items-center">
                    <div className="flex space-x-3">
                      <img src={`/images/${producto.pro_codigo}.webp`} alt="" className="w-16 h-16" />
                      <div>
                        <p className="font-medium">{producto.pro_nombre}</p>
                        <p className="text-xs text-gray-500">{producto.pro_marca}</p>
                      </div>
                    </div>
                    <div className="flex h-fit">
                      <p className="w-28 text-end">{`${producto.proven_cantidad} x $${producto.costoUnitario}`}</p>
                      <p className="w-32 text-end ">{`$${producto.total}`}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* INFORMACIÓN VENTA*/}

          <div className="col-span-3 space-y-8">
            <div className="flex-col space-y-2">
              <p className="font-medium">Cliente</p>
              <p className="text-sm flex items-center gap-1.5 text-gray-500">
                <ContactRound className="w-4 h-4" />
                {dataVenta.cli_nombre}
              </p>
            </div>

            <div className="flex-col space-y-2">
              <p className="font-medium">Empleado</p>
              <p className="text-sm flex items-center gap-1.5 text-gray-500">
                <UserRound className="w-4 h-4" />
                {dataVenta.usu_nombreUsuario}
              </p>
            </div>

            <div className="flex-col space-y-2">
              <p className="font-medium">Tipo de Pago</p>
              <p className="text-sm flex items-center gap-1.5 text-gray-500">
                {objTipoPago[dataVenta.ve_tipoPago]?.Icono}
                {objTipoPago[dataVenta.ve_tipoPago]?.Tipo}
              </p>
            </div>
          </div>

          {/*DATOS TOTAL Y DECUENTOS*/}
          <div className="col-span-9 space-y-2">
            <p className="font-medium text-lg">Resumen de venta</p>
            <div className="pl-4 space-y-1">
              <div className="flex w-full justify-between">
                <p className="text-base">Subtotal: </p>
                <p className="text-base">{`$${dataVenta.ve_total}`}</p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-base">Descuentos: </p>
                <p className="text-base">{`$0.00`}</p>
              </div>
              <div className="flex w-full justify-between">
                <p className="text-base">Total: </p>
                <p className="text-base">{`$${dataVenta.ve_total}`}</p>
              </div>
            </div>
          </div>

          <div className=" col-span-3 space-y-6 text-white flex-col justify-end items-end pt-6 pl-2">
            <button
              onClick={handleTicket}
              state={dataVenta}
              className="font-semibold px-6 py-1.5 bg-blue-600 w-48 h-fit rounded-lg"
            >
              Generar Ticket
            </button>
            <button className="font-semibold px-6 py-1.5 bg-blue-600 w-48 h-fit rounded-lg">Generar Factura</button>

            <TicketVenta ref={ticketRef} data={dataVenta} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Venta;
