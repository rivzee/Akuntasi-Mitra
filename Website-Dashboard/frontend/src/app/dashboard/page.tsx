import Link from "next/link";

// WAJIB ADA TULISAN 'export default function' INI
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <h1 className="text-4xl font-bold mb-4">Jasa Akuntansi Mitra</h1>
      <p className="mb-8 text-lg text-gray-600">Aplikasi sudah jalan normal Boss!</p>
      
      <div className="flex gap-4">
        <Link 
          href="/login" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
        >
          Login Sekarang
        </Link>
        <Link 
          href="/dashboard" 
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300"
        >
          Cek Dashboard
        </Link>
      </div>
    </div>
  );
}