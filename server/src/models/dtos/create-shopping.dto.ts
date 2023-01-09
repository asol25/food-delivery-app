import { ApiProperty } from "@nestjs/swagger";

export class CreateShoppingCartDto {
	@ApiProperty()
	readonly key_user_id: number;

	@ApiProperty()
	readonly key_product_id: number;
}
