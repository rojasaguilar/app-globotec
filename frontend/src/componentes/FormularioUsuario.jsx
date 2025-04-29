import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectSexo from "./SelectSexo";
import SelectRoles from "./SelectRoles";
import axios from "axios";
import HeaderAgregarUsuario from "../componentes/PantallaAgregarUsuario/HeaderAgregarUsuario";
import NotificacionAgregarUsuario from "../componentes/PantallaAgregarUsuario/NotificacionAgregarUsuario";
import ModalAgregarGlobal from "../componentes/ModalAgregarGlobal"
import { CheckCheck } from "lucide-react";

function FormularioUsuario() {
  const empelado = JSON.parse(localStorage.getItem("empleado"));

  const [open,setOpen] = useState(false);
  const navigate = useNavigate();

  function vaciarInputs() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });

    setValues(prev => ({
      ...prev,
      sexo: "",
      rol: ""
    }));
  }

  const [showErrorToast, setShowErrorToast] = useState(false);

  const [values, setValues] = useState({
    nombre: "",
    ap: "",
    am: "",
    sexo: "",
    telefono: "",
    direccion: "",
    rfc: "",
    password: "",
    rol: "",
    gerenteAlta: empelado.usu_id,
  });
 
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/signup", values)
      .then((res) => {
        vaciarInputs();
        setOpen(true);
        return;
      })
      .catch((err) => {
        setShowErrorToast(true);
      });
  };

  return (
    <div className="bg-zinc-10 min-h-screen py-10 px-4">
      <form action="" onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <HeaderAgregarUsuario/>
      <div className="grid gap-6 mb-6 md:grid-cols-2 mt-8">
          {/*  INPUT NOMBRE */}
          <div>
            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">Nombre del usuario:</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre Usuario"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {/*  INPUT APELLIDO PATERNO */}
          <div>
            <label htmlFor="ap" className="block mb-2 text-sm font-medium text-gray-900">Apellido paterno:</label>
            <input
              type="text"
              name="ap"
              id="ap"
              placeholder="Appelido Paterno"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {/*  INPUT APELLIDO MATERNO */}
          <div>
            <label htmlFor="am" className="block mb-2 text-sm font-medium text-gray-900">Apellido materno:</label>
            <input
              type="text"
              name="am"
              id="am"
              placeholder="Appelido Materno"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          {/*  INPUT SEXO */}
          <div>
            <label htmlFor="sexo" className="block mb-2 text-sm font-medium text-gray-900">Sexo:</label>
            <SelectSexo 
            nombre={"sexo"} 
            id="sexo" 
            handleInput={handleInput}
            value={values.sexo}/>
          </div>

          {/*  INPUT TELEFONO */}
          <div>
            <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900">Número de teléfono:</label>
            <input
              type="text"
              name="telefono"
              id="telefono"
              placeholder="Número de teléfono"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {/*  INPUT DIRECCION */}
          <div>
            <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900">Dirección:</label>
            <input
              type="text"
              name="direccion"
              id="direccion"
              placeholder="Dirección"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {/*  INPUT RFC */}
          <div>
            <label htmlFor="rfc" className="block mb-2 text-sm font-medium text-gray-900">RFC:</label>
            <input
              type="text"
              name="rfc"
              id="rfc"
              placeholder="RFC"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {/*  INPUT PASSWORD */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña:</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Contraseña"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {/*  INPUT ROL */}
          <div>
          <label htmlFor="rol" className="block mb-2 text-sm font-medium text-gray-900">Rol:</label>
            <SelectRoles 
            nombre={"rol"}
            id="rol" 
            handleInput={handleInput} 
            value={values.rol}/>
          </div>
        </div>
      </form>
      <div className="mt-10 ml-4 w-[30%]">
        <NotificacionAgregarUsuario
          showError={showErrorToast}
          onCloseError={() => setShowErrorToast(false)}
        />
      </div>
      <ModalAgregarGlobal icon={<CheckCheck size={48} color="#2dae6b" strokeWidth={2}/>} open={open} header={"AGREGADO"} text={"Usuario agregado correctamente"} onClose={() => {setOpen(false); navigate("/usuarios")}} onKeepAdding={() => {setOpen(false); navigate("/usuarios/agregar")}}/> 
    </div>
  );
}

export default FormularioUsuario;