"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

// 📌 Definir un tipo de usuario
interface UserType {
  name?: string;
  email: string;
  profileImage?: string;
}

// 📌 Definir el contexto de autenticación
interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (token: string, user: UserType) => void;
  logout: () => void;
  updateProfileImage: (newImageUrl: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true); // 🚀 Agregado para controlar la carga del usuario

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.email) {
          setIsAuthenticated(true);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("🚨 Error al parsear el usuario:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false); // 🚀 Finalizar la carga
  }, []);

  const login = (token: string, userData: UserType) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateProfileImage = (newImageUrl: string) => {
    if (!user) return;

    const updatedUser = { ...user, profileImage: newImageUrl };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); // 🚀 Guardar cambios en localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateProfileImage }}>
      {!loading && children} {/* 🚀 Evitar renderizar la app hasta que el usuario esté listo */}
    </AuthContext.Provider>
  );
};
