import axios from "axios";
import { ICreateOrderProductDto, IDeleteByIdDto } from "../types";

export const getProducts = async (_page: number, _limit: number) => {
	const products = await axios.get(
		`${
			process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"
		}/products/pagination/${_page}/${_limit}`
	);

	return products;
};

export const getProductsByViews = async () => {
	const products = await axios.get(
		`${
			process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"
		}/products/order/views`
	);

	return products;
};

export const createOrderProduct = async (data: ICreateOrderProductDto) => {
	const products = await axios.post(
		`${
			process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"
		}/orders/create-order-products`,
		data
	);

	return products;
};

export const updateQuantityOrderProduct = async (
	data: ICreateOrderProductDto
) => {
	const products = await axios.put(
		`${
			process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"
		}/orders/update-quantity-order-products`,
		data
	);

	return products;
};

export const deleteOrderProductByOrderId = async (data: IDeleteByIdDto) => {
	const products = await axios.post(
		`${
			process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"
		}/orders/delete-order-products/${data.key_id}`
	);

	return products;
};
