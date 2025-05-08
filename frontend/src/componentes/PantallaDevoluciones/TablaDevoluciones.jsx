import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function TablaDevoluciones() {
    const [data,setData] = useState([]);

    console.log(data)

    useEffect(() => {
        axios
    .post("http://localhost:8081/devoluciones")
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    },[])

  return (
    <div > <p></p>
        <table className='table-auto'>
            <thead>
                <th>ID Devolucion</th>
                <th>Fecha</th>
                <th>Usuario Responsable</th>
                <th>Detalles</th>
            </thead>

            <tbody>
            {data.map(devolucion => (
                <tr>
                    <td>{devolucion.dev_id}</td>
                    <td>{devolucion.dev_fecha.slice(0,10)}</td>
                    <td>{devolucion.usuarioResponsable}</td>
                    <td>{<Link to={"devolucion"} state={{dev_id: devolucion.dev_id, ve_id: devolucion.ve_id}}>Consultar</Link>}</td> {/*DEBO MANDAR SOLO ID VENTA E ID DEVOLUCION*/}
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

export default TablaDevoluciones