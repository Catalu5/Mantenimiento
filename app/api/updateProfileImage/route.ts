import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

// 📌 API para actualizar la imagen de perfil
export async function POST(req: Request) {
  try {
    await connectDB(); // Conectar a la base de datos

    // 📌 Obtener datos del request
    const { imageUrl } = await req.json();
    const userEmail = req.headers.get("Authorization");

    // 📌 Validar que se envió un token de usuario
    if (!userEmail) {
      return NextResponse.json({ error: "No autorizado: No se proporcionó un token" }, { status: 401 });
    }

    // 📌 Validar que `imageUrl` no esté vacío
    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json({ error: "URL de imagen inválida" }, { status: 400 });
    }

    // 📌 Buscar al usuario en la base de datos
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // 📌 Actualizar la imagen de perfil
    user.profileImage = imageUrl;
    await user.save();

    return NextResponse.json(
      { message: "Imagen de perfil actualizada correctamente", imageUrl },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error en la API de actualización de imagen:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
