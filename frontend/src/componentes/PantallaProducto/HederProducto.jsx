import React from 'react'

function HeaderProducto({entidad}) {
  return (
 
    <div className="flex flex-col gap-1 w-full pt-4 px-8 rounded-lg"> 
   <div className='w-full flex justify-between'>
    <p className="text-2xl font-medium">Productos</p>
      </div>
      
      <div>
      <p className="text-lg font-medium text-gray-400">Productos<span className='font-medium text-gray-800'>/Producto/{entidad}</span></p>
      </div>  
    </div>
  )
}

export default HeaderProducto