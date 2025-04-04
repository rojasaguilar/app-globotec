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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="home" element={<Home />}></Route>

        <Route
          path="usuarios"
          element={<Home children={<Usuarios />} />}
        ></Route>

        <Route
          path="productos"
          element={<Home children={<Productos />} />}
        ></Route>

        <Route
          path="proveedores"
          element={<Home children={<Proveedores />} />}
        ></Route>

        <Route
          path="productos/agregar"
          element={<Home children={<Agregarproducto />} />}
        ></Route>

        <Route
          path="proveedores/agregar"
          element={<Home children={<Agregarproveedor />} />}
        ></Route>
        <Route
          path="proveedores/editar"
          element={<Home children={<EditarProveedor />} />}
        ></Route>
        <Route
          path="usuarios/agregar"
          element={<Home children={<Agregarusuario />} />}
        ></Route>
        <Route
          path="usuarios/usuario"
          element={<Home children={<Usuario />} />}
        ></Route>
        <Route
          path="ventas"
          element={<Home children={<Ventas />} />}
        ></Route>
        
         <Route
          path="ventas/nuevaventa"
          element={<Home children={<NuevaVenta />} />}
        ></Route>

        <Route path="*" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
