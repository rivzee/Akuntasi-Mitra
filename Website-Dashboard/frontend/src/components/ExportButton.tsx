'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Table } from 'lucide-react';
import toast from 'react-hot-toast';

interface ExportButtonProps {
    data: any[];
    filename: string;
    title?: string;
}

export function ExportButton({ data, filename, title = 'Export Data' }: ExportButtonProps) {
    const [isExporting, setIsExporting] = useState(false);

    const exportToCSV = () => {
        if (data.length === 0) {
            toast.error('Tidak ada data untuk diexport');
            return;
        }

        setIsExporting(true);
        const loadingToast = toast.loading('Mengexport ke CSV...');

        try {
            const headers = Object.keys(data[0]);
            const csvContent = [
                headers.join(','),
                ...data.map(row =>
                    headers.map(header => {
                        const value = row[header];
                        return typeof value === 'string' && value.includes(',')
                            ? `"${value}"`
                            : value;
                    }).join(',')
                ),
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
            link.click();

            toast.success('Export berhasil!', { id: loadingToast });
        } catch (error) {
            toast.error('Gagal export data', { id: loadingToast });
        } finally {
            setIsExporting(false);
        }
    };

    const exportToJSON = () => {
        if (data.length === 0) {
            toast.error('Tidak ada data untuk diexport');
            return;
        }

        setIsExporting(true);
        const loadingToast = toast.loading('Mengexport ke JSON...');

        try {
            const jsonContent = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonContent], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${filename}_${new Date().toISOString().split('T')[0]}.json`;
            link.click();

            toast.success('Export berhasil!', { id: loadingToast });
        } catch (error) {
            toast.error('Gagal export data', { id: loadingToast });
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="relative group">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg"
                disabled={isExporting}
            >
                <Download size={20} />
                {title}
            </motion.button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button
                    onClick={exportToCSV}
                    disabled={isExporting}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left rounded-t-xl"
                >
                    <Table size={18} className="text-green-600" />
                    <span className="text-gray-900 dark:text-white font-medium">Export CSV</span>
                </button>
                <button
                    onClick={exportToJSON}
                    disabled={isExporting}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left rounded-b-xl"
                >
                    <FileText size={18} className="text-blue-600" />
                    <span className="text-gray-900 dark:text-white font-medium">Export JSON</span>
                </button>
            </div>
        </div>
    );
}
