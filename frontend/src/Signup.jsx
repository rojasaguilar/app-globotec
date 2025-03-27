import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { validation } from "./LoginValidation";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({
    usuario: "",
    password: "",
  });
  const navigate = useNavigate();

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
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-[#590C37] h-screen w-screen flex flex-row">
      <div className="w-full flex justify-center items-center py-7 pl-7">
        <div className="w-full h-full bg-[url(../public/banner.jpg)] bg-cover rounded-md"></div>
      </div>

      {/* COMPONENTE Creacion Usuario */}

      <div className="w-full  flex justify-center items-center">
        <div className="flex flex-col p-32  gap-8 text-white  ">
          <p className="font-semibold text-4xl ">Crear usuario</p>
          <form onSubmit={handleSubmit} action="">
            <div className="flex flex-col gap-3">
              <p className="text-xl font-normal">Usuario</p>
              <input
                type="text"
                name="usuario"
                placeholder="Usuario"
                className="w-full rounded-md text-black"
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-xl">Contraseña</p>
              <input
                type="password"
                name="password"
                placeholder="***********"
                className="rounded-md w-full text-black"
                onChange={handleInput}
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-[#014034] py-2.5 text-xl font-semibold"
            >
              Crear Usuario
            </button>
          </form>

          <Link
            to="/login"
            className="flex justify-center items-center rounded-md bg-slate-200 py-2.5 text-xl font-semibold text-black"
          >
            Iniciar sesion
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
