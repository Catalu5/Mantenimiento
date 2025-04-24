"use client";

import Hero from "./Hero";
import Body from "./Body";
import Ventajas from "./Ventajas";

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
