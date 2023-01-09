import { Injectable } from "@nestjs/common";
import { CreateTransactionDto } from "../models/dtos/create-transaction.dto";

@Injectable()
export class TransactionService {
	create(createTransactionDto: CreateTransactionDto) {
		return "This action adds a new transaction";
	}
}
