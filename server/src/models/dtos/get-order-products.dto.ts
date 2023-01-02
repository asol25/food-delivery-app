import { ApiProperty } from "@nestjs/swagger";

export class GetOrderProductsDto {
	@ApiProperty()
	readonly key_user_id: number;
}
