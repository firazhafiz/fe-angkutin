import CardGalleryList from "../moleculs/CardGalleryList";

export default function Gallery() {
  return (
    <section className="w-full flex flex-col items-center justify-center py-16">
      <h3 className="text-lg font-medium text-center mb-2 text-black/80">
        What did we do?
      </h3>
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10">
        <span className="text-tosca">OUR</span>{" "}
        <span className="text-black-100">Gallery</span>
      </h2>
      <CardGalleryList />
    </section>
  );
}
