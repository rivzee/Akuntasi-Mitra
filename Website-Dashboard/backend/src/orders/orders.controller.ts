import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: any) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('my/:clientId') // Endpoint khusus: /orders/my/ID_CLIENT
  findMyOrders(@Param('clientId') clientId: string) {
    return this.ordersService.findMyOrders(clientId);
  }
}