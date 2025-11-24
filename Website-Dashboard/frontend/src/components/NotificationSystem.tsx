'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell,
    X,
    Check,
    Info,
    AlertCircle,
    CheckCircle,
    XCircle
} from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface Notification {
    id: string;
    title: string;
    message: string;
    type: ToastType;
    read: boolean;
    timestamp: Date;
}

let toastId = 0;

// Global toast function
export const showToast = (message: string, type: ToastType = 'info', duration = 3000) => {
    const event = new CustomEvent('show-toast', {
        detail: { id: `toast-${toastId++}`, message, type, duration }
    });
    window.dispatchEvent(event);
};

export default function NotificationSystem() {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            title: 'Pesanan Baru',
            message: 'Anda memiliki pesanan baru dari PT. ABC',
            type: 'info',
            read: false,
            timestamp: new Date()
        },
        {
            id: '2',
            title: 'Pembayaran Berhasil',
            message: 'Pembayaran untuk invoice #INV-001 telah dikonfirmasi',
            type: 'success',
            read: false,
            timestamp: new Date(Date.now() - 3600000)
        }
    ]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleShowToast = (event: any) => {
            const toast = event.detail;
            setToasts(prev => [...prev, toast]);

            if (toast.duration) {
                setTimeout(() => {
                    setToasts(prev => prev.filter(t => t.id !== toast.id));
                }, toast.duration);
            }
        };

        window.addEventListener('show-toast', handleShowToast);
        return () => window.removeEventListener('show-toast', handleShowToast);
    }, []);

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const getIcon = (type: ToastType) => {
        switch (type) {
            case 'success':
                return <CheckCircle size={20} />;
            case 'error':
                return <XCircle size={20} />;
            case 'warning':
                return <AlertCircle size={20} />;
            default:
                return <Info size={20} />;
        }
    };

    const getColors = (type: ToastType) => {
        switch (type) {
            case 'success':
                return 'bg-emerald-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            case 'warning':
                return 'bg-orange-500 text-white';
            default:
                return 'bg-blue-500 text-white';
        }
    };

    return (
        <>
            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 100, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.8 }}
                            className="pointer-events-auto"
                        >
                            <div
                                className={`${getColors(toast.type)} px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md`}
                            >
                                {getIcon(toast.type)}
                                <p className="flex-1 font-medium">{toast.message}</p>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="hover:bg-white/20 p-1 rounded-lg transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Notification Bell Button */}
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                            {unreadCount}
                        </span>
                    )}
                </button>

                {/* Notification Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop */}
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setIsOpen(false)}
                            />

                            {/* Dropdown */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                            >
                                {/* Header */}
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                    <h3 className="font-bold text-gray-900 dark:text-white">
                                        Notifications ({unreadCount})
                                    </h3>
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Mark all as read
                                        </button>
                                    )}
                                </div>

                                {/* Notifications List */}
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">
                                            No notifications
                                        </div>
                                    ) : (
                                        notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={`p-2 rounded-lg ${getColors(notification.type)}`}>
                                                        {getIcon(notification.type)}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <h4 className="font-semibold text-gray-900 dark:text-white">
                                                                {notification.title}
                                                            </h4>
                                                            {!notification.read && (
                                                                <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-2">
                                                            {new Date(notification.timestamp).toLocaleString()}
                                                        </p>

                                                        <div className="flex gap-2 mt-3">
                                                            {!notification.read && (
                                                                <button
                                                                    onClick={() => markAsRead(notification.id)}
                                                                    className="text-xs text-blue-600 hover:underline"
                                                                >
                                                                    Mark as read
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => deleteNotification(notification.id)}
                                                                className="text-xs text-red-600 hover:underline"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
                                    <button className="text-sm text-blue-600 hover:underline font-medium">
                                        View all notifications
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
