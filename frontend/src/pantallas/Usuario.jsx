import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SelectSexo from "../componentes/SelectSexo";
import SelectRoles from "../componentes/SelectRoles";
import { Check, CheckCheck } from "lucide-react";
import Modal from "../componentes/ModalGlobal";
import HeaderEditarUsuario from "../componentes/PantallaEditarUsuario/HeaderEditarUsuario";
import RadioButtonStatus from '../componentes/RadioButtonStatus';

function Usuario() {
  const location = useLocation();
  const [open,setOpen] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(location.state);
  console.log(user);

  const handleInput = (event) => {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/usuarios/usuario", user)
      .then((res) => {
        console.log(res.data)
        if(res.data.affectedRows === 1) {
         setOpen(true);
         return;
        }
      })
      .catch((err) => {
        alert("error");
      });
  };

  return (
    <div className="bg-zinc-10 min-h-screen py-10 px-4">
          <form action="" onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <HeaderEditarUsuario/>
          <div className="grid gap-6 mb-6 md:grid-cols-2 mt-8">
              {/*  INPUT NOMBRE */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Nombre:</label>
                  <input
                  type="text"
                  name="usu_nombre"
                  value={user.usu_nombre}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
              </div>

              {/*  INPUT APELLIDO PATERNO */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Apellido Paterno:</label>
                  <input
                  type="text"
                  name="usu_apellidoPaterno"
                  value={user.usu_apellidoPaterno}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
              </div>

              {/*  INPUT APELLIDO MATERNO */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Apellido Materno:</label>
                  <input
                  type="text"
                  name="usu_apellidoMaterno"
                  value={user.usu_apellidoMaterno}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
              </div>

              {/*  INPUT SEXO */}
              <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Sexo:</label>
                <SelectSexo name="usu_sexo" handleInput={handleInput} value={user.usu_sexo}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
              </div>

              {/*  INPUT TELEFONO */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Número de Teléfono:</label>
                  <input
                  type="text"
                  name="usu_telefono"
                  value={user.usu_telefono}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
              </div>

              {/*  INPUT DIRECCION */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Dirección:</label>
                  <input
                  type="text"
                  name="usu_direccion"
                  value={user.usu_direccion}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
              </div>

              {/*  INPUT RFC */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">RFC:</label>
                  <input
                  type="text"
                  name="usu_rfc"
                  value={user.usu_rfc}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
              </div>

              {/*  INPUT PASSWORD */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Contraseña:</label>
                  <input
                  type="text"
                  name="usu_password"
                  value={user.usu_password}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
              </div>

              {/*  INPUT ROL */}
              <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Rol de Empleado:</label>
                <SelectRoles nombre={"usu_rol"} handleInput={handleInput} value={user.usu_rol}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
              </div>

              <div className="flex flex-col items-center">
                <label className="block mb-50 text-sm font-medium text-gray-900">Estatus:</label>
                <RadioButtonStatus 
                  value={String(user.usu_estaActivo)}
                  onChange={(event) =>
                    setUser((prev) => ({
                      ...prev,
                      usu_estaActivo: parseInt(event.target.value),
                    }))
                  }
                />
              </div>

            </div>
          </form>
      <Modal icon={<CheckCheck size={48} color="#2dae6b" strokeWidth={2}/>} open={open} header={"ACTUALIZADO"} text={"Usuario actualizado correctamente"} onClose={() => {setOpen(false); navigate("/usuarios")}}/>
    </div>
  );
}

export default Usuario;