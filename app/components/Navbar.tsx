"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-5xl mx-auto px-10 py-2 flex items-center justify-between rounded-full mt-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/Logo.jpg"
              alt="Logo"
              width={70}
              height={70}
              className="object-contain cursor-pointer"
              priority
              loading="eager" // 🔹 Evita la inconsistencia entre SSR y Cliente
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
                  ? "text-green-600 font-bold"
                  : "text-gray-800 hover:text-green-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Botones de Login y Contáctanos */}
        <div className="flex items-center space-x-4">
          <button className="bg-blue-400 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-green-600 transition duration-300">
            Login
          </button>

          <Link href="/contact">
            <button className="bg-green-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-blue-400 transition duration-300">
              Contáctanos
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
