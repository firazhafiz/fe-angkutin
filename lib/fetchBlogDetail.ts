export async function fetchBlogDetail(id: string) {
  let blog: {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    author: string;
    content: string;
    published_at: string;
  } | null = null;

  try {
    const response = await fetch(`https://angkutin.vercel.app/v1/blog/${id}`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      if (data.data && typeof data.data === "object") {
        blog = data.data as typeof blog;
      }
    }
  } catch (error) {
    console.error("Failed to fetch blog detail:", error);
  }

  return blog;
}
