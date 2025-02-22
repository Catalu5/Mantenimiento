"use client";  // ⚠️ Esto es lo más importante para evitar el error

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Cloud, BarChart, Database } from "lucide-react";

const data = [
  { name: "10:00", value: 35 },
  { name: "11:00", value: 40 },
  { name: "12:00", value: 30 },
  { name: "13:00", value: 50 },
  { name: "14:00", value: 45 },
  { name: "15:00", value: 60 },
];

export default function Nubepage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-blue-400 p-10">
      <div className="text-center text-white">
        <h2 className="text-4xl  font-bold mt-32">Análisis en la Nube</h2>
        <p className="text-lg mt-2">
          Visualiza en tiempo real los datos de tus sensores y mejora la eficiencia de tu invernadero.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white shadow-xl p-6 rounded-2xl flex flex-col items-center">
          <Cloud size={50} className="text-green-500" />
          <h3 className="text-xl font-semibold mt-4">Datos en la Nube</h3>
          <p className="text-gray-600 text-center mt-2">
            Todos los datos de tus sensores se almacenan y analizan en la nube en tiempo real.
          </p>
        </div>

        <div className="bg-white shadow-xl p-6 rounded-2xl flex flex-col items-center">
          <BarChart size={50} className="text-blue-500" />
          <h3 className="text-xl font-semibold mt-4">Gráficos en Tiempo Real</h3>
          <p className="text-gray-600 text-center mt-2">
            Visualiza tendencias y patrones de datos con gráficos interactivos.
          </p>
        </div>

        <div className="bg-white shadow-xl p-6 rounded-2xl flex flex-col items-center">
          <Database size={50} className="text-purple-500" />
          <h3 className="text-xl font-semibold mt-4">Optimización Inteligente</h3>
          <p className="text-gray-600 text-center mt-2">
            Nuestra tecnología de machine learning te ayuda a tomar mejores decisiones.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 mt-10">
        <h3 className="text-xl font-semibold text-center text-gray-800">Gráfica de Sensores</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
