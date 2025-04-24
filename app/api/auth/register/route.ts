import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();
    await connectDB();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ error: "Usuario ya registrado" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const isFirstUser = (await User.countDocuments()) === 0;
    const userRole = isFirstUser ? "admin" : role || "user";

    const newUser = new User({ 
      email, 
      password: hashedPassword, 
      role: userRole,
      fireid: `user_${Date.now()}`   // 🔥 Asigna fireid automático
    });

    await newUser.save();
    return NextResponse.json({ message: "Usuario registrado con éxito", role: userRole }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error en el registro" }, { status: 500 });
  }
}
