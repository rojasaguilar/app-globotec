import {
  BaggageClaim,
  BarChart4,
  Cable,
  ContactRound,
  DollarSign,
  Home,
  LucideBanknote,
  ShoppingBag,
  ShoppingCart,
  UsersRound,
} from "lucide-react";
import React from "react";

export default function Sidebar() {
  const sideItems = [
    {
      href: "/home",
      logo: <Home className="w-5 h-5" />,
      title: "Home",
    },
    {
      href: "/productos",
      logo: <BaggageClaim className="w-5 h-5" />,
      title: "Productos",
    },
    {
      href: "/proveedores",
      logo: <ShoppingBag className="w-5 h-5" />,
      title: "Provedores",
    },
    {
      href: "/clientes",
      logo: <ContactRound className="w-5 h-5" />,
      title: "Clientes",
    },
    {
      href: "/ventas",
      logo: <LucideBanknote className="w-5 h-5" />,
      title: "Ventas",
    },
    {
      href: "/flujoefectivo",
      logo: <DollarSign className="w-5 h-5" />,
      title: "Flujo de efectivo",
    },
    {
      href: "/devoluciones",
      logo: <Cable className="w-5 h-5" />,
      title: "Devoluciones",
    },
    {
      href: "/reportes",
      logo: <BarChart4 className="w-5 h-5" />,
      title: "Reportes",
    },
    {
      href: "/usuarios",
      logo: <UsersRound className="w-5 h-5" />,
      title: "Usuarios",
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
                    ? "flex items-center space-x-2 p-2 rounded-md bg-blue-600 font-medium"
                    : "flex items-center space-x-2 p-2 rounded-md hover:bg-blue-600"
                }
              >
                {item.logo}
                <span className="text-base  ">{item.title}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
