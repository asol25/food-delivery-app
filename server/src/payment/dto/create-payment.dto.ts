import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
	@ApiProperty()
	amount: number;

	@ApiProperty()
	bankCode: string;

	@ApiProperty()
	language: string;

	@ApiProperty()
	txnRef: string;

	@ApiProperty()
	orderInfo: string;

	@ApiProperty()
	redirectUri: string;

	@ApiProperty()
	address_one: string;

	@ApiProperty({ nullable: true })
	address_two: string;

	@ApiProperty()
	phone_one: string;

	@ApiProperty({ nullable: true })
	phone_two: string;
}
