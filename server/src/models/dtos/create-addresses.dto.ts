import { ApiProperty } from "@nestjs/swagger";
export class CreateAddressesDto {
	@ApiProperty()
	readonly addresses_one: string;

	@ApiProperty({ nullable: true })
	readonly addresses_two!: string;
}
