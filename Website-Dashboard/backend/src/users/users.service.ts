import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Pastikan path import benar
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) { }

  // Fungsi Register (Create User)
  async create(data: { fullName: string; email: string; password: string; phone?: string; role?: 'KLIEN' | 'ADMIN' | 'AKUNTAN' }) {
    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('Email sudah terdaftar. Silakan gunakan email lain atau login.');
    }

    const newUser = await this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password, // Kita pakai password polos dulu biar gampang
        phone: data.phone, // Tambahkan phone
        role: (data.role || 'KLIEN') as any,
      },
    });

    // Kirim email selamat datang
    try {
      await this.emailService.sendWelcomeEmail(newUser.email, newUser.fullName);
      console.log(`✅ Email selamat datang terkirim ke ${newUser.email}`);
    } catch (emailError) {
      console.error('⚠️ Gagal mengirim email, tapi registrasi tetap berhasil:', emailError);
      // Tidak throw error, biar registrasi tetap sukses meski email gagal
    }

    return newUser;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, data: { fullName?: string; email?: string; role?: string; phone?: string; password?: string }) {
    return this.prisma.user.update({
      where: { id },
      data: data as any,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
