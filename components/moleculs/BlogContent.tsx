import { blogContentData } from "../../data/detailBlogContent";

interface BlogContentProps {
  date?: string;
  title?: string;
  image?: string;
  description?: string;
}

export default function BlogContent({
  date = blogContentData.date,
  title = blogContentData.title,
  image = blogContentData.image,
  description = blogContentData.description,
}: BlogContentProps = {}) {
  return (
    <div className="w-full">
      {/* Date */}
      <div className="text-md text-gray-500 mb-4">{date}</div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>

      {/* Image */}
      <div className="mb-6">
        <img
          src={image}
          alt={title}
          className="w-[660px] h-[380px] object-cover rounded-xl"
        />
      </div>

      {/* Description */}
      <div className="max-w-5xl">
        <h3 className="text-gray-700 leading-relaxed">{description}</h3>
      </div>
    </div>
  );
}
