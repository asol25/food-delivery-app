import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UpdateAddressesDto } from "../models/dtos/update-addresses.dto";
import { CreateAddressesDto } from "../models/dtos/create-addresses.dto";
import { GetAddressesFilterUser } from "./../models/dtos/get-addresses-filter-user.dto";
import { AddressesService } from "./../providers/addresses.service";

@ApiTags("addresses")
@Controller("addresses")
export class AddressesController {
	constructor(private addressesService: AddressesService) {}

	@Get("userId/:userId")
	public async getAddressesByUserId(
		@Param() getAddressesFilterUser: GetAddressesFilterUser
	) {
		return await this.addressesService.getAddressesByUserId(
			getAddressesFilterUser
		);
	}

	@Post("create/addresses")
	public createAddresses(@Body() createAddressesDto: CreateAddressesDto) {
		return this.addressesService.createAddresses(createAddressesDto);
	}

	@Put("update/addresses")
	public updateAddresses(@Body() updateAddressesDto: UpdateAddressesDto) {
		return this.addressesService.updateAddresses(updateAddressesDto);
	}
}
