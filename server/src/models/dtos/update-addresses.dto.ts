import { ApiProperty } from "@nestjs/swagger";
export class UpdateAddressesDto {
	@ApiProperty()
	readonly userId: number;

	@ApiProperty({ nullable: true })
	readonly addresses_one: string;

	@ApiProperty({ nullable: true })
	readonly addresses_two!: string;
}
