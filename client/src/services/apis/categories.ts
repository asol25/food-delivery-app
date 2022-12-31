import axios from "axios";

export const geCategories = async () => {
	const categories = await axios.get(
		`${
			process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"
		}/categories/get/all`
	);

	return categories;
};
