export default function BlogRecomendationSkeleton() {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
  );
}
