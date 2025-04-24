"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GreenhouseData from "../components/GreenhouseData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type UserData = {
  profileImage?: string;
  email: string;
  greenhouseData: {
    temperature: number;
    humidity: number;
    acidity: number;
  };
};

const NubePage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [tempData, setTempData] = useState<any[]>([]);
  const [humidityData, setHumidityData] = useState<any[]>([]);
  const [aiResponse, setAiResponse] = useState<string>("");  // NUEVO: Estado para la respuesta de la IA
  const router = useRouter();

  const fetchUserData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    fetch("/api/nube", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          setIsAuthenticated(false);
          return;
        }

        let data;
        try {
          data = await res.json();
        } catch (e) {
          setIsAuthenticated(false);
          return;
        }

        if (data.error) {
          setIsAuthenticated(false);
        } else {
          setUserData(data);
          const currentTime = new Date().toLocaleTimeString().slice(0, 5);
          setTempData((prev) => [...prev.slice(-5), { time: currentTime, value: data.greenhouseData.temperature }]);
          setHumidityData((prev) => [...prev.slice(-5), { time: currentTime, value: data.greenhouseData.humidity }]);
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  };

  useEffect(() => {
    fetchUserData();
    const interval = setInterval(fetchUserData, 10000);
    return () => clearInterval(interval);
  }, []);

  const simularPH = (phBase: number) => {
    return (phBase + (Math.random() * 0.2 - 0.1)).toFixed(2);
  };

  // 🚨 NUEVO: Función para analizar con IA
  const analizarConIA = async () => {
    const planta = prompt("¿Qué tipo de planta estás monitoreando? (Ej: Lengua de Vaca)");
    if (!planta) return alert("Debes ingresar el tipo de planta.");

    const datos = {
      temperature: tempData[tempData.length - 1]?.value,
      humidity: humidityData[humidityData.length - 1]?.value,
      acidity: userData?.greenhouseData.acidity,
      planta: planta
    };

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      const result = await res.json();
      setAiResponse(result.analysis);
    } catch (err) {
      console.error("Error al consultar la IA:", err);
      alert("Error al analizar con IA");
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-500 to-blue-400 text-white">
        <p className="text-xl font-semibold">Cargando datos...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-500 to-blue-400 p-6 pt-36">
        <h1 className="text-4xl font-bold text-white">Análisis en la Nube</h1>
        <p className="text-white mt-2 text-lg">
          Visualiza en tiempo real los datos de tus sensores y mejora la eficiencia de tu invernadero.
        </p>
        <button
          className="mt-8 bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition"
          onClick={() => router.push("/auth")}
        >
          Inicia sesión para ver los datos de tu invernadero
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-500 to-blue-400 p-6 pt-36 space-y-10">
      <div className="bg-white bg-opacity-50 p-6 rounded-lg shadow-lg w-full max-w-3xl text-center">
        <Image
          src={userData?.profileImage || "/default-avatar.png"}
          alt="Perfil"
          width={64}
          height={64}
          className="w-16 h-16 rounded-full mx-auto mb-2 border border-gray-300"
        />
        <h1 className="text-3xl font-bold text-gray-800">Análisis en la Nube</h1>
        <p className="text-gray-600">
          Bienvenido, <span className="font-semibold">{userData?.email}</span>
        </p>
      </div>

      {userData && userData.greenhouseData && (
        <GreenhouseData greenhouseData={{
          ...userData.greenhouseData,
          acidity: parseFloat(simularPH(userData.greenhouseData.acidity))
        }} />
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Temperatura (°C)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={tempData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[10, 50]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#F87171" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Humedad (%)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={humidityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#60A5FA" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🚨 Botón para análisis con IA */}
      <button
        onClick={analizarConIA}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Analizar con IA
      </button>

      {/* Mostrar la respuesta de la IA */}
      {aiResponse && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Recomendación de la IA</h2>
          <p className="text-gray-600 text-center">{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default NubePage;
