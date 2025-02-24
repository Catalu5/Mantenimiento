import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userEmail = req.headers.get("Authorization");

    if (!userEmail) {
      return NextResponse.json({ message: "Usuario no autenticado" }, { status: 401 });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ imageUrl: user.profileImage }, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo la imagen de perfil:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
