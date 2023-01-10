import { OrdersStatusRepository } from "./order-status.repository";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CreateOrderDetailDto } from "../dtos/create-order-details.dto";
import { Orders } from "./../tables/orders";
import { SchedulesRepository } from "./schedules.repository";
import { TransactionRepository } from "./transaction.repository";

@Injectable()
export class OrdersRepository extends Repository<Orders> {
	logger: Logger;
	constructor(
		private dataSource: DataSource,
		private transactionRepository: TransactionRepository,
		private schedulesRepository: SchedulesRepository,
		private ordersStatusRepository: OrdersStatusRepository
	) {
		super(Orders, dataSource.createEntityManager());
		this.logger = new Logger(OrdersRepository.name);
	}

	async createRecord(createOrderDetailDto: CreateOrderDetailDto): Promise<Orders> {
		const { id } = await this.transactionRepository.createRecord(createOrderDetailDto);

		const orderRecord = new Orders();
		orderRecord.userId = createOrderDetailDto.key_user_id;
		orderRecord.transactionId = id;
		if (createOrderDetailDto.schedule_timer) {
			const { id } = await this.schedulesRepository.createRecord({
				key_user_id: createOrderDetailDto.key_user_id,
				schedule_timer: createOrderDetailDto.schedule_timer,
			});
			orderRecord.scheduleId = id;
		}
		try {
			await orderRecord.save();
			await this.ordersStatusRepository.createRecord({
				key_order_id: orderRecord.id,
				key_status_id: undefined,
			});
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
		return orderRecord;
	}
}
