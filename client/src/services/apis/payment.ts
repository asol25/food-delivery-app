import axios from "axios";

export const createTransaction = async (data: {
	amount: number;
	bankCode: string | null;
	language: string | null;
	orderInfo: string;
	redirectUri: string;
	address_one: string | null;
	address_two: string | null;
	phone_one: string | null;
	phone_two: string | null;
}) => {
	const response = await axios.post(
		`${
			process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"
		}/payment/create/payment/checkout`,
		data
	);

	return response;
};
