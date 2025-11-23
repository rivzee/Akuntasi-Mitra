'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'AKUNTAN' | 'KLIEN';
  avatar?: string;
}

interface SidebarProps {
  user: User;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const menuItems = {
  ADMIN: [
    { label: 'Dashboard', href: '/dashboard', icon: 'Dashboard' },
    { label: 'Kelola Layanan', href: '/dashboard/layanan', icon: 'Services' },
    { label: 'Kelola Akun', href: '/dashboard/users', icon: 'Users' },
    { label: 'Laporan Aktivitas', href: '/dashboard/logs', icon: 'Logs' },
    { label: 'Pengaturan', href: '/dashboard/settings', icon: 'Settings' },
  ],
  AKUNTAN: [
    { label: 'Dashboard', href: '/dashboard', icon: 'Dashboard' },
    { label: 'Pemesanan Jasa', href: '/dashboard/pesanan', icon: 'Orders' },
    { label: 'Unggah Hasil', href: '/dashboard/upload', icon: 'Upload' },
  ],
  KLIEN: [
    { label: 'Dashboard', href: '/dashboard', icon: 'Dashboard' },
    { label: 'Daftar Layanan', href: '/dashboard/layanan', icon: 'Services' },
    { label: 'Ajukan Permintaan', href: '/dashboard/ajukan', icon: 'Request' },
    { label: 'Dokumen Saya', href: '/dashboard/dokumen', icon: 'Documents' },
    { label: 'Pembayaran', href: '/dashboard/pembayaran', icon: 'Payment' },
  ],
};

const IconDashboard = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const IconServices = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h-4m-6 0H5" /></svg>;
const IconUsers = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H9a4 4 0 01-4-4V9a4 4 0 014-4h6a4 4 0 014 4v8a4 4 0 01-4 4z" /></svg>;
const IconLogs = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const IconOrders = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
const IconUpload = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>;
const IconRequest = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>;
const IconDocuments = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2m-6 0h6" /></svg>;
const IconPayment = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconSettings = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

export default function Sidebar({ user, isDarkMode, toggleDarkMode }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const items = menuItems[user.role];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        collapsed ? '-translate-x-full md:translate-x-0 md:w-20' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className={`font-bold text-xl text-gray-800 dark:text-white ${collapsed ? 'md:hidden' : ''}`}>
          Akuntansi Mitra
        </h1>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 md:block hidden"
        >
          Menu
        </button>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            {user.name.charAt(0)}
          </div>
          <div className={`${collapsed ? 'md:hidden' : ''}`}>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === item.href
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            } ${collapsed ? 'md:justify-center' : ''}`}
          >
            {item.icon === 'Dashboard' && <IconDashboard />}
            {item.icon === 'Services' && <IconServices />}
            {item.icon === 'Users' && <IconUsers />}
            {item.icon === 'Logs' && <IconLogs />}
            {item.icon === 'Orders' && <IconOrders />}
            {item.icon === 'Upload' && <IconUpload />}
            {item.icon === 'Request' && <IconRequest />}
            {item.icon === 'Documents' && <IconDocuments />}
            {item.icon === 'Payment' && <IconPayment />}
            {item.icon === 'Settings' && <IconSettings />}
            <span className={`${collapsed ? 'md:hidden' : ''}`}>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Dark Mode Toggle & Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${collapsed ? 'md:mx-auto' : ''}`}
            title="Toggle Dark Mode"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>

          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
            className="p-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}