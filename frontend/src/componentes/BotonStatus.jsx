import React from "react";

function BotonStatus({ estado, onClick, id }) {
  return (
    <div id={id}>
      {estado === 1 ? (
        <div className="w-fit px-8 py-1.5 rounded-xl bg-red-300 font-semibold text-red-800 hover:cursor-pointer" onClick={onClick}>
          Dar de baja
        </div>
      ) : (
        <div className="w-fit px-8 py-1.5 rounded-xl bg-blue-300 font-semibold text-blue-800 hover:cursor-pointer" onClick={onClick}>
          Dar de alta
        </div>
      )}
    </div>
  );
}

export default BotonStatus;
