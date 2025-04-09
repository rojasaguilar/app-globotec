import {
  BaggageClaim,
  BarChart4,
  Cable,
  ContactRound,
  Home,
  ShoppingBag,
  ShoppingCart,
  UsersRound,
} from "lucide-react";
import React from "react";

export default function Sidebar() {
  const sideItems = [
    {
      href: "/home",
      logo: <Home className="w-4 h-4" />,
      tite: "Home",
    },
    {
      href: "/productos",
      logo: <BaggageClaim className="w-4 h-4" />,
      tite: "Productos",
    },
    {
      href: "/proveedores",
      logo: <ShoppingBag className="w-4 h-4" />,
      tite: "Provedores",
    },
    {
      href: "/clientes",
      logo: <ContactRound className="w-4 h-4" />,
      tite: "Clientes",
    },
    {
      href: "/ventas",
      logo: <Cable className="w-4 h-4" />,
      tite: "Ventas",
    },
    {
      href: "/devoluciones",
      logo: <Cable className="w-4 h-4" />,
      tite: "Devoluciones",
    },
    {
      href: "/reportes",
      logo: <BarChart4 className="w-4 h-4" />,
      tite: "Reportes",
    },
    {
      href: "/usuarios",
      logo: <UsersRound className="w-4 h-4" />,
      tite: "Usuarios",
    },
  ];

  return (
    <div className="flex flex-col w-60 min-h-screen bg-slate-800 text-slate-50 fixed">
      <div className="flex flex-col">
        {/* Logo */}
        <a href="/home" className=" py-3 px-2 bg-slate-900 flex space-x-2 items-center">
          <ShoppingCart />
          <span className=" text-xl font-semibold">Globo TEC</span>
        </a>

        <nav className="flex flex-col gap-3 px-3 py-6">
          {sideItems.map((item) => {
            return (
              <a
                href={item.href}
                className={
                  window.location.pathname.includes(item.href)
                    ? "flex items-center space-x-2 p-2 rounded-md bg-blue-600"
                    : "flex items-center space-x-2 p-2 rounded-md hover:bg-blue-600"
                }
              >
                {item.logo}
                <span>{item.tite}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
