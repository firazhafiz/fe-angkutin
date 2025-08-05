export default function AddressLoading() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#016A70]"></div>
      <span className="ml-2 text-gray-500">Loading addresses...</span>
    </div>
  );
}
