import { OrdersController } from "./../controllers/orders.controller";
import { OrdersRepository } from "./../models/repositories/orders.repository";
import { Orders } from "./../models/tables/orders";
import { OrdersService } from "./../providers/orders.service";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([Orders])],
	controllers: [OrdersController],
	providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
