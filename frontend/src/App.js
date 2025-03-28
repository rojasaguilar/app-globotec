import "./App.css";
import Login from "./login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Home from "./Home";
import Usuarios from "./Usuarios";
import Productos from "./Productos";
import Proveedores from "./Proveedores";
import Agregarproducto from "./Agregarproducto";
import Agregarproveedor from "./Agregarproveedor";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
