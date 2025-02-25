import Image from 'next/image';
import { Mission } from "./Mission";
import { Vision } from "./Vision";
import Team from "./Team";


export default function About() {
  return (
    <section className="bg-gradient-to-b from-[#27ae60] to-blue-400 text-white py-20 px-6 md:px-20 lg:px-40 flex flex-col items-center">
      {/* Contenedor Principal */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-28">
        {/* Texto sobre la empresa */}
        <div>
          <h2 className="text-6xl font-bold text-white mb-6">
            <span className='text-blue-600'>Sobre</span> InverCloud 
            <span className='text-black'> Solutions</span> 
            </h2>
          <p className="text-lg text-black leading-relaxed">
            Nos especializamos en <span className="text-blue-600 font-semibold">mantenimiento predictivo </span>
            para invernaderos inteligentes. Implementamos <span className="text-blue-600 font-semibold">sensores IoT</span> que
            recolectan datos en tiempo real, almacenándolos en la nube para análisis
            avanzados con <span className="text-blue-600 font-semibold">machine learning</span>.
          </p>
        </div>
        {/* Imagen */}
        <div className="flex justify-center">
          <Image
            src="/is.png"
            alt="Invernadero Inteligente"
            width={300}
            height={100}
            className="rounded-lg animate-float"
          />
        </div>
      </div> 

      {/* Sección de Misión y Visión */}
      <div className="max-w-6xl w-full mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <Mission />
        <Vision />
      </div>
      <div className="max-w-6xl w-full mt-16 gap-12">
          <Team />
        </div>
    </section>
  );
}