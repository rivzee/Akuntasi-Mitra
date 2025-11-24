'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Package, DollarSign, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { CardSkeleton } from '@/components/Skeletons';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function ManageServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form, setForm] = useState({ name: '', description: '', price: 0 });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3001/services');
      setServices(res.data);
    } catch (error) {
      toast.error('Gagal memuat layanan');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading(editingService ? 'Mengupdate layanan...' : 'Menambah layanan...');

    try {
      if (editingService) {
        await axios.put(`http://localhost:3001/services/${editingService.id}`, form);
        toast.success('Layanan berhasil diupdate!', { id: loadingToast });
      } else {
        await axios.post('http://localhost:3001/services', form);
        toast.success('Layanan berhasil ditambahkan!', { id: loadingToast });
      }

      fetchServices();
      closeModal();
    } catch (error) {
      toast.error('Gagal menyimpan layanan', { id: loadingToast });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus layanan ini?')) return;

    const loadingToast = toast.loading('Menghapus layanan...');
    try {
      await axios.delete(`http://localhost:3001/services/${id}`);
      toast.success('Layanan berhasil dihapus!', { id: loadingToast });
      fetchServices();
    } catch (error) {
      toast.error('Gagal menghapus layanan', { id: loadingToast });
    }
  };

  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setForm({ name: service.name, description: service.description, price: service.price });
    } else {
      setEditingService(null);
      setForm({ name: '', description: '', price: 0 });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    setForm({ name: '', description: '', price: 0 });
  };

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Kelola Layanan</h1>
          <p className="text-gray-600 dark:text-gray-400">Tambah, edit, dan kelola paket layanan</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg"
        >
          <Plus size={20} />
          Tambah Layanan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Layanan</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{services.length}</p>
            </div>
            <div className="p-3 rounded-2xl bg-blue-500/10">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari layanan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </motion.div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-12 text-center border border-gray-200/50 dark:border-gray-700/50">
          <Package className="mx-auto mb-4 text-gray-300 dark:text-gray-600" size={64} />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {searchQuery ? 'Tidak ada hasil' : 'Belum Ada Layanan'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {searchQuery ? 'Coba kata kunci lain' : 'Mulai dengan menambahkan layanan baru'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg"
            >
              <Plus size={20} />
              Tambah Layanan
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="backdrop-blur-xl bg-white/60 dark:bg-gray-800/40 rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <Package size={24} />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(service)}
                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition text-blue-600 dark:text-blue-400"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition text-red-600 dark:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  Rp {Number(service.price).toLocaleString('id-ID')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={closeModal}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-3xl p-8 max-w-md w-full border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {editingService ? 'Edit Layanan' : 'Tambah Layanan'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nama Layanan
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="Contoh: Laporan Keuangan Bulanan"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Deskripsi
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                      rows={3}
                      placeholder="Deskripsi layanan..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Harga (Rp)
                    </label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="500000"
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg"
                    >
                      {editingService ? 'Update' : 'Simpan'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}