import React,{useState, useEffect} from "react";
import axios from "axios";

export default function SelectRegimenes({ nombre, handleInput }) {
  const  [regimenes, setRegimenes] = useState([]);

  useEffect(()=>{
    axios
    .post('http://localhost:8081/cfdi')
    .then(res => setRegimenes(res.data))
    .catch(err => console.log(err))
  })

  return (
    <div>
      <select className="" onChange={handleInput} name={nombre} id="">
        <option selected>Régimen fiscal</option>
        {regimenes.map(regimen => (
            <option  value={regimen.cfdi_codigo}>{`${regimen.cfdi_codigo} ${regimen.cfdi_descripcion}`}</option>
        ))}
      </select>
    </div>
  );
}
