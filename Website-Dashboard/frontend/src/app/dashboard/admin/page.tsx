'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Package,
    FileText,
    Activity,
    TrendingUp,
    Clock,
    Plus,
    UserPlus,
    Settings,
    Bell,
    Calendar,
    DollarSign,
    CheckCircle,
    XCircle,
    AlertCircle,
    Star,
    ArrowRight
} from 'lucide-react';
import axios from 'axios';
import { EnhancedLineChart, EnhancedBarChart, EnhancedPieChart } from '@/components/EnhancedCharts';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalServices: 0,
        totalOrders: 0,
        completedOrders: 0,
        pendingOrders: 0,
        revenue: 0,
    });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [recentUsers, setRecentUsers] = useState<any[]>([]);
    const [topServices, setTopServices] = useState<any[]>([]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [users, services, orders] = await Promise.all([
                axios.get('http://localhost:3001/users'),
                axios.get('http://localhost:3001/services'),
                axios.get('http://localhost:3001/orders'),
            ]);

            setRecentOrders(orders.data.slice(0, 5));
            setRecentUsers(users.data.slice(-5).reverse());

            // Calculate top services
            const serviceCounts: any = {};
            orders.data.forEach((order: any) => {
                const serviceName = order.service?.name || 'Unknown';
                serviceCounts[serviceName] = (serviceCounts[serviceName] || 0) + 1;
            });
            const topServicesArray = Object.entries(serviceCounts)
                .map(([name, count]) => ({ name, count }))
                .sort((a: any, b: any) => b.count - a.count)
                .slice(0, 5);
            setTopServices(topServicesArray);

            // Calculate revenue (mock data)
            const totalRevenue = orders.data
                .filter((o: any) => o.status === 'COMPLETED')
                .reduce((sum: number, o: any) => sum + (o.service?.price || 0), 0);

            setStats({
                totalUsers: users.data.length,
                totalServices: services.data.length,
                totalOrders: orders.data.length,
                completedOrders: orders.data.filter((o: any) => o.status === 'COMPLETED').length,
                pendingOrders: orders.data.filter((o: any) => o.status === 'PENDING_PAYMENT').length,
                revenue: totalRevenue,
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const statCards = [
        { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'purple', gradient: 'from-purple-500 to-pink-500', trend: '+12%' },
        { label: 'Total Services', value: stats.totalServices, icon: Package, color: 'blue', gradient: 'from-blue-500 to-cyan-500', trend: '+5%' },
        { label: 'Total Orders', value: stats.totalOrders, icon: FileText, color: 'green', gradient: 'from-emerald-500 to-teal-500', trend: '+23%' },
        { label: 'Revenue', value: `Rp ${stats.revenue.toLocaleString()}`, icon: DollarSign, color: 'orange', gradient: 'from-orange-500 to-red-500', trend: '+18%' },
    ];

    const quickActions = [
        { label: 'Add User', icon: UserPlus, href: '/dashboard/users', color: 'blue' },
        { label: 'Add Service', icon: Plus, href: '/dashboard/services', color: 'purple' },
        { label: 'View Orders', icon: FileText, href: '/dashboard/admin/orders', color: 'green' },
        { label: 'Settings', icon: Settings, href: '/dashboard/settings', color: 'gray' },
    ];

    const chartData = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 },
        { name: 'May', value: 500 },
        { name: 'Jun', value: 900 },
    ];

    const orderStatusData = [
        { name: 'Completed', value: stats.completedOrders },
        { name: 'Pending', value: stats.pendingOrders },
        { name: 'In Progress', value: stats.totalOrders - stats.completedOrders - stats.pendingOrders },
    ];

    return (
        <div className="space-y-8">
            {/* Header with Quick Actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-lg border border-gray-200 dark:border-gray-700">
                        <img src="/logo-risabur.png" alt="RISA BUR Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">RISA BUR - Kantor Jasa Akuntan</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, idx) => {
                        const Icon = action.icon;
                        return (
                            <Link key={idx} href={action.href}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center gap-2 px-4 py-2 bg-${action.color}-500 hover:bg-${action.color}-600 text-white rounded-xl font-semibold shadow-lg transition-colors`}
                                >
                                    <Icon size={18} />
                                    <span className="hidden sm:inline">{action.label}</span>
                                </motion.button>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="relative group overflow-hidden backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500`} />

                            <div className="flex items-center justify-between mb-4 relative z-10">
                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm font-semibold bg-emerald-500/10 px-2 py-1 rounded-lg">
                                    <TrendingUp size={16} />
                                    {stat.trend}
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 relative z-10">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white relative z-10">{stat.value}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
                >
                    <EnhancedLineChart data={chartData} title="Revenue Trends" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
                >
                    <EnhancedPieChart data={orderStatusData} title="Order Status" />
                </motion.div>
            </div>

            {/* Second Row - Recent Activity & Top Services */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <div className="w-1 h-6 bg-purple-500 rounded-full" />
                            Recent Orders
                        </h3>
                        <Link href="/dashboard/admin/orders" className="text-sm text-purple-600 hover:underline flex items-center gap-1">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentOrders.length > 0 ? (
                            recentOrders.map((order: any) => (
                                <div key={order.id} className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-700/70 transition-colors">
                                    <div className={`p-2 rounded-lg ${order.status === 'COMPLETED' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                                        order.status === 'PENDING_PAYMENT' ? 'bg-orange-100 dark:bg-orange-900/30' :
                                            'bg-blue-100 dark:bg-blue-900/30'
                                        }`}>
                                        {order.status === 'COMPLETED' ? <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> :
                                            order.status === 'PENDING_PAYMENT' ? <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" /> :
                                                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                                            {order.service?.name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            by {order.client?.fullName} • {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${order.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                        order.status === 'PENDING_PAYMENT' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' :
                                            'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                        }`}>
                                        {order.status.replace('_', ' ')}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-8">No recent orders.</p>
                        )}
                    </div>
                </motion.div>

                {/* Recent Users */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <div className="w-1 h-6 bg-blue-500 rounded-full" />
                            Recent Users
                        </h3>
                        <Link href="/dashboard/users" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentUsers.length > 0 ? (
                            recentUsers.map((user: any) => (
                                <div key={user.id} className="flex items-center gap-4 p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-700/70 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                                        {user.fullName.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                                            {user.fullName}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' :
                                        user.role === 'ACCOUNTANT' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                                            'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                        }`}>
                                        {user.role}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-8">No recent users.</p>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Top Services */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                        Top Services
                    </h3>
                    <Link href="/dashboard/services" className="text-sm text-emerald-600 hover:underline flex items-center gap-1">
                        View All <ArrowRight size={14} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {topServices.length > 0 ? (
                        topServices.map((service: any, idx) => (
                            <div key={idx} className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-700/70 transition-colors">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{service.count}</span>
                                </div>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate">
                                    {service.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">orders</p>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 py-8">No services data.</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
