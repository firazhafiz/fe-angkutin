import BlogContent from "../moleculs/BlogContent";
import BlogRecomendation from "../moleculs/BlogRecomendation";

export default function DetailBlog() {
  return (
    <main className="w-full flex flex-col gap-10">
      <BlogContent />
      <BlogRecomendation />
    </main>
  );
}
