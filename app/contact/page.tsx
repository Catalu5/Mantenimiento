"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");

    setTimeout(() => {
      setStatus("Mensaje enviado correctamente");
      setFormData({ nombre: "", email: "", mensaje: "" });
    }, 2000);
  };

  return (
    <section className="relative bg-gradient-to-b from-green-500 to-blue-400 text-white py-16">
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 mt-32">Contáctanos</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Estamos aquí para responder tus preguntas y brindarte la mejor solución para optimizar tu invernadero.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Información de Contacto */}
          <div className="bg-white text-black shadow-lg rounded-lg p-8">
            <h3 className="text-3xl font-semibold text-green-500 mb-6">Información de Contacto</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <MapPin size={28} className="text-green-500" />
                <p className="text-lg">Calle 123, Ciudad, País</p>
              </div>
              <div className="flex items-center space-x-4">
                <Phone size={28} className="text-green-500" />
                <p className="text-lg">+123 456 789</p>
              </div>
              <div className="flex items-center space-x-4">
                <Mail size={28} className="text-green-500" />
                <p className="text-lg">contacto@tuempresa.com</p>
              </div>
            </div>

            {/* Imagen decorativa */}
            <div className="mt-8 flex justify-center">
              <Image src="/Logo-removebg-preview.png" alt="Contáctanos" width={250} height={250} className="animate-float" />
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-3xl font-semibold text-blue-600 mb-6">Envíanos un Mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Campo Nombre */}
              <div>
                <label className="text-gray-700 font-medium">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
              </div>

              {/* Campo Email */}
              <div>
                <label className="text-gray-700 font-medium">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Campo Mensaje */}
              <div>
                <label className="text-gray-700 font-medium">Mensaje</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={4}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  required
                />
              </div>

              {/* Botón de enviar */}
              <button
                type="submit"
                className="w-full flex items-center justify-center bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-500 transition"
              >
                <Send size={20} className="mr-2" /> Enviar Mensaje
              </button>

              {/* Estado del formulario */}
              {status && <p className="text-center text-green-600 font-semibold mt-4">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
