import { SenderRepository } from "./../models/repositories/sender.repository";
import { ReceiverRepository } from "./../models/repositories/receiver.repository";
import { EmployerRepository } from "./../models/repositories/employer.repository";
import { EmployerService } from "./../providers/employer.service";
import { EmployerController } from "./../controllers/employer.controller";
import { Employees } from "./../models/tables/employees";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
	imports: [TypeOrmModule.forFeature([Employees])],
	controllers: [EmployerController],
	providers: [
		EmployerService,
		EmployerRepository,
		ReceiverRepository,
		SenderRepository,
	],
	exports: [EmployerService],
})
export class EmployerModule {}
