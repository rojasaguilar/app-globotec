import React, { useState } from "react";
import axios from "axios";
import Modal from "../ModalGlobal";
import { CheckCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FormularioCliente() {
  const [cliente, setCliente] = useState({
    cli_nombre: "",
    cli_correo: "",
    cli_rfc: "",
    cli_cp: "",
  });

  const [open, setOpen] = useState(false);

  const handleInput = (event) => {
    setCliente((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const navigate = useNavigate();



  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/clientes/agregar", cliente)
      .then((res) => {
        if(res.data.affectedRows === 1){
          setOpen(true);
          return;
        }
        alert("Verifica los datos")
        return;
      })
      
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>FormularioCliente</h1>
      <form action="" onSubmit={handleSubmit}>
        {/* INPUT NOMBRE*/}
        <div>
          <p>Nombre Cliente</p>
          <input type="text" name="cli_nombre" onChange={handleInput} />
        </div>
        {/* INPUT CORREO*/}
        <div>
          <p>Correo Cliente</p>
          <input type="text" name="cli_correo" onChange={handleInput} />
        </div>
        {/* INPUT RFC*/}
        <div>
          <p>RFC Cliente</p>
          <input type="text" name="cli_rfc" onChange={handleInput} />
        </div>
        {/* INPUT CODIGO POSTAL*/}
        <div>
          <p>Código Postal Cliente</p>
          <input type="text" name="cli_cp" onChange={handleInput} />
        </div>
        {/* */}
        <button type="submit">agregar</button>
      </form>
      <Modal open={open} header={"Cliente Agregado"} 
      text={"Cliente agregado satisfactoriamente"}
      onClose={()=> {
        setOpen(false);
        navigate("/clientes")
      }}
      icon={<CheckCheck size={48} color="#f66151" strokeWidth={2}/>}
      />
    </div>
  );
}

export default FormularioCliente;
