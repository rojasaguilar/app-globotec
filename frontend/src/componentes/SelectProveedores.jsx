import axios from "axios";
import React, { useState, useEffect } from "react";

export default function SelectProveedores({nombre, handleInput}) {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8081/proveedores")
      .then(res => setProveedores(res.data))
      .catch(err => console.log(err));
  })

  return <div>
    <select name={nombre} onChange={handleInput}
    className="bg-green-100 p-1 ">
       {proveedores?.filter(proveedor => proveedor.prove_activo === 1)
       .map(proveedor => (
        <option value={proveedor.prove_id}>{proveedor.prove_nombre}</option>
       )) }
    </select>
  </div>;
}
