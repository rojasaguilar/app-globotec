import React from "react";

function HeaderCorteCaja() {
  return (
    <div className=" ">
      <hedaer className="bg-slate-100 w-full px-8 py-4 flex flex-col rounded-lg shadow-md mb-2">
        <div className="w-full flex justify-between items-center ">
          <p className="text-2xl font-semibold">Corte de caja</p>
          
        </div>

        <div className="w-full flex justify-between items-center ">
          <p className="text-gray-500 text-base">Corte de caja 
            <span className="text-gray-800 font-medium"> / Desglose de Corte de caja</span></p>
        </div>
      </hedaer>
    </div>
  );
}

export default HeaderCorteCaja;