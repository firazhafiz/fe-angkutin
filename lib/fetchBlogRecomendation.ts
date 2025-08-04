export async function fetchBlogRecommendations(excludeId: number) {
  let blogs: {
    id: number;
    title: string;
    thumbnail: string;
    published_at: string;
  }[] = [];

  try {
    const response = await fetch(
      `https://angkutin.vercel.app/v1/blog?limit=3&exclude=${excludeId}`,
      {
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      if (data.data && Array.isArray(data.data)) {
        blogs = data.data as typeof blogs;
      }
    }
  } catch (error) {
    console.error("Failed to fetch blog recommendations:", error);
  }

  return blogs;
}
