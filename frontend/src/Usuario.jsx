import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SelectSexo from "./componentes/SelectSexo";
import SelectRoles from "./componentes/SelectRoles";
import { Check } from "lucide-react";

function Usuario() {
  const location = useLocation();

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
        alert("usuario actualizado");
      })
      .catch((err) => {
        alert("error");
      });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between bg-zinc-200 pt-6 pb-3 shadow-sm">
        <div className="flex-row space-y-0.5 pl-6">
          <span className="text-xl font-semibold">Usuario</span>
          <p className="text-xs text-slate-500">Datos del Usuario</p>
        </div>
      </div>
      <div id="usuarios_contenedor">
        <div>
          <form action="" onSubmit={handleSubmit}>
            {/*  INPUT NOMBRE */}
            <div>
              <p>Nombre</p>
              <input
                type="text"
                name="usu_nombre"
                onChange={handleInput}
                value={user.usu_nombre}
              />
            </div>

            {/*  INPUT APELLIDO PATERNO */}
            <div>
              <p>Apellido Paterno</p>
              <input
                type="text"
                name="usu_apellidoPaterno"
                value={user.usu_apellidoPaterno}
                onChange={handleInput}
              />
            </div>

            {/*  INPUT APELLIDO MATERNO */}
            <div>
              <p>Apellido Materno</p>
              <input
                type="text"
                name="usu_apellidoMaterno"
                value={user.usu_apellidoMaterno}
                onChange={handleInput}
              />
            </div>

            {/*  INPUT SEXO */}
            <div>
              <SelectSexo name="usu_sexo" handleInput={handleInput} />
            </div>

            {/*  INPUT TELEFONO */}
            <div>
              <p>Numero de Telefono</p>
              <input
                type="text"
                name="usu_telefono"
                onChange={handleInput}
                value={user.usu_telefono}
              />
            </div>

            {/*  INPUT DIRECCION */}
            <div>
              <p>Direccion</p>
              <input
                type="text"
                name="usu_direccion"
                onChange={handleInput}
                value={user.usu_direccion}
              />
            </div>

            {/*  INPUT RFC */}
            <div>
              <p>RFC</p>
              <input
                type="text"
                name="usu_rfc"
                onChange={handleInput}
                value={user.usu_rfc}
              />
            </div>
            {/*  INPUT PASSWORD */}
            <div>
              <p>Contraseña</p>
              <input
                type="password"
                name="usu_password"
                onChange={handleInput}
                value={user.usu_password}
              />
            </div>

            {/*  INPUT ROL */}
            <div>
              <p>Rol de Empleado</p>
              <SelectRoles nombre={"usu_rol"} handleInput={handleInput} />
            </div>
            <button
              className="bg-blue-500 flex justify-center items-center rounded-xl py-1.5 px-8 font-medium text-white gap-2"
              type="submit"
            >
              {<Check className="w-6 h-6" />}
              Actualizar Usuario
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Usuario;
