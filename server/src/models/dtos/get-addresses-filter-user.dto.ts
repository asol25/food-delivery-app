import { ApiProperty } from "@nestjs/swagger";

export class GetAddressesFilterUser {
	@ApiProperty()
	userId: number;
}
