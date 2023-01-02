import { GetUserByEmailDto } from "src/models/dtos/get-user-by-email.dto";
import {
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { PaginatedResult } from "../dtos/paginated-result.dto";
import { MessagesType } from "../enums";
import { Sender } from "../tables/message_sender";
import { CreateUserDto } from "./../dtos/create-users.dto";
import { GetUsersPaginationDto } from "./../dtos/get-users-pagination.dto";
import { UpdateStatusUsersDto } from "./../dtos/update-users-status.dto";
import { Employees } from "./../tables/employees";
import { Receiver } from "./../tables/message_receiver";
import { ReceiverRepository } from "./receiver.repository";
import { SenderRepository } from "./sender.repository";

@Injectable()
export class EmployerRepository extends Repository<Employees> {
	logger: Logger;

	constructor(
		private dataSource: DataSource,
		private receiver: ReceiverRepository,
		private sender: SenderRepository
	) {
		super(Employees, dataSource.createEntityManager());
		this.logger = new Logger(EmployerRepository.name);
	}

	async getEmployerWithPagination(
		getEmployerWithPagination: GetUsersPaginationDto
	): Promise<PaginatedResult<Employees>> {
		const { page, limit } = getEmployerWithPagination;
		const query = this.createQueryBuilder("user");

		const totalCount = await query.getCount();
		query.leftJoinAndSelect("user.sender", "sender");
		query.leftJoinAndSelect("user.receiver", "receiver");
		query.offset((page - 1) * limit);
		query.limit(limit);

		const users = await query.getMany();

		return {
			data: users,
			pagination: {
				totalCount,
				page,
				limit,
			},
		};
	}

	async createEmployer(createUserDto: CreateUserDto) {
		const { name, email, phone, picture } = createUserDto;

		const user = new Employees();
		user.name = name;
		user.email = email;
		user.phone = phone;
		user.picture = picture;
		user.sender = (await this.sender.createEntity(
			MessagesType.EMPLOYEE
		)) as unknown as Sender;
		user.receiver = (await this.receiver.createEntity(
			MessagesType.EMPLOYEE
		)) as unknown as Receiver;

		try {
			await user.save();
		} catch (error) {
			this.logger.log(error);
			throw new InternalServerErrorException();
		}

		return user;
	}

	async updateStatusEmployer(updateStatusUsersDto: UpdateStatusUsersDto) {
		const { userId, status } = updateStatusUsersDto;

		const user = await this.findOne({
			where: {
				id: userId,
			},
		});

		if (this.hasId(user) === false) throw new NotFoundException();

		user.status = status;
		try {
			await user.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}

		return user;
	}

	async getUserByEmail(getUserByEmailDto: GetUserByEmailDto) {
		const { email } = getUserByEmailDto;
		const user = await this.findOne({
			relations: {
				sender: true,
				receiver: true,
			},
			where: {
				email: email,
			},
		});
		return user;
	}
}
