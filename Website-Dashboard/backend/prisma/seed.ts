import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seeding (PLAIN TEXT PASSWORD)...');

  // 1. Clean Database
  try {
    await prisma.activityLog.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.document.deleteMany();
    await prisma.order.deleteMany();
    await prisma.servicePackage.deleteMany();
    await prisma.user.deleteMany();
    console.log('🧹 Database cleaned');
  } catch (error) {
    console.log('⚠️ Warning cleaning db:', error);
  }

  // 2. Create Users (PASSWORD PLAIN TEXT "123456")
  // Karena auth.service.ts membandingkan string langsung (user.password !== body.password)
  const password = '123456';

  // Admin
  const admin = await prisma.user.create({
    data: {
      fullName: 'Admin Utama',
      email: 'admin@akuntan.com',
      password: password, // Plain text
      role: 'ADMIN',
      phone: '081234567890',
      address: 'Kantor Pusat Jakarta',
    },
  });

  // Akuntan
  const accountant = await prisma.user.create({
    data: {
      fullName: 'Budi Akuntan',
      email: 'akuntan@akuntan.com',
      password: password, // Plain text
      role: 'AKUNTAN',
      phone: '081234567891',
      address: 'Cabang Bandung',
    },
  });

  // Klien
  const client = await prisma.user.create({
    data: {
      fullName: 'PT Maju Jaya',
      email: 'klien@akuntan.com',
      password: password, // Plain text
      role: 'KLIEN',
      phone: '081234567892',
      address: 'Kawasan Industri Cikarang',
    },
  });

  console.log('👥 Users created with password "123456"');

  // 3. Create Services
  const services = [
    {
      name: 'Pembukuan Bulanan UMKM',
      description: 'Layanan pencatatan transaksi dan laporan keuangan bulanan untuk UMKM.',
      price: 500000,
      duration: '1 Bulan',
      category: 'Pembukuan',
      isActive: true,
    },
    {
      name: 'Laporan SPT Tahunan Badan',
      description: 'Penyusunan dan pelaporan SPT Tahunan PPh Badan.',
      price: 2500000,
      duration: '1 Tahun',
      category: 'Pajak',
      isActive: true,
    },
    {
      name: 'Audit Laporan Keuangan',
      description: 'Jasa audit independen untuk laporan keuangan perusahaan.',
      price: 5000000,
      duration: '3 Bulan',
      category: 'Audit',
      isActive: true,
    },
    {
      name: 'Konsultasi Pajak',
      description: 'Sesi konsultasi permasalahan perpajakan.',
      price: 1000000,
      duration: '1 Jam',
      category: 'Konsultasi',
      isActive: true,
    },
  ];

  for (const service of services) {
    await prisma.servicePackage.create({ data: service });
  }

  console.log('📦 Services created');

  // 4. Create Dummy Order
  await prisma.order.create({
    data: {
      status: 'PENDING_PAYMENT',
      totalAmount: 500000,
      notes: 'Mohon dibantu untuk pembukuan bulan Januari',
      clientId: client.id,
      serviceId: (await prisma.servicePackage.findFirst())?.id || '',
    },
  });

  console.log('📝 Dummy order created');
  console.log('✅ Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });