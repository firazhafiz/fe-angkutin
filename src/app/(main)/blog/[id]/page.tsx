"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DetailBlog from "../../../../../components/organisms/DetailBlog";
import DetailBlogSkeleton from "../../../../../components/atoms/DetailBlogSkeleton";

interface BlogItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  content: string;
  published_at: string;
}

export default function BlogDetail() {
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const res = await fetch(`http://localhost:4000/v1/blog/${params.id}`);
        const data = await res.json();
        setBlog(data.data);
      } catch (error) {
        console.error("Failed to fetch blog detail:", error);
      }
    };

    if (params?.id) {
      fetchBlogDetail();
    }
  }, [params]);

  if (!blog) {
    return (
      <main className="w-full relative min-h-screen bg-gray-100 overflow-hidden">
        <section className="max-w-6xl mx-auto mt-40 mb-20">
          <DetailBlogSkeleton />
        </section>
      </main>
    );
  }

  return (
    <main className="w-full relative min-h-screen bg-gray-100 overflow-hidden">
      <section className="max-w-6xl mx-auto mt-40 mb-20">
        <DetailBlog blog={blog} />
      </section>
    </main>
  );
}
