import React, {useState } from "react";
import ListadoProductoVentas from "../componentes/ListadoProductoVentas";

function NuevaVenta() {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({});
  const [total, setTotal] = useState(0);

  const empleado = JSON.parse(localStorage.getItem("empleado"));

  const [dataVenta, setDataVenta] = useState({
    ve_id: "",
    ve_total: 0,
    cli_id: 0,
    usu_id: empleado.usu_id,
    ve_tipoPago: "e",
    productos: [],
  });

  const handleVenta = () => {
    const date = new Date().toJSON().slice(0, 10);
    console.log(date);
    
    setDataVenta({
    ve_id: `${date}-${empleado.usu_id}-${dataVenta.cli_id}-${total}`,
    ve_total: total,
    cli_id: 0,
    usu_id: empleado.usu_id,
    ve_tipoPago: "e",
    productos: productos
    })
  }

  console.log(dataVenta)

  const handleAdd = (producto) => {
    setProducto(producto);
    setProductos([...productos, producto]);

    setTotal((prev) => parseFloat((prev + parseFloat(producto.prod_precio) * producto.prod_cantidad).toFixed(2)));
  };

  const handleSum = () => {
    //

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
        // Check if the prod_id matches
        if (producto.prod_id === productoId) {
          // Return updated product with new quantity
          return { ...producto, prod_cantidad: parseInt(cantidad) };
        }
        // Return the product unchanged if prod_id does not match
        return producto;
      });
    });
  };
  return (
    <div className="w-full">
      <header className="w-full h-16 bg-green-200">Header</header>
      <div className="w-full grid grid-cols-6">
        {/*COLUMNA 1*/}
        <div className="w-full col-span-4">
          <div className="w-full  bg-slate-200">
            <ListadoProductoVentas handleAdd={handleAdd} productos={productos} />
          </div>
        </div>
        {/*COLUMNA 2*/}
        <div className="w-full bg-blue-400 col-span-2 space-y-2">
          {productos.map((producto) => {
            return (
              <div className="w-full flex justify-around bg-red-300">
                <p>{producto.prod_id}</p>
                <p>{`$${producto.prod_precio}`}</p>
                <p>{producto.prod_nombre}</p>
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
          <p className="absolute bottom-12 right-4 bg-white py-1 px-12">{`Total: $${total}`}</p>
          <button onClick={handleVenta} className="absolute bottom-12 right-auto bg-black text-white py-1 px-8 rounded-xl">
            Crear venta
          </button>
        </div>
      </div>
    </div>
  );
}

export default NuevaVenta;
