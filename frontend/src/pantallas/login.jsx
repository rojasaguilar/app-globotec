import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
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
      .post("http://localhost:8081/login", values)
      .then((res) => {
        if (res.data !== "CI") {
          console.log(res);
          let empleado = res.data;
          console.log(res);
          localStorage.setItem("empleado", JSON.stringify(empleado));
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-[#590C37] h-screen w-screen flex flex-row">
      <div className="w-full flex justify-center items-center py-7 pl-7">
        <div className="w-full h-full bg-[url(../public/banner.jpg)] bg-cover rounded-md"></div>
      </div>

      {/* COMPONENTE INICIO SESION */}

      <div className="w-full  flex justify-center items-center">
        <div className="flex flex-col p-32  gap-8 text-white  ">
          <p className="font-semibold text-4xl ">Inicio de sesión</p>
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <p className="text-xl font-normal">Usuario</p>
              <input
                type="text"
                name="usuario"
                placeholder="Usuario"
                onChange={handleInput}
                className="w-full rounded-md text-black"
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
              Iniciar sesión
            </button>
          </form>

          <Link
            to="/signup"
            className="flex justify-center items-center rounded-md bg-slate-200 py-2.5 text-xl font-semibold text-black"
          >
            Crear usuario
          </Link>
        </div>
      </div>
    </div>
  );
}
