import React,{useState} from 'react'
import TablaClientes from '../componentes/PantallaClientes/TablaClientes'
import Header from '../componentes/PantallaClientes/Header'

function Clientes() {
  const [status, setStatus] = useState(1);
  const [filtro, setFiltro] = useState('');

  const handleFiltro = (string) => {
    setFiltro(string)
  }

  const handleStatus = () =>{
     setStatus(status === 1 ? 0 : 1);
  }

  return (
    <div className="w-full">
      <Header 
       status={status}
       msjSearchInput={"Buscar por nombre..."} 
       handleStatus={handleStatus} 
       handleFiltro={handleFiltro}
       />
       
      <TablaClientes status={status} filtro={filtro}/>
    </div>
  )
}

export default Clientes