import Hero from "../../components/organisms/Hero";

export default function Home() {
  return (
    <main className="h-screen bg-gray-100 overflow-hidden">
      <div className="pt-40"></div>
      <section className="max-w-6xl mx-auto">
        <Hero />
      </section>
    </main>
  );
}
