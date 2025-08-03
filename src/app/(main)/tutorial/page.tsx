import HeroTutorial from "../../../../components/moleculs/HeroTutorial";
import CardTutorialList from "../../../../components/moleculs/CardTutorialList";

export default function Tutorial() {
  return (
    <main className="w-full relative min-h-screen bg-gray-100 overflow-hidden">
      <section className="max-w-6xl mx-auto mt-40 mb-20">
        <HeroTutorial />
      </section>
      <section className="max-w-6xl mx-auto mb-20">
        <CardTutorialList />
      </section>
    </main>
  );
}
