import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { Categories } from "../tables/categories";

export class CreateProductDto {
	@ApiProperty()
	@IsNotEmpty()
	readonly title: string;

	@ApiProperty()
	@IsNotEmpty()
	readonly desc: string;

	@ApiProperty()
	@IsNotEmpty()
	readonly thumbnail: string;

	@ApiProperty()
	@IsNotEmpty()
	readonly cost: number;

	@ApiProperty()
	@IsNotEmpty()
	@Min(5)
	@Max(100)
	readonly sale: number;

	@ApiProperty()
	@IsNumber()
	readonly category: number;
}
