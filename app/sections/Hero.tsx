'use client';

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#27ae60] to-blue-400 text-white relative justify-center items-center h-screen overflow-hidden">
      {/* Contenedor principal */}
      <div className="container pt-32 lg:pt-56 lg:py-16 px-4 md:mx-28 items-center justify-center relative h-full">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full"> {/* Cambié justify-center a justify-between */}
          {/* Contenedor del título y subtítulo */}
          <div className="lg:w-1/2 lg:text-left text-center">
            {/* Título */}
            <div className="text-left">
              <h1 className="text-6xl below700:text-xl font-bold mb-2 lg:mb-8"> 
                Optimiza tu <br />    
                <span className="text-blue-600">Invernadero</span> con 
                <span className="text-green-400"> tecnología avanzada</span> 
              </h1>
            </div>
            
            {/* Descripción */}
            <p className="text-lg lg:text-2xl lg:mb-8 below700:text-base"> 
              <br />
              Utilizamos <span className="font-bold">sensores IoT</span> y <span className="font-bold">machine learning</span> para mantener tu producción eficiente.
            </p>

            {/* Botones */}
            <div className="flex flex-col lg:flex-row justify-start lg:justify-start space-y-6 lg:space-y-0 lg:space-x-6 lg:mt-8 mt-4"> 
              <Link
                href="/demos"
                className="border border-black shadow-lg jump-button bg-white text-black py-3 px-6 rounded-md font-semibold hover:bg-green-600"
              >
                Habla con nosotros
              </Link>
            </div>
          </div>

          {/* Contenedor de las imágenes desktop*/}
          <div className="hidden lg:w-1/2 lg:relative lg:flex lg:justify-start lg:items-center"> {/* Cambié justify-center a justify-start */}
            {/* Contenedor relativo para el astronauta y las imágenes flotantes */}
            <div className="relative">
              {/* Imagen del astronauta */}
              <Image
                src="/astronave.svg"
                alt="Invernadero Inteligente"
                className="max-w-full max-h-[400px] lg:w-auto lg:h-96 lg:relative lg:z-10 animate-float" /* Moví la imagen a la izquierda con -ml-10 */
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
