import { AddressesRepository } from "./../models/repositories/addresses.repository";
import { AddressesService } from "./../providers/addresses.service";
import { AddressesController } from "./../controllers/addresses.controller";
import { Addresses } from "./../models/tables/addresses";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

@Module({
	imports: [TypeOrmModule.forFeature([Addresses])],
	controllers: [AddressesController],
	providers: [AddressesService, AddressesRepository],
	exports: [AddressesService],
})
export class AddressesModule {}
