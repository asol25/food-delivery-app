import { CreateTransactionDto } from "./../dtos/create-transaction.dto";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Transaction } from "../tables/transaction";

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
	logger: Logger = new Logger(TransactionRepository.name);
	constructor(private dataSource: DataSource) {
		super(Transaction, dataSource.createEntityManager());
	}

	async createRecord(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
		const { key_user_id } = createTransactionDto;
		this.logger.log("[Repository] - Create Transaction with key: userId = " + key_user_id);
		const transaction = new Transaction();
		transaction.userId = key_user_id;
		try {
			await transaction.save();
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
		return transaction;
	}
}
