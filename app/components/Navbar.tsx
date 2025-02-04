"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Contenedor principal con fondo blanco */}
      <div className="max-w-5xl mx-auto px-10 py-2 flex items-center justify-between rounded-full bg-white shadow-md mt-10">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/Logo.jpg"
              alt="Logo"
              width={70}
              height={70}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Navegación */}
        <nav className="hidden md:flex space-x-6">
          {[
            { name: "Inicio", href: "/" },
            { name: "Nuestras Soluciones", href: "/Lessons" },
            { name: "Nosotros", href: "/about" },
            { name: "Análisis en la Nube", href: "/Nube" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition ${
                pathname === item.href
                  ? "text-[#27ae60] font-bold"
                  : "text-gray-800 hover:text-green-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Botones de Login y Contáctanos */}
        <div className="flex items-center space-x-4">
          {/* Botón de Login con Clerk */}
          <SignedOut>
            <SignInButton>
              <button className="bg-blue-400 text-white font-semibold px-6 py-2 rounded-full shadow-lg shadow-gray-700 hover:shadow-black hover:bg-[#27ae60] hover:-translate-y-1 transition transform duration-300 ease-out cursor-pointer active:translate-y-1">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          {/* Menú de usuario cuando está autenticado */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          {/* Botón de Contáctanos */}
          <Link href="/Contact" passHref>
            <button className="bg-[#27ae60] text-white font-semibold px-6 py-2 rounded-full shadow-lg shadow-gray-700 hover:shadow-black hover:bg-blue-400 hover:-translate-y-1 transition transform duration-300 ease-out cursor-pointer active:translate-y-1">
              Contáctanos
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;