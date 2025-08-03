// components/skeletons/DetailBlogSkeleton.tsx

export default function DetailBlogSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-10">
      {/* Thumbnail */}
      <div className="w-full h-72 bg-gray-300 rounded-xl" />

      {/* Title */}
      <div className="w-3/4 h-8 bg-gray-300 rounded" />

      {/* Author & Date */}
      <div className="flex gap-4 mt-2">
        <div className="w-32 h-4 bg-gray-200 rounded" />
        <div className="w-20 h-4 bg-gray-200 rounded" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 mt-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="w-full h-4 bg-gray-200 rounded" />
        ))}
      </div>

      {/* Rekomendasi */}
      <div className="mt-10">
        <div className="w-1/4 h-6 bg-gray-300 rounded mb-4" />
        <div className="flex gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-1 bg-white p-4 rounded-xl shadow animate-pulse flex flex-col gap-3">
              <div className="w-full h-32 bg-gray-300 rounded" />
              <div className="w-3/4 h-4 bg-gray-300 rounded" />
              <div className="w-full h-3 bg-gray-200 rounded" />
              <div className="w-1/2 h-3 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
