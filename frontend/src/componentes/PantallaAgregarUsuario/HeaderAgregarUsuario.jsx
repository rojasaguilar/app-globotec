import React from 'react'

function HeaderAgregarUsuario() {
  return (
 
    <div className="w-full px-4 py-6 flex-col bg-slate-100 shadow-md rounded-md "> 
   <div className='w-full flex justify-between'>
   <p className="text-lg font-medium">Usuarios</p>
    <button type='submit' className="bg-blue-600 py-1.5 px-8 rounded-xl text-white font-semibold"> Agregar Usuario
      </button>
   </div>
    
    <div>
    <p className="text-sm font-medium text-gray-400">Usuarios<span className='font-medium text-gray-800'> / Nuevo usuario</span></p>
    </div>  
    </div>
  )
}

export default HeaderAgregarUsuario