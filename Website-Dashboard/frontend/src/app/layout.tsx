'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // State loading penting!
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
      setLoading(false);
    }
  }, [router]);

  if (loading) return <LoadingSpinner />; // Tampilkan ini pas loading
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      <Sidebar user={user} />
      
      {/* Margin kiri disesuaikan biar gak ketutupan sidebar */}
      <main className="flex-1 md:ml-72 p-6 md:p-10 transition-all duration-300">
        <div className="max-w-6xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}