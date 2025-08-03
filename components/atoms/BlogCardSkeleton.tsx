// components/atoms/BlogCardSkeleton.tsx

export default function BlogCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-4 bg-white p-4 rounded-xl shadow">
      <div className="w-full h-48 bg-gray-300 rounded-xl" />
      <div className="w-3/4 h-5 bg-gray-300 rounded" />
      <div className="w-full h-4 bg-gray-200 rounded" />
      <div className="w-1/2 h-4 bg-gray-200 rounded" />
    </div>
  );
}
