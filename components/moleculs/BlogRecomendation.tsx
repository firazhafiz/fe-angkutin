"use client";

import Link from "next/link";
import CardBlog from "../atoms/CardBlog";

// Definisikan tipe untuk blog rekomendasi
interface BlogRecommendationItem {
  id: number;
  title: string;
  thumbnail: string;
  published_at: string;
  author: string;
  description: string;
}

interface BlogRecomendationProps {
  excludeId: number;
  blogs: BlogRecommendationItem[];
}

export default function BlogRecomendation({ excludeId, blogs }: BlogRecomendationProps) {
  const filteredBlogs = blogs.filter((blog) => blog.id !== excludeId).slice(0, 3);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recommendation</h2>
        <Link href="/blog" className="text-sm text-gray-900 cursor-pointer hover:text-gray-700">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredBlogs.map((blog) => (
          <CardBlog key={blog.id} id={blog.id} thumbnail={blog.thumbnail} title={blog.title} description={blog.description} author={blog.author} published_at={blog.published_at} />
        ))}
      </div>
    </div>
  );
}
