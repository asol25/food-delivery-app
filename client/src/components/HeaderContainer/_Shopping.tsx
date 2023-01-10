/* eslint-disable no-prototype-builtins */
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
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import { NumericFormat } from "react-number-format";
import { useCount } from "../../customs/sub-total-context";
import { createTransaction } from "../../services/apis/payment";
import { deleteOrderProductByOrderId, getOrderProduct } from "../../services/apis/products";
import { IPayment } from "../../services/types";
import { IOrder } from "../../services/types/products";
import { IUser } from "../../services/types/user";
import ProcessInformation from "./_Information";
import PolicyPayment from "./_PolicyPayment";
import PolicyRefund from "./_PolicyRefund";
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
	| "phone_two"
	| "time_picker";
interface IShoppingProps {}

const Shopping: React.FunctionComponent<IShoppingProps> = () => {
	const { total, dispatch } = useCount();
	const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
	const anchor: Anchor = "right";
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});
	const [PAYMENT_URL, setPAYMENTURL] = React.useState<string>("");
	const [information, setInformation] = React.useState<IPayment>({
		amount: 0,
		bankCode: null,
		language: null,
		orderInfo: "Food",
		redirectUri: window.location.host,
		address_one: null,
		address_two: null,
		phone_one: null,
		phone_two: null,
		time_picker: null,
	});
	const [currentDate, setCurrentDate] = React.useState<Dayjs | null>(dayjs(Date.now()));
	const [activeStep, setActiveStep] = React.useState(0);

	// Variable to clean request in hook.
	const [isCheckedToggle, setIsCheckedToggle] = React.useState<boolean>(false);
	const [orderProducts, setOrderProducts] = React.useState<IOrder[] | undefined>(undefined);

	const toggleDrawer =
		(anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			setPAYMENTURL("");
			setActiveStep(0);
			setInformation({
				amount: 0,
				bankCode: null,
				language: null,
				orderInfo: "Food",
				redirectUri: window.location.host,
				address_one: null,
				address_two: null,
				phone_one: null,
				phone_two: null,
				time_picker: null,
			});
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}
			if (open === true) {
				setIsCheckedToggle(true);
			}
			setOrderProducts(undefined);
			setState({ ...state, [anchor]: open });
		};

	const handleChangeInformation = (name: Information, value: number | string) => {
		setInformation((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleNext = async (operator: boolean) => {
		if (operator) {
			handleChangeInformation("amount", total.count * 20000 * 100);
			const timePick = `${dayjs(currentDate).format("YYYY-MM-DDTHH:mm:ss")}`;
			handleChangeInformation("time_picker", timePick);
			if (activeStep === 2) {
				const finalCase = await createTransaction(information);
				if (finalCase.status === 201) {
					setPAYMENTURL(finalCase.data);
				}
			}
			return setActiveStep(activeStep + 1);
		}
		return setActiveStep(activeStep - 1);
	};

	const totalIncome = (products: IOrder[]): number => {
		let total = 0;
		if (products.length > 0) {
			products?.filter((orderProduct: IOrder) => {
				if (orderProduct.productId) {
					total += orderProduct.quantity * orderProduct.product.cost;
				}
			});
		}
		return total;
	};

	const deleteOrderDetailsProducts = async (orderDetailsID: number) => {
		const ordersResponse = await deleteOrderProductByOrderId(orderDetailsID);
		if (ordersResponse.status === 200 && ordersResponse.data === 1) {
			setOrderProducts(
				orderProducts?.filter((orderProduct: IOrder) => orderProduct.id !== orderDetailsID)
			);
		}
	};

	const getStepContent = (activeStep: number) => {
		switch (activeStep) {
			case 0:
				return (
					<ProcessInformation
						currentDate={currentDate}
						setCurrentDate={setCurrentDate}
						user={currentUser.user}
						handleChangeInformation={handleChangeInformation}
					/>
				);
			case 1:
				return <PolicyPayment />;
			case 2:
				return <PolicyRefund />;
			case 3:
				return;
			default:
				throw new Error("Unknown step");
		}
	};

	const getStepButton = (activeStep: number) => {
		switch (activeStep) {
			case 0:
			case 1:
			case 2:
				return (
					<>
						<Button onClick={() => handleNext(false)}>
							<p className="mx-6">Back</p>
						</Button>
						<Button onClick={() => handleNext(true)}>Next</Button>
					</>
				);
			case 3:
				return (
					<>
						<Button>
							<p className="mx-6">Back</p>
						</Button>
						<Button>
							<a href={PAYMENT_URL}>Finish</a>
						</Button>
					</>
				);
			default:
				break;
		}
	};
	React.useEffect(() => {
		let isChecked = true;
		if (isChecked && isCheckedToggle === true) {
			const fetchOrderProducts = async () => {
				if (currentUser.hasOwnProperty("user")) {
					const ordersResponse = await getOrderProduct(currentUser.user.id);
					if (ordersResponse.status === 200) {
						setOrderProducts(ordersResponse.data);
						dispatch({
							type: "init",
							value: totalIncome(ordersResponse.data),
						});
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
											<div className="mx-auto mt-12">{getStepContent(activeStep)}</div>
											<div className="flex flex-row justify-around mt-6">
												{getStepButton(activeStep)}
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
