import React from "react";
import ReactDOM from "react-dom";
import { Barcode, ContactRound, UserRound, CreditCard, Banknote, Landmark } from "lucide-react";

const usosCFDI = [
  { clave: "G01", descripcion: "Adquisición de mercancías" },
  { clave: "G02", descripcion: "Devoluciones, descuentos o bonificaciones" },
  { clave: "G03", descripcion: "Gastos en general" },
  { clave: "I01", descripcion: "Construcciones" },
  { clave: "I02", descripcion: "Mobiliario y equipo de oficina para inversiones" },
  { clave: "I03", descripcion: "Equipo de transporte" },
  { clave: "I04", descripcion: "Equipo de cómputo y accesorios" },
  { clave: "I05", descripcion: "Dados, troqueles, moldes, matrices y herramental" },
  { clave: "I06", descripcion: "Comunicaciones telefónicas" },
  { clave: "I07", descripcion: "Comunicaciones satelitales" },
  { clave: "I08", descripcion: "Otra maquinaria y equipo" },
  { clave: "D01", descripcion: "Honorarios médicos, dentales y hospitalarios" },
  { clave: "D02", descripcion: "Gastos médicos por incapacidad o discapacidad" },
  { clave: "D03", descripcion: "Gastos funerales" },
  { clave: "D04", descripcion: "Donativos" },
  { clave: "D05", descripcion: "Intereses reales pagados por créditos hipotecarios" },
  { clave: "D06", descripcion: "Aportaciones voluntarias al SAR" },
  { clave: "D07", descripcion: "Primas de seguros de gastos médicos" },
  { clave: "D08", descripcion: "Gastos de transportación escolar obligatoria" },
  { clave: "D09", descripcion: "Depósitos en cuentas para el ahorro, primas de pensiones" },
  { clave: "D10", descripcion: "Pagos por servicios educativos (colegiaturas)" },
  { clave: "S01", descripcion: "Sin efectos fiscales" },
  { clave: "CP01", descripcion: "Pagos" },
  { clave: "CN01", descripcion: "Nómina" }
];

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "20px 32px",
  borderRadius: "12px",
  maxWidth: "600px",
  width: "90%",
  maxHeight: "90vh",
  overflowY: "auto",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  zIndex: 999,
};

export default function FacturaModal({ open, onClose, data }) {
  if (!open) return null;

  const pagos = {
    e: { icon: <Banknote className="inline w-4 h-4" />, label: "Efectivo" },
    t: { icon: <CreditCard className="inline w-4 h-4" />, label: "Tarjeta" },
    b: { icon: <Landmark className="inline w-4 h-4" />, label: "Transferencia" },
  };
  const pago = pagos[data.ve_tipoPago] || {};

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />

      <div style={MODAL_STYLES}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Factura</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
          <div>
            <p><strong>ID Venta:</strong> {data.ve_id}</p>
            <p><strong>Fecha:</strong> {data.ve_fecha?.slice(0,10)} {data.ve_fecha?.slice(11,19)}</p>
            <p><strong>Total:</strong> ${parseFloat(data.ve_total || 0).toFixed(2)}</p>
          </div>
          <div>
            <p><strong>Cliente:</strong> {data.cli_nombre}</p>
            <p><strong>Régimen:</strong> {data.cli_regimen}</p>
            <p>Uso de CFDI:</p>
            <select className="w-3/4" > 
              {usosCFDI.map(uso => (<option value={uso.clave}>{uso.descripcion}</option>))}
            </select>
            <p><strong>Empleado:</strong> {data.usu_nombreUsuario}</p>
          </div>
          <div className="col-span-2">
            <p><strong>Forma de Pago:</strong> {pago.icon} {pago.label}</p>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

