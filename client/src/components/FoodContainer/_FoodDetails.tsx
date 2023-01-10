/* eslint-disable no-prototype-builtins */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useAuth0 } from "@auth0/auth0-react";
import {
	Alert,
	Breadcrumbs,
	Dialog,
	DialogTitle,
	Link,
	Rating,
	Snackbar,
	Typography,
} from "@mui/material";
import * as React from "react";
import { createOrderProduct } from "../../services/apis/products";
import { ICreateOrderProductDto } from "../../services/types";
import { IProducts } from "../../services/types/products";
import FoodContainer from "./_FoodContainer";

interface IFoodDetailsProps {
	products: IProducts[];
	product: IProducts;
	open: boolean;
	onClose: () => void;
	title: string;
}

const MESSAGE_RESPONSE = {
	successfully: "	Add shopping cart success!",
	error: " Sorry we have error in process!",
};
const FoodDetails: React.FunctionComponent<IFoodDetailsProps> = (props) => {
	const { loginWithPopup } = useAuth0();
	const [valueRating, setValueRating] = React.useState<number | null>(props.product.rating);
	const [error, setError] = React.useState<boolean>(false);
	let message = MESSAGE_RESPONSE.successfully;
	const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
	const handleClick = () => {
		setError(true);
	};

	const addToShoppingCart = async (productId: number) => {
		if (currentUser.hasOwnProperty("user") && productId) {
			const data: ICreateOrderProductDto = {
				key_user_id: currentUser.user.id,
				key_product_id: productId,
			};
			const response = await createOrderProduct(data);
			if (response.status === 201) handleClick();
			message = MESSAGE_RESPONSE.error;
		} else {
			loginWithPopup();
		}
	};

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setError(false);
	};

	return (
		<>
			<Dialog onClose={props.onClose} open={props.open} hideBackdrop fullScreen>
				<Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
					<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
						{message}
					</Alert>
				</Snackbar>
				<DialogTitle>
					<div className="flex justify-between items-center">
						<Breadcrumbs aria-label="breadcrumb">
							<Link underline="hover" color="inherit" href="/">
								FOOD
							</Link>
							<Link
								underline="hover"
								color="inherit"
								href="/material-ui/getting-started/installation/"
							>
								{props.title}
							</Link>
							<Typography color="text.primary">{props.product.title}</Typography>
						</Breadcrumbs>
						<h6 className="cursor-pointer text-base" onClick={props.onClose}>
							Back
						</h6>
					</div>
					<div className="flex flex-col md:flex-row items-center justify-center gap-3 md:justify-start mt-12 md:mx-16">
						<img className="w-6/12 md:w-4/12 object-contain" src={props.product.thumbnail} alt="" />
						<div className="mt-8 flex flex-col justify-start gap-y-4">
							<h3>{props.product.title}</h3>
							<p className="font-normal text-base">${props.product.cost} USD</p>
							<Rating
								size="small"
								name="simple-controlled"
								value={props.product.rating}
								onChange={(event, newValue) => {
									setValueRating(newValue);
								}}
							/>
							<p className="text-base md:mr-56 font-light">{props.product.desc}</p>
							<div className="mt-8">
								<button
									onClick={() => addToShoppingCart(props.product.id)}
									className="px-12 py-2 border border-black text-base"
								>
									ADD TO CART
								</button>
							</div>
						</div>
					</div>
				</DialogTitle>
				<div className="mx-40">
					<FoodContainer title={""} products={props.products} />
				</div>
			</Dialog>
		</>
	);
};

export default FoodDetails;
