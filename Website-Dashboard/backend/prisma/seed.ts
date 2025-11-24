import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Sedang mengisi data...');

  // 1. ADMIN
  const admin = await prisma.user.upsert({
    where: { email: 'admin@akuntan.com' },
    update: {
      password: 'admin',
      role: 'ADMIN' as any,
    },
    create: {
      email: 'admin@akuntan.com',
      fullName: 'Boss Admin',
      password: 'admin',
      role: 'ADMIN' as any,
    },
  });
  console.log('✅ Admin Ready: admin@akuntan.com / admin');

  // 2. AKUNTAN
  const accountant = await prisma.user.upsert({
    where: { email: 'akuntan@akuntan.com' },
    update: {
      password: 'akuntan',
      role: 'AKUNTAN' as any,
    },
    create: {
      email: 'akuntan@akuntan.com',
      fullName: 'Staff Akuntan',
      password: 'akuntan',
      role: 'AKUNTAN' as any,
    },
  });
  console.log('✅ Akuntan Ready: akuntan@akuntan.com / akuntan');

  // 3. KLIEN
  const client = await prisma.user.upsert({
    where: { email: 'klien@akuntan.com' },
    update: {
      password: 'klien',
      role: 'KLIEN' as any,
    },
    create: {
      email: 'klien@akuntan.com',
      fullName: 'John Doe',
      password: 'klien',
      role: 'KLIEN' as any,
      phone: '081234567890',
    },
  });
  console.log('✅ Klien Ready: klien@akuntan.com / klien');

  // 4. LAYANAN
  const services = [
    {
      name: 'Jasa Penyusunan Laporan Keuangan',
      description: 'Penyusunan laporan keuangan komprehensif sesuai standar SAK yang berlaku untuk analisis performa bisnis.',
      price: 2500000,
    },
    {
      name: 'Jasa Pembukuan',
      description: 'Pencatatan transaksi harian yang rapi dan sistematis menggunakan software akuntansi modern.',
      price: 1500000,
    },
    {
      name: 'Jasa Pendampingan Penyusunan Laporan Keuangan',
      description: 'Program pelatihan intensif untuk meningkatkan kompetensi tim keuangan internal perusahaan Anda.',
      price: 3000000,
    },
    {
      name: 'Jasa Perpajakan',
      description: 'Solusi perpajakan lengkap mulai dari perhitungan, pelaporan, hingga perencanaan pajak strategis.',
      price: 2000000,
    },
    {
      name: 'Jasa Audit Internal',
      description: 'Evaluasi independen terhadap sistem pengendalian internal untuk meminimalisir risiko kebocoran.',
      price: 5000000,
    },
  ];

  for (const service of services) {
    const existing = await prisma.servicePackage.findFirst({
      where: { name: service.name },
    });

    if (existing) {
      await prisma.servicePackage.update({
        where: { id: existing.id },
        data: service,
      });
    } else {
      await prisma.servicePackage.create({
        data: service,
      });
    }
  }
  console.log('✅ Services Synced');

  console.log('\n🎉 Seeding completed!');
  console.log('\n📋 Demo Accounts:');
  console.log('   Admin    : admin@akuntan.com / admin');
  console.log('   Akuntan  : akuntan@akuntan.com / akuntan');
  console.log('   Klien    : klien@akuntan.com / klien');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });