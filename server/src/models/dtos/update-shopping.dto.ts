import { ApiProperty } from "@nestjs/swagger";
import { Min } from "class-validator";

export class UpdateShoppingCartDto {
	@ApiProperty()
	readonly key_shopping_id: number;

	@ApiProperty()
	@Min(1)
	readonly key_product_quantity: number;
}
