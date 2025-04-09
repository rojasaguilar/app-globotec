import React,{useState} from "react";
import Tablausuarios from "../componentes/PantallaUsuarios/Tablausuarios";
import Header from "../componentes/PantallaUsuarios/Header";
import { UserRoundPlus } from "lucide-react";

function Usuarios() {
  const [status, setStatus] = useState(1);

  const handleStatus = () => setStatus(status === 1 ? 0 : 1);

  return (
    <div className="w-full">
      <Header
        entidad={"Usuarios"}
        msjSearchInput={"Buscar por nombre..."}
        btnLink={"/usuarios/agregar"}
        status={status}
        handleStatus={handleStatus}
        icono={<UserRoundPlus className="w-4 h-4"/>}
      />
      <Tablausuarios status={status} />
    </div>
  );
}

export default Usuarios;
