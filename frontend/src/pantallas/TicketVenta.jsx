import React, { useState, useEffect, forwardRef } from "react";


// function TicketVenta({visible,data}) {
const TicketVenta = forwardRef(({ data }, ref) => {

  const formaPago = {
    e: "PAGO EN EFECTIVO",
    t: "PAGO CON TARJETA",
    b: "TRANSFERENCIA BANCARIA",
  };

  const [dataVenta, setDataVenta] = useState(data);

  useEffect(() => {
    setDataVenta(data);
  });

  return (
    <div className="hidden">
      <div ref={ref} className="w-1/2 p-4">
        <div className="w-full flex justify-center items-center border-b-2 border-dashed border-black">
          <p className="text-2xl py-2">JUGUETERIA</p>
        </div>

        <div className="flex-col items-start space-y-2 py-2">
          <div className="grid grid-cols-3 w-full">
            <p>ID de Venta:</p>
            <p className="col-span-2">{dataVenta.ve_id}</p>
          </div>
          <div className="grid grid-cols-3 w-full">
            <p>Fecha:</p>
            <p className="col-span-2">{dataVenta.ve_fecha?.slice(0, 10)}</p>
          </div>
          <div className="grid grid-cols-3 w-full">
            <p>Empleado:</p>
            <p className="col-span-2">{dataVenta.usu_nombreUsuario}</p>
          </div>
        </div>

        <div className="w-full flex-col">
          <div className="flex justify-center border-t-2 border-dashed border-black">
            <p className="text-xl font-semibold py-2">FORMA DE PAGO</p>
          </div>
          <div className="flex justify-center border-b-2 border-dashed border-black">
            <p className="py-2 text-lg font-semibold">
              {formaPago[dataVenta.ve_tipoPago]}
            </p>
          </div>
        </div>

        <div className="py-2 border-b-2 border-black border-dotted">
          <table>
            <thead>
              <tr>
                <th className="text-sm text-start pr-12">Producto</th>
                <th className="text-sm text-start pr-12">Cantidad</th>
                <th className="text-sm text-start pr-12">Precio</th>
                <th className="text-sm text-start pr-12">Importe</th>
              </tr>
            </thead>
            <tbody>
              {dataVenta.productos.map((producto, index) => (
                <tr key={index}>
                  <td className="text-sm pr-12">{producto.pro_nombre}</td>
                  <td className="text-sm pr-12 text-center">{producto.proven_cantidad}</td>
                  <td className="text-sm pr-12">{`$${producto.costoUnitario}`}</td>
                  <td className="text-sm pr-12">{`$${producto.total}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="py-2">
          <div className="grid grid-cols-3 w-full">
            <p>Subtotal:</p>
            <p className="col-span-2 text-end">{`$${parseFloat(dataVenta.ve_total * 0.84).toFixed(2)}`}</p>
          </div>
          <div className="grid grid-cols-3 w-full">
            <p>IVA:</p>
            <p className="col-span-2 text-end">{`$${parseFloat(dataVenta.ve_total * 0.84 * 0.16).toFixed(2)}`}</p>
          </div>
          <div className="grid grid-cols-3 w-full">
            <p>TOTAL:</p>
            <p className="col-span-2 text-end">{`$${parseFloat(dataVenta.ve_total).toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TicketVenta;
