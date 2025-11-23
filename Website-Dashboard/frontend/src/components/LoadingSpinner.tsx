export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-indigo-600"></div>
    </div>
  );
}