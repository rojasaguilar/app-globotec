import React, { useState } from "react";
import SelectSexo from "./SelectSexo";
import SelectRoles from "./SelectRoles";
import { Check } from "lucide-react";
import axios from "axios";

function FormularioUsuario() {
  const empelado = JSON.parse(localStorage.getItem("empleado"));

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
  console.log(values);
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(values);
    axios
      .post("http://localhost:8081/signup", values)
      .then((res) => {
        alert("usuario agregado");
      })
      .catch((err) => {
        alert("error");
      });
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        {/*  INPUT NOMBRE */}
        <div>
          <p>Nombre</p>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de Usuario"
            onChange={handleInput}
          />
        </div>

        {/*  INPUT APELLIDO PATERNO */}
        <div>
          <p>Apellido Paterno</p>
          <input
            type="text"
            name="ap"
            placeholder="Apellido Paterno"
            onChange={handleInput}
          />
        </div>

        {/*  INPUT APELLIDO MATERNO */}
        <div>
          <p>Apellido Materno</p>
          <input
            type="text"
            name="am"
            placeholder="Apellido Materno"
            onChange={handleInput}
          />
        </div>

        {/*  INPUT SEXO */}
        <div>
          <SelectSexo nombre="sexo" handleInput={handleInput} />
        </div>

        {/*  INPUT TELEFONO */}
        <div>
          <p>Numero de Telefono</p>
          <input type="text" name="telefono" onChange={handleInput} />
        </div>

        {/*  INPUT DIRECCION */}
        <div>
          <p>Direccion</p>
          <input type="text" name="direccion" onChange={handleInput} />
        </div>

        {/*  INPUT RFC */}
        <div>
          <p>RFC</p>
          <input type="text" name="rfc" onChange={handleInput} />
        </div>
        {/*  INPUT PASSWORD */}
        <div>
          <p>Contraseña</p>
          <input type="text" name="password" onChange={handleInput} />
        </div>

        {/*  INPUT ROL */}
        <div>
          <p>Rol de Empleado</p>
          <SelectRoles nombre={"rol"} handleInput={handleInput} />
        </div>
        <button
          className="bg-blue-500 flex justify-center items-center rounded-xl py-1.5 px-8 font-medium text-white gap-2"
          type="submit"
        >
          {<Check className="w-6 h-6" />}
          Agregar Usuario
        </button>
      </form>
    </div>
  );
}

export default FormularioUsuario;
