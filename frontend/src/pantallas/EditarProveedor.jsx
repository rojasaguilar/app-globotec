import React, {useState} from 'react'
import { useLocation,useNavigate } from "react-router-dom";
import axios from 'axios';
import RadioButtonStatus from '../componentes/RadioButtonStatus';
import HeaderEditarProveedor from "../componentes/PantallaEditarProveedor/HeaderEditarProveedor";
import Modal from "../componentes/ModalGlobal";
import { Check, CheckCheck } from "lucide-react";

function EditarProveedor() {

  const location = useLocation();
  const [open,setOpen] = useState(false);
  const navigate = useNavigate();
    
      const [proveedor, setProveedor] = useState(location.state);
      console.log(proveedor);

      const handleInput = (event) => {
        setProveedor((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        axios
          .post("http://localhost:8081/proveedores/editar", proveedor)
          .then((res) => {
       
           if(res.data.affectedRows === 1){
            setOpen(true);
            return;
           }else{
            alert("error al acutualizar")
           }
          })
          .catch((err) => {
            console.log(err);
          });
      };

      return (
        <div className="bg-zinc-10 min-h-screen py-10 px-4">
          <form action="" onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <HeaderEditarProveedor/>
            <div className="grid gap-6 mb-6 md:grid-cols-2 mt-8">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Nombre del proveedor:</label>
                  <input
                  type="text"
                  name="prove_nombre"
                  value={proveedor.prove_nombre}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Correo:</label>
                <input
                  type="email"
                  name="prove_correo"
                  value={proveedor.prove_correo}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Teléfono:</label>
                <input
                  type="tel" /*text*/
                  name="prove_telefono"
                  value={proveedor.prove_telefono}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Dirección:</label>
                <input
                  type="text"
                  name="prove_direccion"
                  value={proveedor.prove_direccion}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />              
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Estado:</label>
                <select
                  type="text"
                  name="prove_estado"
                  value={proveedor.prove_estado}
                  onChange={handleInput}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
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

              <div className="flex flex-col items-center">
                <label className="block mb-50 text-sm font-medium text-gray-900">Estatus:</label>
                <RadioButtonStatus 
                  value={String(proveedor.prove_activo)}
                  onChange={(event) =>
                    setProveedor((prev) => ({
                      ...prev,
                      prove_activo: parseInt(event.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </form>
          <Modal icon={<CheckCheck size={48} color="#2dae6b" strokeWidth={2}/>} open={open} header={"ACTUALIZADO"} text={"Proveedor actualizado correctamente"} onClose={() => {setOpen(false); navigate("/proveedores")}}/>
        </div>
      );
    }

export default EditarProveedor