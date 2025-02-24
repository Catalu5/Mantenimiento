"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GreenhouseData from "../components/GreenhouseData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Definir la estructura de los datos del usuario
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
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    fetch("/api/nube", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setIsAuthenticated(false);
        } else {
          setUserData(data);
          setIsAuthenticated(true);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  // **Datos de ejemplo para la gráfica cuando NO hay sesión iniciada**
  const sampleData = [
    { time: "10:00", value: 22 },
    { time: "11:00", value: 24 },
    { time: "12:00", value: 21 },
    { time: "13:00", value: 26 },
    { time: "14:00", value: 25 },
    { time: "15:00", value: 28 },
  ];

  // **Si aún no se ha determinado la autenticación, mostramos un loading**
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-500 to-blue-400 text-white">
        <p className="text-xl font-semibold">Cargando datos...</p>
      </div>
    );
  }

  // **Vista cuando no hay sesión iniciada**
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-500 to-blue-400 p-6 pt-36">
        <h1 className="text-4xl font-bold text-white">Análisis en la Nube</h1>
        <p className="text-white mt-2 text-lg">Visualiza en tiempo real los datos de tus sensores y mejora la eficiencia de tu invernadero.</p>

        {/* Tarjetas informativas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <span className="text-4xl text-green-500">☁️</span>
            <h2 className="text-xl font-semibold mt-2">Datos en la Nube</h2>
            <p className="text-gray-600 mt-2">Todos los datos de tus sensores se almacenan y analizan en la nube en tiempo real.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <span className="text-4xl text-blue-500">📊</span>
            <h2 className="text-xl font-semibold mt-2">Gráficos en Tiempo Real</h2>
            <p className="text-gray-600 mt-2">Visualiza tendencias y patrones de datos con gráficos interactivos.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <span className="text-4xl text-purple-500">🤖</span>
            <h2 className="text-xl font-semibold mt-2">Optimización Inteligente</h2>
            <p className="text-gray-600 mt-2">Nuestra tecnología de machine learning te ayuda a tomar mejores decisiones.</p>
          </div>
        </div>

        {/* Gráfica de ejemplo */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mt-8">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Gráfica de Sensores</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[10, 50]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#34D399" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Botón para iniciar sesión */}
        <button
          className="mt-8 bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition"
          onClick={() => router.push("/auth")}
        >
          Inicia sesión para ver los datos de tu invernadero
        </button>
      </div>
    );
  }

  // **Vista cuando el usuario ha iniciado sesión**
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-500 to-blue-400 p-6 pt-36 space-y-10">
      {/* Sección de Bienvenida */}
      <div className="bg-white bg-opacity-50 p-6 rounded-lg shadow-lg w-full max-w-3xl text-center">
        <img
          src={userData?.profileImage || "/default-avatar.png"}
          alt="Perfil"
          className="w-16 h-16 rounded-full mx-auto mb-2 border border-gray-300"
        />
        <h1 className="text-3xl font-bold text-gray-800">Análisis en la Nube</h1>
        <p className="text-gray-600">Bienvenido, <span className="font-semibold">{userData?.email}</span></p>
      </div>
      {/* Componente con datos del invernadero */}
      {userData && userData.greenhouseData && (
        <GreenhouseData greenhouseData={userData.greenhouseData} />
      )}

    </div>
  );
};

export default NubePage;
