import Hero from "./sections/Hero";
import Body from "./sections/Body";
import Ventajas from "./sections/Ventajas";


export default function Home() {
  return (
    <main className="relative min-h-screen bg-blue-400 text-black">
      {/* Hero con las tarjetas en posición absoluta */}
      <Hero />

      {/* Sección de contenido blanco que inicia con un padding-top
          para que las tarjetas se vean a la mitad sobre el Hero */}
      <section className="pt-64">
        <Body />
        <Ventajas />
      </section>
    </main>
  );
}
