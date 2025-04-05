import React from 'react'
import Header from '../componentes/PantallaUsuarios/Header'
import TablaClientes from '../componentes/PantallaClientes/TablaClientes'

function Clientes() {
  return (
   
    <div>
        <Header entidad={"Clientes"} msjSearchInput={"Buscar por nombre..."} btnLink={"/clientes/agregar"}/>
        <TablaClientes/>
    </div>
  )
}

export default Clientes