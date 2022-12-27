import { Employees } from "./../models/tables/employees";
import { EmployerRepository } from "./../models/repositories/employer.repository";
import { GetUsersPaginationDto } from "./../models/dtos/get-users-pagination.dto";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "src/models/dtos/create-users.dto";
import { UpdateStatusUsersDto } from "src/models/dtos/update-users-status.dto";
import { Users } from "src/models/tables/users";

@Injectable()
export class EmployerService {
	logger: Logger;
	constructor(private employerRepository: EmployerRepository) {
		this.logger = new Logger(EmployerService.name);
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
