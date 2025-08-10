import CardBlogList from "../moleculs/CardBlogList";
import { Suspense } from "react";
import { fetchBlogs } from "../../lib/fetchBlog";
import BlogRecomendationSkeleton from "../atoms/BlogRecomendationSkeleton";

export default function BlogList() {
  return (
    <section className="w-full">
      <div className="w-full mx-auto px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold text-black-100 mb-12">Recent Blog Posts</h2>
        <Suspense fallback={<BlogRecomendationSkeleton />}>
          <BlogListData />
        </Suspense>
      </div>
    </section>
  );
}

async function BlogListData() {
  const blogs = await fetchBlogs();
  return <CardBlogList blogs={blogs} />;
}
