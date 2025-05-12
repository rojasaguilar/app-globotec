import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Banknote, Barcode, ContactRound, CreditCard, Landmark, UserRound } from "lucide-react";
import Modal from "../componentes/ModalGlobal";
import { CheckCheck } from "lucide-react";

function NuevaDevolucion() {
  const [open,setOpen] = useState(false);
  const navigate = useNavigate();

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
      .then((res) => {
        console.log(res.data);
        setOpen(true);
        return;
      })
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
    setDataDevolucion((prev) => ({
      ...prev,
      productos: [...prev.productos, { ...prod, prodev_cantidad: 1, prodev_motivo: "", prodev_defectuoso: false }],
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
    <div className="px-8 py-8 bg-gray-50 min-h-screen space-y-8">
      {/* HEADER BUSCADOR DE VENTA */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border">
        <div className="grid grid-cols-3 gap-4 items-end">
          <div className="col-span-2">
            <p className="block text-sm font-semibold text-gray-700 mb-1">ID Venta</p>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setIDventa(e.target.value)} />
          </div>

          <div>
            <button 
              onClick={requestVenta} 
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all duration-200">
              Buscar venta
            </button>
          </div>
        </div>
      </div>

      {/* CUERPO DE LA VENTA */}
      <div className="grid grid-cols-12 gap-6">
        {dataVenta.productos.length > 0 ? (
          <div className="col-span-6 bg-white p-6 rounded-2xl shadow-md space-y-6 border">
            {/*ID Y FECHA */}
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-gray-800">Datos de la venta</h2>

              {/*DATOS CLIENTE, EMPLEADO Y TIPO PAGO*/}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cliente</p>
                  <p className="flex items-center gap-2 text-gray-700 text-sm">
                    <ContactRound className="w-4 h-4" />
                    {dataVenta.venta.cli_nombre}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Empleado</p>
                  <p className="flex items-center gap-2 text-gray-700 text-sm">
                    <UserRound className="w-4 h-4" />
                    {dataVenta.venta.usu_nombreUsuario}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Tipo de Pago</p>
                  <p className="flex items-center gap-2 text-gray-700 text-sm">
                    {objTipoPago[dataVenta.venta.ve_tipoPago]?.Icono}
                    {objTipoPago[dataVenta.venta.ve_tipoPago]?.Tipo}
                  </p>
                </div>
              </div>
            </div>

              {/* PRODUCTOS */}
              <div className="space-y-2">
                <h3 className="text-md font-semibold text-gray-800">Productos</h3>
                <div className="overflow-y-auto max-h-[250px] space-y-3 pr-2">
                  {dataVenta.productos.map((producto) => {
                    return (
                      <div 
                      onClick={() => handleProducto(producto)} 
                      className="bg-gray-100 hover:bg-gray-200 p-4 rounded-xl border shadow-sm transition cursor-pointer space-y-2">
                      
                        <p className="flex gap-2 text-sm items-center">
                          {<Barcode className="w-4 h-4" />}
                          {producto.pro_codigo}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="flex gap-3 items-center">
                            <img
                              src={`/images/${producto.pro_codigo}.webp`}
                              alt=""
                              className="w-14 h-14 object-contain rounded-md"
                            />

                            <div>
                              <p className="text-sm font-medium text-gray-800">{producto.pro_nombre}</p>
                              <p className="text-xs text-gray-500">{producto.pro_marca}</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-700">{`${producto.proven_cantidad} x $${producto.costoUnitario}`}</p>
                            <p className="text-sm font-semibold text-gray-900">{`$${producto.total}`}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            
                {/* INFORMACIÓN VENTA*/}

                {/*DATOS TOTAL Y DECUENTOS*/}
                <div className="col-span-12 pt-4 space-y-2 border-t">
                  <p className="font-medium text-lg">Resumen de venta</p>
                  <div className="pl-4 space-y-1">
                    <div className="flex w-full justify-between">
                      <p className="text-base">Subtotal: </p>
                      <p className="text-base">{`$${dataVenta.venta.ve_total}`}</p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p>Descuentos: </p>
                      <p>{`$0.00`}</p>
                    </div>
                    <div className="flex justify-between font-medium text-gray-900">
                      <p>Total: </p>
                      <p>{`$${dataVenta.venta.ve_total}`}</p>
                    </div>
                  </div>
                </div>
              </div>
        ) : (
          <div className="col-span-5"></div>
        )}
            {/* PRODUCTOS A DEVOLVER */}

              <div className="col-span-6 bg-white border rounded-2xl shadow-md p-6 flex flex-col justify-between space-y-4">
                
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  <h2 className="text-lg font-bold text-gray-800">Productos a devolver</h2>
                  <div className="grid grid-cols-12 gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-sm">
                    <div className="col-span-3 col-start-3">
                    <p className="text-xs">Nombre</p>
                    </div>
                    <div className="col-span-2 col-start-6">
                   <p className="text-xs">Cantidad</p>
                   </div>
                   <div className="col-span-3 col-start-8">
                   <p className="text-xs">Motivo</p>
                   </div>
                  <div>
                  <p className="text-xs">Defectuoso? </p>
                  </div>
                    </div>
       
                {dataDevolucion.productos.length > 0 ? (  
                  dataDevolucion.productos.map((producto) => {
                    
                    return (
                      <div className="grid grid-cols-12 gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-sm">
                        {/* IMAGEN */}
                        <div className="col-span-2">
                          <img src={`/images/${producto.pro_codigo}.webp`} alt="" className="w-12 h-12 object-contain" />
                        </div>
                        {/* NOMBRE */}
                        <div className="col-span-3">
                          <p className="text-xs">{`${producto.pro_nombre}`}</p>
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
                            className="w-full border border-gray-300 rounded-md text-sm px-2 py-1"
                          />
                        </div>
                        {/* MOTIVO DEVOLUCION */}
                        <div className="col-span-3">
                          <textarea
                            type="text"
                            name="prodev_motivo"
                            className="w-full border border-gray-300 rounded-md text-xs resize-none px-2 py-1"
                            onInput={(e) => handleMotivo(producto, e.target.value)}
                          />
                        </div>

                        {/* DEFECTUOSO */}
                        <div className="col-span-1 flex items-center justify-center col-start-12">
                          <input
                            type="checkbox"
                            id="defectuoso"
                            name="prodev_defectuoso"
                            value={true}
                            onChange={() => handleDefectuoso(producto.pro_id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-500 text-center">No hay productos seleccionados</p>
                )}
                </div>

              <div className="pt-4">
                <button
                  onClick={handleDevolucion}
                  className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all"
                >
                  Devolver
                </button>
            </div>
          </div>
        </div>
        <Modal icon={<CheckCheck size={48} color="#2dae6b" strokeWidth={2}/>} open={open} header={"DEVUELTO"} text={"Devolución Exitosa"} onClose={() => {setOpen(false); navigate("/devoluciones")}}/> 
      </div>
  );
}

export default NuevaDevolucion;