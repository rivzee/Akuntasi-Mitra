import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Pastikan path import benar

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Fungsi Register (Create User)
  async create(data: any) {
    return this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password, // Kita pakai password polos dulu biar gampang
        role: data.role || 'CLIENT',
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}