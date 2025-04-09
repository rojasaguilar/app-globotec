import React from 'react'
import Header from '../componentes/PantallaUsuarios/Header'
import { CircleDollarSign } from 'lucide-react'

function Ventas() {
  return (
    <div>
        <p/>
        <Header msjSearchInput={"Buscar por fecha..."} entidad={"Venta"} btnLink={"/ventas/nuevaventa"} icono={<CircleDollarSign className='w-5 h-5'/>}/>
        {/* TABLA VENTAS */}
    </div>
  )
}

export default Ventas