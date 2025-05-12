import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalCambiarPass from "../componentes/ModalCambiarPass";

export default function Login() {
  const [values, setValues] = useState({
    usuario: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    if (error) setError("");
  };

  const handleSubmit = (event) => {   
    event.preventDefault();
    setError("");

    axios
      .post("http://localhost:8081/login", values)
      .then((res) => {
        if (res.data !== "CI") {
          console.log(res);
          let empleado = res.data;
          console.log(res);
          localStorage.setItem("empleado", JSON.stringify(empleado));
          navigate("/home");
        } else {
          setError("Usuario o contraseña son incorrectas");
        }
      })
      .catch((err) => {
        setError("Usuario o contraseña son incorrectas");
        console.log(err)});
  };

  return (
    <div className="flex h-screen w-screen font-sans">
      {/*FORMULARIO IZQ*/}
      {/* COMPONENTE INICIO SESION */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-slate-100 p-10">
          <form action="" onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Inicio de Sesión</h2>
            <hr className="border-t-2 border-gray-200 my-4"/>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            {/*  INPUT USUARIO */}
              <p className="text-xl font-normal">Usuario</p>
              <input
                type="text"
                name="usuario"
                placeholder="Nombre Usuario"
                onChange={handleInput}
                className="w-full p-2 border border-gray-300 rounded-xl"
                required
              />

            {/*  INPUT PASSWORD */}
              <p className="text-xl">Contraseña</p>
              <input
                type="password"
                name="password"
                placeholder="***********"
                onChange={handleInput}
                className="w-full p-2 border border-gray-300 rounded-xl"
                required
              />

            <div className="w-full max-w-md flex justify-end">
              <p     
              className="mb-1 text-xs text-gray-600 rounded-xl hover:text-blue-600 font-bold transition-colors duration-200"
              onClick={() => setIsModalOpen(true)}
              >
              ¿Cambiar Contraseña?
              </p>
            </div>

            {/* BOTONES */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-black text-white py-3 px-6 w-1/2 rounded-2xl hover:bg-blue-600 font-bold hover:text-white flex items-center justify-center gap-2"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <div className="w-full max-w-md flex items-center my-6">
            <hr className="flex-grow border-t-2 border-gray-200" />
            <span className="mx-4">ó</span>
            <hr className="flex-grow border-t-2 border-gray-200" />
          </div>

          <div className="w-full max-w-md flex justify-center">
            <Link
              to="/signup"
              className="bg-gray-700 text-white py-3 px-6 w-1/2 rounded-2xl hover:bg-gray-500 font-bold hover:text-white flex items-center justify-center gap-2"
            >
              Crear Usuario
            </Link>
          </div>
      </div>

      {/*IMAGEN DER*/}
      <div className="w-1/2 bg-cover bg-center relative shadow-2xl" 
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-8 text-center">
            <h2 className="text-4xl font-extrabold drop-shadow-md mb-4">Juguetería Manitos</h2>
            <p className="text-xl font-medium">- <span className="italic font-bold">GloboTec</span></p>
        </div>
      </div>

      <ModalCambiarPass
        open={isModalOpen}
        header="Cambiar Contraseña"
        icon={<span className="text-3xl">🔒</span>}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
}