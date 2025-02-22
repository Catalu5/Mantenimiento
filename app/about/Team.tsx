import React from "react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Isaac Páez Triana",
    role: "Director de Comunicación",
    image: "/18.png",
  },
  {
    name: "Laura Catalina Cifuentes Barrero",
    role: "Directora General",
    image: "/17.png",
  },
  {
    name: "Juan David Barragan Contreras",
    role: "Director de Marketing",
    image: "/bagarran.png",
  },
];

export default function Team() {
  return (
    <section className="w-full py-20 px-6 text-center bg-gradient">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl font-bold text-white mb-10 -mt-10">Nuestro <span className="text-green-500">Equipo</span></h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto mb-20">
          En Botopia, contamos con un equipo de expertos en tecnología, diseño y estrategia digital 
          comprometidos con la innovación y la transformación empresarial.
        </p>

        {/* Ajuste para ocupar todo el ancho y distribuir bien */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full justify-center items-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Image
                src={member.image}
                alt={member.name}
                width={300}
                height={300}
                className="w-48 h-48 rounded-lg object-cover"
              />
              <h3 className="text-xl font-bold mt-4">{member.name}</h3>
              <p className="text-sm text-white">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}