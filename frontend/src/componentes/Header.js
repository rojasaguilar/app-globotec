import { Bell, ChevronDown, History, LayoutGrid, LogOut, Plus, Settings, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Saludador from "./Saludador";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PositionedMenu from "./PositionedMenu";
import HandlerCaja from "./HandlerCaja";
let empleado = "";

export default function Header() {
  const navigate = useNavigate();
  const [name, setName] = useState("Initial Name");
  const [rol, setRol] = useState("Initial Name");

  async function fetchData() {
    empleado = JSON.parse(localStorage.getItem("empleado"));
    setName(empleado.usu_nombre);
    setRol(empleado.usu_rol);
  }

  useEffect(() => {
    let timerId = setInterval(() => {
      fetchData();
    }, 50);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const handleLogout = () => {
    try {
     axios.post("http://localhost:8081/logout");
      localStorage.removeItem("empleado");
      alert("Sesión cerrada");
      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      alert("Hubo un problema al cerrar la sesión.");
    }

    // localStorage.removeItem("empleado");
    // alert("Sesión cerrada");
    // navigate("/login");
  };

  return (
    <div className="bg-gray-100 h-12 flex items-center justify-between px-4 border-b border-slate-200 shadow-md">
      <div className="flex gap-3 items-center">
        {/* PROFILE */}

        <Saludador nombre={name} rol={rol} />

       
      </div>
      <div className="flex items-center gap-3 ">
        {/* ACCIONES RAPIDAS*/}
        <div className="p-2 border-r border-gray-300 flex h-full"><HandlerCaja/></div>
          <div className="pr-2 border-r border-gray-300">
            <PositionedMenu />
          </div>
        <div className="flex-gap-6">
          <button className="flex items-center gap-1">
            <span>{name}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <button onClick={handleLogout}>
          <LogOut className="w-4 h-4" />
        </button>
        {/* */}
        <button className="w-8 h-8 border-slate-900 rounded-full"></button>
        {/* */}
        {/* <button className="w-8 h-8 border-slate-900 ">
          <LayoutGrid className="w-6 h-6" />
        </button> */}
      </div>
    </div>
  );
}
