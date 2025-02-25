"use client";


import Image from "next/image";

export default function Hero() {
  return (
    // Hero con altura fija o mínima, y posición relative para poder superponer
    <section className="relative bg-gradient-to-b from-[#27ae60] to-blue-400 text-white ">
      {/* Contenido principal del Hero */}
      <div className="container pt-32 px-4 md:mx-28 items-center justify-center h-full">
        {/* ... tu contenido del hero ... */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 sm:px-8 md:px-12">
          <div className="lg:w-1/2 lg:text-left text-center">
            <h1 className="text-6xl font-bold mb-2 lg:mb-8 ml-3">
              Optimiza tu <br />
              <span className="text-blue-600">Invernadero</span> con
              <span className="text-green-400"> tecnología avanzada</span>
            </h1>

            <p className="text-lg lg:text-xl lg:mb-8 ml-3">
              Utilizamos <span className="font-bold">sensores IoT</span> y <span className="font-bold">machine learning</span> para mantener tu producción eficiente.
            </p>

            
          </div>

          {/* Imagen del Hero */}
          <div className="hidden lg:w-1/2 lg:flex lg:justify-center lg:items-center">
            <Image
              src="/mante.png"
              alt="Invernadero Inteligente"
              className="max-w-full lg:w-[550px] lg:h-[500px] object-contain animate-float mr-40"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>

      {/* Contenedor ABSOLUTO para las tarjetas */}
      <div className="absolute w-full bottom-0 left-0 transform translate-y-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <Image
                  src="/agua.png"
                  alt="Icono de Sensorización"
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-black">SENSORIZACIÓN</h3>
                <p className="text-black">
                  Humedad, temperatura, iluminancia, conductividad, CO<sub>2</sub>...
                </p>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <Image
                  src="/cubos.png"
                  alt="Icono de Modular"
                  width={70}
                  height={70}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-black">MODULAR</h3>
                <p className="text-black">
                  Productos modulares, con posibilidad de ampliaciones según tus necesidades.
                </p>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <Image
                  src="/graf.png"
                  alt="Icono de Actual e Históricos"
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-black">ACTUAL E HISTÓRICOS</h3>
                <p className="text-black">
                  Consulta el estado de tu invernadero en tiempo real o revisa la evolución histórica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}