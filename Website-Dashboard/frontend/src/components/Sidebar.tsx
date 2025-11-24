'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Users,
  Briefcase,
  ShoppingCart,
  FileText,
  LogOut,
  Menu,
  X,
  Clock
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  user: any;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function Sidebar({ user, isDarkMode, toggleDarkMode, isCollapsed, setIsCollapsed }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const menuItems = {
    ADMIN: [
      { icon: Home, label: 'Beranda', href: '/dashboard/admin' },
      { icon: FileText, label: 'Manajemen Pesanan', href: '/dashboard/admin/orders' },
      { icon: Users, label: 'Kelola Akun', href: '/dashboard/users' },
      { icon: Briefcase, label: 'Kelola Layanan', href: '/dashboard/services' },
      { icon: Clock, label: 'Riwayat Aktivitas', href: '/dashboard/activity' },
    ],
    AKUNTAN: [
      { icon: Home, label: 'Beranda', href: '/dashboard/akuntan' },
      { icon: Briefcase, label: 'Daftar Pekerjaan', href: '/dashboard/akuntan/jobs' },
    ],
    KLIEN: [
      { icon: Home, label: 'Beranda', href: '/dashboard/klien' },
      { icon: Briefcase, label: 'Layanan', href: '/dashboard/order' },
      { icon: ShoppingCart, label: 'Pesanan Saya', href: '/dashboard/my-orders' },
    ],
  };

  let role = user.role ? user.role.toUpperCase() : '';
  if (role === 'ACCOUNTANT') role = 'AKUNTAN';
  if (role === 'CLIENT') role = 'KLIEN';

  const currentMenuItems = menuItems[role as keyof typeof menuItems] || [];

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-gray-900/90 backdrop-blur-md text-white rounded-xl shadow-lg border border-white/10"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? '80px' : '288px',
          x: isOpen || (typeof window !== 'undefined' && window.innerWidth >= 768) ? 0 : -300
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 top-0 h-screen bg-[#0B1120] border-r border-white/5 text-white shadow-2xl z-40 flex flex-col ${isOpen ? 'block' : 'hidden md:flex'
          }`}
      >
        {/* Ambient Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[20%] w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]" />
          <div className="absolute top-[40%] -right-[20%] w-80 h-80 bg-purple-500/10 rounded-full blur-[80px]" />
          <div className="absolute -bottom-[20%] left-[20%] w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px]" />
        </div>

        {/* Header */}
        <div className="relative p-6 z-10">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-8`}>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3"
                >
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <img
                      src="/logo-risabur.png"
                      alt="RISA BUR Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-white tracking-tight">
                      RISA BUR
                    </h1>
                    <p className="text-[10px] text-gray-400 font-medium tracking-wider">Kantor Jasa Akuntan</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-2 rounded-lg transition-all duration-300 ${isCollapsed
                ? 'bg-white/5 text-white hover:bg-white/10'
                : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar relative z-10">
          {currentMenuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="block"
              >
                <div
                  className={`relative flex items-center ${isCollapsed ? 'justify-center' : ''} gap-3 px-3 py-3 rounded-xl transition-all duration-300 group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  title={isCollapsed ? item.label : ''}
                >
                  {/* Active Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {/* Icon */}
                  <div className={`relative z-10 p-2 rounded-lg transition-all duration-300 ${isActive
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20'
                    : 'bg-white/5 group-hover:bg-white/10'}`}>
                    <Icon size={18} />
                  </div>

                  {/* Label */}
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="relative z-10 font-medium text-sm whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Hover Indicator */}
                  {!isActive && !isCollapsed && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-white/5 relative z-10">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-center gap-2'} 
              group relative overflow-hidden rounded-xl p-3 transition-all duration-300
              ${isCollapsed ? 'bg-red-500/10 hover:bg-red-500/20' : 'hover:bg-red-500/10'}`}
            title={isCollapsed ? 'Keluar' : ''}
          >
            {!isCollapsed && (
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/0 to-red-600/0 group-hover:from-red-600/10 group-hover:via-red-600/5 group-hover:to-transparent transition-all duration-500" />
            )}

            <LogOut size={20} className={`${isCollapsed ? 'text-red-400' : 'text-gray-400 group-hover:text-red-400'} transition-colors`} />

            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium text-sm text-gray-400 group-hover:text-red-400 transition-colors"
                >
                  Keluar
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}