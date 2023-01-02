/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
import axios from "axios";
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

	const filterFavoriteProducts = (a: any, b: any) => {
		const isSameUser = (a: any, b: any) => a.id === b.id;
		const filterArray = (
			left: any,
			right: any,
			compareFunction: (a: any, b: any) => boolean
		) =>
			left.filter((leftValue: any) => {
				const value = right.some((rightValue: any) =>
					compareFunction(leftValue, rightValue.product)
				);
				const source = {
					like: false,
				};
				Object.assign(leftValue, source);
				if (value === true) {
					return (leftValue.like = true);
				}
				return leftValue;
			});

		return filterArray(a, b, isSameUser);
	};
	const getFavoriteProducts = async () => {
		try {
			const currentUser = JSON.parse(
				localStorage.getItem("currentUser") || "{}"
			);

			if (currentUser !== null && currentUser !== undefined) {
				const productsFavoriteOfClient = await axios(
					`${
						process.env.REACT_APP_SERVER_URL || "http://localhost:33714"
					}/favorite-products/get/product/${currentUser.user.id}`
				);

				const { data, status } = productsFavoriteOfClient;
				if (status === 200 && data.length > 0) {
					return data;
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	React.useEffect(() => {
		let isChecked = true;

		if (isChecked) {
			const fetchProducts = async () => {
				try {
					const productsClientLike = await getFavoriteProducts();
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
					const dataProductsResponse: IProducts[] = await (
						await products
					).data.data;
					const productsFavoriteResponse: IProducts[] = await (
						await productsFavorite
					).data;

					if (productsClientLike !== undefined) {
						setProducts(
							filterFavoriteProducts(dataProductsResponse, productsClientLike)
						);
						setProductsFavorite(
							filterFavoriteProducts(
								productsFavoriteResponse,
								productsClientLike
							)
						);
					}
					setProducts(dataProductsResponse);
					setProductsFavorite(productsFavoriteResponse);
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
		setProducts,
		handleGetProductsByLimit,
		handleGetProductsByStart,
	};
};
