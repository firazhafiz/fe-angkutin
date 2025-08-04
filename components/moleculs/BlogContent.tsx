import Image from "next/image";

interface BlogItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  content: string;
  published_at: string;
}

export default function BlogContent({ blog }: { blog: BlogItem }) {
  return (
    <div className="w-full" key={blog.id}>
      {/* Tanggal & Penulis */}
      <div className="text-md text-gray-500 mb-2">
        Published on:{" "}
        {new Date(blog.published_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
      <div className="text-sm text-gray-600 mb-6">By {blog.author}</div>

      {/* Judul */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{blog.title}</h1>

      {/* Thumbnail */}
      <div className="mb-8 flex ">
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          width={1000}
          height={1000}
          className="w-full max-w-[860px] h-[480px] object-cover rounded-xl"
          priority={true}
        />
      </div>

      {/* Deskripsi dan Konten */}
      <div className="max-w-5xl">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          {blog.description}
        </h3>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
          {blog.content}
        </p>
      </div>
    </div>
  );
}
