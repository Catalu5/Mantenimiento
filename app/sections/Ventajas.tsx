"use client";

import React from "react";
import Image from "next/image";

export default function Ventajas() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-8">
        
        {/* Sección de texto */}
        <div className="ml-28 overflow-x-auto -mt-36">
          <h2 className="text-6xl font-bold mb-8 leading-tight">
            {/* Bloque 1 (línea 1) con whitespace-nowrap */}
            <span className="whitespace-nowrap text-blue-600">
              Ventajas <span className="text-black">de automatizar</span>
            </span>
            <br />
            {/* Bloque 2 (línea 2) con whitespace-nowrap */}
            <span className="whitespace-nowrap text-green-500">
              tu invernadero
            </span>
          </h2>

          <p className="text-black text-xl mb-10">
            Integrar tecnologías de automatización es clave para un control
            eficiente del <br/> ambiente y un mayor rendimiento en tu producción. Con
            un invernadero automatizado podrás:
          </p>

          <ul className="list-disc list-outside pl-6 space-y-2 text-black text-xl mb-8">
            <li>
              <span className="font-semibold">Optimizar</span> recursos de agua
              y energía, reduciendo costes.
            </li>
            <li>
              <span className="font-semibold">Controlar</span> la temperatura,
              humedad y CO<sub>2</sub> de forma precisa y en tiempo real.
            </li>
            <li>
              <span className="font-semibold">Minimizar</span> errores humanos y
              costes de mano de obra gracias a procesos automatizados.
            </li>
            <li>
              <span className="font-semibold">Analizar datos históricos</span>{" "}
              para mejorar tus estrategias de cultivo a largo plazo.
            </li>
            <li>
              <span className="font-semibold">Aumentar la calidad</span> y la
              homogeneidad de tus cosechas, logrando un crecimiento más estable.
            </li>
          </ul>
        </div>

        {/* Sección de imágenes */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center space-y-6">
          <div className="relative w-full h-80 sm:h-96 md:h-[550px]">
            <Image
              src="/ven.png"
              alt="Automatización de invernadero"
              fill
              className="object-contain animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
}