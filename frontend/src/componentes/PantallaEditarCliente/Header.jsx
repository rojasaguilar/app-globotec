import React from 'react'

function HeaderEditarCliente() {
  return (
 
    <div className="w-full px-4 py-6 flex-col bg-slate-100 shadow-md rounded-md "> 
   <div className='w-full flex justify-between'>
   <p className="text-lg font-medium">Clientes</p>
    <button type='submit' className="bg-blue-600 py-1.5 px-8 rounded-xl text-white font-semibold"> Actualizar Cliente
      </button>
   </div>
    
    <div>
    <p className="text-sm font-medium text-gray-400">Clientes<span className='font-medium text-gray-800'> / Editar cliente</span></p>
    </div>  
    </div>
  )
}

export default HeaderEditarCliente