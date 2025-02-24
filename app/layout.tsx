import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext"; // Autenticación
import CloudinaryScript from "./components/CloudinaryScript";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "InverCloud",
  description: "Hacemos las soluciones que necesita tu invernadero",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`antialiased ${geistSans.variable}`}>
        <CloudinaryScript /> {/* Carga Cloudinary antes de que la app lo necesite */}
        <AuthProvider> {/* La app mantiene el acceso a la autenticación */}
          <Navbar /> {/* Encabezado con navegación */}
          <main className="min-h-screen">
            {children} {/* Aquí se carga el contenido dinámico de cada página */}
          </main>
          <Footer /> {/* Pie de página */}
        </AuthProvider>
      </body>
    </html>
  );
}
