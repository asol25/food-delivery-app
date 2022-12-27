import { CreateAddressesDto } from "../dtos/create-addresses.dto";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { GetAddressesFilterUser } from "../dtos/get-addresses-filter-user.dto";
import { Addresses } from "../tables/addresses";
import { UpdateAddressesDto } from "../dtos/update-addresses.dto";

@Injectable()
export class AddressesRepository extends Repository<Addresses> {
	constructor(private dataSource: DataSource) {
		super(Addresses, dataSource.createEntityManager());
	}
	async getAddressesByUserId(
		getAddressesFilterUser: GetAddressesFilterUser
	): Promise<Addresses> {
		const { userId } = getAddressesFilterUser;
		const address = await this.findOne({
			where: {
				users: {
					id: userId,
				},
			},
		});

		return address;
	}

	async createAddresses(createAddressesDto: CreateAddressesDto) {
		const { addresses_one, addresses_two } = createAddressesDto;

		const addresses = new Addresses();
		addresses.addresses_one = addresses_one;
		addresses.addresses_two = addresses_two;

		try {
			await addresses.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}

		return addresses;
	}

	async updateAddresses(updateAddressesDto: UpdateAddressesDto) {
		const { userId, addresses_one, addresses_two } = updateAddressesDto;

		const addresses = await this.findOne({
			where: {
				users: {
					id: userId,
				},
			},
		});

		addresses.addresses_one = addresses_one;
		addresses.addresses_two = addresses_two;

		try {
			await addresses.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}

		return addresses;
	}
}
