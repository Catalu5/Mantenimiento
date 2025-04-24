import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { database } from "@/models/firebase";
import { ref, get } from "firebase/database";

interface DecodedToken {
  userId: string;
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    let greenhouseData = { ...user.greenhouseData };
    const fireid = user.fireid || user.get("fireid");

    if (fireid) {
      console.log("🔍 Buscando en Firebase con fireid:", fireid);

      const snapshot = await get(ref(database, fireid));  // ✅ Aquí usamos la instancia correcta

      if (snapshot.exists()) {
        const firebaseData = snapshot.val();
        console.log("✅ Datos Firebase:", firebaseData);

        greenhouseData.temperature = firebaseData.Temperatura;
        greenhouseData.humidity = firebaseData.Humedad;
      } else {
        console.warn("⚠️ No se encontraron datos en Firebase");
      }
    }

    console.log("🚀 Datos enviados al frontend:", greenhouseData);

    return NextResponse.json({
      email: user.email,
      profileImage: user.profileImage || "/default-avatar.png",
      greenhouseData
    }, { status: 200 });

  } catch (error) {
    console.error("Error en API de nube:", error);
    return NextResponse.json({ error: "Error al obtener datos" }, { status: 500 });
  }
}
