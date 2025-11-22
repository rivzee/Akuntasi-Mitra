import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Sedang mengisi data...');

  // 1. ADMIN (Paksa Password jadi '123')
  const admin = await prisma.user.upsert({
    where: { email: 'admin@akuntan.com' },
    update: {
      password: '123', // <--- INI KUNCINYA: Reset password kalau user sudah ada
    },
    create: {
      email: 'admin@akuntan.com',
      fullName: 'Boss Admin',
      password: '123', // Password awal
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin Ready: admin@akuntan.com / 123');

  // 2. AKUNTAN (Paksa Password jadi '123')
  const accountant = await prisma.user.upsert({
    where: { email: 'staff@akuntan.com' },
    update: {
      password: '123',
    },
    create: {
      email: 'staff@akuntan.com',
      fullName: 'Staff Akuntan',
      password: '123',
      role: 'ACCOUNTANT',
    },
  });
  console.log('✅ Akuntan Ready: staff@akuntan.com / 123');

  // 3. LAYANAN (Cek dulu biar gak duplikat)
  const serviceCount = await prisma.servicePackage.count();
  if (serviceCount === 0) {
    await prisma.servicePackage.create({
      data: {
        name: 'Laporan Keuangan UMKM',
        description: 'Laporan Laba Rugi, Neraca, dan Arus Kas bulanan.',
        price: 500000,
      },
    });
    console.log('✅ Service Created');
  } else {
    console.log('Creating service skipped (already exists)');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });