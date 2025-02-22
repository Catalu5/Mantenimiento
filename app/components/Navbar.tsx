"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-8 left-1/2 transform -translate-x-1/2 w-[70%] z-40 bg-white shadow-lg rounded-full px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/">
          <Image
            src="/Logo.jpg"
            alt="Logo"
            width={60}
            height={60}
            className="object-contain cursor-pointer"
            priority
          />
        </Link>
      </div>

      {/* Navegación */}
      <nav className="hidden md:flex space-x-6">
        {[
          { name: "Inicio", href: "/" },
          { name: "Nuestras Soluciones", href: "/lessons" },
          { name: "Nosotros", href: "/about" },
          { name: "Análisis en la Nube", href: "/nube" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`font-medium transition ${
              pathname === item.href
                ? "text-blue-400 font-bold hover:text-blue-400"
                : "text-green-500 hover:text-green-500"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Botones */}
      <div className="flex items-center space-x-4">
        <button className="bg-blue-400 text-white font-semibold px-6 py-2 rounded-full shadow-lg  shadow-gray-700 hover:shadow-black hover:bg-green-500 hover:-translate-y-1 transition transform duration-300 ease-out cursor-pointer active:translate-y-1">
          Login
        </button>

        <Link href="/contact">
          <button className="bg-green-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg  shadow-gray-700 hover:shadow-black hover:bg-blue-400 hover:-translate-y-1 transition transform duration-300 ease-out cursor-pointer active:translate-y-1">
            Contáctanos
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
