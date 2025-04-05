import {
  BaggageClaim,
  BarChart4,
  Cable,
  ContactRound,
  Home,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  UsersRound,
} from "lucide-react";

import React from "react";
// import SubscriptionCard from "./SubscriptionCard";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-60 min-h-screen bg-slate-800 text-slate-50 fixed">
      {/* Top Part */}

      <div className="flex flex-col">
        {/* Logo */}
        <a
          href="/usuarios"
          className=" py-3 px-2 bg-slate-900 flex space-x-2 items-center"
        >
          <ShoppingCart />
          <span className=" text-xl font-semibold">Globo TEC</span>
        </a>
        {/* as */}

        <nav className="flex flex-col gap-3 px-3 py-6">
          <a
            href="/home"
            className="flex items-center space-x-2
            bg-blue-600 text-slate-50 p-2 rounded-md"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </a>

          <a
            href="/productos"
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-600"
          >
            <BaggageClaim className="w-4 h-4" />
            <span>Productos</span>
          </a>

          <a
            href="/proveedores"
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-600"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Proveedores</span>
          </a>

          <a
            href="/clientes"
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-600"
          >
            <ContactRound className="w-4 h-4" />
            <span>Clientes</span>
          </a>

          <a
            href="/ventas"
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-600"
          >
            <Cable className="w-4 h-4" />
            <span>Ventas</span>
          </a>
          <a
            href="/devoluciones"
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-600"
          >
            <Cable className="w-4 h-4" />
            <span>Devoluciones</span>
          </a>

          <a
            href="/reportes"
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-600"
          >
            <BarChart4 className="w-4 h-4" />
            <span>Reportes</span>
          </a>

          <a
            href="/usuarios"
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-600"
          >
            <UsersRound className="w-4 h-4" />
            <span>Usuarios</span>
          </a>
        </nav>

        {/* Subscription Card */}
        {/* <DropdownMenu /> */}
        {/* <SubscriptionCard /> */}
      </div>

      {/* Footer Icon */}
    </div>
  );
}
