import * as React from "react";
import * as apis from "../apis/index";
import { ProductsType } from "../types";

export const ProductsHook = () => {
	const [products, setProducts] = React.useState<ProductsType.IProducts[]>([]);
	const [limitProducts, setLimitProducts] = React.useState<number>(9);

	const handleGetProductsByLimit = (_limit: number) => {
		setLimitProducts(_limit);
	};

	React.useEffect(() => {
		let isChecked = true;

		if (isChecked) {
			const fetchProducts = () => {
				try {
					const products = apis.products.getProducts(limitProducts);
					if (products && products.length > 0) setProducts(products);
				} catch (error) {
					console.error("🚀 ~ file: productsHook.tsx:22 ~ fetchProducts ~ error", error);
				}
			};
			fetchProducts();
		}

		return () => {
			isChecked = false;
		};
	}, [limitProducts]);

	return {
		products,
		handleGetProductsByLimit,
	};
};
