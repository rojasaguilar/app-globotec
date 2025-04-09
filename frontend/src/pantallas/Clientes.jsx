import React,{useState} from 'react'
import TablaClientes from '../componentes/PantallaClientes/TablaClientes'
import Header from '../componentes/PantallaClientes/Header'

function Clientes() {
  const [status, setStatus] = useState(1);

  const handleStatus = () =>{
     setStatus(status === 1 ? 0 : 1);
  }

  return (
   
    <div>
       <Header status={status} handleStatus={handleStatus}/>
        <TablaClientes status={status}/>
    </div>
  )
}

export default Clientes