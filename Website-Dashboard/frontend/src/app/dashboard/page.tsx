'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion'; // Tambah animasi

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'AKUNTAN' | 'KLIEN';
}

export default function DashboardHome() {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  // === DASHBOARD ADMIN ===
  if (user.role === 'ADMIN') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Sidebar user={user} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="md:ml-72 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard Admin
            </h1>

            {/* Stat Cards with Animation */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              }}
            >
              {[
                { label: 'Total Klien', value: '1,248', color: 'blue', trend: '+12%' },
                { label: 'Total Pesanan', value: '892', color: 'purple', trend: '+8%' },
                { label: 'Pendapatan Bulan Ini', value: 'Rp 248.5 Jt', color: 'green', trend: '+19%' },
                { label: 'Akun Aktif', value: '98%', color: 'orange', trend: 'Sehat' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-${stat.color}-200 dark:border-${stat.color}-800 hover:shadow-xl transition-all duration-300`}
                  variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                >
                  <p className={`text-sm font-medium text-${stat.color}-700 dark:text-${stat.color}-300`}>{stat.label}</p>
                  <p className={`text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mt-2`}>{stat.value}</p>
                  <p className={`text-sm font-semibold text-${stat.color}-500 mt-1`}>{stat.trend}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-700 p-8 rounded-2xl text-white shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Selamat Datang, {user.name}!</h2>
              <p className="text-lg opacity-90">
                Kelola semua aspek sistem dengan kuasa penuh. Cek menu di sisi kiri untuk akses cepat!
              </p>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  // === DASHBOARD AKUNTAN ===
  if (user.role === 'AKUNTAN') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Sidebar user={user} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="md:ml-72 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Dashboard Akuntan
            </h1>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              }}
            >
              {[
                { label: 'Menunggu Proses', value: '24', color: 'yellow' },
                { label: 'Sedang Dikerjakan', value: '18', color: 'blue' },
                { label: 'Selesai Bulan Ini', value: '156', color: 'green' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`bg-${stat.color}-50 dark:bg-${stat.color}-900/20 p-6 rounded-2xl border border-${stat.color}-200 dark:border-${stat.color}-800 hover:shadow-xl transition-all duration-300`}
                  variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                >
                  <p className={`text-${stat.color}-800 dark:text-${stat.color}-300 font-medium`}>{stat.label}</p>
                  <p className={`text-4xl font-bold text-${stat.color}-700 dark:text-${stat.color}-400 mt-2`}>{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-yellow-600 to-orange-700 p-8 rounded-2xl text-white shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Halo, {user.name}!</h2>
              <p className="text-lg opacity-90">
                Ada <span className="font-bold">24 pesanan baru</span> menunggu. Segera cek "Pemesanan Jasa"!
              </p>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  // === DASHBOARD KLIEN ===
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar user={user} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="md:ml-72 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Klien
          </h1>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {[
              { label: 'Pesanan Aktif', value: '5', color: 'blue' },
              { label: 'Menunggu Pembayaran', value: '2', color: 'orange' },
              { label: 'Selesai', value: '48', color: 'green' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`bg-${stat.color}-50 dark:bg-${stat.color}-900/20 p-6 rounded-2xl border border-${stat.color}-200 dark:border-${stat.color}-800 hover:shadow-xl transition-all duration-300`}
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              >
                <p className={`text-${stat.color}-800 dark:text-${stat.color}-300 font-medium`}>{stat.label}</p>
                <p className={`text-4xl font-bold text-${stat.color}-700 dark:text-${stat.color}-400 mt-2`}>{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-700 p-8 rounded-2xl text-white shadow-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Selamat Datang, {user.name}!</h2>
            <p className="text-lg opacity-90">
              Temukan layanan akuntansi terbaik atau ajukan permintaan baru.
            </p>
            <motion.button
              className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ajukan Layanan Baru
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}