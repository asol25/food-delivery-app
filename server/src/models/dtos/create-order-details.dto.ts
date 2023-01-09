import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, ValidateNested } from "class-validator";

class Products {
	@ApiProperty()
	readonly key_product_id: number;

	@ApiProperty()
	readonly key_product_quantity: number;
}

export class CreateOrderDetailDto {
	@ApiProperty()
	readonly key_user_id: number;

	@ApiProperty()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Products)
	readonly products: Products[];
}
