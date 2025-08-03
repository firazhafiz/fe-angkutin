import CardBlogList from "../moleculs/CardBlogList";
import { BlogItem } from "../../src/app/(main)/blog/page";

export default function BlogList({ blogs }: { blogs: BlogItem[] }) {
  return (
    <section className="w-full">
      <div className="w-full mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-black-100 mb-12">Recent Blog Posts</h2>
        <CardBlogList blogs={blogs} />
      </div>
    </section>
  );
}
