/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable consistent-return */
import axios from "axios";
import { title } from "process";
import * as React from "react";
import { createOrderProduct } from "../../services/apis/products";
import { ICreateOrderProductDto } from "../../services/types";
import { IProducts } from "../../services/types/products";
import FoodDetails from "./_FoodDetails";

interface IFoodProductsProps {
	product: IProducts;
	products: IProducts[];
	title: string;
}

const FoodProducts: React.FunctionComponent<IFoodProductsProps> = (props) => {
	const { product, products, title } = props;
	const { category } = product;
	const [isStyleLove, setIsStyleLove] = React.useState<boolean | undefined>(product.like);

	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleStyleLove = (productID: number) => {
		const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
		const favoriteData = {
			product: productID,
			user: currentUser.user.id,
		};

		if (isStyleLove) {
			return axios.put(
				`${
					process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"
				}/favorite-products/update/product`,
				favoriteData
			);
		}
		return axios.post(
			`${
				process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"
			}/favorite-products/create/product`,
			favoriteData
		);
	};
	const handleToggleStyleLove = (productID: number) => {
		setIsStyleLove(!isStyleLove);
		handleStyleLove(productID);
	};

	const addProductsToOrderProducts = async (productsID: number, cost: number) => {
		const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
		const data: ICreateOrderProductDto = {
			key_product_id: productsID,
			key_user_id: currentUser.user.id,
			key_cost: cost,
		};

		await createOrderProduct(data);
	};
	return (
		<>
			<div className="flex flex-col my-12 items-center gap-1">
				<div className="w-56 h-56">
					<img
						className="object-contain"
						src={product.thumbnail}
						alt=""
						onClick={handleClickOpen}
					/>
				</div>
				<h3 className="text-xl md:text-2xl font-bold tracking-wide text-headingColor">
					{product.title}
				</h3>
				<p className="text-[12px] lg:text-sm text-light textGray font-semibold my-1 lg:my-3">
					{category && category.name}
				</p>
				<div className="flex items-center gap-2">
					<div
						className="rounded-full w-8 h-8 flex justify-center items-center"
						onClick={() => handleToggleStyleLove(product.id)}
					>
						<i
							className={`ri-heart-fill  text-red-500 fill-red-600 ${isStyleLove && "love-filter"}`}
						/>
					</div>
					<p className="text-sm font-semibold text-headingColor">
						<span className="text-xs text-red-600">$</span> {product.cost}
					</p>
					<div
						className="rounded-full w-8 h-8 flex justify-center items-center bg-red-500"
						onClick={() => addProductsToOrderProducts(product.id, product.cost)}
					>
						<i className="ri-add-line text-white cursor-pointer" />
					</div>
				</div>
				<FoodDetails
					open={open}
					onClose={handleClose}
					products={products}
					product={product}
					title={title}
				/>
			</div>
		</>
	);
};

export default FoodProducts;
