"use client";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const { user, isAuthenticated } = useContext(AuthContext)!;
  const router = useRouter();

  // ✅ Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated]);

  // ✅ Estados para manejar los cambios
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md pt-56">
      <h1 className="text-2xl font-bold mb-4">Configuración de la Cuenta</h1>

      {/* 📌 Formulario */}
      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Nombre</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Correo Electrónico</span>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full px-4 py-2 border bg-gray-200 rounded-lg cursor-not-allowed"
          />
        </label>

        {/* 📌 Botón para guardar */}
        <button
          onClick={() => alert("Cambios guardados")} // Aquí puedes conectar con una API si decides guardar más cambios
          className="w-full px-4 py-2 text-white rounded-lg bg-green-500 hover:bg-green-600 transition"
        >
          Guardar Cambios
        </button>

        {/* Mensaje de éxito */}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
      </div>
    </div>
  );
};

export default SettingsPage;
