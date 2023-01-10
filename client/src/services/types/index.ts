import { IProducts } from "./products";

export interface ICreateOrderProductDto {
	key_user_id: number;
	key_product_id: number;
}

export interface IUpdateOrderProductDto {
	key_shopping_id: number;
	key_product_quantity: number;
}

export interface IGetOrderProducts {
	key_user_id: number;
}

interface IProductWithICreateOrder {
	key_product_id: number;
	key_product_quantity: number;
}

export interface ICreateOrder {
	key_user_id: number;
	products: IProductWithICreateOrder[];
	bankCode: string;
	total_amount: number;
	status: boolean;
	schedule_timer: string;
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
	time_picker: string | null;
}
