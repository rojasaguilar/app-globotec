import "./App.css";
import Login from "./pantallas/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pantallas/Signup";
import Home from "./pantallas/Home";
import Usuarios from "./pantallas/Usuarios";
import Productos from "./pantallas/Productos";
import Proveedores from "./pantallas/Proveedores";
import Agregarproducto from "./pantallas/Agregarproducto";
import Agregarproveedor from "./pantallas/Agregarproveedor";
import Agregarusuario from "./pantallas/Agregarusuario";
import Usuario from "./pantallas/Usuario";
import EditarProveedor from "./pantallas/EditarProveedor";
import Ventas from "./pantallas/Ventas";
import NuevaVenta from "./pantallas/NuevaVenta";
import Clientes from "./pantallas/Clientes";
import AgregarCliente from "./pantallas/AgregarCliente";
import EditarCliente from "./pantallas/EditarCliente";
import Layout from "./componentes/layout";
import UserMenu from "./componentes/UserMenu";
import FlujoDinero from "./pantallas/FlujoDinero";
import AgregarFlujo from "./pantallas/AgregarFlujo";
import Venta from "./pantallas/Venta";
import TicketVenta from "./pantallas/TicketVenta";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="*" element={<Login />}></Route>

        <Route element={<Layout />}>
          {/* RUTAS USUARIOS*/}
          <Route path="usuarios" element={<Usuarios />}></Route>
          <Route path="usuarios/agregar" element={<Agregarusuario />}></Route>
          <Route path="usuarios/editar" element={<Usuario />}></Route>

          {/* RUTAS PRODUCTOS*/}
          <Route path="productos" element={<Productos />}></Route>
          <Route path="productos/agregar" element={<Agregarproducto />}></Route>

          {/* RUTAS PROVEEDORES*/}
          <Route path="proveedores" element={<Proveedores />}></Route>
          <Route path="proveedores/agregar" element={<Agregarproveedor />}></Route>
          <Route path="proveedores/editar" element={<EditarProveedor />}></Route>

          {/* RUTAS VENTAS*/}
          <Route path="ventas" element={<Ventas />}></Route>
          <Route path="ventas/agregar" element={<NuevaVenta />}></Route>
          <Route path="ventas/venta" element={<Venta />}></Route>

          {/* RUTAS CLIENTES*/}
          <Route path="clientes" element={<Clientes />}></Route>
          <Route path="clientes/agregar" element={<AgregarCliente />}></Route>
          <Route path="clientes/editar" element={<EditarCliente />}></Route>

          {/* RUTAS ENTRADAS/SALIDAS DINERO*/}
          <Route path="flujoefectivo" element={<FlujoDinero />}></Route>
          <Route path="flujoefectivo/agregar" element={<AgregarFlujo />}></Route>
        </Route>
        <Route path="usermenu" element={<UserMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
