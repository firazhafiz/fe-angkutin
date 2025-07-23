import Hero from "../../components/organisms/Hero";
import RunningText from "../../components/moleculs/RunningText";
import Services from "../../components/organisms/Services";
import Banner from "../../components/organisms/Banner";
import Benefit from "../../components/organisms/Benefit";
import HowToOrder from "../../components/organisms/HowToOrder";
import Gallery from "../../components/organisms/Gallery";
import TestimoniLeft from "../../components/moleculs/TestimoniLeft";
import TestimoniRight from "../../components/moleculs/TestimoniRight";
import TestimoniTitle from "../../components/atoms/TestimoniTitle";
import Promote from "../../components/organisms/Promote";

export default function Home() {
  return (
    <main className="w-full relative min-h-screen bg-gray-100 overflow-hidden">
      <section className="max-w-6xl mx-auto mt-40 my-55">
        <Hero />
      </section>
      <section className="relative mb-30">
        <RunningText />
      </section>
      <section className="max-w-6xl mx-auto mb-20">
        <Services />
      </section>
      <section className="max-w-6xl mx-auto mb-20">
        <Banner />
      </section>
      <section className="max-w-8xl mx-auto mb-10">
        <Benefit />
      </section>
      <section className="w-full mx-auto mb-10">
        <HowToOrder />
      </section>
      <section className="max-w-6xl mx-auto mb-10">
        <Gallery />
      </section>
      <section className="w-full mx-auto mb-10">
        <TestimoniTitle />
      </section>
      <section className="w-full mx-auto">
        <TestimoniLeft />
      </section>
      <section className="w-full mx-auto mb-20">
        <TestimoniRight />
      </section>
      <section className="w-full mx-auto mb-20">
        <Promote />
      </section>
    </main>
  );
}
