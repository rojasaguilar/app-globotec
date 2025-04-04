import React from 'react'
import Header from '../componentes/PantallaUsuarios/Header'

function Ventas() {
  return (
    <div>
        <p/>
        <Header msjSearchInput={"Buscar por fecha..."} entidad={"Ventas"} btnLink={"/ventas/nuevaventa"}/>
        {/* TABLA VENTAS */}
    </div>
  )
}

export default Ventas