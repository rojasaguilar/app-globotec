import React from 'react'
import SearchInput from '../componentes/SearchInput'
import ListadoProductos from '../componentes/ListadoProductos'

function NuevaVenta() {
  return (
    <div className='w-full'>
        <header className='w-full h-16 bg-green-200'>Header</header>
            <div className='w-full grid grid-cols-6'>
            {/*COLUMNA 1*/}
            <div className='w-full col-span-4'> 
                <div className='w-full bg-slate-200'>
                    <ListadoProductos/>
                </div>
            </div>
            {/*COLUMNA 2*/}
                <p className='col-span-2 bg-blue-100'>Resumen productos, cantidad, total, descuentos</p>
            </div>
    </div>
  )
}

export default NuevaVenta