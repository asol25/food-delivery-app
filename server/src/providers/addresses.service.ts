import { Addresses } from "./../models/tables/addresses";
import { CreateAddressesDto } from "../models/dtos/create-addresses.dto";
import { GetAddressesFilterUser } from "./../models/dtos/get-addresses-filter-user.dto";
import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressesRepository } from "./../models/repositories/addresses.repository";
import { UpdateAddressesDto } from "../models/dtos/update-addresses.dto";

@Injectable()
export class AddressesService {
	logger: Logger;
	constructor(
		@InjectRepository(AddressesRepository)
		private addressesRepository: AddressesRepository
	) {
		this.logger = new Logger(AddressesService.name);
	}

	async getAddressesByUserId(
		getAddressesFilterUser: GetAddressesFilterUser
	): Promise<Addresses> {
		try {
			const addresses = await this.addressesRepository.getAddressesByUserId(
				getAddressesFilterUser
			);

			if (addresses === null || addresses === undefined)
				throw new NotFoundException("No data");
			return addresses;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async createAddresses(
		createAddressesDto: CreateAddressesDto
	): Promise<Addresses> {
		try {
			const user = await this.addressesRepository.findOne({
				where: {
					userId: createAddressesDto.userId,
				},
			});

			if (this.addressesRepository.hasId(user) === true)
				throw new BadRequestException("UserId invalid");
			const addresses = await this.addressesRepository.createAddresses(
				createAddressesDto
			);

			return addresses;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async updateAddresses(
		updateAddressesDto: UpdateAddressesDto
	): Promise<Addresses> {
		try {
			const user = await this.addressesRepository.findOne({
				where: {
					userId: updateAddressesDto.userId,
				},
			});

			if (this.addressesRepository.hasId(user) === false)
				throw new BadRequestException("UserId invalid");
			const addresses = await this.addressesRepository.updateAddresses(
				updateAddressesDto
			);

			return addresses;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}
}
