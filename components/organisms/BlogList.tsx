import CardBlogList from "../moleculs/CardBlogList";

export default function BlogList() {
  return (
    <section className="w-full">
      <div className="w-full mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-black-100 mb-12">
          Recent blog posts
        </h2>

        {/* Blog Cards List */}
        <CardBlogList />
      </div>
    </section>
  );
}
