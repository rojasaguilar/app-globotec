import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Acciones Rapidas
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {/*USUARIOS */}
          <MenuItem onClick={handleClose}>
            <Link to={"/usuarios"}>Visualizar Usuarios</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={"/usuarios/agregar"}>Agregar Usuario</Link>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />

        {/*PRODUCTOS */}
          <MenuItem onClick={handleClose}>
            <Link to={"/productos"}>Visualizar Productos</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={"/productos/agregar"}>Agregar Nuevo Producto</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={"/producto/resurtir"}>Resurtir Producto</Link>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />

        {/*PROVEEDORES */}
          <MenuItem onClick={handleClose}>
            <Link to={"/proveedores"}>Visualizar Provedores</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={"/proveedores/agregar"}>Agregar Provedor</Link>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />

        {/*CLIENTES */}
          <MenuItem onClick={handleClose}>
            <Link to={"/clientes"}>Visualizar clientes</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={"/clientes/agregar"}>Agregar Cliente</Link>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />

        {/*VENTAS */}
        <MenuItem onClick={handleClose}>
            <Link to={"/ventas"}>Visualizar Ventas</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={"/ventas/agregar"}>Agregar Venta</Link>
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />

        {/*FLUJO EFECTIVO */}
        <MenuItem onClick={handleClose}>
            <Link to={"/flujoefectivo"}>Visualizar Flujos de Efectivo</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to={"/flujoefectivo/agregar"}>Agregar Flujo de Efectivo</Link>
          </MenuItem>
      </Menu>
    </div>
  );
}
