import React,{useState, useEffect} from 'react'
import axios from 'axios';

function TotalVentasHoy() {
    const [total,setTotal] = useState(0.0);

    useEffect (()=>{
        const date = {date: new Date().toJSON().slice(0, 10)};
        axios.post("http://localhost:8081/ventas/hoy",date)
        .then(res => {
            console.log(res.data.total)
            setTotal(res.data.total)
        })
        .catch(err => console.log(err))
    })

  return (
    <div>
        <p>Total Ventas de Hoy</p>
        <p>{total === null ? "$0":total}</p>
    </div>
  )
}

export default TotalVentasHoy