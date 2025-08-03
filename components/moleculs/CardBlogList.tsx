import CardBlog from "../atoms/CardBlog";
import { blogCardData } from "../../data/cardBlog";

export default function CardBlogList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogCardData.map((blog, index) => (
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
  );
}
