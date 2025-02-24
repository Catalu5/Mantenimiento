"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { Menu, X, Settings, LogOut } from "lucide-react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

const Header = () => {
  const pathname = usePathname();
  const router = useRouter(); 
  const { isAuthenticated, user, logout, updateProfileImage } = useContext(AuthContext)!;
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || "/default-avatar.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // ✅ Cargar la imagen desde MongoDB al iniciar sesión

  useEffect(() => {
    console.log("📌 Estado actual del usuario:", user);
  }, [user]);
  
  const handleImageUpload = async (file: File) => {
    if (!file) return console.error("No se seleccionó ninguna imagen");
  
    if (!user || !user.email) {
      console.error("🚨 Error: El usuario no está autenticado o el email no está disponible.");
      return;
    }
  
    console.log("✅ Usuario autenticado:", user.email);
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
  
      const data = await response.json();
      if (!response.ok) return console.error("🚨 Error en la subida:", data);
  
      // ✅ Guardar la imagen en la base de datos
      const updateResponse = await fetch("/api/updateProfileImage", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": user.email 
        },
        body: JSON.stringify({ imageUrl: data.secure_url }),
      });
  
      const updateData = await updateResponse.json();
      if (!updateResponse.ok) return console.error("🚨 Error al actualizar la imagen:", updateData);
  
      console.log("✅ Imagen de perfil actualizada:", data.secure_url);
      updateProfileImage(data.secure_url); // ✅ Actualizar estado global
    } catch (error) {
      console.error("🚨 Error al subir la imagen:", error);
    }
  };
  

  return (
    <header className="fixed top-8 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[70%] z-40 bg-white shadow-lg rounded-full px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/">
          <Image src="/Logo.jpg" alt="Logo" width={60} height={60} className="object-contain cursor-pointer" priority />
        </Link>
        <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])} />
      </div>

      {/* Navegación en escritorio */}
      <nav className="hidden md:flex space-x-6">
        {[{ name: "Inicio", href: "/" }, { name: "Nuestras Soluciones", href: "/lessons" }, { name: "Nosotros", href: "/about" }, { name: "Análisis en la Nube", href: "/nube" }].map((item) => (
          <Link key={item.href} href={item.href} className={`font-medium transition ${pathname === item.href ? "text-blue-400 font-bold" : "text-green-500"}`}>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Botón de menú hamburguesa en móvil */}
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden flex items-center justify-center text-gray-700 hover:text-green-500 transition">
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menú desplegable en móvil */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[85%] bg-white shadow-lg rounded-lg p-5 flex flex-col items-center space-y-4 md:hidden">
          {[{ name: "Inicio", href: "/" }, { name: "Nuestras Soluciones", href: "/lessons" }, { name: "Nosotros", href: "/about" }, { name: "Análisis en la Nube", href: "/nube" }].map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="font-medium transition text-green-500">
              {item.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <button onClick={() => { logout(); router.push("/auth"); setMobileMenuOpen(false); }} className="w-full text-center bg-red-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-600 transition">
              Cerrar Sesión
            </button>
          ) : (
            <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full text-center bg-blue-400 text-white font-semibold px-6 py-2 rounded-full hover:bg-green-500 transition">
                Login
              </button>
            </Link>
          )}
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
            <button className="w-full text-center bg-green-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-400 transition">
              Contáctanos
            </button>
          </Link>
        </div>
      )}

      {/* Imagen de perfil / Login en escritorio */}
      <div className="hidden md:flex items-center space-x-4 relative">
        {isAuthenticated ? (
          <div className="relative">
            <Image 
              src={profileImage || "/default-avatar.png"} 
              alt="Perfil" 
              width={40} 
              height={40} 
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)} 
            />
            {/* Menú de perfil */}
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg py-2">
                <button onClick={() => { router.push("/settings"); setProfileMenuOpen(false); }} className="flex items-center px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-200">
                  <Settings size={18} className="mr-2" />
                  Ajustes
                </button>
                <button onClick={() => { logout(); router.push("/auth"); setProfileMenuOpen(false); }} className="flex items-center px-4 py-2 w-full text-left text-red-500 hover:bg-red-100">
                  <LogOut size={18} className="mr-2" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/auth">
            <button className="bg-blue-400 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-black hover:bg-green-500 transition">
              Login
            </button>
          </Link>
        )}
        <Link href="/contact">
          <button className="bg-green-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-black hover:bg-blue-400 transition">
            Contáctanos
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
