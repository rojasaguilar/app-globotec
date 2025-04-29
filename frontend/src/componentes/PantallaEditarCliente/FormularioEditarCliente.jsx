import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import RadioButtonStatus from '../RadioButtonStatus';
import Modal from '../ModalGlobal';
import { Check, CheckCheck } from "lucide-react";
import HeaderEditarCliente from "./Header";

function FormularioEditarCliente() {
  const location = useLocation();
  const [open,setOpen] = useState(false);
  const navigate = useNavigate();

  const [cliente, setCliente] = useState(location.state);

  const handleInput = (event) => {
    setCliente((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  console.log(cliente)

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/clientes/editar", cliente)
      .then((res) => {
        if (res.data.affectedRows === 1) {
          setOpen(true);
          return;
        } else {
          alert("Error al actualizar cliente");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-zinc-10 py-10 px-4">
      <form action="" onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <HeaderEditarCliente/>
        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-8">         
          {/* INPUT NOMBRE*/}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Nombre del cliente:</label>
            <input
              type="text"
              name="cli_nombre"
              onChange={handleInput}
              value={cliente.cli_nombre}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {/* INPUT CORREO*/}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Correo del cliente:</label>
            <input
              type="email"
              name="cli_correo"
              onChange={handleInput}
              value={cliente.cli_correo}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {/* INPUT RFC*/}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">RFC del cliente:</label>
            <input
              type="text"
              name="cli_rfc"
              onChange={handleInput}
              value={cliente.cli_rfc}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>    
          {/* INPUT CODIGO POSTAL*/}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Código Postal del cliente:</label>
            <input
              type="text"
              name="cli_cp"
              onChange={handleInput}
              value={cliente.cli_cp}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="flex flex-col items-center">
                <label className="block mb-50 text-sm font-medium text-gray-900">Estatus:</label>
                <RadioButtonStatus 
                  value={String(cliente.cli_estaActivo)}
                  onChange={(event) =>
                    setCliente((prev) => ({
                      ...prev,
                      cli_estaActivo: parseInt(event.target.value),
                    }))
                  }
                />
          </div>
        </div>
      </form>
      <Modal icon={<CheckCheck size={48} color="#2dae6b" strokeWidth={2}/>} open={open} header={"ACTUALIZADO"} text={"Cliente actualizado correctamente"} onClose={() => {setOpen(false); navigate("/clientes")}}/>
    </div>
  );
}

export default FormularioEditarCliente;