import React, { useState } from "react";
import axios from "axios";
import HeaderAgregarProveedor from "../componentes/PantallaAgregarProveedor/HeaderAgregarProveedor";
import NotificacionAgregarProveedor from "../componentes/PantallaAgregarProveedor/NotificacionAgregarProveedor";
// import { useNavigate } from "react-router-dom";

function Agregarproveedor() {
  // const navigate = useNavigate();
  function vaciarInputs() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });

    setValues(prev => ({
      ...prev,
      estado: ""
    }));
  }

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const [values, setValues] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    estado: "",
    usuario: JSON.parse(localStorage.getItem("empleado")).usu_id,
  });

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/proveedores/agregar", values)
      .then((res) => {
        console.log(res);
        setShowSuccessToast(true);
        setShowErrorToast(false);
        vaciarInputs();
        // navigate('/proveedores')
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
        setShowErrorToast(true);
        setShowSuccessToast(false);
      });
  };

  return (
    <div className="bg-zinc-10 min-h-screen py-10 px-4">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <HeaderAgregarProveedor/>
        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-8">
          <div>
            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900">Nombre del proveedor</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre Proveedor"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="correo" className="block mb-2 text-sm font-medium text-gray-900">Correo</label>
            <input
              type="email"
              name="correo"
              id="correo"
              placeholder="Correo Proveedor"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-900">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              id="telefono"
              placeholder="123-456-7890"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="direccion" className="block mb-2 text-sm font-medium text-gray-900">Dirección</label>
            <input
              type="text"
              name="direccion"
              id="direccion"
              placeholder="Dirección Proveedor"
              onChange={handleInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="estado" className="block mb-2 text-sm font-medium text-gray-900">Estado</label>
            <select
              name="estado"
              id="estado"
              onChange={handleInput}
              value={values.estado}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value="">Seleccione un estado</option>
              <option value="Aguascalientes">Aguascalientes</option>
              <option value="Baja California">Baja California</option>
              <option value="Baja California Sur">Baja California Sur</option>
              <option value="Campeche">Campeche</option>
              <option value="Chiapas">Chiapas</option>
              <option value="Chihuahua">Chihuahua</option>
              <option value="Ciudad de México">Ciudad de México</option>
              <option value="Coahuila">Coahuila</option>
              <option value="Colima">Colima</option>
              <option value="Durango">Durango</option>
              <option value="Estado de México">Estado de México</option>
              <option value="Guanajuato">Guanajuato</option>
              <option value="Guerrero">Guerrero</option>
              <option value="Hidalgo">Hidalgo</option>
              <option value="Jalisco">Jalisco</option>
              <option value="Michoacán">Michoacán</option>
              <option value="Morelos">Morelos</option>
              <option value="Nayarit">Nayarit</option>
              <option value="Nuevo León">Nuevo León</option>
              <option value="Oaxaca">Oaxaca</option>
              <option value="Puebla">Puebla</option>
              <option value="Querétaro">Querétaro</option>
              <option value="Quintana Roo">Quintana Roo</option>
              <option value="San Luis Potosí">San Luis Potosí</option>
              <option value="Sinaloa">Sinaloa</option>
              <option value="Sonora">Sonora</option>
              <option value="Tabasco">Tabasco</option>
              <option value="Tamaulipas">Tamaulipas</option>
              <option value="Tlaxcala">Tlaxcala</option>
              <option value="Veracruz">Veracruz</option>
              <option value="Yucatán">Yucatán</option>
              <option value="Zacatecas">Zacatecas</option>
            </select>
          </div>
        </div>
      </form>
      <div className="mt-10 ml-4 w-[30%]">
        <NotificacionAgregarProveedor
          showSuccess={showSuccessToast}
          showError={showErrorToast}
          onCloseSuccess={() => setShowSuccessToast(false)}
          onCloseError={() => setShowErrorToast(false)}
        />
      </div>
    </div>
  );
}

export default Agregarproveedor;
