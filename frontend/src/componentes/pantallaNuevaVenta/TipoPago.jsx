import React from 'react'

function TipoPago({handleTipoPago}) {
    const tipoPagos = [
        {
            identificador: "e",
            nombre: 'Efectivo'
        },
        {
            identificador: "t",
            nombre: 'Tarjeta'
        },
        {
            identificador: "b",
            nombre: 'Transferencia bancaria'
        },
    ]
  return (
    <div>
        <select onChange={handleTipoPago}>
            {
                tipoPagos.map(tipoPago => {
                   return(
                    <option value={tipoPago.identificador}>{tipoPago.nombre}</option>
                   )
                })
            }
        </select>
    </div>
  )
}

export default TipoPago