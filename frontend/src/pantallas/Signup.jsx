import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
// import { validation } from "./LoginValidation";
import axios from "axios";
import SelectRoles from "../componentes/SelectRoles";
import { Check } from "lucide-react";
import SelectSexo from "../componentes/SelectSexo";
import ModalGlobal from "../componentes/ModalGlobal";
import { CheckCheck } from "lucide-react";

function Signup() {
  const [open,setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function vaciarInputs() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
  }

  const [values, setValues] = useState({
    nombre: "",
    ap: "",
    am: "",
    sexo: "",
    telefono: "",
    direccion: "",
    rfc: "",
    password: "",
    rol: "",
    gerenteAlta: 1,
  });

    const validateInputs = () => {
    const newErrors = {};
    const regexOnlyLetters = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
    const regexRFC = /^[A-ZÑ&]{3,4}\d{6}[A-V1-9][A-Z1-9][0-9A]$/;
    const regexPhone = /^[0-9]{10}$/;
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Validación nombre
    if (!regexOnlyLetters.test(values.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras";
    } else if (values.nombre.length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    }

    // Validación apellido paterno
    if (!regexOnlyLetters.test(values.ap)) {
      newErrors.ap = "El apellido solo puede contener letras";
    }

    // Validación apellido materno
    if (values.am && !regexOnlyLetters.test(values.am)) {
      newErrors.am = "El apellido solo puede contener letras";
    }

    // Validación sexo
    if (!values.sexo) {
      newErrors.sexo = "Seleccione un sexo";
    }

    // Validación RFC
    if (!regexRFC.test(values.rfc.toUpperCase())) {
      newErrors.rfc = "Ingrese un RFC válido";
    }

    // Validación teléfono
    if (!regexPhone.test(values.telefono)) {
      newErrors.telefono = "Ingrese 10 dígitos numéricos";
    }

    // Validación contraseña
    if (!regexPassword.test(values.password)) {
      newErrors.password = "Mínimo 8 caracteres con al menos 1 letra y 1 número";
    }

    // Validación rol
    if (!values.rol) {
      newErrors.rol = "Seleccione un rol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigator = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    let cleanedValue = value;
    
    if (name === "nombre" || name === "ap" || name === "am") {
      cleanedValue = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ ]/g, '');
    } else if (name === "telefono") {
      cleanedValue = value.replace(/\D/g, '');
    } else if (name === "rfc") {
      cleanedValue = value.toUpperCase();
    }

    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ""}));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    console.log(values);
    axios
      .post("http://localhost:8081/signup", values)
      .then((res) => {
        vaciarInputs();
        setOpen(true);
        return;
      })
      .catch((err) => {
        alert("error");
      });
  };

  return (
    <div className="flex h-screen w-screen font-sans">
      {/*FORMULARIO IZQ*/}
      {/* COMPONENTE Creacion Usuario */}

      <div className="w-1/2 flex flex-col items-center justify-center bg-slate-100 p-10">
        <form action="" onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Crear Cuenta</h2>
          <hr className="border-t-2 border-gray-200 my-4"/>

          {errors.form && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.form}
            </div>
          )}

          {/*  INPUT NOMBRE */}
          <div>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              onChange={handleInput}
              className={`w-full p-2 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
              required
              maxLength={50}
            />
            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
          </div>

          <div className="flex gap-4">
            {/*  INPUT APELLIDO PATERNO */}
            <div className="flex-1">
              <input
                type="text"
                name="ap"
                placeholder="Apellido Paterno"
                onChange={handleInput}
                className={`w-full p-2 border ${errors.ap ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
                required
                maxLength={50}
              />
              {errors.ap && <p className="text-red-500 text-sm mt-1">{errors.ap}</p>}
            </div>

            {/*  INPUT APELLIDO MATERNO */}
            <div className="flex-1">
              <input
                type="text"
                name="am"
                placeholder="Apellido Materno"
                onChange={handleInput}
                className={`w-full p-2 border ${errors.am ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
                maxLength={50}
              />
              {errors.am && <p className="text-red-500 text-sm mt-1">{errors.am}</p>}
            </div>
          </div>

          {/*  INPUT SEXO */}
          <div>
            <SelectSexo nombre={"sexo"} handleInput={handleInput} error={errors.sexo}/>
            {errors.sexo && <p className="text-red-500 text-sm mt-1">{errors.sexo}</p>}
          </div>

          {/*  INPUT DIRECCION */}
          <div>
            <input 
                type="text" 
                name="direccion"
                placeholder="Dirección" 
                onChange={handleInput} 
                className={`w-full p-2 border ${errors.direccion ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
                required
                maxLength={100}
            />
            {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>}
          </div>


          <div className="flex gap-4">
            {/*  INPUT RFC */}
            <div className="flex-1">
              <input 
                type="text" 
                name="rfc"
                placeholder="RFC" 
                onChange={handleInput}
                className={`w-full p-2 border ${errors.rfc ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
                required
                maxLength={13}
              />
              {errors.rfc && <p className="text-red-500 text-sm mt-1">{errors.rfc}</p>}
            </div>

            {/*  INPUT TELEFONO */}
            <div className="flex-1">
              <input 
                type="text" 
                name="telefono" 
                placeholder="Teléfono"
                onChange={handleInput}
                className={`w-full p-2 border ${errors.telefono ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
                required
                maxLength={10} 
              />
                {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
            </div>
          </div>

          {/*  INPUT PASSWORD */}
          <div>
            <input 
              type="text" 
              name="password"
              placeholder="Contraseña" 
              onChange={handleInput}
              className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-xl`}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/*  INPUT ROL */}
          <div>
            <SelectRoles nombre={"rol"} handleInput={handleInput} error={errors.rol}/>
            {errors.rol && <p className="text-red-500 text-sm mt-1">{errors.rol}</p>}
          </div>

          <div className="flex justify-center">
            <button
              className="bg-black text-white py-3 px-6 w-1/2 rounded-2xl hover:bg-blue-600 font-bold hover:text-white flex items-center justify-center gap-2"
              type="submit"
            >
              {<Check className="w-6 h-6" />}
              Agregar Usuario
            </button>
          </div>
        </form>
        <div className="w-full max-w-md flex justify-center mt-5">
          <p     
          className="text-base text-gray-600 px-4 py-2 rounded-xl hover:text-blue-600 font-bold transition-colors duration-200">
            <Link
              to="/login"
              >
              Regresar
              </Link>
          </p>
        </div>
      </div>

      {/*IMAGEN DER*/}
      <div className="w-1/2 bg-cover bg-center relative shadow-2xl" 
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-8 text-center">
            <h2 className="text-4xl font-extrabold drop-shadow-md mb-4">Juguetería Manitos</h2>
            <p className="text-xl font-medium">- <span className="italic font-bold">GloboTec</span></p>
        </div>
      </div>
      <ModalGlobal icon={<CheckCheck size={48} color="#2dae6b" strokeWidth={2}/>} open={open} header={"CREADO"} text={"Usuario creado correctamente"} onClose={() => {setOpen(false); navigate("/login")}}/>
    </div>
  );
}

export default Signup;