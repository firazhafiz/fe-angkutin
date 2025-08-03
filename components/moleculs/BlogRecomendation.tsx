"use client";

import { useEffect, useState } from "react";
import CardBlog from "../atoms/CardBlog";

interface BlogItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  published_at: string;
}

export default function BlogRecomendation({ excludeId }: { excludeId: number }) {
  const [recommendedBlogs, setRecommendedBlogs] = useState<BlogItem[]>([]);

  useEffect(() => {
    const fetchRecommendedBlogs = async () => {
      try {
        const res = await fetch("http://localhost:4000/v1/blog");
        const result = await res.json();

        const allBlogs: BlogItem[] = result.data;

        // Filter agar tidak menampilkan blog yang sedang dibuka
        const filtered = allBlogs.filter((blog) => blog.id !== excludeId).slice(0, 3); // Ambil 3 blog saja

        setRecommendedBlogs(filtered);
      } catch (err) {
        console.error("Failed to fetch recommended blogs:", err);
      }
    };

    fetchRecommendedBlogs();
  }, [excludeId]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recommendation</h2>
        <span className="text-sm text-gray-900 cursor-pointer hover:text-gray-700">View all</span>
      </div>

      <div className="flex gap-6 flex-wrap">
        {recommendedBlogs.map((blog) => (
          <CardBlog
            key={blog.id} // untuk React
            id={blog.id} // untuk komponen CardBlog
            thumbnail={blog.thumbnail}
            title={blog.title}
            description={blog.description}
            author={blog.author}
            published_at={blog.published_at}
          />
        ))}
      </div>
    </div>
  );
}
