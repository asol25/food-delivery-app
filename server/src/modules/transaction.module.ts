import { Module } from "@nestjs/common";
import { TransactionService } from "../providers/transaction.service";
import { TransactionController } from "../controllers/transaction.controller";

@Module({
	controllers: [TransactionController],
	providers: [TransactionService],
})
export class TransactionModule {}
