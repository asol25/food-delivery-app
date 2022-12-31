import { ApiProperty } from "@nestjs/swagger";

export class CreateFavoriteProductDto {
	@ApiProperty()
	readonly product: number;

	@ApiProperty()
	readonly user: number;
}
