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

export default function CardBlog({
  id,
  thumbnail,
  title,
  description,
  author,
  published_at,
}: CardBlogProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="h-full cursor-pointer overflow-hidden"
    >
      {/* Image */}
      <div className="w-full h-[250px] relative">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="py-4 flex flex-col h-[180px]">
        {/* Title - Fixed height for consistent spacing */}
        <div className="h-[52px] mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
            {title}
          </h3>
        </div>

        {/* Description - Fixed height for consistent spacing */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2 leading-tight">
            {description}
          </p>
        </div>

        {/* Author and Date - Fixed at bottom */}
        <div className="flex items-center text-xs font-semibold text-black-100 ">
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
