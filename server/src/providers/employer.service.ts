import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./../models/dtos/create-users.dto";
import { GetUserByEmailDto } from "./../models/dtos/get-user-by-email.dto";
import { UpdateStatusUsersDto } from "./../models/dtos/update-users-status.dto";
import { GetUsersPaginationDto } from "./../models/dtos/get-users-pagination.dto";
import { EmployerRepository } from "./../models/repositories/employer.repository";
import { Employees } from "./../models/tables/employees";

@Injectable()
export class EmployerService {
	logger: Logger;
	constructor(private employerRepository: EmployerRepository) {
		this.logger = new Logger(EmployerService.name);
	}

	async getUserDetail(
		getUserByEmailDto: GetUserByEmailDto
	): Promise<Employees> {
		try {
			const userResponseObject = await this.employerRepository.getUserByEmail(
				getUserByEmailDto
			);
			if (this.employerRepository.hasId(userResponseObject) === false)
				throw new NotFoundException();

			return userResponseObject;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async getEmployerWithPagination(
		getEmployerWithPagination: GetUsersPaginationDto
	) {
		try {
			const users = await this.employerRepository.getEmployerWithPagination(
				getEmployerWithPagination
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

	async createEmployer(createEmployerDto: CreateUserDto): Promise<Employees> {
		try {
			const isCheckUserExist = await this.employerRepository.findOne({
				relations: {
					sender: true,
					receiver: true,
				},
				where: {
					email: createEmployerDto.email,
				},
			});

			if (this.employerRepository.hasId(isCheckUserExist) === true)
				return isCheckUserExist;

			const Employer = await this.employerRepository.createEmployer(
				createEmployerDto
			);
			return Employer;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async updateStatusEmployer(
		updateStatusEmployersDto: UpdateStatusUsersDto
	): Promise<Employees> {
		try {
			const Employer = await this.employerRepository.updateStatusEmployer(
				updateStatusEmployersDto
			);

			return Employer;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}
}
