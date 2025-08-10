import BlogContent from "../moleculs/BlogContent";
import BlogRecomendation from "../moleculs/BlogRecomendation";
import { Suspense } from "react";
import { fetchBlogDetail } from "../../lib/fetchBlogDetail";
import { fetchBlogRecommendations } from "../../lib/fetchBlogRecomendation";
import BlogContentSkeleton from "../atoms/BlogContentSkeleton";
import BlogRecomendationSkeleton from "../atoms/BlogRecomendationSkeleton";

interface BlogItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  content: string;
  published_at: string;
}

export default async function DetailBlog({ params }: { params: { id: string } }) {
  return (
    <main className="w-full flex flex-col gap-10 px-4 md:px-0">
      {/* Bagian konten blog */}
      <section>
        <Suspense fallback={<BlogContentSkeleton />}>
          <BlogContentFetcher id={params.id} />
        </Suspense>
      </section>
      {/* Bagian rekomendasi blog */}
      <section>
        <Suspense fallback={<BlogRecomendationSkeleton />}>
          <BlogRecomendationFetcher id={params.id} />
        </Suspense>
      </section>
    </main>
  );
}

async function BlogContentFetcher({ id }: { id: string }) {
  const blog = await fetchBlogDetail(id);
  return <BlogContent blog={blog!} />;
}

async function BlogRecomendationFetcher({ id }: { id: string }) {
  const blogs = await fetchBlogRecommendations(Number(id));
  return <BlogRecomendation excludeId={Number(id)} blogs={blogs} />;
}
