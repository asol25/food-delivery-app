export * as ProductsType from "./products";

export interface ICreateOrderProductDto {
	key_user_id: number;
	key_product_id: number;
	key_cost?: number;
	key_quantity?: number;
}

export interface IDeleteByIdDto {
	key_id: number | string;
}

export interface IGetOrderProducts {
	key_user_id: number;
}

export interface IPayment {
	amount: number;
	bankCode: string | null;
	language: string | null;
	orderInfo: string;
	redirectUri: string;
	address_one: string | null;
	address_two: string | null;
	phone_one: string | null;
	phone_two: string | null;
}
