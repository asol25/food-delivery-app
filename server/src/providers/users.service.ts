import { UpdateStatusUsersDto } from "./../models/dtos/update-users-status.dto";
import { Users } from "./../models/tables/users";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./../models/dtos/create-users.dto";
import { GetUsersPaginationDto } from "./../models/dtos/get-users-pagination.dto";
import { UsersRepository } from "./../models/repositories/users.repository";

@Injectable()
export class UsersService {
	logger: Logger;
	constructor(
		@InjectRepository(UsersRepository)
		private usersRepository: UsersRepository
	) {
		this.logger = new Logger(UsersService.name);
	}

	async getUserDetail(param): Promise<Users> {
		const { email } = param;
		try {
			const userResponseObject = await this.usersRepository.findOne({
				relations: {
					sender: true,
					receiver: true,
				},
				where: {
					email: email,
				},
			});
			if (this.usersRepository.hasId(userResponseObject) === false)
				throw new NotFoundException();

			return userResponseObject;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}
	async getUsersWithPagination(getUsersPaginationDto: GetUsersPaginationDto) {
		try {
			const users = await this.usersRepository.getUsersWithPagination(
				getUsersPaginationDto
			);

			if (!Array.isArray(users.data) || users.data.length == 0) {
				throw new NotFoundException("No data");
			}

			return users;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async createUser(createUserDto: CreateUserDto): Promise<Users> {
		try {
			const isCheckUserExist = await this.usersRepository.findOne({
				relations: {
					sender: true,
					receiver: true,
				},
				where: {
					email: createUserDto.email,
				},
			});

			if (this.usersRepository.hasId(isCheckUserExist) === true)
				return isCheckUserExist;

			const user = await this.usersRepository.createUser(createUserDto);
			return user;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async updateStatusUser(
		updateStatusUsersDto: UpdateStatusUsersDto
	): Promise<Users> {
		try {
			const user = await this.usersRepository.updateStatusUser(
				updateStatusUsersDto
			);

			return user;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}
}
