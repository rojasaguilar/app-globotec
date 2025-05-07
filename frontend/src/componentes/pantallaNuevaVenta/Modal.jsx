import { TriangleAlert } from "lucide-react";
import React from "react";
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

export default function Modal({ open, productos, onClose }) {
  console.log(productos);
  if (!open || productos.length === 0) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="flex-col space-y-6 py-4">
          <div className="w-full flex justify-center">
            <TriangleAlert size={48} color="#f66151" strokeWidth={2} />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">STOCK INSUFICIENTE</p>
            <p className="text-sm text-gray-500 ">Verifica el stock de los siguientes productos.</p>
          </div>
          <div>
            <div className="grid grid-cols-3 mb-2 gap-2">
              <div>
                <p>Producto</p>
              </div>
              <div className="text-end">
                <p>Stock</p>
              </div>
              <div className="text-end">
                <p>Solicitados</p>
              </div>
            </div>
            {productos.map((producto) => {
              return (
                <div className="grid grid-cols-3 py-2 gap-2">
                  <div>
                    <p>{producto.pro_nombre}</p>
                  </div>
                  <div className="flex justify-end">
                    <p className="text-red-600 bg-red-200 rounded-md px-2 font-medium">{producto.pro_stock}</p>
                  </div>
                  <div className="flex justify-end">
                    <p className="font-medium">{producto.cantidadSolicitada}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="bg-blue-600 w-full py-1.5 rounded-xl text-white font-semibold" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
