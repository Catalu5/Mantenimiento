import { NextResponse } from "next/server";

export function middleware(req: Request) {
  // const token = req.headers.get("cookie")?.split("=")[1]; // Obtiene el token desde cookies
  const role = req.headers.get("cookie")?.split("=")[2]; // Obtiene el rol

  if (req.url.includes("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Aplica este middleware a la ruta /admin
};
