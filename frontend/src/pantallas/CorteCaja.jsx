import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderCorteCaja from "../componentes/PantallaCorteCaja/HeaderCorteCaja";
import axios from "axios";
import Modal from "../componentes/ModalGlobal";
import { CheckCheck } from "lucide-react";

function CorteCaja() {
  const location = useLocation();
  const datosCorte = location.state;

  const totalEnVentas = datosCorte.ve?.reduce((sum, venta) => parseFloat(sum + venta.entsal_cantidad), 0.0);
  const totalEnDevoluciones = datosCorte.de?.reduce(
    (sum, devolucion) => parseFloat(sum + devolucion.entsal_cantidad),
    0.0
  );
  const totalIngresos = datosCorte.in?.reduce((sum, ingreso) => parseFloat(sum + ingreso.entsal_cantidad), 0.0);
  const totalRetiros = datosCorte.re?.reduce((sum, retiro) => parseFloat(sum + retiro.entsal_cantidad), 0.0);
  const total = totalEnVentas - totalEnDevoluciones + totalIngresos - totalRetiros;

  const [totalCierre, setTotalCierre] = useState(0.0) 

  const [open,setOpen] = useState(false)

  const navigate = useNavigate();

  const [ventas,setVentas] = useState({});
  const [devoluciones, setDevoluciones] = useState({});

  const requestVenta = async (idVenta) => {
  try {
    const res = await axios.post("http://localhost:8081/ventas/venta", { ve_id: idVenta });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const requestDevolucion = async (idDevolucion) => {
  try{
    const res = await axios.post("http://localhost:8081/devoluciones/devolucion" ,{dev_id: idDevolucion});
    return res.data;
  }catch (err) {
    console.error(err);
    return null;
  }
}

const getVentas = async () => {
  const ventas = await Promise.all(
    datosCorte.ve?.map(venta => requestVenta(venta.ve_id))
  );
  return ventas;
}

const getDevoluciones = async () => {
  const devoluciones = await Promise.all(
    datosCorte.de?.map(devolucion => requestDevolucion(devolucion.dev_id))
  );
  return devoluciones;
}

const data = {...datosCorte, ve:ventas, de: devoluciones}
console.log(data)

useEffect(() => {
  getVentas().then(setVentas);
  getDevoluciones().then(setDevoluciones);
}, []);


  const handleCierre = ()=> {
    const empleado = JSON.parse(localStorage.getItem('empleado'));
    const data = {
        corte_total: total,
        corte_efecitvo: totalCierre,
        usu_id: empleado.usu_id
    }
    axios
    .post("http://localhost:8081/cerrarcaja",{...data})
    .then(res=> {if(res.data.affectedRows === 1){
        setOpen(true);
        localStorage.removeItem("Caja");
    
    }})
    .catch(err => console.log(err))
  }

  return (
    <div>
      <HeaderCorteCaja />

      <div className="w-full flex flex-col space-y-2 px-8">
        {/* VENTAS */}
        <div className="w-full border-b border-blue-500 flex flex-col">
          <p className="font-semibold">Ventas</p>
          <p className="text-sm">{`Cantidad de ventas: ${datosCorte.ve.length}`}</p>
          <p className="text-sm">{`Total por ventas: $${totalEnVentas}`}</p>
        </div>

        {/* DEVOLUCIONES */}
        <div className="w-full  border-b border-blue-500 flex flex-col">
          <p className="font-semibold">Devoluciones</p>
          <p className="text-sm">{`Cantidad de devoluciones: ${datosCorte.de.length}`}</p>
          <p className="text-sm">{`Total por devoluciones: $${totalEnDevoluciones}`}</p>
        </div>

        {/* INGRESOS */}
        <div className="w-full border-b border-blue-500 flex flex-col">
          <p className="font-semibold">Ingresos directos a caja</p>
          <p className="text-sm">{`Cantidad de ingresos: ${datosCorte.in.length}`}</p>
          <p className="text-sm">{`Total por ingresos: $${totalIngresos}`}</p>
        </div>

        {/* RETIROS */}
        <div className="w-full  border-b border-blue-500">
          <p className="font-semibold">Retiros directos de caja</p>
          <p className="text-sm">{`Cantidad de retiros: ${datosCorte.re.length}`}</p>
          <p className="text-sm">{`Total por retiros: $${totalRetiros}`}</p>
        </div>

        <p  className="self-center">Cantidad con la que cerrar: {`$${total}`}</p>

      <div className="flex flex-col space-y-2 bg-red-100 w-1/2 self-center justify-center items-center">
        <p>Cantidad de cierre</p>
      <input className="rounded-xl px-2 py-1 border border-gray-300 w-1/3" type="text" name="" id="" onChange={(e)=> setTotalCierre(e.target.value)} />
      <button className="rounded-xl bg-blue-600 text-white font-semibold py-1.5 flex w-1/3 justify-center" onClick={handleCierre}>Cerrar caja</button>
      </div>
      </div>
      <Modal header={"Corte de caja exitoso"} icon={<CheckCheck />} open={open} onClose={()=> {
        setOpen(false);
        navigate('/home')
      }}/>
    </div>
  );
}

export default CorteCaja;