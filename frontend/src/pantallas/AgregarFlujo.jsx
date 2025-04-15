import React, { useState } from "react";
import Header from "../componentes/PantallaAgregarFlujoDinero/Header";
import axios from "axios";

function AgregarFlujo() {
  const [datos, setDatos] = useState({
    entsal_cantidad: 0,
    usu_id: JSON.parse(localStorage.getItem("empleado")).usu_id,
    entsal_motivo: "",
    entsal_tipo: "",
    entsal_EoS: ''
  });

  const handleInput = (e) => {
    setDatos(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(datos)
    axios.post("http://localhost:8081/entradassalidas/agregar",datos)
    .then(res => {
      if(res.data.affectedRows === 1) {
        alert("Se ha registrado exitosamente")
      }else{
        alert("Error, verifica los datos ingresados")
      }
    })
    .catch(err => console.log(err))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Header etiquetaBoton={"Agregar flujo"} titulo={"Flujo de efectivo"} link={"/flujoefectivo"} />
        <div className="space-y-4 flex-col bg-red-100 w-fit">
          {/*INTPUT CANTIDAD */}
          <div>
            <p>Cantidad de dinero</p>
            <input type="text" name="entsal_cantidad" onChange={handleInput} />
          </div>

          {/*INTPUT MOTIVO */}
          <div>
            <p>Descripcion</p>
            <input className="" type="text" name="entsal_motivo" onChange={handleInput} />
          </div>

          {/*INTPUT TIPO */}
          <div className="w-fit bg-green-300 space-y-4">
            <p>Tipo</p>
            <div className="flex-col space-y-3">
              <div className="space-x-2">
              <input type="radio" value="v" id="venta" name="entsal_tipo" onChange={handleInput}/>
              <label htmlFor="venta">Venta</label>
              </div>

              <div className="space-x-2">
              <input type="radio" value="r" id="retiro" name="entsal_tipo" onChange={handleInput}/>
              <label htmlFor="retiro">Retiro de caja registradora</label>
              </div>

              <div className="space-x-2">
              <input type="radio" value="i" id="ingreso" name="entsal_tipo" onChange={handleInput}/>
              <label htmlFor="ingreso">Ingreso a caja registradora</label>
              </div>
            </div>
          </div>

          {/*INTPUT TIPO */}
          <div>
            <p>Tipo</p>
            {/* <select name="entsal_EoS" onChange={handleInput}>
              <option value="e">Entrada</option>
              <option value="s">Salida</option>
            </select> */}

          
          </div>
        </div>
      </form>
    </div>
  );
}

export default AgregarFlujo;
