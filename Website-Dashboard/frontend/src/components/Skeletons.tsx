import { motion } from 'framer-motion';

export function CardSkeleton() {
    return (
        <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <div className="animate-pulse space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                    </div>
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-2xl"></div>
                </div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
            </div>
        </div>
    );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <div className="animate-pulse space-y-4">
                {/* Header */}
                <div className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
                    ))}
                </div>
                {/* Rows */}
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                        {[1, 2, 3, 4].map((j) => (
                            <div key={j} className="h-10 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="animate-pulse space-y-2">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-48"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-64"></div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <CardSkeleton key={i} />
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                    <div className="animate-pulse space-y-4">
                        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                        <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                </div>
                <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                    <div className="animate-pulse space-y-4">
                        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                        <div className="flex justify-center">
                            <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ListSkeleton({ items = 3 }: { items?: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: items }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
                >
                    <div className="animate-pulse flex gap-4">
                        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-2xl flex-shrink-0"></div>
                        <div className="flex-1 space-y-3">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                            <div className="flex gap-2">
                                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
