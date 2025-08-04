"use client";

import CardBlog from "../atoms/CardBlog";

interface BlogRecommendationItem {
  id: number;
  title: string;
  thumbnail: string;
  published_at: string;
}

interface BlogRecomendationProps {
  excludeId: number;
  blogs: BlogRecommendationItem[];
}

export default function BlogRecomendation({
  excludeId,
  blogs,
}: BlogRecomendationProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recommendation</h2>
        <span className="text-sm text-gray-900 cursor-pointer hover:text-gray-700">
          View all
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <CardBlog
            key={blog.id}
            id={blog.id}
            thumbnail={blog.thumbnail}
            title={blog.title}
            description={""}
            author={""}
            published_at={blog.published_at}
          />
        ))}
      </div>
    </div>
  );
}
