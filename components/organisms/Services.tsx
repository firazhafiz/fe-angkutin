import CardServiceList from "../moleculs/CardServiceList";

export default function Services() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-black-100 mb-8 font-fredoka text-center">
        We Offer Best Services
      </h2>
      <CardServiceList />
    </section>
  );
}
