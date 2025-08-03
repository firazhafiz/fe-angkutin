"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface CardBlogProps {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  author: string;
  published_at: string;
}

export default function CardBlog({ id, thumbnail, title, description, author, published_at }: CardBlogProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${id}`);
  };

  return (
    <div onClick={handleClick} className=" h-full cursor-pointer overflow-hidden">
      {/* Image */}
      <div className="w-full h-[250px] relative">
        <Image src={thumbnail} alt={title} fill className="object-cover rounded-lg" />
      </div>

      {/* Content */}
      <div className="py-4 flex flex-col h-[140px]">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">{description}</p>

        {/* Author and Date */}
        <div className="flex items-center text-xs font-semibold text-black-100">
          <span>{author}</span>
          <span className="mx-2">•</span>
          <span>
            {new Date(published_at).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
