import React, { useState, useEffect } from "react";
import Header from "../componentes/PantallaSolicitarDevoluciones/Header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Banknote, Barcode, ContactRound, CreditCard, Landmark, PackageMinus, UserRound } from "lucide-react";

function Devolucion() {
  const location = useLocation();

  const [devolucion, setDevolucion] = useState({});
  console.log(location.state)
  const [venta, setVenta] = useState({});

  const objTipoPago = {
    e: {
      Tipo: "Efectivo",
      Icono: <Banknote />,
    },
    t: {
      Tipo: "Tarjeta",
      Icono: <CreditCard />,
    },
    b: {
      Tipo: "Transferencia",
      Icono: <Landmark />,
    },
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {
    axios
      .post("http://localhost:8081/ventas/venta", {ve_id: location.state.ve_id})
      .then((res) => setVenta(res.data))
      .catch((err) => console.log(err));

    axios
      .post("http://localhost:8081/devoluciones/devolucion",  {dev_id: location.state.dev_id})
      .then((res) =>setDevolucion(res.data))
      .catch((err) => console.log(err));
  }, []);
console.log(devolucion)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-7xl mx-auto">
        <div className="bg-white shadow-md rounded-xl p-6 border">
          {isEmpty(venta) ? (
            <p className="text-center text-gray-500">Cargando venta...</p>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-blue-800">Detalles de Venta</h2>

              {/* INFORMACION CLIENTE USUARIO TIPOPAGO */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-2 text-gray-700">
                  <ContactRound strokeWidth={1.5} />
                  <p>{venta.venta.cli_nombre}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <UserRound strokeWidth={1.5} />
                  <p>{venta.venta.usu_nombreUsuario}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  {objTipoPago[venta.venta.ve_tipoPago]?.Icono}
                  <p>{objTipoPago[venta.venta.ve_tipoPago]?.Tipo}</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">{`${venta.venta.ve_fecha.slice(0, 10)} a las ${venta.venta.ve_fecha.slice(
                11,
                16
              )}`}</p>

              {/* PRODUCTOS */}
              <div className="max-h-[250px] overflow-y-auto space-y-3">
              {venta.productos?.map((producto) => (
                  <div className="flex items-center bg-blue-50 p-2 rounded-md shadow-sm">
                    <div className="flex flex-col mr-4">
                      <div className="flex items-center text-xs text-gray-600">
                        <Barcode className="w-3 h-3 mr-1" />
                        <p className="text-xs"> {producto.pro_codigo}</p>
                      </div>

                      <img src={`/images/${producto.pro_codigo}.webp`} alt="" className="w-12 h-12 object-contain mt-1" />
                    </div>
                    <p className="text-sm space-x-2 flex items-center">{`${producto.proven_cantidad} x ${producto.costoUnitario}`}</p>
                    <p className="text-sm font-medium text-gray-700 ml-1">= {producto.total}</p>
                  </div>
                ))}
              </div>

               {/* TOTAL Venta */}
               <p className="mt-4 text-right text-lg font-semibold text-blue-700">{`Total de la venta: $${venta.venta.ve_total}`}</p>
            </div>
          )}
        </div>

        {/*SEGUNDA TARJETA*/}
        <div className="bg-white shadow-md rounded-xl p-6 border">
          {isEmpty(devolucion) ? (
            <p className="text-center text-gray-500">Cargando devolución...</p>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-green-800">Detalles de Devolución</h2>

                {/* USUARIO RESPONSABLE */}
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <UserRound strokeWidth={1.5}/>
                  <p>{devolucion.usu_nombre}</p>
                </div>

                {/* FECHA */}
                <p className="text-sm text-gray-500 mt-1">{`${devolucion.dev_fecha.slice(0, 10)} a las ${devolucion.dev_fecha.slice(
                  11,
                  16
                )}`}</p>
              
                {/* PRODUCTOS */}
                <div className="max-h-[250px] overflow-y-auto space-y-3">
                  {devolucion.productos?.map((producto) => (
                    <div className="flex items-center bg-green-50 p-2 rounded-md shadow-sm">
                      <div className="flex flex-col mr-4">
                        <div className="flex items-center text-xs text-gray-600">
                          <Barcode className="w-3 h-3 mr-1" />
                          <p className="text-xs"> {producto.pro_codigo}</p>
                        </div>
                        <img src={`/images/${producto.pro_codigo}.webp`} alt="" className="w-12 h-12 object-contain mt-1" />
                      </div>

                      <p className="text-sm space-x-2 flex items-center">{`${producto.prodev_cantidad} x ${producto.pro_precio}`}</p>
                      <p className="text-sm font-medium text-gray-700 ml-1 mr-1">= {parseFloat(producto.pro_precio * producto.prodev_cantidad)}</p>
                      <PackageMinus className={producto.prodev_defectuoso === 1 ? "" : "hidden"} />
                    </div>

                  ))}
                </div>

                {/* TOTAL DEVUELTO */}
                <p className="mt-4 text-right text-lg font-semibold text-green-700">{`Monto devuelto: $${devolucion.dev_montoDevuleto}`}</p>
              </div>
            
          )}
        </div>
      </div>
    </div>
  );
}

export default Devolucion;