import { OrdersStatusRepository } from "./../models/repositories/order-status.repository";
import { SchedulesRepository } from "./../models/repositories/schedules.repository";
import { TransactionRepository } from "./../models/repositories/transaction.repository";
import { OrderDetailsRepository } from "./../models/repositories/order-details.repository";
import { OrderDetails } from "./../models/tables/order-details";
import { OrdersController } from "./../controllers/orders.controller";
import { OrdersRepository } from "./../models/repositories/orders.repository";
import { Orders } from "./../models/tables/orders";
import { OrdersService } from "./../providers/orders.service";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([Orders, OrderDetails])],
	controllers: [OrdersController],
	providers: [
		OrdersService,
		OrdersRepository,
		OrderDetailsRepository,
		TransactionRepository,
		SchedulesRepository,
		OrdersStatusRepository,
	],
})
export class OrdersModule {}
