import React, { useState, useEffect } from "react";
import ListadoProductoVentas from "../componentes/ListadoProductoVentas";
import TipoPago from "../componentes/pantallaNuevaVenta/TipoPago";
import SelectClientes from "../componentes/pantallaNuevaVenta/SelectClientes";
import Header from "../componentes/pantallaNuevaVenta/Header";
import axios from "axios";
import Modal from "../componentes/pantallaNuevaVenta/Modal";
import { data, useNavigate } from "react-router-dom";
import { Delete } from "lucide-react";
import { Banknote, CreditCard, SmartphoneNfc } from "lucide-react";

function NuevaVenta() {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(true);
  const [prodStockInsuficiente, setProdStockInsuficiente] = useState([]);

  const empleado = JSON.parse(localStorage.getItem("empleado"));
  const navigate = useNavigate();

  const unChecked = "border border-gray-400  py-2 px-4 rounded-xl flex flex-col justify-center items-center"
  const checked = "border-2 border-blue-500  py-2 px-4 rounded-xl flex flex-col justify-center items-center"

  const [dataVenta, setDataVenta] = useState({
    ve_id: "",
    ve_total: 0,
    cli_id: 0,
    usu_id: empleado.usu_id,
    ve_tipoPago: "e",
    productos: [],
  });

  console.log(dataVenta)

  useEffect(() => {
    handleSum();
  }, [productos]);

  const procesarVenta = () => {
    if (productos.length === 0) {
      alert("Agrega productos antes de realizar la venta");
      return;
    }
    const date = new Date().toJSON().slice(0, 10);
    let str = `${Math.random()}`.slice(2);
    const venta = {
      ...dataVenta,
      ve_id: `${date}-${empleado.usu_id}-${dataVenta.cli_id}-${total}-${str}`.slice(0, 30),
      ve_total: total,
      usu_id: empleado.usu_id,
      ve_fecha: date,
      productos: productos,
    };
    console.log(venta)
    mandarPeticion(venta);
  };

  const mandarPeticion = (venta) => {
    axios
      .post("http://localhost:8081/venta/agregar", venta)
      .then((res) => {
        if (res.data[0][0].mensaje === "venta realizada") {
          alert("Venta realizada");
          navigate("/ventas/venta", { state: venta });
          return;
        } else {
          setProdStockInsuficiente(res.data[0]);
          console.log(prodStockInsuficiente);
          setOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = (producto) => {
    setProductos([...productos, producto]);
    setTotal((prev) => parseFloat((prev + parseFloat(producto.pro_precio) * producto.prod_cantidad).toFixed(2)));
  };

  console.log(productos);
  const handleSum = () => {
    setTotal(
      parseFloat(
        productos
          .reduce((sum, producto) => {
            const precio = parseFloat(producto.pro_precio);
            return sum + producto.pro_cantidad * precio;
          }, 0)
          .toFixed(2)
      )
    );
  };

  const handleCantidad = (productoId, cantidad) => {
    setProductos((prevProductos) => {
      return prevProductos.map((producto) => {
        if (producto.pro_id === productoId) {
          return { ...producto, pro_cantidad: parseInt(cantidad) };
        }
        return producto;
      });
    });
  };

  const eliminarProducto = (productoID) => {
    setProductos(productos.filter((p) => p.pro_id !== productoID));
  };

  return (
    <div className="w-full bg-white">
      <Header />
      <div className="w-full grid grid-cols-6 gap-4">
        {/*COLUMNA 1*/}
        <div className="w-full col-span-4">
          <div className="w-full pr-2">
            <ListadoProductoVentas handleAdd={handleAdd} productos={productos} />
          </div>
        </div>
        {/*COLUMNA 2*/}
        <div className="w-full  col-span-2 space-y-4 pr-4">
          <div className="w-full">
            <div className="w-full flex border-t-8 border-t-blue-600 px-4">
              <p className=" w-full font-semibold pt-2 pb-3">Detalles de la orden</p>
            </div>
            <div
              className="space-y-3 h-[200px] overflow-y-scroll pr-2
                      [&::-webkit-scrollbar]:w-2
                      [&::-webkit-scrollbar-track]:rounded-full
                      [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-blue-200
                    [&::-webkit-scrollbar-thumb]:bg-blue-400"
            >
              {productos.map((producto) => {
                return (
                  <div className="w-full flex justify-around border-b pb-1.5 items-center">
                    <img src={`/images/${producto.pro_codigo}.webp`} className="w-10" />
                    <p className="text-sm w-12">{producto.pro_nombre}</p>
                    <p className="text-sm w-12">{`$${producto.pro_precio}`}</p>
                    <input
                      type="number"
                      min={1}
                      value={producto.pro_cantidad}
                      className="w-12 bg-gray-100"
                      onInput={(e) => handleCantidad(producto.pro_id, e.target.value)}
                    />
                    <button onClick={handleSum}>ok</button>
                    <div>
                      <button className="flex items-center" onClick={() => eliminarProducto(producto.pro_id)}>
                        <Delete strokeWidth={1.5} size={22} />
                      </button>
                    </div>
                  </div>
                );
              })}
            
            </div>
          </div>
          {/* METODO DE PAGO */}
          <div className=" grid grid-cols-3 p-3 border border-blue-500 rounded-xl gap-2">
            <div className={dataVenta.ve_tipoPago === 'e'? checked: unChecked}
            onClick={()=> setDataVenta({...dataVenta, ve_tipoPago: 'e'})}>
              <Banknote size={28} strokeWidth={1.5} />
              <p className="text-sm">Efectivo</p>
            </div>

            <div className={dataVenta.ve_tipoPago === 't'? checked: unChecked}
            onClick={()=> setDataVenta({...dataVenta, ve_tipoPago: 't'})}>
              <CreditCard size={28} strokeWidth={1.5} />
              <p className="text-sm">Tarjeta</p>
            </div>

            <div className={dataVenta.ve_tipoPago === 'b'? checked: unChecked}
            onClick={()=> setDataVenta({...dataVenta, ve_tipoPago: 'b'})}>
              <SmartphoneNfc size={28} strokeWidth={1.5} />
              <p className="text-sm">Transferencia</p>
            </div>
          </div>
          <button onClick={procesarVenta} className="bg-blue-700 text-white font-semibold py-1 px-8 rounded-xl">
            Crear venta
          </button>
          <SelectClientes handleCliente={(cli_id) => setDataVenta({...dataVenta, cli_id: cli_id})}/>
          <p>{total}</p>
          <Modal open={open} onClose={() => setOpen(false)} productos={prodStockInsuficiente} />
        </div>
      </div>
    </div>
  );
}

export default NuevaVenta;
