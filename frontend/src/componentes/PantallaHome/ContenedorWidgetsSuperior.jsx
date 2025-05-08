import React from "react";
import TotalVentasHoy from "../WidgetsHome/TotalVentasHoy";
function ContenedorWidgetsSuperior() {
  return (
    <div>
      {/* WIDGETS SUPERIOR */}
      <div className="grid grid-cols-9 w-full bg-red-200 gap-24 px-24">
        <div className="col-span-3">
          <TotalVentasHoy />
        </div>
        <div className="col-span-3">
          <TotalVentasHoy />
        </div>
        <div className="col-span-3">
          <TotalVentasHoy />
        </div>
      </div>
    </div>
  );
}

export default ContenedorWidgetsSuperior;
