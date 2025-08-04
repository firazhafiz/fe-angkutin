export default function BlogListSkeleton() {
  const skeletonCount = 3; // Jumlah kartu skeleton

  return (
    <section className="w-full">
      <div className="w-full mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-300 mb-12">
          Recent Blog Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(skeletonCount)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="h-full cursor-pointer overflow-hidden bg-gray-200 animate-pulse"
              >
                {/* Image Skeleton */}
                <div className="w-full h-[250px] bg-gray-300 rounded-lg"></div>

                {/* Content Skeleton */}
                <div className="py-4 flex flex-col h-[140px]">
                  <div className="h-5 bg-gray-300 rounded mb-2"></div>{" "}
                  {/* Title */}
                  <div className="h-4 bg-gray-300 rounded mb-3 flex-1"></div>{" "}
                  {/* Description */}
                  <div className="h-3 bg-gray-300 rounded w-1/3"></div>{" "}
                  {/* Author and Date */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
