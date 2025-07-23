import Hero from "../../components/organisms/Hero";
import RunningText from "../../components/moleculs/RunningText";
import Services from "../../components/organisms/Services";
import Banner from "../../components/organisms/Banner";

export default function Home() {
  return (
    <main className="w-full relative min-h-screen bg-gray-100 overflow-hidden">
      <section className="max-w-6xl mx-auto mt-40 my-55">
        <Hero />
      </section>
      <section className="relative mb-30">
        <RunningText />
      </section>
      <section className="max-w-6xl mx-auto mb-10">
        <Services />
      </section>
      <section className="max-w-6xl mx-auto">
        <Banner />
      </section>
    </main>
  );
}
