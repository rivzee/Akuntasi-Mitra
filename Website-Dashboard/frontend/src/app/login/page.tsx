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
    try {
      const res = await axios.post('http://localhost:3000/auth/login', form);
      localStorage.setItem('user', JSON.stringify(res.data));
      alert('Login Sukses!');
      router.push('/dashboard');
    } catch (err: any) {
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
          <input type="email" placeholder="Email" className="w-full p-3 border rounded" onChange={e => setForm({...form, email: e.target.value})} required />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded" onChange={e => setForm({...form, password: e.target.value})} required />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">{loading ? 'Loading...' : 'MASUK'}</button>
        </form>
        <p className="text-center mt-4 text-sm">Belum punya akun? <Link href="/register" className="text-blue-500">Daftar</Link></p>
      </div>
    </div>
  );
}