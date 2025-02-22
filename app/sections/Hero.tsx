'use client';

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#27ae60] to-blue-400 text-white relative justify-center items-center h-screen overflow-hidden">
      <div className="container pt-32 lg:pt-56 lg:py-16 px-4 md:mx-28 items-center justify-center relative h-full">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full">
          <div className="lg:w-1/2 lg:text-left text-center">
            <div className="text-left">
              <h1 className="text-6xl below700:text-xl font-bold mb-2 lg:mb-8"> 
                Optimiza tu <br />    
                <span className="text-blue-600">Invernadero</span> con 
                <span className="text-green-400"> tecnología avanzada</span> 
              </h1>
            </div>
            
            <p className="text-lg lg:text-2xl lg:mb-8 below700:text-base"> 
              <br />
              Utilizamos <span className="font-bold">sensores IoT</span> y <span className="font-bold">machine learning</span> para mantener tu producción eficiente.
            </p>

            <div className="flex flex-col lg:flex-row justify-start lg:justify-start space-y-6 lg:space-y-0 lg:space-x-6 lg:mt-8 mt-4"> 
              <Link
                href="/demos"
                className="border border-black shadow-lg jump-button bg-white text-black py-3 px-6 rounded-md font-semibold shadow-gray-700 hover:shadow-black hover:-translate-y-1 transition transform duration-300 ease-out cursor-pointer active:translate-y-1"
              >
                Habla con nosotros
              </Link>
            </div>
          </div>

          {/* Contenedor de la imagen (más grande y más a la derecha) */}
          <div className="hidden lg:w-1/2 lg:relative lg:flex lg:justify-center lg:items-center">
            <div className="relative">
              <Image
                src="/mante.png"
                alt="Invernadero Inteligente"
                className="max-w-full lg:w-[500px] lg:h-[500px] object-contain lg:relative lg:z-10 animate-float right-24"
                width={2000}
                height={2000}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
