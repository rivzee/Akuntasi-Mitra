'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// PERHATIKAN: Pakai 'export default'
export default function Sidebar({ user }: { user: any }) {
  const router = useRouter();

  if (!user) return null;

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 p-6 flex flex-col">
      <div className="mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-xl font-bold text-blue-400">DASHBOARD</h1>
        <p className="text-sm mt-2 text-gray-300">Halo, {user.fullName || 'User'}</p>
      </div>

      <nav className="space-y-2 flex-1">
        <Link href="/dashboard" className="block p-3 hover:bg-gray-800 rounded transition">Beranda</Link>
        <Link href="/dashboard/services" className="block p-3 hover:bg-gray-800 rounded transition">Layanan</Link>
        <Link href="/dashboard/order" className="block p-3 hover:bg-gray-800 rounded transition">Order</Link>
      </nav>

      <button 
        onClick={() => { localStorage.removeItem('user'); router.push('/login'); }}
        className="bg-red-600 py-3 rounded font-bold hover:bg-red-700 w-full mt-auto"
      >
        KELUAR
      </button>
    </aside>
  );
}