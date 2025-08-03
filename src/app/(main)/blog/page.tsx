"use client";

import HeaderBlog from "../../../../components/organisms/HeaderBlog";
import BlogList from "../../../../components/organisms/BlogList";
import LoadMore from "../../../../components/atoms/LoadMore";
import { useEffect, useState } from "react";

export interface BlogItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  published_at: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch("https://angkutin.vercel.app/v1/blog");
        const data = await response.json();
        setBlogs(data.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlog();
  }, []);

  return (
    <main className="w-full relative min-h-screen bg-gray-100 overflow-hidden">
      <section className="max-w-6xl mx-auto mt-40 mb-20">
        <HeaderBlog />
      </section>
      <section className="max-w-6xl mx-auto mb-20">
        <BlogList blogs={blogs} />
      </section>
      <section className="max-w-6xl mx-auto mb-20">
        <LoadMore />
      </section>
    </main>
  );
}
