import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});


export const metadata: Metadata = {
  title: "Driving School",
  description: "Learn road skills for life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
        <html lang="en">
          <body className={`antialiased ${geistSans.variable}`}>
            <Navbar /> {/* Encabezado con navegación */}
            <main className="min-h-screen">
              {children}{" "}
              {/* Aquí se carga el contenido dinámico de cada página */}
            </main>
            <Footer /> {/* Pie de página */}
          </body>
        </html>
  );
}
