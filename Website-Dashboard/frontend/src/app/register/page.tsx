'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Kirim data ke Backend (Port 3000)
      await axios.post('http://localhost:3000/users', {
        ...form,
        role: 'CLIENT' // Default role jadi Client
      });
      
      alert('Registrasi Berhasil! Silakan Login.');
      router.push('/login'); 
    } catch (err: any) {
      console.error(err);
      alert('Gagal Mendaftar: ' + (err.response?.data?.message || 'Server Error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-2">Buat Akun Baru</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">Gabung untuk mulai kelola keuangan</p>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Nama Anda"
              onChange={(e) => setForm({...form, fullName: e.target.value})}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="email@contoh.com"
              onChange={(e) => setForm({...form, email: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Minimal 6 karakter"
              onChange={(e) => setForm({...form, password: e.target.value})}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400 shadow-lg shadow-blue-200"
          >
            {loading ? 'Sedang Mendaftar...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Sudah punya akun? <Link href="/login" className="text-blue-600 font-semibold hover:underline">Login disini</Link>
        </p>
      </div>
    </div>
  );
}