"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext"; // Importamos el contexto de autenticación

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y registro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { login } = useContext(AuthContext)!; // Accedemos a la función de login del contexto

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        login(data.token, data.user); // Guardar autenticación global
        
        // Redirigir según el rol
        if (data.role === "user") {
          router.push("/nube");
        } else {
          router.push("/admin");
        }
      } else {
        setMessage(data.message || data.error);
      }
    } catch (error) {
      console.error("Error en autenticación:", error);
      setMessage("Ocurrió un error inesperado. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-500 to-blue-400 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>
        
        {/* 📌 Formulario */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-1">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            {isLogin ? "Ingresar" : "Registrarse"}
          </button>
        </form>

        {/* 📌 Mensaje de error */}
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}

        {/* 📌 Botón para alternar entre login y registro */}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-blue-500 text-center w-full hover:underline"
        >
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
