import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
	@ApiProperty()
	readonly name: string;

	@ApiProperty()
	@IsEmail()
	readonly email: string;

	@ApiProperty()
	readonly phone: string;

	@ApiProperty({ nullable: true })
	readonly picture: string;

	@ApiProperty()
	@IsNotEmpty()
	readonly addressesId!: number;
}
