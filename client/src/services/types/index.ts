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
