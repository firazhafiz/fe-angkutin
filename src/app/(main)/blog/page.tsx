import HeaderBlog from "../../../../components/organisms/HeaderBlog";
import BlogList from "../../../../components/organisms/BlogList";
import LoadMore from "../../../../components/atoms/LoadMore";

export interface BlogItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  published_at: string;
}

export default async function Blog() {
  let blogs: BlogItem[] = [];

  try {
    const response = await fetch("https://angkutin.vercel.app/v1/blog", {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    } else {
      const { data = [] } = (await response.json()) || {};
      blogs = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }

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
