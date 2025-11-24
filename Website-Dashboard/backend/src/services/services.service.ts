import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) { }

  // Tambah Layanan Baru
  async create(createServiceDto: { name: string; description: string; price: number }) {
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

  // Update Layanan
  async update(id: string, updateServiceDto: { name?: string; description?: string; price?: number }) {
    return this.prisma.servicePackage.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  // Hapus Layanan
  async remove(id: string) {
    return this.prisma.servicePackage.delete({
      where: { id },
    });
  }
}
