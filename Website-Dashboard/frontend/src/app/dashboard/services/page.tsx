'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManageServices() {
  const [services, setServices] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', description: '', price: 0 });

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = () => {
    axios.get('http://localhost:3000/services').then(res => setServices(res.data));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/services', form);
    alert('Sukses!');
    fetchServices();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Kelola Layanan</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8 grid gap-4">
        <input type="text" placeholder="Nama Layanan" className="border p-2 rounded" onChange={e => setForm({...form, name: e.target.value})} required />
        <input type="text" placeholder="Deskripsi" className="border p-2 rounded" onChange={e => setForm({...form, description: e.target.value})} required />
        <input type="number" placeholder="Harga" className="border p-2 rounded" onChange={e => setForm({...form, price: Number(e.target.value)})} required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-fit">Simpan</button>
      </form>
      <div className="grid gap-4">
        {services.map(s => (
          <div key={s.id} className="bg-white p-4 rounded shadow border flex justify-between">
            <div><h3 className="font-bold">{s.name}</h3><p className="text-sm text-gray-500">{s.description}</p></div>
            <div className="font-bold text-green-600">Rp {Number(s.price).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}