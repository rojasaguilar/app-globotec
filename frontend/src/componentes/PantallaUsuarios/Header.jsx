import React from 'react'
import BTN_AgregarUsuario from './BTN_AgregarUsuario'
import SearchInput from '../SearchInput'

function Header({entidad,msjSearchInput, btnLink}) {
  return (
   <div className='flex flex-col gap-4 w-full pt-4 px-8 rounded-lg'>
    {/* Primera columna */}
        <div className='w-full flex justify-between'>
            <div className='flex-col space-y-1'>
            <p className='text-2xl font-semibold'>{entidad}</p>
            <p className="className text-sm text-gray-500">Listado de {entidad}</p>
            </div> 
            <BTN_AgregarUsuario queAgregar={entidad} link = {btnLink}/>
        
        </div>

    {/* Activos/inactivos */}
        <div className='w-full flex justify-between'>
            <div className='flex space-x-6 text-gray-600'>
                <a
                href="/productos"
                className=" text-blue-600 font-medium border-b-2 border-b-blue-600"
                >
                {entidad} Activos
                </a>
                <a href="/productos" className="">
                {entidad} Inactivos
                </a>
            </div>
            <div className='pb-2 '>
                <SearchInput msjMuestra={msjSearchInput}/>
            </div>
        </div>
    
   </div>
  )
}

export default Header