import Hero from "./sections/Hero";
import Body from "./sections/Body";


export default function Home() {
  return (
    <main className="relative min-h-screen bg-green-100 text-gray-800">
      <Hero />
      <Body />
    </main>
  );
}
