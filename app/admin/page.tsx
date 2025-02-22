"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const [users, setUsers] = useState<{ email: string; role: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.push("/"); // Redirigir si no es admin
      return;
    }

    fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setUsers)
      .catch(() => console.error("Error cargando usuarios"));
  }, [router]);

  const changeRole = async (email: string, newRole: string) => {
    const token = localStorage.getItem("token");
    await fetch("/api/admin/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, role: newRole }),
    });

    setUsers(users.map((user) => (user.email === email ? { ...user, role: newRole } : user)));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/auth"); // Redirigir al login
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-green-500 to-blue-400 p-6 pt-36">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <button 
            onClick={logout} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Cerrar Sesión
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Rol</th>
              <th className="border border-gray-300 px-4 py-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => changeRole(user.email, user.role === "admin" ? "user" : "admin")}
                  >
                    {user.role === "admin" ? "Hacer User" : "Hacer Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
