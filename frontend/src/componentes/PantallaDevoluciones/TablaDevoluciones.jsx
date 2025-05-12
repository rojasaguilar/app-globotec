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
    <div className="w-full justify-center flex mt-6">
        <div className="overflow-x-auto w-full max-w-6xl">
            <table className="table-auto w-full text-base text-center">
                <thead className="text-slate-600 font-semibold bg-blue-100 text-base">
                    <th className="p-4 text-start">ID Devolucion</th>
                    <th className="p-4">Fecha</th>
                    <th className="p-4">Usuario Responsable</th>
                    <th className="p-4">Monto Devuelto</th>
                    <th className="p-4">Detalles</th>
                </thead>

                <tbody>
                {data.map(devolucion => (
                    <tr className="hover:bg-blue-100 transition-all duration-200 border-b">
                        <td className="px-6 py-4 text-start">{devolucion.dev_id}</td>
                        <td className="px-6 py-4">{devolucion.dev_fecha.slice(0,10)}</td>
                        <td className="px-6 py-4">{devolucion.usuarioResponsable}</td>
                        <td className="px-6 py-4">{devolucion.dev_montoDevuleto}</td> {/*DEBO MANDAR SOLO ID VENTA E ID DEVOLUCION*/}
                        <td className="px-6 py-4">{<Link className="hover:underline text-blue-700 font-medium" to={"devolucion"} state={{dev_id: devolucion.dev_id, ve_id: devolucion.ve_id}}>Consultar</Link>}</td> {/*DEBO MANDAR SOLO ID VENTA E ID DEVOLUCION*/}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default TablaDevoluciones