import Image from "next/image";

interface CardBlogProps {
  image: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

export default function CardBlog({
  image,
  title,
  description,
  author,
  date,
}: CardBlogProps) {
  return (
    <div className="w-[370px] h-full cursor-pointer overflow-hidden transition-shadow">
      {/* Image */}
      <div className="w-full h-[250px] relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="py-4 flex flex-col h-[140px]">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
          {description}
        </p>

        {/* Author and Date */}
        <div className="flex items-center text-xs font-semibold text-black-100">
          <span>{author}</span>
          <span className="mx-2">•</span>
          <span>
            {new Date(date).toLocaleDateString("en-US", {
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
