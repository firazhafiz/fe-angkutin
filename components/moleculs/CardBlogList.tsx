"use client";

import CardBlog from "../atoms/CardBlog";
import { BlogItem } from "../../src/app/(main)/blog/page";
import { useRouter } from "next/navigation";

export default function CardBlogList({ blogs }: { blogs: BlogItem[] }) {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/blog/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog, index) => (
        <div key={index} onClick={() => handleClick(blog.id)} className="cursor-pointer">
          <CardBlog id={blog.id} thumbnail={blog.thumbnail} title={blog.title} description={blog.description} author={blog.author} published_at={blog.published_at} />
        </div>
      ))}
    </div>
  );
}
