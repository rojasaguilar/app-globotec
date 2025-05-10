import React, { useState, useEffect } from "react";
import HeaderEditarProveedor from "../componentes/PantallaEditarProveedor/HeaderEditarProveedor";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Banknote, Barcode, ContactRound, CreditCard, Landmark, PackageMinus, UserRound } from "lucide-react";

function Devolucion() {
  const location = useLocation();


  const [devolucion, setDevolucion] = useState({});
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
console.log(location.state)
  return (
    <div>
      <HeaderEditarProveedor />
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-red-100">
          {isEmpty(venta) ? (
            <div>vacio</div>
          ) : (
            <div className="p-4">
              <p>Venta</p>
              {/* INFORMACION CLIENTE USUARIO TIPOPAGO */}
              <div className="flex w-full justify-between">
                <div className="flex items-center space-x-1">
                  <ContactRound strokeWidth={1.5} />
                  <p>{venta.venta.cli_nombre}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <UserRound strokeWidth={1.5} />
                  <p>{venta.venta.usu_nombreUsuario}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {objTipoPago[venta.venta.ve_tipoPago]?.Icono}
                  <p>{objTipoPago[venta.venta.ve_tipoPago]?.Tipo}</p>
                </div>
              </div>
              <p className="text-sm">{`${venta.venta.ve_fecha.slice(0, 10)} a las ${venta.venta.ve_fecha.slice(
                11,
                16
              )}`}</p>
              {/* PRODUCTOS */}
              <div className="h-[250px] bg-white">
              {venta.productos?.map((producto) => (
                  <div className="flex bg-red-400 items-center">
                    <div className="flex flex-col">
                      <div className="flex space-x-1 items-center">
                        <Barcode className="w-3 h-3" />
                        <p className="text-xs"> {producto.pro_codigo}</p>
                      </div>

                      <img src={`/images/${producto.pro_codigo}.webp`} alt="" className="w-12 h-12 object-contain" />
                    </div>
                    <p className="w-28 bg-blue-100 text-sm">{`${producto.proven_cantidad} x ${producto.costoUnitario}`}</p>
                    <p className="text-sm">{producto.total}</p>
                  </div>
                ))}
              </div>
               {/* TOTAL Venta */}
               <p>{`Total de la venta: $${venta.venta.ve_total}`}</p>
            </div>
          )}
        </div>
        <div className="bg-green-200">
          {isEmpty(devolucion) ? (
            <div>vacio</div>
          ) : (
            <div className="p-4">
              devolucion
              <div className="flex flex-col">
                {/* USUARIO RESPONSABLE */}
                <div className="flex space-x-1">
                  <UserRound />
                  <p>{devolucion.usuarioResponsable}</p>
                </div>
                {/* FECHA */}
                <p className="text-sm">{`${devolucion.dev_fecha.slice(0, 10)} a las ${devolucion.dev_fecha.slice(
                  11,
                  16
                )}`}</p>

                {/* PRODUCTOS */}
                <div className="h-[250px] bg-white">
                  {devolucion.productos?.map((producto) => (
                    <div className="flex bg-red-400 items-center">
                      <div className="flex flex-col">
                        <div className="flex space-x-1 items-center">
                          <Barcode className="w-3 h-3" />
                          <p className="text-xs"> {producto.pro_codigo}</p>
                        </div>
                        <img src={`/images/${producto.pro_codigo}.webp`} alt="" className="w-12 h-12 object-contain" />
                      </div>
                      <p className="w-28 bg-blue-100 text-sm">{`${producto.prodev_cantidad} x ${producto.pro_precio}`}</p>
                      <p className="text-sm">{parseFloat(producto.pro_precio * producto.prodev_cantidad)}</p>
                      <PackageMinus className={producto.prodev_defectuoso === 1 ? "" : "hidden"} />
                    </div>
                  ))}
                </div>
                {/* TOTAL DEVUELTO */}
                <p>{`Monto devuelto: $${devolucion.dev_montoDevuleto}`}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Devolucion;
