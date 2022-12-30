import { ApiProperty } from "@nestjs/swagger";

export class GetMessageDto {
	@ApiProperty()
	readonly to: string;

	@ApiProperty()
	readonly senderSelf: string;

	@ApiProperty()
	readonly senderOther: string;

	@ApiProperty()
	readonly receiverSelf: string;

	@ApiProperty()
	readonly receiverOther: string;
}
