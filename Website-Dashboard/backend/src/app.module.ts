import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module'; // <--- Pastikan mengarah ke src/prisma
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule,
    ServicesModule,
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}