import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { Barcode, CheckCheck } from "lucide-react";
import { Package, Boxes } from "lucide-react";
import SelectCategoriaProducto from "../componentes/PantallaProducto/SelectCategoriaProducto";
import BotonStatus from "../componentes/BotonStatus";
import axios from "axios";
import Modal from "../componentes/ModalGlobal";
import Estatus from "../componentes/Estatus";
import HeaderProducto from "../componentes/PantallaProducto/HederProducto";

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
    <div>
      <HeaderProducto entidad={producto.pro_nombre}/>
      <div className="grid grid-cols-2 px-8 py-3">  
        {/*IMAGEN*/}
        <div className="w-full items-center justify-center flex ">
            <img src={`/images/${producto.pro_codigo}.webp`} alt="" className="h-[300px] transition-transform duration-300 hover:scale-125" />
        </div>

        <form action="" onSubmit={handleSumbit} className="bg-gray-50 border border-gray-200 rounded-xl shadow-md p-6 space-y-3">
          <div className="space-y-3">
            {/*MARCA*/}
            <div className="w-full justify-between flex">
              <input
                onChange={handleInput}
                type="text"
                name="pro_marca"
                placeholder="Marca de producto"
                value={producto.pro_marca}
                className="text-3xl w-full font-semibold bg-gray-50"
              />
              <Estatus estado={estaActivo} className=""/>
            </div>

            {/*NOMBRE*/}
            <div className="w-full">
              <input
                onChange={handleInput}
                type="text"
                name="pro_nombre"
                placeholder="Nombre Producto"
                value={producto.pro_nombre}
                className="text-6xl w-full font-semibold bg-gray-50"
              />
            </div>

            {/* CODIGO */}
            <div className="w-full flex items-center gap-2 text-slate-500 text-sm">
              <Barcode size={18} />
              <p>Código de Producto:</p>
              <input type="text" name="pro_codigo" value={producto.pro_codigo} className="text-xs bg-transparent outline-none" disabled />
            </div>

            <hr style={{ border: '0.5px solid #ddd', width: '100%' }} />

            {/*PRECIO*/}
            <div className="flex flex-col gap-1">
                <label htmlFor="pro_precio" className="text-sm font-medium">Precio:</label>
                <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  onChange={handleInput}
                  type="number"
                  name="pro_precio"
                  value={producto.pro_precio}
                  className="max-w-[14ch] text-right pl-6 pr-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
                </div>
              </div>

            {/*DESCRIPCION*/}
            <div className="bg-gray-50 border-gray-300 rounded p-2">
            <label htmlFor="pro_descripcion" className="text-sm font-medium">Descripción:</label>
              <div className="w-full flex items-center gap-2">
                <textarea
                  onChange={handleInput}
                  name="pro_descripcion"
                  value={producto.pro_descripcion}
                  className="text-base w-full h-24 text-start resize-none bg-gray-50 outline-none"
                />
              </div>
            </div>

            {/*STOCK*/}
            <div className="flex flex-row items-end gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="pro_stock" className="text-sm font-medium"> Unidades en Stock:</label>
                  <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"><Boxes size={16}/></span>
                    <input
                      onChange={handleInput}
                      type="number"
                      name="pro_stock"
                      value={producto.pro_stock}
                      className="max-w-[11ch] text-right pl-6 pr-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                <label htmlFor="pro_stockMinimo" className="text-sm font-medium">Stock Mínimo:</label>
                  <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"><Package size={16}/></span>
                    <input
                      onChange={handleInput}
                      type="number"
                      name="pro_stockMinimo"
                      value={producto.pro_stockMinimo}
                      className="max-w-[11ch] text-right pl-6 pr-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                  </div>
                </div>
                
                <div className="flex flex-1 justify-center items-center">
                <BotonStatus
                estado={producto.pro_estaActivo}
                onClick={() => setProducto({ ...producto, pro_estaActivo: producto.pro_estaActivo === 1 ? 0 : 1 })}
                />
                </div>
              
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <button type="submit" className="text-lg bg-blue-600 py-1.5 px-8 rounded-xl text-white font-semibold w-[225px]">Editar</button>
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
    </div>
  );
}

export default Producto;