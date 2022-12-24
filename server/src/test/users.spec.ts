import * as pathDataSourceConfig from "../../data-source";
import { DataSource } from "typeorm";
import { UsersController } from "../controllers/users.controller";
import { PaginatedResult } from "../models/dtos/paginated-result.dto";
import { UsersRepository } from "../models/repositories/users.repository";
import { Users } from "../models/tables/users";
import { UsersService } from "../providers/users.service";

describe("Users Testing", () => {
	let service: UsersService;
	let controller: UsersController;
	let repository: UsersRepository;
	let dataSource: DataSource;

	beforeEach(() => {
		dataSource = pathDataSourceConfig.default;
		repository = new UsersRepository(dataSource);
		service = new UsersService(repository);
		controller = new UsersController(service);
	});

	describe("get users with pagination", () => {
		it("should return an array of users", async () => {
			const result = {
				data: [
					{
						id: 1,
						name: "John Doe",
						email: "john@doe.com",
						phone: 84375954,
						addresses: null,
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				],
				pagination: {
					totalCount: 1,
					page: 1,
					limit: 30,
				},
			};

			jest
				.spyOn(service, "getUsersWithPagination")
				.mockImplementation(() =>
					Promise.resolve(result as PaginatedResult<Users>)
				);

			expect(
				await controller.getUsersWithPagination({
					page: 1,
					limit: 30,
				})
			).toBe(result);
		});
	});
});
