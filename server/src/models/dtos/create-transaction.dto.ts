export class CreateTransactionDto {
	readonly key_user_id: number;
	readonly bankCode: string;
	readonly total_amount: number;
	readonly status: boolean;
}
