export default function BlogListSkeleton() {
  const skeletonCount = 3; // Jumlah kartu skeleton

  return (
    <section className="w-full">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(skeletonCount)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="h-full cursor-pointer overflow-hidden bg-gray-200 animate-pulse"
              >
                {/* Image Skeleton */}
                <div className="w-full h-[250px] relative bg-gray-300 rounded-lg"></div>

                {/* Content Skeleton */}
                <div className="py-4 flex flex-col h-[140px]">
                  {/* Title Skeleton (text-lg, font-bold) */}
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>

                  {/* Description Skeleton (text-sm, line-clamp-2, flex-1) */}
                  <div className="h-4 bg-gray-300 rounded mb-3 flex-1"></div>
                  <div className="h-4 bg-gray-300 rounded mb-3 flex-1"></div>

                  {/* Author and Date Skeleton (flex, text-xs, font-semibold) */}
                  <div className="flex items-center text-xs">
                    <div className="h-3 bg-gray-300 rounded mr-2 w-1/4"></div>{" "}
                    {/* Author */}
                    <div className="h-3 bg-gray-300 rounded mx-2 w-2"></div>{" "}
                    {/* Bullet */}
                    <div className="h-3 bg-gray-300 rounded w-1/4"></div>{" "}
                    {/* Date */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
