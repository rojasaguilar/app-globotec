import React, { useEffect, useState } from "react";
import ModalAbrirCaja from "./ModalAbrirCaja";
import ModalCerrarCaja from "./ModalCerrarCaja";
import ModalAvisoAbrirCaja from "./ModalAvisoAbrirCaja";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HandlerCaja() {
  const caja = JSON.parse(localStorage.getItem("Caja"));
  const [state, setState] = useState(caja ? caja.state : false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [showAviso, setShowAviso] = useState(false);
  const [rol, setRol] = useState(
    JSON.parse(localStorage.getItem("empleado")).usu_rol
  );

  const navigate = useNavigate();

  useEffect(() => {
    setRol(JSON.parse(localStorage.getItem("empleado")).usu_rol);
    if (window.location.pathname.includes("caja")) {
      document.querySelector(".opcion").disabled = true;
    }

    if (!state) {
      setShowAviso(true);
    }
  }, [state]);

  const requestFlujos = () => {
    setOpen2(false);
    axios
      .post("http://localhost:8081/corte")
      .then((res) => {
        navigate("/flujoefectivo/cortecaja", { state: res.data });
      })
      .catch((err) => console.log(err));
  };

  if (rol !== "i")
    return (
      <div className="w-full">
        <button
          className="opcion"
          onClick={() => {
            if (state === false) {
              setOpen(true);
            } else {
              setOpen2(true);
            }
          }}
        >
          {state ? "Cerrar Caja" : "Abrir caja"}
        </button>

        <ModalAvisoAbrirCaja
          open={showAviso}
          onClose={() => setShowAviso(false)}
        />

        <ModalAbrirCaja
          open={open}
          onClose={(cantidad) => {
            let caja = { cantidadInicial: cantidad, state: true };
            localStorage.setItem("Caja", JSON.stringify(caja));
            setOpen(false);
            setState(true);
          }}
          header={"Abrir Caja"}
        />

        <ModalCerrarCaja
          open={open2}
          onClose={requestFlujos}
          cancel={() => setOpen2(false)}
        />
      </div>
    );
  else return null;
}