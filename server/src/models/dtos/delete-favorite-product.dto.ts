import { ApiProperty } from "@nestjs/swagger";

export class DeleteFavoriteProductDto {
	@ApiProperty()
	readonly id: number;
}
