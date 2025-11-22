import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // Klien Membuat Order
  async create(createOrderDto: any) {
    // Ambil harga layanan dulu
    const service = await this.prisma.servicePackage.findUnique({
      where: { id: createOrderDto.serviceId }
    });

    if (!service) throw new Error('Layanan tidak ditemukan');

    return this.prisma.order.create({
      data: {
        clientId: createOrderDto.clientId,
        serviceId: createOrderDto.serviceId,
        totalAmount: service.price,
        status: 'PENDING_PAYMENT',
        notes: createOrderDto.notes,
      },
    });
  }

  // Admin/Akuntan Melihat Semua Order
  async findAll() {
    return this.prisma.order.findMany({
      include: {
        client: { select: { fullName: true, email: true } },
        service: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Klien Melihat Order Sendiri
  async findMyOrders(clientId: string) {
    return this.prisma.order.findMany({
      where: { clientId: clientId },
      include: { service: true },
      orderBy: { createdAt: 'desc' }
    });
  }
}