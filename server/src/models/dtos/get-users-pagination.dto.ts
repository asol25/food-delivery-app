/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class GetUsersPaginationDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	readonly page: number = 1;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	@Max(100)
	readonly limit: number = 30;
}
