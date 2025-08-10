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
      <div className="flex items-center gap-2 mb-1">
        <div className="text-sm text-gray-600 ">By {blog.author}</div>
        <p className="text-xs text-gray-500">
          {new Date(blog.published_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-2">{blog.title}</h1>
      <h3 className="text-md md:text-md  text-gray-500 mt-2 mb-4">{blog.description}</h3>
      {/* Thumbnail */}
      <div className="mb-8 flex ">
        <Image src={blog.thumbnail} alt={blog.title} width={1000} height={1000} className="w-full max-w-[860px] h-[280px]  md:h-[480px] object-cover rounded-xl" priority={true} />
      </div>

      {/* Deskripsi dan Konten */}
      <div className="max-w-5xl">
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{blog.content}</p>
      </div>
    </div>
  );
}
