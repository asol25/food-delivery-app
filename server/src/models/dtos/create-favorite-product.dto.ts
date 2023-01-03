import { ApiProperty } from "@nestjs/swagger";

export class CreateFavoriteProductDto {
	@ApiProperty()
	readonly key_product_id: number;

	@ApiProperty()
	readonly key_user_id: number;
}
