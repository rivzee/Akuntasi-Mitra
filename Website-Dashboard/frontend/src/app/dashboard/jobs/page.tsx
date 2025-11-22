'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function JobsPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/orders').then(res => setOrders(res.data));
  }, []);

  const statusConfig = (status: string) => {
    switch(status) {
      case 'PAID': return { color: 'bg-blue-100 text-blue-700', icon: CheckCircle, label: 'Lunas' };
      case 'COMPLETED': return { color: 'bg-green-100 text-green-700', icon: CheckCircle, label: 'Selesai' };
      default: return { color: 'bg-yellow-100 text-yellow-700', icon: Clock, label: 'Menunggu' };
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Daftar Pesanan Aktif</h2>
        <button className="text-sm text-indigo-600 font-medium hover:underline">Lihat Semua</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-6 font-semibold">Info Klien</th>
              <th className="p-6 font-semibold">Layanan</th>
              <th className="p-6 font-semibold">Tagihan</th>
              <th className="p-6 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => {
              const status = statusConfig(order.status);
              return (
                <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-6">
                    <p className="font-bold text-gray-900">{order.client?.fullName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.client?.email}</p>
                  </td>
                  <td className="p-6 text-sm text-gray-600 font-medium">{order.service?.name}</td>
                  <td className="p-6 font-bold text-gray-900">Rp {Number(order.totalAmount).toLocaleString('id-ID')}</td>
                  <td className="p-6 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${status.color}`}>
                      <status.icon size={12} />
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}