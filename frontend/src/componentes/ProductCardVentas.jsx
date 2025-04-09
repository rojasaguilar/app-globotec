import React from 'react'
import { Barcode, Plus } from "lucide-react";

function ProductCardVentas({ nombre, precio, stock, id, codigo, descripcion, handleAdd, productos }) {
const handleProducto = () => {
  let producto = {prod_id: id, prod_nombre: nombre, prod_precio: precio, prod_cantidad: 1}
  if(!productos.find(p => p.prod_id === producto.prod_id)){
    handleAdd(producto);
  } else{
    alert("Producto ya agregado")
  }
  
}
    return (
        <div class="border border-gray-700 rounded-lg shadow-sm bg-gray-800  text-white p-4 space-y-4">
          <div>
            <span className="text-lg font-semibold">{nombre}</span>
          </div>
          <div className="bg-zinc-600 rounded-lg w-full h-32 "></div>
          <p>imagen</p>
    
          <div>
            <p className="flex items-center gap-1">
              <Barcode className="w-4 h-4" /> {codigo}
            </p>
          </div>
    
          <div className="w-full h-12">
            <span className="text-sm font-normal">{descripcion}</span>
          </div>
    
          <div className="flex col justify-between px-2">
    
            <div>
              <span className="text-2xl font-semibold">{`$${precio}`}</span>
            </div>
            <div className="">
              <span>Stock: </span>
              <p className="flex items-center justify-center w-full">{stock}</p>
            </div>
            
          </div>
          <p>{`id: ${id}`}</p>
          <button onClick={handleProducto} className='w-fit'> <Plus className='w-4 h-4'/> Agregar</button>
        </div>
      );
}

export default ProductCardVentas