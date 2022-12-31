import axios from "axios";

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
