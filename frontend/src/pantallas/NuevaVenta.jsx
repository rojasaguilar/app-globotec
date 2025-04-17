import React, { useState } from "react";
import ListadoProductoVentas from "../componentes/ListadoProductoVentas";
import TipoPago from "../componentes/pantallaNuevaVenta/TipoPago";
import SelectClientes from "../componentes/pantallaNuevaVenta/SelectClientes";
import Header from "../componentes/pantallaNuevaVenta/Header";
import axios from "axios";
function NuevaVenta() {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  const empleado = JSON.parse(localStorage.getItem("empleado"));

  const [dataVenta, setDataVenta] = useState({
    ve_id: "",
    ve_total: 0,
    cli_id: 2,
    usu_id: empleado.usu_id,
    ve_tipoPago: "e",
    productos: [],
  });

  const procesarVenta = () => {
    const date = new Date().toJSON().slice(0, 10);
    let str = `${Math.random()}`.slice(2);
    const venta = {
      ...dataVenta,
      ve_id: `${date}-${empleado.usu_id}-${dataVenta.cli_id}-${total}-${str}`.slice(0,30),
      ve_total: total,
      usu_id: empleado.usu_id,
      productos: productos,
    };
    console.log(venta);
    mandarPeticion(venta);
  };

  const mandarPeticion = (venta) => {
    axios
      .post("http://localhost:8081/venta/agregar", venta)
      .then((res) => {
        console.log(res);
        if (res.data[0][0].mensaje === "Venta registrada y stock actualizado") {
          alert("Venta realizada");
          window.location.reload();
        } else {
          alert("Stock insuficiente, verifica los productos");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAdd = (producto) => {
    setProductos([...productos, producto]);
    setTotal((prev) => parseFloat((prev + parseFloat(producto.prod_precio) * producto.prod_cantidad).toFixed(2)));
  };

  const handleSum = () => {
    setTotal(
      parseFloat(
        productos
          .reduce((sum, producto) => {
            const precio = parseFloat(producto.prod_precio);
            return sum + producto.prod_cantidad * precio;
          }, 0)
          .toFixed(2)
      )
    );
  };

  const handleCantidad = (productoId, cantidad) => {
    setProductos((prevProductos) => {
      return prevProductos.map((producto) => {
        if (producto.prod_id === productoId) {
          return { ...producto, prod_cantidad: parseInt(cantidad) };
        }
        return producto;
      });
    });
  };
  return (
    <div className="w-full">
      <Header />
      <div className="w-full grid grid-cols-6">
        {/*COLUMNA 1*/}
        <div className="w-full col-span-4">
          <div className="w-full ">
            <ListadoProductoVentas handleAdd={handleAdd} productos={productos} />
          </div>
        </div>
        {/*COLUMNA 2*/}
        <div className="w-full  col-span-2 space-y-2 ">
          <div className="w-full h-4/6  overflow-y-scroll">
            <div className="w-full flex border-t-8 border-t-blue-600 px-4">
              <p className=" w-full font-semibold pt-2 pb-6 mb-4 border-b border-b-slate-300">Detalles de la orden</p>
            </div>
            {productos.map((producto) => {
              return (
                <div className="w-full flex justify-around bg-red-300">
                  <p>{producto.prod_id}</p>
                  <p>{producto.prod_nombre}</p>
                  <p>{`$${producto.prod_precio}`}</p>
                  <input
                    type="number"
                    value={producto.prod_cantidad}
                    className="w-12"
                    onInput={(e) => handleCantidad(producto.prod_id, e.target.value)}
                  />
                  <button onClick={handleSum}>ok</button>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2">
            <div>
              <TipoPago handleTipoPago={(e) => setDataVenta({ ...dataVenta, ve_tipoPago: e.target.value })} />
              <SelectClientes handleCliente={(e) => setDataVenta({ ...dataVenta, cli_id: e.target.value })} />
            </div>
            <div className="w-full">
              <p className="bg-white py-1 px-6 text-center">
                Subtotal: <span className="font-medium">{`$${total}`}</span>
              </p>
            </div>
          </div>
          <button onClick={procesarVenta} className="bg-blue-700 text-white font-semibold py-1 px-8 rounded-xl">
            Crear venta
          </button>
        </div>
      </div>
    </div>
  );
}

export default NuevaVenta;
