import React, {useState} from "react";
import Header from "../componentes/PantallaUsuarios/Header";
import { HandCoins } from "lucide-react";
import TablaFlujoDinero from "../componentes/PantallaFlujoDinero/TablaFlujoDinero";

function FlujoDinero() {
  const [status, setStatus] = useState(1);

  const handleStatus = () => {
    setStatus(status === 1 ? 0 : 1);
  };


  return (
    <div>
      <Header
        entidad={"Flujo de efectivo"}
        btnLink={"/flujoefectivo/agregar"}
        status={status}
        handleStatus={handleStatus}
        icono={<HandCoins />}
      ></Header>

      <TablaFlujoDinero/>
    </div>
  );
}

export default FlujoDinero;
