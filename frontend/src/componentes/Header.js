import {
  Bell,
  ChevronDown,
  History,
  LayoutGrid,
  LogOut,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Saludador from "./Saludador";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PositionedMenu from "./PositionedMenu";
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

  const handleLogout = (e) => {
    axios.post("http://localhost:8081/logout");
    navigate("/login");
    alert("sesion cerrada");
    localStorage.removeItem("empleado");
  };

  return (
    <div className="bg-gray-100 h-12 flex items-center justify-between px-4 border-b border-slate-200 shadow-md">
      <div className="flex gap-3 items-center">
        {/* Recent activities */}
        <button>
          <History className="w-5 h-5" />
        </button>
        {/* Search */}
        <SearchInput className="w-5 h-5" />
        {/* PROFILE */}

        <Saludador nombre={name} rol={rol} />
      </div>
      <div className="flex items-center gap-3 ">
        {/*  */}
        <div className="pr-2 border-r border-gray-300">
          {/* <button className="p-1 rounded-lg bg-blue-600">
            <Plus className="text-slate-50 w-4 h-4" />
          </button> */}
          <PositionedMenu />
        </div>
        <div className="flex border-r border-gray-300 space-x-3">
          <button className="p-1 rounded-lg hover:bg-slate-200">
            <Users className="text-slate-900 w-4 h-4" />
          </button>
          <button className="p-1 rounded-lg hover:bg-slate-200">
            <Bell className="text-slate-900 w-4 h-4" />
          </button>
          <button className="p-1 rounded-lg hover:bg-slate-200">
            <Settings className="text-slate-900 w-4 h-4" />
          </button>
        </div>
        {/* */}
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
        <button className="w-8 h-8 border-slate-900 ">
          <LayoutGrid className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
