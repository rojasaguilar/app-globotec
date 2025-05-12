import React from "react";
import TotalVentasHoy from "../WidgetsHome/TotalVentasHoy";
import TotalDevolucionesHoy from "../WidgetsHome/TotalDevolucionesHoy";
import ProductoMasVendido from "../WidgetsHome/ProductoMasVendido";
function ContenedorWidgetsSuperior() {
  return (
    <div>
      {/* WIDGETS SUPERIOR */}
      <div className="grid grid-cols-9 w-full mt-2 gap-24 px-24">
        <div className="col-span-3">
          <TotalVentasHoy />
        </div>
        <div className="col-span-3">
          <TotalDevolucionesHoy />
        </div>
        <div className="col-span-3">
          <ProductoMasVendido />
        </div>
      </div>
    </div>
  );
}

export default ContenedorWidgetsSuperior;
