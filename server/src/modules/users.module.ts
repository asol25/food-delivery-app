import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./../controllers/users.controller";
import { ReceiverRepository } from "./../models/repositories/receiver.repository";
import { SenderRepository } from "./../models/repositories/sender.repository";
import { UsersRepository } from "./../models/repositories/users.repository";
import { Users } from "./../models/tables/users";
import { UsersService } from "./../providers/users.service";

@Module({
	imports: [TypeOrmModule.forFeature([Users])],
	controllers: [UsersController],
	providers: [
		UsersService,
		UsersRepository,
		SenderRepository,
		ReceiverRepository,
	],
	exports: [UsersService],
})
export class UsersModule {}
