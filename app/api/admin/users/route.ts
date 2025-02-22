import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    await connectDB();

    // Obtener el token del header Authorization
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Acceso no autorizado" }, { status: 403 });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Permiso denegado" }, { status: 403 });
    }

    const users = await User.find({}, "email role");
    return NextResponse.json(users, { status: 200 });

  } catch (error) {
    console.error("Error en API de admin:", error);
    return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
  }
}
