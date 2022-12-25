import { UpdateStatusUsersDto } from "./../dtos/update-users-status.dto";
import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { PaginatedResult } from "../dtos/paginated-result.dto";
import { CreateUserDto } from "./../dtos/create-users.dto";
import { GetUsersPaginationDto } from "./../dtos/get-users-pagination.dto";
import { Users } from "./../tables/users";

@Injectable()
export class UsersRepository extends Repository<Users> {
	constructor(private dataSource: DataSource) {
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
		const { name, email, phone, addressesId } = createUserDto;

		const user = new Users();
		user.name = name;
		user.email = email;
		user.phone = phone;
		user.addressesId = addressesId;

		try {
			await user.save();
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
