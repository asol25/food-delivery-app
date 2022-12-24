import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class CreateUserDto {
	@ApiProperty()
	readonly name: string;

	@ApiProperty()
	@IsEmail()
	readonly email: string;

	@ApiProperty()
	@IsInt()
	@Min(8)
	@Max(11)
	readonly phone: number;

	@ApiProperty()
	@IsNotEmpty()
	readonly addressesId!: number;
}
