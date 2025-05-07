import React,{useEffect, useState} from 'react'
import axios from 'axios'

function TablaDevoluciones() {
    const [data,setData] = useState([]);

    useEffect(() => {
        axios
    .post("http://localhost:8081/devoluciones")
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    },[])

  return (
    <div > <p></p>
        <table>
            <thead>
                <th>ID Devolucion</th>
                <th>columna</th>
                <th>columna</th>
                <th>columna</th>
                <th>columna</th>
            </thead>

            <tbody>
            {data.map(devolucion => (
                <tr>
                    <td>{devolucion.dev_id}</td>
                    <td>{devolucion.ve_id}</td>
                    <td>{devolucion.dev_fecha.slice(0,10)}</td>
                    <td>{devolucion.usuarioResponsable}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

export default TablaDevoluciones