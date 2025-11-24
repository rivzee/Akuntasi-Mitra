import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async login(body: { email: string; password: string }) {
    console.log('--- MULAI CEK LOGIN ---');
    console.log('1. Data dari Frontend:', body);

    // Cari user
    const user = await this.prisma.user.findFirst({
      where: { email: body.email },
    });

    console.log('2. Hasil Pencarian di DB:', user);

    if (!user) {
      console.log('❌ KESIMPULAN: User tidak ditemukan di database!');
      throw new UnauthorizedException('Email tidak terdaftar');
    }

    if (user.password !== body.password) {
      console.log(
        `❌ PASSWORD SALAH! (Di DB: "${user.password}", Input: "${body.password}")`,
      );
      throw new UnauthorizedException('Password salah');
    }

    console.log('✅ LOGIN SUKSES!');
    const { password, ...result } = user;
    return result;
  }
}
