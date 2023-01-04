/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
import { useAuth0 } from "@auth0/auth0-react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Button, Divider, Drawer } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { NumericFormat } from "react-number-format";
import { useCount } from "../../customs/sub-total-context";
import { createTransaction } from "../../services/apis/payment";
import { IPayment } from "../../services/types";
import { IOrder } from "../../services/types/products";
import ProcessInformation from "./_Information";
import ProcessPayment from "./_ProcessPayment";
import ShoppingProduct from "./_ShoppingProducts";

const TAX = 0.3;
type Anchor = "top" | "left" | "bottom" | "right";
type Information =
	| "amount"
	| "bankCode"
	| "language"
	| "orderInfo"
	| "redirectUri"
	| "address_one"
	| "address_two"
	| "phone_one"
	| "phone_two";
interface IShoppingProps {}

const Shopping: React.FunctionComponent<IShoppingProps> = () => {
	const { total, dispatch } = useCount();
	const { user } = useAuth0();
	const [isCheckedToggle, setIsCheckedToggle] = React.useState<boolean>(false);
	const anchor: Anchor = "right";
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});
	const [orderProducts, setOrderProducts] = React.useState<IOrder[] | null | undefined>(null);
	const [paymentLink, setPaymentLink] = React.useState<string>("");
	const [information, setInformation] = React.useState<IPayment>({
		amount: 0,
		bankCode: null,
		language: null,
		orderInfo: "Food",
		redirectUri: "http://localhost:3000/",
		address_one: null,
		address_two: null,
		phone_one: null,
		phone_two: null,
	});

	const sendInformation = () => createTransaction(information);

	const handleChangeInformation = (name: Information, value: number | string) => {
		setInformation((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = async (operator: boolean) => {
		if (operator && activeStep !== 3) {
			return setActiveStep(activeStep + 1);
		}
		if (activeStep === 3) {
			handleChangeInformation("amount", total.count * 20000 * 100);
			const finalCase = await sendInformation();
			if (finalCase.status === 201) {
				setPaymentLink(finalCase.data);
			}
			return;
		}
		return setActiveStep(activeStep - 1);
	};

	const totalIncome = (products: IOrder[]): number => {
		let total = 0;
		products?.filter((orderProduct: IOrder) => {
			total += orderProduct.quantity * orderProduct.product.cost;
		});
		return total;
	};

	const toggleDrawer =
		(anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			setPaymentLink("");
			setIsCheckedToggle(true);
			setActiveStep(0);
			setInformation({
				amount: 0,
				bankCode: null,
				language: null,
				orderInfo: "Food",
				redirectUri: "http://localhost:3000/",
				address_one: null,
				address_two: null,
				phone_one: null,
				phone_two: null,
			});
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setState({ ...state, [anchor]: open });
		};

	const handleDeleteOrderProducts = (orderId: string | number) => {
		const newFilter = orderProducts?.filter((orderProduct: IOrder) => orderProduct.id !== orderId);
		setOrderProducts(newFilter);
	};

	const deleteOrderDetailsProducts = async (orderDetailsID: string | number) => {
		const ordersResponse = await axios.delete(
			`${
				process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"
			}/orders/delete-order-products/${orderDetailsID}`
		);

		if (ordersResponse.status === 200 && ordersResponse.data.affected === 1) {
			handleDeleteOrderProducts(orderDetailsID);
		}
	};

	React.useEffect(() => {
		let isChecked = true;
		if (isChecked && isCheckedToggle === true) {
			const fetchOrderProducts = async () => {
				const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
				const data = {
					key_user_id: currentUser.user.id,
				};
				if (data) {
					const ordersResponse = await axios.post(
						`${
							process.env.REACT_APP_VERCEL_ENV_API_DOMAIN || "http://localhost:33714"
						}/orders/get-order-products`,
						data
					);
					if (ordersResponse.status === 201) {
						setOrderProducts(ordersResponse.data);
						dispatch({
							type: "int",
							value: totalIncome(ordersResponse.data),
						});
						setIsCheckedToggle(false);
					}
				}
			};

			fetchOrderProducts();
		}

		return () => {
			isChecked = false;
			setIsCheckedToggle(false);
		};
	}, [isCheckedToggle]);
	return (
		<>
			<React.Fragment key={anchor}>
				<Button disableRipple color="inherit" onClick={toggleDrawer(anchor, true)}>
					<i className="ri-shopping-basket-line text-2xl hidden md:block cursor-pointer" />
				</Button>
				<Drawer
					anchor={anchor}
					open={state[anchor]}
					PaperProps={{
						sx: { width: "100%", border: "none", overflow: "hidden" },
					}}
					onClose={toggleDrawer(anchor, false)}
				>
					<div className="clearfix m-3 ">
						<div className="m-6">
							<div className="flex items-center justify-between mb-8">
								<div className="font-serif flex items-center flex-row gap-2 font-semibold ">
									<ShoppingCartCheckoutIcon fontSize="large" />
									<h1>Shopping Cart</h1>
								</div>
								<div onClick={toggleDrawer(anchor, false)} className="cursor-pointer">
									<HighlightOffIcon />
								</div>
							</div>
							<Divider />
							{orderProducts?.length !== undefined && orderProducts?.length > 0 ? (
								<div className="mt-6 grid md:grid-cols-3 mx-auto">
									<div className="md:col-span-2">
										<h3 className="font-semibold">Payment Details</h3>

										<div className="mt-8">
											<ProcessPayment step={activeStep} />
											<div className="mx-auto mt-12">
												<ProcessInformation
													activeStep={activeStep}
													user={user}
													paymentLink={paymentLink}
													handleChangeInformation={handleChangeInformation}
													handleNext={handleNext}
												/>
											</div>
										</div>
									</div>

									<div className="md:col-span-1">
										<h3 className="font-semibold">Order Summery</h3>
										{orderProducts !== undefined &&
											orderProducts?.map((orderProduct: IOrder) => (
												<ShoppingProduct
													orderProduct={orderProduct}
													deleteOrderDetailsProducts={deleteOrderDetailsProducts}
													key={orderProduct.id}
												/>
											))}

										<Divider />
										<div>
											<div className="flex items-center justify-between my-6">
												<p>Subtotal</p>
												<NumericFormat
													value={total.count}
													displayType={"text"}
													thousandSeparator
													prefix={"$"}
												/>
											</div>
											<div className="flex items-center justify-between my-6">
												<p>Tax</p>
												<p>${TAX}</p>
											</div>
											<div className="flex items-center justify-between my-6 font-semibold">
												<p>Total</p>
												<p>
													<NumericFormat
														value={total.count - (total.count * TAX) / 100}
														displayType={"text"}
														thousandSeparator
														prefix={"$"}
													/>
												</p>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div className="relative">
									<div className="absolute center--absolute flex gap-2">
										<InsertEmoticonIcon />
										<h1>You must order 1 Product.</h1>
									</div>
								</div>
							)}
						</div>
					</div>
				</Drawer>
			</React.Fragment>
		</>
	);
};

export default Shopping;
