import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Pastikan path import benar

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  // Fungsi Register (Create User)
  async create(data: { fullName: string; email: string; password: string; role?: 'KLIEN' | 'ADMIN' | 'AKUNTAN' }) {
    return this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password, // Kita pakai password polos dulu biar gampang
        role: (data.role || 'KLIEN') as any,
      },
    });
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
