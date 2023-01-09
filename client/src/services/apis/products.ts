/* eslint-disable camelcase */
import axios from "axios";
import { ICreateOrderProductDto, IUpdateOrderProductDto } from "../types";

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

export const getOrderProduct = async (userId: number) => {
	const products = await axios.get(
		`${process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"}/shopping/${userId}`
	);
	return products;
};

export const createOrderProduct = async (data: ICreateOrderProductDto) => {
	const products = await axios.post(
		`${process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"}/shopping`,
		data
	);

	return products;
};

export const updateQuantityOrderProduct = async (data: IUpdateOrderProductDto) => {
	console.log(data);

	const products = await axios.patch(
		`${process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"}/shopping`,
		data
	);

	return products;
};

export const deleteOrderProductByOrderId = async (orderDetailsID: number) => {
	const products = await axios.delete(
		`${
			process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"
		}/shopping/${orderDetailsID}`
	);

	return products;
};
