"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email"); // Asegúrate de guardar esto en login

    if (!token) {
      router.push("/auth"); // Redirigir si no está autenticado
      return;
    }

    setUser({ email: email || "Usuario", role: role || "user" });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    router.push("/auth"); // Redirigir a login
  };

  if (!user) return <p className="text-center mt-10 text-gray-500">Cargando...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-500 to-blue-400 p-6 pt-36">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800">Bienvenido, {user.email}</h1>
        <p className="text-gray-600 mt-2">Rol: <span className="font-semibold">{user.role}</span></p>
        
        <button 
          onClick={logout} 
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
