import { DataSource } from "typeorm";
import * as pathDataSourceConfig from "../../data-source";
import { AddressesController } from "./../controllers/addresses.controller";
import { AddressesRepository } from "./../models/repositories/addresses.repository";
import { Addresses } from "./../models/tables/addresses";
import { AddressesService } from "./../providers/addresses.service";

describe("Addresses Testing", () => {
	let service: AddressesService;
	let controller: AddressesController;
	let repository: AddressesRepository;
	let dataSource: DataSource;

	beforeEach(() => {
		dataSource = pathDataSourceConfig.default;
		repository = new AddressesRepository(dataSource);
		service = new AddressesService(repository);
		controller = new AddressesController(service);
	});

	describe("get addresses of user", () => {
		it("should return an addresses of user", async () => {
			const result = {
				id: 1,
				addresses_one: "HCM CITY",
				addresses_two: "HCM CITY",
			};

			jest
				.spyOn(service, "getAddressesByUserId")
				.mockImplementation(() => Promise.resolve(result as Addresses));

			expect(await controller.getAddressesByUserId({ userId: 1 })).toBe(result);
		});
	});

	describe("create addresses of user", () => {
		it("should return an addresses of user", async () => {
			const result = {
				addresses_one: "HCM CITY",
				addresses_two: "HCM CITY",
			};

			jest
				.spyOn(service, "createAddresses")
				.mockImplementation(() => Promise.resolve(result as Addresses));

			expect(
				await controller.createAddresses({
					userId: 1,
					addresses_one: "HCM CITY",
					addresses_two: "HCM CITY",
				})
			).toBe(result);
		});
	});

	describe("update addresses of user", () => {
		it("should return an addresses of user", async () => {
			const result = {
				id: 1,
				addresses_one: "HCM CITY",
				addresses_two: "HCM CITY",
			};

			jest
				.spyOn(service, "updateAddresses")
				.mockImplementation(() => Promise.resolve(result as Addresses));

			expect(
				await controller.updateAddresses({
					userId: 1,
					addresses_one: "HCM CITY",
					addresses_two: "HCM CITY",
				})
			).toBe(result);
		});
	});
});
