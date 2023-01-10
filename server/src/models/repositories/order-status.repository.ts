import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CreateOrderStatusDto } from "../dtos/create-order-status.dto";
import { Order_Status } from "./../tables/order-status";
import { SchedulesRepository } from "./schedules.repository";
import { TransactionRepository } from "./transaction.repository";

@Injectable()
export class OrdersStatusRepository extends Repository<Order_Status> {
	logger: Logger;
	constructor(
		private dataSource: DataSource,
		private transactionRepository: TransactionRepository,
		private schedulesRepository: SchedulesRepository
	) {
		super(Order_Status, dataSource.createEntityManager());
		this.logger = new Logger(OrdersStatusRepository.name);
	}

	async createRecord(createOrderStatusDto: CreateOrderStatusDto): Promise<Order_Status> {
		const orderStatusRecord = new Order_Status();
		orderStatusRecord.orderId = createOrderStatusDto.key_order_id;
		if (createOrderStatusDto.key_status_id !== undefined) {
			orderStatusRecord.statusId = createOrderStatusDto.key_status_id;
		}
		try {
			await orderStatusRecord.save();
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
		return orderStatusRecord;
	}
}
