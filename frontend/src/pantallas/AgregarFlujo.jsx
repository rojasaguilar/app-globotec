import React, { useState } from "react";
import Header from "../componentes/PantallaAgregarFlujoDinero/Header";
import axios from "axios";
import { ArrowBigDownDash, ArrowBigUpDash, CheckCheck, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ModalGlobal from '../componentes/ModalGlobal'

function AgregarFlujo() {
  const [datos, setDatos] = useState({
    entsal_cantidad: 0,
    usu_id: JSON.parse(localStorage.getItem("empleado")).usu_id,
    entsal_motivo: "",
    entsal_tipo: "",
    entsal_EoS: "",
  });

  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);

  const [visible, setVisible] = useState(false);

  const nagivate = useNavigate();

  const handleClick = (method) => {
    if (method === 1) {
      setClicked1(true);
      setClicked2(false);
      setDatos({
        ...datos,
        entsal_tipo: "i",
      });
      return;
    }

    if (method === 2) {
      setClicked2(true);
      setClicked1(false);
      setDatos({
        ...datos,
        entsal_tipo: "r",
      });
      return;
    }
  };

  const styleClicked = "h-28 border-2 border-blue-500 rounded-2xl p-4 flex flex-row items-center gap-3";
  const styleDefault = "h-28 border border-slate-200 rounded-2xl p-4 flex flex-row items-center gap-3";

  const handleInput = (e) => {
    setDatos((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(datos);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(datos);
    axios
      .post("http://localhost:8081/entradassalidas/agregar", datos)
      .then((res) => {
        if (res.data.affectedRows === 1) {
          setVisible(true);
         
        } else {
          alert("Error, verifica los datos ingresados");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Header etiquetaBoton={"Agregar flujo"} titulo={"Flujo de efectivo"} link={"/flujoefectivo"} />
        <div id="CONTENEDOR_FORMULARIO" className="pt-4 px-12 w-full">
          <div className="bg-slate-200 w-full p-4 rounded-xl">
            <div className="bg-white w-full flex flex-col rounded-xl py-2 px-5 space-y-2">
              {/* CONTENIDO FORMULARIO */}
              
                <div className="flex flex-col space-y-8">
                  {/* ENCABEZADO */}
                  <div>
                    <p className="font-semibold text-xl">Registrar Entrada / Salida</p>
                  </div>
                  <div className="grid grid-cols-2 gap-12">
                    {/* CANTIDAD EFECTIVO */}
                    <div className="space-y-2">
                      <p className="font-semibold text-lg">Monto del Movimiento</p>
                      <div class="relative w-2/3">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <DollarSign className="w-4 h-4 text-gray-400 " />
                        </div>
                        <input
                          type="text"
                          name="entsal_cantidad"
                          id="simple-search"
                          class=" border text-sm rounded-lg block w-full ps-10 px-20 py-1.5  bg-gray-2  00 border-gray-300 placeholder-gray-500 text-gray-500 focus:outline-blue-500"
                          required
                          onChange={handleInput}
                        />
                      </div>
                    </div>

                    {/* MOTIVO */}

                    <div className="space-y-2">
                      <p className="font-semibold text-lg">Motivo del Movimiento</p>
                      <textarea
                        name="entsal_motivo"
                        id=""
                        rows={5}
                        onChange={handleInput}
                        className="border border-gray-200 focus:outline-blue-600 resize-none w-full rounded-xl p-2"
                      ></textarea>
                    </div>
                  </div>
                </div>
           

              {/* TIPO DE MOVIMIENTO */}
              <div id="CONTENEDOR_MOVIMIENTOS" className="space-y-2 flex flex-col justify-center items-center ">
                <div className="w-full">
                <p className="font-semibold text-lg">Tipo de movimiento</p>
                </div>
                <div className="w-full">
                  {/* TIPOS */}
                  <div className=" border border-slate-200 rounded-xl pb-4">
                    <div className="w-full h-12 bg-slate-100 rounded-t-xl mb-4"></div>
                    <div className="flex justify-evenly">
                      <div
                        onClick={() => handleClick(1)}
                        id="OPCION_1"
                        className={clicked1 === true ? styleClicked : styleDefault}
                      >
                        <ArrowBigDownDash size={38} strokeWidth={1}/>
                        <p className="font-medium">Ingreso caja retistradora</p>
                      </div>

                      <div
                        onClick={() => handleClick(2)}
                        id="OPCION_1"
                        className={clicked2 === true ? styleClicked : styleDefault}
                      >
                        <ArrowBigUpDash size={42} strokeWidth={1}/>
                        <p className="font-medium">Retiro caja retistradora</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ModalGlobal open={visible} header={"MOVIMIENTO AGREGADO"} text={"Movimiento agregado correctamente"} 
      onClose={()=> {
        setVisible(false);
        nagivate("/flujoefectivo");
      }}
      icon={<CheckCheck strokeWidth={2} size={42} color="#50c352" />}/>
    </div>
  );
}

export default AgregarFlujo;
