"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    message: string;
    imageSrc: string;
  };
const Modal = ({ isOpen, onClose, title, message, imageSrc }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        exit={{ opacity: 0, scale: 0.8 }} 
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl"
      >
        {/* Imagen de la planta en el modal */}
        <div className="flex justify-center">
          <Image src={imageSrc} alt="Estado de la planta" width={100} height={100} className="h-32 object-contain" />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mt-4">{title}</h2>

        {/* Mensaje de diagnóstico */}
        <p className="text-gray-600 mt-4 text-justify text-lg">{message}</p>

        {/* Botón de Cerrar */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
