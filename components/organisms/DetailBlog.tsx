import BlogContent from "../moleculs/BlogContent";
import BlogRecomendation from "../moleculs/BlogRecomendation";

interface BlogItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  content: string;
  published_at: string;
}

export default function DetailBlog({ blog }: { blog: BlogItem }) {
  return (
    <main className="w-full flex flex-col gap-10">
      <BlogContent blog={blog} />
      <BlogRecomendation excludeId={blog.id} />
    </main>
  );
}
