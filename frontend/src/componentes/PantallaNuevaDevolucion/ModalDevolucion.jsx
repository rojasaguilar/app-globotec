import React from "react";
import ReactDom from "react-dom";
import { Link } from "react-router-dom";

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

export default function ModalDevolucion({ open, header,text, onClose, data, icon }) {
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
          </div>
          <button className="bg-blue-600 w-full py-1.5 rounded-xl text-white font-semibold" onClick={onClose}>
            Aceptar
          </button>
          <Link className="bg-blue-600 w-full py-1.5 rounded-xl text-white font-semibold" to={"/devoluciones/devolucion"} 
          state={{ve_id: data.ve_id, dev_id: data.dev_id}}>
            Consultar Devolucion
          </Link>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}