'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // DEBUG: Cek apa yang dikirim
    console.log('Mengirim data:', form); 

    try {
      const res = await axios.post('http://localhost:3000/auth/login', form);
      
      // Simpan token/user
      localStorage.setItem('user', JSON.stringify(res.data));
      
      alert('Login Sukses Boss!');
      router.push('/dashboard');

    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Login Gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">LOGIN</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email} // Pastikan value nyambung ke state
              placeholder="admin@akuntan.com"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              onChange={(e) => setForm({ ...form, email: e.target.value })} // <--- INI YANG TADI RUSAK
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Loading...' : 'MASUK'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Belum punya akun? <Link href="/register" className="text-blue-500 hover:underline">Daftar</Link>
        </p>
      </div>
    </div>
  );
}