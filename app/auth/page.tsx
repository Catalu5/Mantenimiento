"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Redirige según el rol
      router.push(data.role === "admin" ? "/admin" : "/dashboard");
    } else {
      setMessage(data.message || data.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-500 to-blue-400 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>
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

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 font-semibold cursor-pointer hover:underline"
          >
            {isLogin ? "Regístrate" : "Inicia sesión"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
