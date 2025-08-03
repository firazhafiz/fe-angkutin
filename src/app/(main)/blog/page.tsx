import HeaderBlog from "../../../../components/organisms/HeaderBlog";
import BlogList from "../../../../components/organisms/BlogList";
import LoadMore from "../../../../components/atoms/LoadMore";

export default function Blog() {
  return (
    <main className="w-full relative min-h-screen bg-gray-100 overflow-hidden">
      <section className="max-w-6xl mx-auto mt-40 mb-20">
        <HeaderBlog />
      </section>
      <section className="max-w-6xl mx-auto mb-20">
        <BlogList />
      </section>
      <section className="max-w-6xl mx-auto mb-20">
        <LoadMore />
      </section>
    </main>
  );
}
