'use client';

import Image from "next/image";


export default function Body() {
  return (
    <section className=" bg-gradient-to-b from-blue-400 to-white text-black relative justify-center items-center h-screen overflow-hidden">
      {/* Contenedor principal */}
      <div className="container lg:pt-56 px-4 md:mx-28 items-center justify-center relative h-full -mt-24">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full">
          {/* Contenedor del título y subtítulo */}
          <div className="lg:w-1/2 lg:text-left text-center">
            {/* Título */}
            <div className="text-left">
              <h1 className="text-6xl below700:text-xl font-bold mb-5 lg:mb-8 -mt-3">
                ¿Qué es un <span className="text-white">invernadero </span><span className="text-blue-600">inteligente</span>?
              </h1>
            </div>
            
            {/* Descripción */}
            <p className="text-lg lg:text-xl lg:mb-8 below700:text-base">
              Un invernadero inteligente es un <span className="text-blue-600 font-bold">sistema avanzado</span> que emplea sensores IoT y machine learning para <br />
              optimizar el control climático, asegurando un crecimiento eficiente de los cultivos.
            </p>
            <p className="text-lg lg:text-xl lg:mb-8 below700:text-base">
              Mediante la recolección de datos en tiempo real, se ajustan automáticamente los parámetros de humedad, temperatura y riego,
              maximizando la productividad y reduciendo el consumo de recursos.
            </p>
          </div>

          {/* Imagen decorativa */}
          <div className="hidden lg:w-1/2 lg:relative lg:flex lg:justify-start lg:items-center">
            <div className="relative">
              <Image
                src="/astronauta-removebg-preview.png"
                alt="Invernadero Inteligente"
                className="max-w-full lg:w-[300px] lg:h-[350px] lg:max-h-96 lg:relative lg:z-10 animate-float lg:ml-52"
                width={800}
                height={800}
              />
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
}