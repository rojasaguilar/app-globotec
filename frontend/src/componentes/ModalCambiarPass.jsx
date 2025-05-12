import { useState } from "react";
import ReactDom from "react-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "20px 30px",
  borderRadius: "12px",
  zIndex: 1000,
  width: "100%",
  maxWidth: "400px",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,.7)",
  zIndex: 1000,
};

export default function ModalCambiarPass({ open, onClose, header, icon }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    // Validaciones
    if (!username) {
      setError("Por favor ingresa tu nombre de usuario");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/login/cambiar-password", {
        usuario: username,
        nuevaPassword: password
      });
      
      if (response.data.success) {
        setSuccess("Contraseña actualizada correctamente");
        setError("");

        setUsername("");
        setPassword("");
        setConfirmPassword("");
      
        // Cerrar el modal después de 2 segundos
        setTimeout(() => {
          onClose();
          setSuccess("");
        }, 2000);
      } else {
        setError(response.data.message || "Error al cambiar la contraseña");
      }
    } catch (err) {
      console.log(err)
      setError("Error al conectar con el servidor");
    }
  };

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="flex flex-col items-center space-y-6 py-2">
          {icon && <div className="w-full flex justify-center mb-2">{icon}</div>}
          
          <div className="text-center mb-4">
            <p className="text-lg font-semibold">{header || "Cambiar Contraseña"}</p>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* INPUT USUARIO */}
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            className="w-3/4 p-2 border border-gray-300 rounded-xl mb-2"
          />

          {/* INPUT NUEVA CONTRASEÑA */}
          <div className="relative w-3/4 mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nueva Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full p-2 border border-gray-300 rounded-xl pr-10"
            />
            <button
            type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* INPUT CONFIRMAR CONTRASEÑA */}
          <div className="relative w-3/4 mb-2">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              className="w-full p-2 border border-gray-300 rounded-xl pr-10"
            />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
          </div>

          <div className="flex gap-4">
            <button
              className="bg-gray-400 w-32 py-2 rounded-xl text-white hover:bg-gray-500 font-bold hover:text-white"
              onClick={() => {
                onClose();
                setError("");
                setSuccess("");
                setUsername("");
                setPassword("");
                setConfirmPassword("");
              }}
            >
              Cancelar
            </button>
            <button
              className="bg-blue-600 w-32 py-2 rounded-xl text-white hover:bg-blue-700 font-bold"
              onClick={handleSubmit}
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}