'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/auth/login', form);
      localStorage.setItem('user', JSON.stringify(res.data));
      await new Promise(r => setTimeout(r, 500));
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Centered login card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-2xl mb-4 mx-auto">
              <img src="/logo-risabur.png" alt="RISA BUR Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-3xl font-bold text-white">Masuk</h2>
            <p className="text-white/70 mt-1">Dashboard Akuntansi Anda</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                <input
                  type="email"
                  value={form.email}
                  placeholder="admin@akuntan.com"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <label className="block text-sm font-medium text-white/90 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                <input
                  type="password"
                  value={form.password}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-purple-600 py-3 rounded-xl font-bold text-lg hover:bg-white/90 disabled:bg-white/50 shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={20} className="group-hover:translate-x-1 transition" />
                  Masuk
                </>
              )}
            </motion.button>
          </form>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-6 text-white/80">
            Belum punya akun?{' '}
            <Link href="/register" className="text-white font-semibold hover:underline">
              Daftar Sekarang
            </Link>
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-xs text-white/70 text-center mb-2">Demo Accounts:</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <p className="text-white/90 font-semibold">Admin</p>
                <p className="text-white/60">admin@akuntan.com</p>
              </div>
              <div className="text-center">
                <p className="text-white/90 font-semibold">Akuntan</p>
                <p className="text-white/60">akuntan@akuntan.com</p>
              </div>
              <div className="text-center">
                <p className="text-white/90 font-semibold">Klien</p>
                <p className="text-white/60">klien@akuntan.com</p>
              </div>
            </div>
            <p className="text-xs text-white/60 text-center mt-2">Password: admin / akuntan / klien</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}