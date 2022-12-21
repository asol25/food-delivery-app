import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCategoriesDto {
	@ApiProperty()
	@IsNotEmpty()
	readonly name: string;

	@ApiProperty()
	@IsNotEmpty()
	readonly thumbnail: string;
}
