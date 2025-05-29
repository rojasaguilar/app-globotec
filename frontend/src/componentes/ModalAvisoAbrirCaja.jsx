import React from "react";
import ReactDOM from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "20px 40px",
  borderRadius: "12px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: 1000,
};

export default function ModalAvisoAbrirCaja({ open, onClose }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="flex flex-col space-y-6 py-4">
          <div className="text-center">
            <p className="text-lg font-medium">Atención</p>
            <p className="text-sm text-gray-500">
              Debes abrir la caja antes de continuar.
            </p>
            <button
              type="button"
              className="bg-blue-600 w-full py-1.5 rounded-xl text-white font-semibold mt-4"
              onClick={onClose}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
