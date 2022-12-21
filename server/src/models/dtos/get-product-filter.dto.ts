import { ApiProperty } from "@nestjs/swagger";

export class GetProductsFilterDto {
	@ApiProperty()
	search: string;
}
