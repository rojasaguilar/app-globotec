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
        {/* <table>
            <thead>
                <th>columna</th>
                <th>columna</th>
                <th>columna</th>
                <th>columna</th>
                <th>columna</th>
            </thead>

            <tbody>
            {data.map(devolucion => {
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
            })}
            </tbody>
        </table> */}
    </div>
  )
}

export default TablaDevoluciones