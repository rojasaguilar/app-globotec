import React, { useState, useEffect } from "react";
import axios from "axios";
import { Banknote, Barcode, ContactRound, CreditCard, Landmark, UserRound } from "lucide-react";

function NuevaDevolucion() {
  const [dataVenta, setDataVenta] = useState({
    venta: {},
    productos: [],
  });

  const [idVenta, setIDventa] = useState("");

  const [dataDevolucion, setDataDevolucion] = useState({
    devolucion: {},
    productos: [],
  });

  const handleDevolucion = () => {
    if (dataDevolucion.productos.length === 0) {
      alert("Agrega productos antes de realizar la devolucion");
      return;
    }
    const data = {
      devolucion: {
        dev_id: "",
        ve_id: dataVenta.venta.ve_id,
        dev_fecha: "",
        dev_motivo: "",
        dev_montoDevuelto: calculateMontoDevuelto(),
      },
      productos: [...dataDevolucion.productos],
    };
    console.log(data);
    // axios
    //   .post("", data)
    //   .then((res) => {})
    //   .catch((err) => console.log(err));
  };

  function calculateMontoDevuelto() {
    const total = dataDevolucion.productos.reduce(
      (sum, producto) => sum + parseFloat(producto.costoUnitario) * producto.prodev_cantidad,
      0.0
    );
    return total;
  }

  const handleProducto = (prod) => {
    if (dataDevolucion.productos.find((producto) => producto.pro_id === prod.pro_id)) {
      alert("Producto ya agregado");
      return;
    }
    setDataDevolucion((prev) => ({
      ...prev,
      productos: [...prev.productos, { ...prod, prodev_cantidad: 1 }],
    }));
  };

  const handleCantidadDevolucion = (productoID, cantidad) => {
    setDataDevolucion((prev) => ({
      ...prev,
      productos: prev.productos.map((producto) =>
        producto.pro_id === productoID ? { ...producto, prodev_cantidad: parseInt(cantidad) } : producto
      ),
    }));
  };

  const requestVenta = () => {
    axios
      .post("http://localhost:8081/ventas/venta", { ve_id: idVenta })
      .then((res) => setDataVenta(res.data))
      .catch((err) => console.log(err));
    console.log(dataVenta);
  };

  console.log(dataDevolucion);

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

  return (
    <div className="px-8 py-2 bg-white">
      {/* HEADER BUSCADOR DE VENTA */}
      <div className="bg-red-100  grid grid-cols-2">
        <div className="w-full flex-col bg-blue-100">
          <p>ID venta</p>
          <input type="text" className="w-3/4" onChange={(e) => setIDventa(e.target.value)} />
        </div>
        <div className="bg-green-100">
          <button onClick={requestVenta} className="px-8 py-1.5 bg-blue-600 rounded-xl text-white font-semibold">
            {" "}
            Buscar venta
          </button>
        </div>
      </div>

      {/* CUERPO DE LA VENTA */}
      <div className="grid grid-cols-8 gap-2">
        {dataVenta.productos.length > 0 ? (
          <div className="col-span-5">
            {/*ID Y FECHA */}
            <div className=" bg-red-100">
              {/* <p className="text-xl font-medium">{`ID de Venta: ${dataVenta.venta.ve_id}`}</p>
            <p className="text-sm text-gray-400">
              {`${dataVenta.venta.ve_fecha.slice(0, 10)} a las ${dataVenta.venta.ve_fecha.slice(11, 19)}`}
            </p> */}

              {/*DATOS CLIENTE, EMPLEADO Y TIPO PAGO*/}
              <div className="flex justify-between">
                <div className="flex-col space-y-1">
                  <p className="font-medium">Cliente</p>
                  <p className="text-sm flex items-center gap-1.5 text-gray-500">
                    <ContactRound className="w-4 h-4" />
                    {dataVenta.venta.cli_nombre}
                  </p>
                </div>

                <div className="flex-col space-y-1">
                  <p className="font-medium">Empleado</p>
                  <p className="text-sm flex items-center gap-1.5 text-gray-500">
                    <UserRound className="w-4 h-4" />
                    {dataVenta.venta.usu_nombreUsuario}
                  </p>
                </div>

                <div className="flex-col space-y-1">
                  <p className="font-medium">Tipo de Pago</p>
                  <p className="text-sm flex items-center gap-1.5 text-gray-500">
                    {objTipoPago[dataVenta.venta.ve_tipoPago]?.Icono}
                    {objTipoPago[dataVenta.venta.ve_tipoPago]?.Tipo}
                  </p>
                </div>
              </div>

              {/* PRODUCTOS */}
              <div className=" grid grid-cols-12 gap-8 bg-blue-200">
                <div
                  className="h-[230px] overflow-y-scroll col-span-12
                      [&::-webkit-scrollbar]:w-2
                      [&::-webkit-scrollbar-track]:rounded-full
                      [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-blue-200
                    [&::-webkit-scrollbar-thumb]:bg-blue-400"
                >
                  {dataVenta.productos.map((producto) => {
                    return (
                      <div onClick={() => handleProducto(producto)} className="px-4 py-2 border-b shadow-sm">
                        <p className="flex gap-2 text-sm items-center">
                          {<Barcode className="w-4 h-4" />}
                          {producto.pro_codigo}
                        </p>
                        <div className="flex space-x-6 justify-between items-center">
                          <div className="flex space-x-3">
                            <img
                              src={`/images/${producto.pro_codigo}.webp`}
                              alt=""
                              className="w-12 h-12 object-contain"
                            />
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

                {/*DATOS TOTAL Y DECUENTOS*/}
                <div className="col-span-12 space-y-2">
                  <p className="font-medium text-lg">Resumen de venta</p>
                  <div className="pl-4 space-y-1">
                    <div className="flex w-full justify-between">
                      <p className="text-base">Subtotal: </p>
                      <p className="text-base">{`$${dataVenta.venta.ve_total}`}</p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="text-base">Descuentos: </p>
                      <p className="text-base">{`$0.00`}</p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="text-base">Total: </p>
                      <p className="text-base">{`$${dataVenta.venta.ve_total}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-span-3"></div>
        )}
        <div className="col-span-3 col-start-6 bg-amber-400">
          <div className="px-3 bg-green-200 flex flex-col">
            <div>
              <p className="font-medium">Productos a devolver</p>
            </div>

            {/* PRODUCTOS A DEVOLVER */}
            {dataDevolucion.productos.length > 0 ? (
              dataDevolucion.productos.map((producto) => {
                return (
                  <div className="flex justify-between">
                    <img src={`/images/${producto.pro_codigo}.webp`} alt="" className="w-12 h-12 object-contain" />
                    <p>{`${producto.pro_nombre}`}</p>
                    <input
                      type="number"
                      value={producto.prodev_cantidad}
                      id="prodev_cantidad"
                      onInput={(e) => {
                        handleCantidadDevolucion(producto.pro_id, e.target.value);
                      }}
                    />

                    <form action="">
            {/* <input type="radio" onChange={}/> */}
          </form>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}

            <div>
              <button onClick={handleDevolucion} className="bg-blue-700 text-white font-semibold">
                Devolver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevaDevolucion;
