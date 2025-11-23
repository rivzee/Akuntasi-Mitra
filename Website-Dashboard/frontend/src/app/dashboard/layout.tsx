'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// PERHATIKAN: Hapus kurung kurawal { }. Jadi polos aja.
import Sidebar from '../../components/Sidebar'; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
        router.push('/login');
      }
    }
  }, [router]);

  if (!user) return <div className="p-10 text-black">Memuat Data...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar user={user} />
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}