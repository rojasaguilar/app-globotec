import React from "react";
import Header from "../componentes/PantallaAgregarFlujoDinero/Header";

function AgregarFlujo() {
  return (
    <div>
      <form action="">
        <Header etiquetaBoton={"Agregar flujo"} titulo={"Flujo de efectivo"} link={"/flujoefectivo"} />
      </form>
    </div>
  );
}

export default AgregarFlujo;
