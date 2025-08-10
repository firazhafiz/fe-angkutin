import CardBenefitList from "../moleculs/CardBenefitList";

export default function Benefit() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-16">
      <h2 className="text-4xl md:text-5xl font-fredoka font-extrabold text-center mb-6 text-tosca">Why Choose Us</h2>
      <p className="text-lg md:text-xl font-light text-center text-black-100 mb-12 w-96 md:max-w-2xl">It&apos;s not just about throwing away waste, but how we process it.</p>
      <CardBenefitList />
    </section>
  );
}
