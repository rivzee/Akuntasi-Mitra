'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// PERHATIKAN IMPORT INI:
// Mundur 2 langkah (../../) untuk keluar dari folder 'dashboard' dan 'app'
// Lalu masuk ke folder 'components'
import Sidebar from '../../components/Sidebar'; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      {/* Sidebar muncul disini */}
      <Sidebar user={user} />
      
      <main className="flex-1 md:ml-72 p-6 md:p-10 transition-all duration-300">
        <div className="max-w-6xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}