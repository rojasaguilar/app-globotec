import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderAgregarCliente from './HeaderAgregarCliente';
import NotificacionAgregarCliente from './NotificacionAgregarCliente';
import { CheckCheck } from "lucide-react";
import ModalAgregarGlobal from "../ModalAgregarGlobal";

function FormularioCliente() {
  const [open,setOpen] = useState(false);
  const navigate = useNavigate();

  function vaciarInputs() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
  }

  const [cliente, setCliente] = useState({
    cli_nombre: "",
    cli_correo: "",
    cli_rfc: "",
    cli_cp: "",
  });

  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleInput = (event) => {
    setCliente((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(cliente)
    axios
      .post("http://localhost:8081/clientes/agregar", cliente)
      .then((res) => {
        console.log(res.data);
        vaciarInputs()
        setOpen(true);
        return;
      })
      .catch((err) => {
        console.log(err);
        setShowErrorToast(true);
      });
  };

  return (
    <div className="bg-zinc-10 min-h-screen py-10 px-4">
      <form action="" onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <HeaderAgregarCliente/>
        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-8">
          {/* INPUT NOMBRE*/}
          <div>
            <label htmlFor="cli_nombre" className="block mb-2 text-sm font-medium text-gray-900">Nombre del Cliente:</label>
            <input
              type="text"
              name="cli_nombre"
              id="cli_nombre"
              placeholder="Nombre Cliente"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {/* INPUT CORREO*/}
          <div>
            <label htmlFor="cli_correo" className="block mb-2 text-sm font-medium text-gray-900">Correo del Cliente:</label>
            <input
              type="email"
              name="cli_correo"
              id="cli_correo"
              placeholder="Correo Cliente"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {/* INPUT RFC*/}
          <div>
            <label htmlFor="cli_rfc" className="block mb-2 text-sm font-medium text-gray-900">RFC del Cliente:</label>
            <input
              type="text"
              name="cli_rfc"
              id="cli_rfc"
              placeholder="RFC Cliente"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          {/* INPUT CODIGO POSTAL*/}
          <div>
            <label htmlFor="cli_cp" className="block mb-2 text-sm font-medium text-gray-900">Código Postal del Cliente:</label>
            <input
              type="text"
              name="cli_cp"
              id="cli_cp"
              placeholder="Código Postal Cliente"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
        </div>
      </form>
      <div className="mt-10 ml-4 w-[30%]">
        <NotificacionAgregarCliente
          showError={showErrorToast}
          onCloseError={() => setShowErrorToast(false)}
        />
      </div>
      <ModalAgregarGlobal icon={<CheckCheck size={48} color="#2dae6b" strokeWidth={2}/>} open={open} header={"AGREGADO"} text={"Cliente agregado correctamente"} onClose={() => {setOpen(false); navigate("/clientes")}} onKeepAdding={() => {setOpen(false); navigate("/clientes/agregar")}}/>
    </div>
  );
}

export default FormularioCliente;