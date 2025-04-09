import React,{useState} from "react";


function UserMenu() {
    const [empleado] = useState(JSON.parse(localStorage.getItem('empleado')));
  return (
    <div className="bg-red-100 h-screen w-1/5 p-1 grid grid-rows-12">
      <div className="w-full bg-blue-200 rounded-xl p-1.5 relative">
        <p className="absolute top-0 right-0 mt-1.5 mr-1.5">X</p>
      </div>

      <div className="bg-blue-100 flex">
        <p>imagen</p>
        <button className=" text-gray-600 text-xs  font-semibold bg-white py-1.5 px-2 rounded-lg h-fit">
          Cancelar
        </button>
        <button className=" h-fit py-1.5 px-2 rounded-lg text-xs  font-semibold bg-black text-white">
          Guardar Cambios
        </button>
      </div>

      <div>
        <p>{`${empleado.usu_nombre} ${empleado.usu_apellidoPaterno} ${empleado.usu_apellidoMaterno}`}</p>
        <p>{`${empleado.usu_nombreUsuario}`}</p>
      </div>

      <div className="w-full p-1.5 row-start-12 space-x-2 flex justify-end items-center border-t border">
        <button className=" text-gray-600 text-xs  font-semibold bg-white py-1.5 px-2 rounded-lg h-fit">
          Cancelar
        </button>
        <button className=" h-fit py-1.5 px-2 rounded-lg text-xs  font-semibold bg-black text-white">
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}

export default UserMenu;
