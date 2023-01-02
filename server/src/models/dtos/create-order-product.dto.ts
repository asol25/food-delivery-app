import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderProductDto {
	@ApiProperty()
	readonly key_user_id: number;

	@ApiProperty()
	readonly key_product_id: number;

	@ApiProperty({ nullable: true })
	readonly key_quantity!: number;
}
