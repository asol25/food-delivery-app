import { ApiProperty } from "@nestjs/swagger";

export class MessageDto {
	@ApiProperty()
	readonly from: string;

	@ApiProperty()
	readonly to: string;

	@ApiProperty()
	readonly sender: string;

	@ApiProperty()
	readonly receiver: string;

	@ApiProperty({ nullable: true })
	readonly message!: string;
}
