import { UpdateStatusUsersDto } from "./../dtos/update-users-status.dto";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { PaginatedResult } from "../dtos/paginated-result.dto";
import { CreateUserDto } from "./../dtos/create-users.dto";
import { GetUsersPaginationDto } from "./../dtos/get-users-pagination.dto";
import { Users } from "./../tables/users";
import { ReceiverRepository } from "./receiver.repository";
import { SenderRepository } from "./sender.repository";
import { MessagesType } from "../enums";
import { Sender } from "../tables/message_sender";
import { Receiver } from "../tables/message_receiver";
import { Orders } from "../tables/orders";

@Injectable()
export class UsersRepository extends Repository<Users> {
	constructor(
		private dataSource: DataSource,
		private receiver: ReceiverRepository,
		private sender: SenderRepository
	) {
		super(Users, dataSource.createEntityManager());
	}

	async getUsersWithPagination(
		getUsersPaginationDto: GetUsersPaginationDto
	): Promise<PaginatedResult<Users>> {
		const { page, limit } = getUsersPaginationDto;
		const query = this.createQueryBuilder("user");

		const totalCount = await query.getCount();
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

	async createUser(createUserDto: CreateUserDto) {
		const { name, email, phone, addressesId, picture } = createUserDto;

		const user = new Users();
		const order = new Orders();
		user.name = name;
		user.email = email;
		user.phone = phone;
		user.picture = picture;
		user.addressesId = addressesId;
		user.sender = (await this.sender.createEntity(MessagesType.EMPLOYEE)) as unknown as Sender;
		user.receiver = (await this.receiver.createEntity(
			MessagesType.EMPLOYEE
		)) as unknown as Receiver;
		try {
			await user.save();
			order.userId = user.id;
			await order.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}

		return user;
	}

	async updateStatusUser(updateStatusUsersDto: UpdateStatusUsersDto) {
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
}
