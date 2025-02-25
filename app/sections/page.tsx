"use client";

import Hero from "./sections/Hero";
import Body from "./sections/Body";
import Ventajas from "./sections/Ventajas";

export default function Home() {
  return (
    <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
      {/* Sección Hero */}
      <Hero />

      {/* Sección Body */}
      <Body />

      {/* Sección Ventajas */}
      <Ventajas />
    </main>
  );
}
