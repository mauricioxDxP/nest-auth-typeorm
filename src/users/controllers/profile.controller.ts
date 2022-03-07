import { Controller, Get, Inject, Req } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PayloadToken } from 'src/auth/models/token.model';
import { Request } from 'express';
import { OrdersService } from '../services/orders.service';
import { Role } from 'src/auth/models/rol.model';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';

@Controller('profile')
export class ProfileController {
  constructor(
    private orderService: OrdersService,
  ) {}

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.orderService.ordersByCustomer(user.sub);
  }




}
