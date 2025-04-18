import React from 'react'
import Header from '../componentes/PantallaUsuarios/Header'
import { CircleDollarSign } from 'lucide-react'
import TablaVentas from '../componentes/PantallaVentas/TablaVentas'

function Ventas() {
  return (
    <div>
        <p/>
        <Header msjSearchInput={"Buscar por fecha..."} entidad={"Venta"} btnLink={"/ventas/agregar"} icono={<CircleDollarSign className='w-5 h-5'/>}/>
        {/* TABLA VENTAS */}
       <div className='px-6'>
       <TablaVentas/>
       </div>
    </div>
  )
}

export default Ventas