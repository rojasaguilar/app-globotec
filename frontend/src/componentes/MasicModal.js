import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Check, Plus } from "lucide-react";
import { Input } from "@mui/material";
import axios from "axios";

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

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [nombre, setNombre] = useState("");
  console.log(nombre);

  const handleUp = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/categorias/agregar", { nombre })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    handleClose();
    // window.location.reload();
  };

  return (
    <div>
      <Button className="bg-blue-700" onClick={handleOpen}>
        {<Plus className="w-4 h-4" />}Agregar Categoria
      </Button>
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
            <Input
              className="bg-zinc-200 "
              name="nombre"
              onChange={(e) => setNombre(e.target.value)}
            />
            <Button className="items-center bg-blue-600" onClick={handleUp}>
              {" "}
              {<Check />}Agregar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
