'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Clock, XCircle, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function PaymentsPage() {
    const [payments, setPayments] = useState<any[]>([]);
    const [filtered, setFiltered] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    // Fetch all payments (includes order, client, service)
    const fetchPayments = async () => {
        try {
            const res = await axios.get('http://localhost:3001/payments');
            setPayments(res.data);
        } catch (err) {
            console.error('Error fetching payments:', err);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    // Apply search & status filter
    useEffect(() => {
        let data = payments;
        if (statusFilter !== 'ALL') {
            data = data.filter(p => p.status === statusFilter);
        }
        if (search) {
            const term = search.toLowerCase();
            data = data.filter(p =>
            (p.order?.client?.fullName?.toLowerCase().includes(term) ||
                p.order?.client?.email?.toLowerCase().includes(term) ||
                p.paymentMethod?.toLowerCase().includes(term))
            );
        }
        setFiltered(data);
    }, [payments, search, statusFilter]);

    const handleVerify = async (id: string) => {
        if (!confirm('Verifikasi pembayaran ini?')) return;
        try {
            await axios.put(`http://localhost:3001/payments/${id}`, {
                status: 'PAID',
                paidAt: new Date().toISOString()
            });
            fetchPayments();
            alert('Pembayaran berhasil diverifikasi');
        } catch (err) {
            console.error('Error verifying payment:', err);
            alert('Gagal memverifikasi pembayaran');
        }
    };

    const statusBadge = (status: string) => {
        const colors = {
            PAID: 'bg-emerald-100 text-emerald-700',
            UNPAID: 'bg-yellow-100 text-yellow-700',
            FAILED: 'bg-red-100 text-red-700',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
                        Pembayaran
                    </h1>
                    <div className="flex gap-4 items-center">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Cari client, email, metode..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <option value="ALL">Semua Status</option>
                            <option value="PAID">Sudah Bayar</option>
                            <option value="UNPAID">Belum Bayar</option>
                            <option value="FAILED">Gagal</option>
                        </select>
                    </div>
                </motion.div>

                {/* Table */}
                <motion.div
                    className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-lg overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <table className="w-full table-auto">
                        <thead className="bg-white/20">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-200 uppercase">Order</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-200 uppercase">Client</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-200 uppercase">Metode</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-200 uppercase">Jumlah</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-200 uppercase">Bukti</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-200 uppercase">Status</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-200 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {filtered.map(p => (
                                <tr key={p.id} className="hover:bg-white/20 transition-colors">
                                    <td className="px-4 py-2 text-sm text-white">{p.order?.service?.name || '—'}</td>
                                    <td className="px-4 py-2 text-sm text-white">
                                        {p.order?.client?.fullName || '-'}<br />
                                        <span className="text-xs text-gray-300">{p.order?.client?.email}</span>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-white">{p.paymentMethod}</td>
                                    <td className="px-4 py-2 text-sm text-white">{p.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                                    <td className="px-4 py-2 text-sm text-white">
                                        {p.proofUrl ? (
                                            <a href={p.proofUrl} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-100 underline">
                                                Lihat
                                            </a>
                                        ) : '-'}
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusBadge(p.status)}`}> {p.status} </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        {p.status === 'UNPAID' && (
                                            <button
                                                onClick={() => handleVerify(p.id)}
                                                className="flex items-center gap-1 px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full text-xs transition-colors"
                                            >
                                                <CheckCircle size={14} /> Verifikasi
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-gray-300">
                                        Tidak ada data pembayaran.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </motion.div>

                {/* Back to Dashboard Link */}
                <div className="mt-6 text-center">
                    <Link href="/dashboard" className="text-white underline hover:text-gray-200">
                        ← Kembali ke Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
