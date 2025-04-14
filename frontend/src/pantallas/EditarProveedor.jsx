import React, {useState} from 'react'
import { useLocation,useNavigate } from "react-router-dom";
import axios from 'axios';
import RadioButtonStatus from '../componentes/RadioButtonStatus';

function EditarProveedor() {

    const location = useLocation();
    const navigator = useNavigate();
    
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
            alert("Proveedor actualizado")
            navigator("/proveedores");
           }else{
            alert("error al acutualizar")
           }
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      return (
        <div>
          <form action="" onSubmit={handleSubmit}>
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
            <button type="submit">Actualizar Proveedor</button>
          </form>
        </div>
      );
    }

export default EditarProveedor