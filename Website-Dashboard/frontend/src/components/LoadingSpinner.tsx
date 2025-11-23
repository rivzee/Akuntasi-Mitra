export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full h-full p-4">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600"></div>
    </div>
  );
}