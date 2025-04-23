import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { Barcode, CheckCheck } from "lucide-react";
import SelectCategoriaProducto from "../componentes/PantallaProducto/SelectCategoriaProducto";
import BotonStatus from "../componentes/BotonStatus";
import axios from "axios";
import Modal from "../componentes/ModalGlobal";
import Estatus from "../componentes/Estatus";

function Producto() {
  const location = useLocation();
  const [producto, setProducto] = useState(location.state);
  const estaActivo = location.state.pro_estaActivo;
  console.log(estaActivo)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleInput = (event) => {
    setProducto((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/productos/actualizar", producto)
      .then((res) => {
        if (res.data.affectedRows === 1) {
          setOpen(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-white grid grid-cols-2 p-8">
      {/*IMAGEN*/}
      <div className="w-full items-center justify-center flex ">
        <img src={`/images/${producto.pro_codigo}.webp`} alt="" className="h-[300px]" />
      </div>
      <form action="" onSubmit={handleSumbit}>
        <div className="space-y-3 pt-4">
          {/*NOMBRE*/}
          <div className="w-full justify-between flex">
            <input
              onChange={handleInput}
              type="text"
              name="pro_nombre"
              value={producto.pro_nombre}
              className="text-xl w-full font-semibold"
            />

            <Estatus estado={estaActivo} />
          </div>

          {/*MARCA*/}
          <div className="w-full">
            <input
              onChange={handleInput}
              type="text"
              name="pro_marca"
              value={producto.pro_marca}
              className="text-xl w-full font-semibold"
            />
          </div>

          {/*DESCRIPCION*/}
          <div className="w-full flex items-center gap-2 text-slate-400">
            <textarea
              onChange={handleInput}
              name="pro_descripcion"
              value={producto.pro_descripcion}
              className="text-base w-full h-24 text-start resize-none"
            />
          </div>

          {/*STOCK Y PRECIO*/}
          <div className="w-full flex justify-between gap-2 text-slate-400">
            <div>
              <p>Unidades en stock:</p>
              <input
                onChange={handleInput}
                type="number"
                name="pro_stock"
                value={producto.pro_stock}
                className="text-base w-full"
              />
            </div>

            <div>
              <p>Stock mininimo:</p>
              <input
                onChange={handleInput}
                type="number"
                name="pro_stockMinimo"
                value={producto.pro_stockMinimo}
                className="text-base w-full"
              />
            </div>

            <div>
              <p>Precio:</p>
              <input
                onChange={handleInput}
                type="number"
                name="pro_precio"
                value={producto.pro_precio}
                className="text-base w-full"
              />
            </div>
            {/* 
          {<div>
            <SelectCategoriaProducto handleInput={handleInput}/>
          </div> } */}
          </div>
          {/* CODIGO */}
          <div className="w-full flex items-center gap-2 text-slate-400">
            <Barcode size={18} />
            <input type="text" name="pro_codigo" value={producto.pro_codigo} className="text-base w-full" disabled />
          </div>

          <BotonStatus
            estado={producto.pro_estaActivo}
            onClick={() => setProducto({ ...producto, pro_estaActivo: producto.pro_estaActivo === 1 ? 0 : 1 })}
          />
        </div>
        <div>
          <button type="submit">Editar</button>
        </div>
      </form>
      <Modal
        open={open}
        header={"ACTUALIZADO"}
        text={"Producto actualizado correctamente"}
        icon={<CheckCheck size={48} color="#f66151" strokeWidth={2} />}
        onClose={() => {
          setOpen(false);
          navigate("/productos");
        }}
      />
    </div>
  );
}

export default Producto;
