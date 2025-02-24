import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await connectDB();

    // Obtener el token del encabezado de autorización
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      email: user.email,
      profileImage: user.profileImage || "/default-avatar.png",
      greenhouseData: user.greenhouseData || {
        temperature: Math.random() * 10 + 20,
        humidity: Math.random() * 30 + 50,
        acidity: Math.random() * 3 + 4,
        nutrients: "NPK balanceado",
      },
    }, { status: 200 });

  } catch (error) {
    console.error("Error en API de nube:", error);
    return NextResponse.json({ error: "Error al obtener datos" }, { status: 500 });
  }
}
