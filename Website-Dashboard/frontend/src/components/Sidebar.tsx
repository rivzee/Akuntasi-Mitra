'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Briefcase, ShoppingCart, FileText, 
  Users, LogOut, Upload, PieChart, ChevronRight 
} from 'lucide-react';

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();
  const router = useRouter();

  const menus = {
    ADMIN: [
      { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Layanan Jasa', href: '/dashboard/services', icon: Briefcase },
      { name: 'Semua Pesanan', href: '/dashboard/jobs', icon: FileText },
      { name: 'Pengguna', href: '/dashboard/users', icon: Users },
    ],
    ACCOUNTANT: [
      { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Tugas Saya', href: '/dashboard/jobs', icon: FileText },
      { name: 'Upload Laporan', href: '/dashboard/upload', icon: Upload },
    ],
    CLIENT: [
      { name: 'Beranda', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Beli Layanan', href: '/dashboard/order', icon: ShoppingCart },
      { name: 'Riwayat Pesanan', href: '/dashboard/jobs', icon: FileText },
    ]
  };

  const roleMenus = menus[user?.role as keyof typeof menus] || [];

  return (
    <aside className="w-72 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col border-r border-slate-800 shadow-xl z-50 hidden md:flex">
      {/* Logo Area */}
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <PieChart className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Mitra<span className="text-indigo-400">Akuntan</span></h1>
            <p className="text-xs text-slate-400">Financial Dashboard</p>
          </div>
        </div>
      </div>

      {/* User Profile Mini */}
      <div className="px-6 mb-6">
        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Login Sebagai</p>
          <p className="font-medium truncate">{user?.fullName}</p>
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full mt-1 inline-block border border-indigo-500/30">
            {user?.role}
          </span>
        </div>
      </div>

      {/* Menu Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {roleMenus.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20 translate-x-1' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'} />
                <span className="font-medium text-sm">{item.name}</span>
              </div>
              {isActive && <ChevronRight size={16} className="opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-6 border-t border-slate-800">
        <button 
          onClick={() => { localStorage.removeItem('user'); router.push('/login'); }} 
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-800 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all text-sm font-medium border border-transparent hover:border-red-500/20"
        >
          <LogOut size={18} /> 
          <span>Keluar Sesi</span>
        </button>
      </div>
    </aside>
  );
}