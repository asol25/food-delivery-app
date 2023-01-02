import { ApiProperty } from "@nestjs/swagger";

export class DeleteByIdDto {
	@ApiProperty()
	readonly key_id: number | string;
}
