import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Check, Plus } from "lucide-react";
import { Input } from "@mui/material";
import axios from "axios";
import RadioButtonStatus from "../RadioButtonStatus";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #",
  boxShadow: 24,
  p: 4,
};

export default function ModalEditarProveedor({prove}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
  const [proveedor, setProveedor] = useState(prove);
  console.log(proveedor);

  const handleInput = (event) => {
    setProveedor((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUp = e => {
    axios.post("http://localhost:8081/proveedores/editar", proveedor)
    .then((res) => {
 
     if(res.data.affectedRows === "1"){
      alert("Proveedor actualizado")
      navigator("/proveedores");
     }else{
      alert("error al acutualizar")
     }
    })
    .catch((err) => {
      console.log(err);
    });
    handleClose();
    window.location.reload();
  };

  return (
    <div>
      <p className="bg-blue-700" onClick={handleOpen}>
       Editar
      </p>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="space-y-2" sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nombre de Categoria
          </Typography>
          <div className="flex justify-between">
    <form action="" onSubmit={handleUp}>
      <div>
        <p>Nombre</p>
        <input
          type="text"
          name="prove_nombre"
          value={proveedor.prove_nombre}
           onChange={handleInput}
        />
      </div>
      <div>
        <p>Correo</p>
        <input
          type="text"
          name="prove_correo"
          value={proveedor.prove_correo}
           onChange={handleInput}
        />
      </div>
      <div>
        <p>Telefono</p>
        <input
          type="text"
          name="prove_telefono"
          value={proveedor.prove_telefono}
           onChange={handleInput}
        />
      </div>
      <div>
        <p>Direccion</p>
        <input
          type="text"
          name="prove_direccion"
          value={proveedor.prove_direccion}
           onChange={handleInput}
        />
      </div>
      <div>
        <p>Esta activo</p>
        <input
          type="text"
          name="prove_activo"
          value={proveedor.prove_activo}
           onChange={handleInput}
        />
      </div>
      <RadioButtonStatus nombre={"prove_status"}/>
      <button className="items-center bg-blue-600" onClick={handleUp} >Actualizar Proveedor</button>
    </form>
          </div>
        </Box>
      </Modal>
    </div>

  );

  
}
