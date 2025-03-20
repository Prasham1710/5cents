export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
        <p className="mt-4 text-lg font-medium text-gray-600">{'Loading Dashboard...'}</p>
      </div>
    </div>
  );
}
