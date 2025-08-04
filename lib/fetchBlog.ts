export async function fetchBlogs() {
  try {
    const response = await fetch("https://angkutin.vercel.app/v1/blog", {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return [];
    }
    const { data = [] } = (await response.json()) || {};
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}
