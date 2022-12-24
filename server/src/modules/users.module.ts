import { Users } from "./../models/tables/users";
import { UsersRepository } from "./../models/repositories/users.repository";
import { UsersController } from "./../controllers/users.controller";
import { UsersService } from "./../providers/users.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forFeature([Users])],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository],
	exports: [UsersService],
})
export class UsersModule {}
