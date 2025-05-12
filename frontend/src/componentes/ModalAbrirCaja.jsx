import React, { useState } from "react";
import ReactDom from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "10px 30px",
  borderRadius: "12px",
  zIndez: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,.7)",
  zIndez: 1000,
};

export default function ModalAbrirCaja({ open, header,text, onClose, icon }) {
    const [cantidad,setCantidad] = useState(0.0);

    // const handleCantidadInicial = () => {
    //     let caja = {cantidadInicial: cantidad};
    //     localStorage.setItem("cantidadCaja", JSON.stringify(caja))
    // }
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="flex-col space-y-6 py-4">
          <div className="w-full flex justify-center">
            {icon}
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">{header}</p>
            <p className="text-sm text-gray-500 ">{text}</p>
            <input type="text" onChange={(e)=> setCantidad(e.target.value) } />
            <button type="submit" className="bg-blue-600 w-full py-1.5 rounded-xl text-white font-semibold" onClick={()=>onClose(cantidad)}>
            Aceptar
          </button>
          </div>
         
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}