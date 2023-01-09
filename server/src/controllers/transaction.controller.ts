import { Controller } from "@nestjs/common";
import { TransactionService } from "../providers/transaction.service";

@Controller("transaction")
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}
}
