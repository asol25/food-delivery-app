import { ApiProperty } from "@nestjs/swagger";
import { isInt, IsNumber } from "class-validator";
export class UpdateProductsDto {
	@ApiProperty()
	readonly productId: number;

	@ApiProperty({ nullable: true })
	readonly title!: string;

	@ApiProperty({ nullable: true })
	readonly desc!: string;

	@ApiProperty({ nullable: true })
	readonly thumbnail!: string;

	@ApiProperty({ nullable: true })
	readonly cost!: number;

	@ApiProperty({ nullable: true })
	readonly sale!: number;

	@ApiProperty({ nullable: true })
	@IsNumber()
	readonly category!: number;
}
