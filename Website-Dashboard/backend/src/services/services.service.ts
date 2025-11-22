import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  // Tambah Layanan Baru
  async create(createServiceDto: any) {
    return this.prisma.servicePackage.create({
      data: {
        name: createServiceDto.name,
        description: createServiceDto.description,
        price: createServiceDto.price, // Pastikan dikirim sebagai angka/decimal
      },
    });
  }

  // Lihat Semua Layanan
  async findAll() {
    return this.prisma.servicePackage.findMany();
  }
  
  // Nanti bisa tambah Update/Delete disini
}