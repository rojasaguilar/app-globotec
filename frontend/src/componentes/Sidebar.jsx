import {
  BaggageClaim,
  BarChart4,
  Cable,
  ContactRound,
  DollarSign,
  Home,
  LoaderPinwheelIcon,
  LucideBanknote,
  ShoppingBag,
  ShoppingCart,
  UsersRound,
} from "lucide-react";
import React,{useEffect   } from "react";

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
      class: "screen_gerente"
    },
    {
      href: "/clientes",
      logo: <ContactRound className="w-5 h-5" />,
      title: "Clientes",
      class: "screen_no_inventario"
    },
    {
      href: "/ventas",
      logo: <LucideBanknote className="w-5 h-5" />,
      title: "Ventas",
      class: "screen_no_inventario"
    },
    {
      href: "/flujoefectivo",
      logo: <DollarSign className="w-5 h-5" />,
      title: "Flujo de efectivo",
      class: "screen_no_inventario"
    },
    {
      href: "/devoluciones",
      logo: <Cable className="w-5 h-5" />,
      title: "Devoluciones",
      class: "screen_no_inventario"
    },
    {
      href: "/reportes",
      logo: <BarChart4 className="w-5 h-5" />,
      title: "Reportes",
      class: "screen_gerente"
    },
    {
      href: "/usuarios",
      logo: <UsersRound className="w-5 h-5" />,
      title: "Usuarios",
      class: "screen_gerente"
    },
  ];

   useEffect(() => {
      
      if (JSON.parse(localStorage.getItem("empleado")).usu_rol !== "g") {
        const pantallasProtegidas = document.querySelectorAll(".screen_gerente");
        pantallasProtegidas.forEach((pantalla) => {
          pantalla.hidden = true;
        });
      }
      if (JSON.parse(localStorage.getItem("empleado")).usu_rol === "i") {
        const pantallasProtegidas = document.querySelectorAll(".screen_no_inventario");
        pantallasProtegidas.forEach((pantalla) => {
          pantalla.hidden = true;
        });
      }
    },[]);
  return (
    <div className="flex flex-col w-60 min-h-screen bg-slate-800 text-slate-50 fixed">
      <div className="flex flex-col">
        {/* Logo */}
        <a href="/home" className=" py-3 px-2 bg-slate-900 flex space-x-2 items-center">
          {/* <ShoppingCart /> */}
          <LoaderPinwheelIcon strokeWidth={2}/>
          <span className=" text-xl font-semibold">Globo TEC</span>
        </a>

        <nav className="flex flex-col gap-3 px-3 py-6">
          {sideItems.map((item) => {
            return (
             <div class={item.class? item.class: ""}>
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
             </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
