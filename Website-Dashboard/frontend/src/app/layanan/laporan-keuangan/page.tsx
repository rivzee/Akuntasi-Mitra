'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    FileText,
    Check,
    ArrowRight,
    Phone,
    Mail,
    Clock,
    Users,
    Award,
    TrendingUp
} from 'lucide-react';

export default function LaporanKeuanganPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px]"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition">
                        <ArrowRight size={20} className="rotate-180 mr-2" />
                        Kembali ke Beranda
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <FileText size={40} />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold">
                                    Jasa Penyusunan Laporan Keuangan
                                </h1>
                                <p className="text-xl text-blue-100 mt-2">
                                    Laporan keuangan akurat sesuai standar akuntansi
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Overview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Tentang Layanan Ini
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                Layanan penyusunan laporan keuangan profesional yang dirancang untuk membantu bisnis Anda dalam menyajikan informasi keuangan yang akurat, transparan, dan sesuai dengan standar akuntansi yang berlaku di Indonesia (SAK/PSAK).
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                Tim akuntan bersertifikat kami akan memastikan setiap detail transaksi tercatat dengan benar dan disajikan dalam format yang mudah dipahami oleh stakeholder Anda.
                            </p>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Yang Anda Dapatkan
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    'Laporan Laba Rugi (Income Statement)',
                                    'Neraca Keuangan (Balance Sheet)',
                                    'Laporan Arus Kas (Cash Flow Statement)',
                                    'Catatan Atas Laporan Keuangan',
                                    'Analisis Rasio Keuangan',
                                    'Konsultasi Interpretasi Laporan',
                                    'Review dan Revisi Unlimited',
                                    'Format Digital dan Cetak'
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <Check size={20} className="text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Process */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Proses Pengerjaan
                            </h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        step: '1',
                                        title: 'Konsultasi Awal',
                                        description: 'Diskusi kebutuhan dan pengumpulan data keuangan'
                                    },
                                    {
                                        step: '2',
                                        title: 'Analisis Data',
                                        description: 'Tim kami menganalisis dan memverifikasi data transaksi'
                                    },
                                    {
                                        step: '3',
                                        title: 'Penyusunan Laporan',
                                        description: 'Pembuatan laporan sesuai standar akuntansi'
                                    },
                                    {
                                        step: '4',
                                        title: 'Review & Finalisasi',
                                        description: 'Review bersama dan penyerahan laporan final'
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Pricing Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl sticky top-6"
                        >
                            <h3 className="text-2xl font-bold mb-2">Investasi</h3>
                            <div className="text-4xl font-bold mb-6">
                                Mulai dari<br />Rp 2.500.000
                            </div>
                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-2">
                                    <Clock size={18} />
                                    <span className="text-sm">Pengerjaan 5-7 hari kerja</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={18} />
                                    <span className="text-sm">Tim akuntan bersertifikat</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award size={18} />
                                    <span className="text-sm">Garansi akurasi 100%</span>
                                </div>
                            </div>
                            <button className="w-full px-6 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2">
                                Konsultasi Gratis
                                <ArrowRight size={20} />
                            </button>
                        </motion.div>

                        {/* Contact Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl"
                        >
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                Butuh Bantuan?
                            </h3>
                            <div className="space-y-3">
                                <a
                                    href="tel:+6281234567890"
                                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                >
                                    <Phone size={18} />
                                    <span>+62 812-3456-7890</span>
                                </a>
                                <a
                                    href="mailto:info@risabur.com"
                                    className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                                >
                                    <Mail size={18} />
                                    <span>info@risabur.com</span>
                                </a>
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl"
                        >
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                Statistik Layanan
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Kepuasan Klien</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">98%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: '98%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Akurasi</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">100%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full" style={{ width: '100%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">On-Time Delivery</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">95%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-orange-600 to-red-600 h-2 rounded-full" style={{ width: '95%' }} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-white space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Siap Memulai?
                        </h2>
                        <p className="text-xl text-blue-100">
                            Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/layanan"
                                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                            >
                                Lihat Layanan Lain
                            </Link>
                            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                                Hubungi Kami
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
