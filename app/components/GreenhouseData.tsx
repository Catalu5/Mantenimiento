"use client";
import { useState } from "react";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type GreenhouseDataProps = {
  greenhouseData: {
    temperature: number;
    humidity: number;
    acidity: number;
  };
};

const GreenhouseData = ({ greenhouseData }: GreenhouseDataProps) => {
  const [currentData, setCurrentData] = useState(greenhouseData);
  const [chartData, setChartData] = useState([
    {
      time: new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      temperature: greenhouseData.temperature,
      humidity: greenhouseData.humidity,
      acidity: greenhouseData.acidity,
    },
  ]);

  const [isSimulating, setIsSimulating] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [plantImage, setPlantImage] = useState("/healthy-plant.svg"); // Imagen inicial

  // ✅ Generar valores aleatorios realistas
  const generateRandomValue = (
    currentValue: number,
    min: number,
    max: number
  ): number => {
    const variation = (Math.random() * 2 - 1) * 1.5;
    const newValue = Math.min(Math.max(currentValue + variation, min), max);
    return parseFloat(newValue.toFixed(1));
  };

  // ✅ Evaluar salud de la planta en tiempo real
  const evaluatePlantHealth = (
    temperature: number,
    humidity: number,
    acidity: number
  ) => {
    const isHealthy =
      temperature >= 18 &&
      temperature <= 30 &&
      humidity >= 50 &&
      humidity <= 80 &&
      acidity >= 5.5 &&
      acidity <= 7.0;

    return {
      image: isHealthy ? "/healthy-plant.svg" : "/sick-plant.svg",
      message: isHealthy
        ? "🌱 Las plantas están sanas"
        : "⚠️ Las plantas están en riesgo",
    };
  };

  // ✅ Simulación de datos cada segundo durante 15 segundos
  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setAnalysis(null);

    let counter = 0;
    let latestData = { ...currentData };

    const interval = setInterval(() => {
      if (counter >= 15) {
        clearInterval(interval);
        setIsSimulating(false);
        getPlantAnalysis(latestData);
        return;
      }

      counter++;

      setChartData((prevData) => {
        const newTemperature = generateRandomValue(
          prevData[prevData.length - 1].temperature,
          10,
          40
        );
        const newHumidity = generateRandomValue(
          prevData[prevData.length - 1].humidity,
          30,
          90
        );
        const newAcidity = generateRandomValue(
          prevData[prevData.length - 1].acidity,
          4,
          8
        );

        latestData = {
          temperature: newTemperature,
          humidity: newHumidity,
          acidity: newAcidity,
        };

        setCurrentData(latestData);
        const { image, message } = evaluatePlantHealth(
          newTemperature,
          newHumidity,
          newAcidity
        );
        setPlantImage(image);
        setAnalysis(message);

        return [
          ...prevData,
          {
            time: new Date().toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            temperature: newTemperature,
            humidity: newHumidity,
            acidity: newAcidity,
          },
        ];
      });
    }, 1000);
  };

  // ✅ Obtener diagnóstico con IA
  const getPlantAnalysis = async (latestData: {
    temperature: number;
    humidity: number;
    acidity: number;
  }) => {
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(latestData),
      });

      const data = await res.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
        const { image } = evaluatePlantHealth(
          latestData.temperature,
          latestData.humidity,
          latestData.acidity
        );
        setPlantImage(image);
      }
    } catch {
      setAnalysis("Error obteniendo análisis.");
    }
  };

  return (
    <div className="w-full max-w-5xl space-y-6">
      {/* 📌 Tarjetas de datos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 bg-opacity-40 rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold">🌡️ Temperatura</p>
          <p className="text-gray-700">
            {currentData.temperature.toFixed(1)}°C
          </p>
        </div>
        <div className="bg-white p-6 bg-opacity-40 rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold">💧 Humedad</p>
          <p className="text-gray-700">{currentData.humidity.toFixed(1)}%</p>
        </div>
        <div className="bg-white bg-opacity-40 p-6 rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold">🧪 Acidez del suelo</p>
          <p className="text-gray-700">pH {currentData.acidity.toFixed(1)}</p>
        </div>
      </div>

      {/* 📌 Estado de la Planta */}
      <div className="bg-white bg-opacity-70 shadow-lg rounded-lg p-6 flex flex-col items-center">
        <Image
          src={plantImage}
          alt="Estado de la planta"
          width={200}
          height={200}
          className="w-auto h-40 sm:h-52 object-contain"
        />
        <p
          className={`text-lg font-semibold mt-3 ${
            analysis?.includes("sanas") ? "text-green-600" : "text-red-500"
          }`}
        >
          {analysis}
        </p>
      </div>

      {/* 📌 Gráfica de Sensores */}
      <div className="bg-white p-6 rounded-lg shadow-md bg-opacity-80">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
          Evolución de Variables
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#34D399"
              strokeWidth={3}
              dot={{ r: 5 }}
              name="Temperatura (°C)"
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 5 }}
              name="Humedad (%)"
            />
            <Line
              type="monotone"
              dataKey="acidity"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ r: 5 }}
              name="Acidez del Suelo (pH)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📌 Botón para Simular Datos */}
      <div className="flex justify-center">
        <button
          onClick={startSimulation}
          disabled={isSimulating}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          {isSimulating ? "Simulación en curso..." : "Simular Nuevos Datos"}
        </button>
      </div>
    </div>
  );
};

export default GreenhouseData;
