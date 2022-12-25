import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";
export class UpdateStatusUsersDto {
	@ApiProperty()
	readonly userId: number;

	@ApiProperty()
	@IsBoolean()
	readonly status: boolean;
}
