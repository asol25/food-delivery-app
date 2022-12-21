import * as React from "react";
import * as apis from "../apis/index";
import { ProductsType } from "../types";
import { IProducts } from "../types/products";

export const ProductsHook = () => {
	const [products, setProducts] = React.useState<ProductsType.IProducts[]>([]);
	const [productsFavorite, setProductsFavorite] = React.useState<
		ProductsType.IProducts[]
	>([]);
	const [limitProducts, setLimitProducts] = React.useState<number>(10);
	const [startProducts, setStartProducts] = React.useState<number>(1);

	const handleGetProductsByLimit = (_limit: number) => {
		setLimitProducts(_limit);
	};

	const handleGetProductsByStart = (_limit: number) => {
		setStartProducts(_limit);
	};

	React.useEffect(() => {
		let isChecked = true;

		if (isChecked) {
			const fetchProducts = async () => {
				try {
					const products = apis.products.getProducts(
						startProducts,
						limitProducts
					);
					const productsFavorite = apis.products.getProductsByViews();

					await products;
					await productsFavorite;

					const statusProducts = (await products).status;
					const statusProductsFavorite = (await productsFavorite).status;

					if (statusProducts !== 200 || statusProductsFavorite !== 200) {
						throw Error("Something went wrong");
					}

					setProducts((await products).data.data);
					setProductsFavorite((await productsFavorite).data);
				} catch (error) {
					console.log(
						"🚀 ~ file: productsHook.tsx ~ fetchProducts ~ error",
						error
					);
				}
			};
			fetchProducts();
		}

		return () => {
			isChecked = false;
		};
	}, [limitProducts, startProducts]);

	return {
		products,
		productsFavorite,
		handleGetProductsByLimit,
		handleGetProductsByStart,
	};
};
