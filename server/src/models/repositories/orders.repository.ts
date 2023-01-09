import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Orders } from "./../tables/orders";
import { TransactionRepository } from "./transaction.repository";

@Injectable()
export class OrdersRepository extends Repository<Orders> {
	logger: Logger;
	constructor(
		private dataSource: DataSource,
		private transactionRepository: TransactionRepository
	) {
		super(Orders, dataSource.createEntityManager());
		this.logger = new Logger(OrdersRepository.name);
	}

	async createRecord(key_user_id: number): Promise<Orders> {
		this.logger.log("[Repository] - Create OrderRecord with key: userID = " + key_user_id);
		const { id } = await this.transactionRepository.createRecord({ key_user_id });
		const orderRecord = new Orders();
		orderRecord.userId = key_user_id;
		orderRecord.transactionId = id;
		try {
			await orderRecord.save();
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
		return orderRecord;
	}
}
