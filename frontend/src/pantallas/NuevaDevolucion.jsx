import React, { useState } from "react";
import axios from "axios";
import { Banknote, Barcode, ContactRound, CreditCard, icons, Landmark, UserRound } from "lucide-react";
import ModalDevolucion from "../componentes/PantallaNuevaDevolucion/ModalDevolucion";
import { useNavigate } from "react-router-dom";

function NuevaDevolucion() {
  const [open, setOpen] = useState(false);
  const [canAdd, setCanAdd] = useState(true);
  const [dataVenta, setDataVenta] = useState({
    venta: {},
    productos: [],
  });

  const [idVenta, setIDventa] = useState("");

  const [dataDevolucion, setDataDevolucion] = useState({
    devolucion: {},
    productos: [],
  });

  console.log(dataVenta.venta);
  const handleDevolucion = () => {
    if (dataDevolucion.productos.length === 0) {
      alert("Agrega productos antes de realizar la devolucion");
      return;
    }
    const fecha = new Date().toJSON().slice(0, 10);
    const empleado = JSON.parse(localStorage.getItem("empleado"));
    const data = {
      dev_id: `dv${fecha}-${dataVenta.venta.cli_nombre.replace(" ", "")}-${calculateMontoDevuelto()}`.slice(0, 30),
      ve_id: dataVenta.venta.ve_id,
      dev_fecha: fecha,
      usu_id: empleado.usu_id,
      dev_montoDevuelto: calculateMontoDevuelto(),

      productos: dataDevolucion.productos.map((producto) => ({
        pro_id: producto.pro_id,
        prodev_cantidad: producto.prodev_cantidad,
        prodev_motivo: producto.prodev_motivo,
        prodev_defectuoso: producto.prodev_defectuoso,
        proven_cantidad: producto.proven_cantidad,
      })),
    };
    axios
      .post("http://localhost:8081/devoluciones/nueva", data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    console.log(data);
  };

  function calculateMontoDevuelto() {
    const total = dataDevolucion.productos.reduce(
      (sum, producto) => sum + parseFloat(producto.costoUnitario) * producto.prodev_cantidad,
      0.0
    );
    return parseFloat(total.toFixed(2));
  }

  const handleProducto = (prod) => {
    if (dataDevolucion.productos.find((producto) => producto.pro_id === prod.pro_id)) {
      alert("Producto ya agregado");
      return;
    }
    if (canAdd) {
      setDataDevolucion((prev) => ({
        ...prev,
        productos: [...prev.productos, { ...prod, prodev_cantidad: 1, prodev_motivo: "", prodev_defectuoso: false }],
      }));
    }
  };

  const handleCantidadDevolucion = (productoID, cantidad) => {
    setDataDevolucion((prev) => ({
      ...prev,
      productos: prev.productos.map((producto) =>
        producto.pro_id === productoID ? { ...producto, prodev_cantidad: parseInt(cantidad) } : producto
      ),
    }));
  };

  const handleMotivo = (prod, motivo) => {
    setDataDevolucion((prev) => ({
      ...prev,
      productos: prev.productos.map((producto) =>
        producto.pro_id === prod.pro_id ? { ...producto, prodev_motivo: motivo } : producto
      ),
    }));
  };
  const handleDefectuoso = (productoID) => {
    const input = document.getElementById("defectuoso");
    if (input.checked) {
      setDataDevolucion((prev) => ({
        ...prev,
        productos: prev.productos.map((producto) =>
          producto.pro_id === productoID ? { ...producto, prodev_defectuoso: true } : producto
        ),
      }));
      return;
    }

    if (!input.checked) {
      setDataDevolucion((prev) => ({
        ...prev,
        productos: prev.productos.map((producto) =>
          producto.pro_id === productoID ? { ...producto, prodev_defectuoso: false } : producto
        ),
      }));
      return;
    }
  };

  const requestVenta = () => {
    axios
      .post("http://localhost:8081/ventas/venta", { ve_id: idVenta })
      .then((res) => {
        // setDataVenta(res.data)
        // if(res.dat)
        if (res.data.venta.dev_id) {
          setOpen(true);
          setCanAdd(false);
          // disableButton();
          const btn = document.getElementById("sub_dev");
          btn.disabled = true;
          btn.style.opacity = 0.2;
        }
        setDataVenta(res.data);
      })
      .catch((err) => console.log(err));
  };

  const disableButton = () => {
    // const btn = document.getElementById("sub_dev")
    // btn.disabled = true;
    // btn.style.opacity = 0.2
  };

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
          <div className="px-3 bg-green-200 flex flex-col h-full justify-between">
            <div>
              <p className="font-medium">Productos a devolver</p>
            </div>

            {/* PRODUCTOS A DEVOLVER */}
            <div className="space-y-2 h-[300px] bg-blue-100">
              {dataDevolucion.productos.length > 0 ? (
                dataDevolucion.productos.map((producto) => {
                  return (
                    <div className="grid grid-cols-12 gap-2">
                      {/* IMAGEN */}
                      <div className="col-span-2">
                        <img src={`/images/${producto.pro_codigo}.webp`} alt="" className="w-12 h-12 object-contain" />
                      </div>
                      {/* NOMBRE */}
                      <div className="col-span-3">
                        <p className="text-sm">{`${producto.pro_nombre}`}</p>
                      </div>
                      {/* CANTIDAD A DEVOLVER */}
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={producto.prodev_cantidad}
                          id="prodev_cantidad"
                          onInput={(e) => {
                            console.log(dataDevolucion);
                            handleCantidadDevolucion(producto.pro_id, e.target.value);
                          }}
                          className="w-full min-w-0 text-sm"
                        />
                      </div>
                      {/* MOTIVO DEVOLUCION */}
                      <textarea
                        type="text"
                        name="prodev_motivo"
                        className="resize-none col-span-4 text-sm"
                        onInput={(e) => handleMotivo(producto, e.target.value)}
                      />

                      {/* DEFECTUOSO */}
                      <div className="flex flex-col items-end justify-center">
                        <input
                          type="checkbox"
                          id="defectuoso"
                          name="prodev_defectuso"
                          value={true}
                          onChange={() => handleDefectuoso(producto.pro_id)}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div></div>
              )}
            </div>

            <div className="flex w-full justify-center">
              <button
                id="sub_dev"
                onClick={handleDevolucion}
                className="bg-blue-700 text-white font-semibold px-8 py-1.5 rounded-xl"
              >
                Devolver
              </button>
            </div>
          </div>
        </div>
      </div>
      <ModalDevolucion
        open={open}
        header={"OJO"}
        text={"Esta venta ya está asociada a una devolucion"}
        onClose={() => setOpen(false)}
        // icon={<}
        data={{ ve_id: dataVenta.venta.ve_id, dev_id: dataVenta.venta.dev_id }}
      />
    </div>
  );
}

export default NuevaDevolucion;
