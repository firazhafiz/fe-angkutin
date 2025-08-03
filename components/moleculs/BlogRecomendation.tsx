import CardBlog from "../atoms/CardBlog";
import { blogCardData } from "../../data/cardBlog";

export default function BlogRecomendation() {
  // Ambil 3 data pertama dari blogCardData
  const recommendedBlogs = blogCardData.slice(0, 3);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recomendation</h2>
        <span className="text-sm text-gray-900 cursor-pointer hover:text-gray-700">
          View all
        </span>
      </div>

      {/* Blog Cards */}
      <div className="flex gap-6">
        {recommendedBlogs.map((blog, index) => (
          <CardBlog
            key={index}
            image={blog.image}
            title={blog.title}
            description={blog.description}
            author={blog.author}
            date={blog.date}
          />
        ))}
      </div>
    </div>
  );
}
