"use client";

import Image from "next/image";

export default function Soluciones() {
  return (
    <section className="relative bg-gradient-to-b from-blue-400 to-white text-black py-16">
      {/* Contenedor principal */}
      <div className="container mx-auto px-6 lg:px-20">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-blue-600 mb-4 mt-32">Nuestras Soluciones</h2>
          <p className="text-lg md:text-xl text-black max-w-3xl mx-auto">
            Implementamos soluciones tecnológicas avanzadas para el mantenimiento predictivo en invernaderos. 
            A través del despliegue de sensores y la inteligencia artificial, optimizamos el rendimiento de los cultivos.
          </p>
        </div>

        {/* Sección de soluciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Sensorización */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <Image src="/agua.png" alt="Sensorización" width={80} height={80} className="mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-blue-600 mb-2">Sensorización Avanzada</h3>
            <p className="text-black">
              Recolectamos datos críticos sobre humedad, temperatura, luz y CO₂ dentro del invernadero con sensores IoT.
            </p>
          </div>

          {/* Análisis Predictivo */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <Image src="/graf.png" alt="Análisis Predictivo" width={80} height={80} className="mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-blue-600 mb-2">Análisis Predictivo</h3>
            <p className="text-black">
              Aplicamos machine learning para detectar patrones y prevenir fallas antes de que ocurran.
            </p>
          </div>

          {/* Automatización Inteligente */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <Image src="/ai.png" alt="Automatización" width={80} height={80} className="mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-blue-600 mb-2">Automatización Inteligente</h3>
            <p className="text-black">
              Con ayuda de IA, ajustamos el riego, temperatura y ventilación de manera automática.
            </p>
          </div>

          {/* Monitoreo en la Nube */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <Image src="/mn.png" alt="Monitoreo en la Nube" width={80} height={80} className="mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-blue-600 mb-2">Monitoreo en la Nube</h3>
            <p className="text-black">
              Toda la información se centraliza en la nube para acceder en tiempo real desde cualquier lugar.
            </p>
          </div>

          {/* Control Remoto */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <Image src="/cr.png" alt="Control Remoto" width={80} height={80} className="mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-blue-600 mb-2">Control Remoto</h3>
            <p className="text-black">
              Gestiona tu invernadero desde una plataforma digital con reportes y alertas automatizadas.
            </p>
          </div>

          {/* Optimización de Cultivos */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <Image src="/opc.png" alt="Optimización de Cultivos" width={80} height={80} className="mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-blue-600 mb-2">Optimización de Cultivos</h3>
            <p className="text-black">
              Maximizamos el crecimiento de las plantas con datos en tiempo real y estrategias inteligentes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
