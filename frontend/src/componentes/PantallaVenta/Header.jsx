import React from "react";

function Header() {
  return (
    <div className=" ">
      <hedaer className="bg-slate-100 w-full px-8 py-4 flex flex-col rounded-lg shadow-md mb-2">
        <div className="w-full flex justify-between items-center ">
          <p className="text-2xl font-semibold">Ventas</p>
          
        </div>

        <div className="w-full flex justify-between items-center ">
          <p className="text-gray-500 text-base">Venta <span className="text-gray-800 font-medium">/ Detalles de Venta</span></p>
        </div>
      </hedaer>
    </div>
  );
}

export default Header;
