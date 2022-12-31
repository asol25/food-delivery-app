import * as React from "react";
import * as apis from "../apis/index";
import { ICategory } from "../types/products";

export const CategoriesHook = () => {
	const [categories, setCategories] = React.useState<ICategory[]>([]);

	React.useEffect(() => {
		let isChecked = true;

		if (isChecked) {
			const fetchCategories = async () => {
				try {
					const categoriesResponse = await apis.categories.geCategories();

					const { status, data } = categoriesResponse;

					if (status === 200 && data.length > 0) {
						setCategories(data);
					}
				} catch (error) {
					console.log(
						"🚀 ~ file: productsHook.tsx ~ fetchProducts ~ error",
						error
					);
				}
			};
			fetchCategories();
		}

		return () => {
			isChecked = false;
		};
	}, []);

	return {
		categories,
	};
};
