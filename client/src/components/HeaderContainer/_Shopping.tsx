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
import ProcessPayment from "./_ProsessPayment";
import ShoppingProduct from "./_ShoppingProducts";

const TAX = 0.3;
type Anchor = "top" | "left" | "bottom" | "right";
export type Information =
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
												<div className="flex md:flex-row flex-col md:items-center justify-center  gap-8 md:gap-16">
													<div>
														<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
															Bank
														</span>
														<br />
														<select
															id="countries"
															className=" bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 min-w-[320px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															onChange={(event) =>
																handleChangeInformation("bankCode", event.target.value)
															}
														>
															<option value="US" selected>
																Choose Bank to Payment
															</option>
															<option value="NCB"> Ngan hang NCB</option>
															<option value="AGRIBANK"> Ngan hang Agribank</option>
															<option value="SCB"> Ngan hang SCB</option>
															<option value="SACOMBANK">Ngan hang SacomBank</option>
															<option value="EXIMBANK"> Ngan hang EximBank</option>
															<option value="MSBANK"> Ngan hang MSBANK</option>
															<option value="NAMABANK"> Ngan hang NamABank</option>
															<option value="VNMART"> Vi dien tu VnMart</option>
															<option value="VIETINBANK">Ngan hang Vietinbank</option>
															<option value="VIETCOMBANK"> Ngan hang VCB</option>
															<option value="HDBANK">Ngan hang HDBank</option>
															<option value="DONGABANK"> Ngan hang Dong A</option>
															<option value="TPBANK"> Ngân hàng TPBank</option>
															<option value="OJB"> Ngân hàng OceanBank</option>
															<option value="BIDV"> Ngân hàng BIDV</option>
															<option value="TECHCOMBANK"> Ngân hàng Techcombank</option>
															<option value="VPBANK"> Ngan hang VPBank</option>
															<option value="MBBANK"> Ngan hang MBBank</option>
															<option value="ACB"> Ngan hang ACB</option>
															<option value="OCB"> Ngan hang OCB</option>
															<option value="IVB"> Ngan hang IVB</option>
															<option value="VISA"> Thanh toan qua VISA/MASTER</option>
															<option value="CA">English</option>
															<option value="FR">Việt Nam</option>
														</select>
													</div>

													<div>
														<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
															Language
														</span>
														<br />
														<select
															id="countries"
															className=" bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 min-w-[320px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															onChange={(event) =>
																handleChangeInformation("language", event.target.value)
															}
														>
															<option value="US" selected>
																Choose Language to usage
															</option>
															<option value="EN">English</option>
															<option value="VN">Việt Nam</option>
														</select>
													</div>
												</div>
												<div className="mt-8 flex md:flex-row flex-col md:items-center gap-8 md:gap-16 justify-center">
													<div className="flex flex-col min-w-[320px] ">
														<label className="block">
															<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
																Full name
															</span>
															<input
																type="text"
																name="full-name"
																disabled
																value={user?.nickname}
																className="mt-1 capitalize px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
																placeholder="Jason Alexander"
															/>
														</label>
													</div>
													<div className="flex flex-col min-w-[320px] ">
														<label className="block">
															<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
																Email
															</span>
															<input
																type="email"
																name="email"
																disabled
																value={user?.email}
																className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
																placeholder="you@example.com"
															/>
														</label>
													</div>
												</div>
												<div className="mt-8 flex md:flex-row flex-col md:items-center gap-8 md:gap-16 justify-center">
													<div className="flex flex-col min-w-[320px] ">
														<label className="block">
															<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
																Address
															</span>
															<input
																type="text"
																name="address_one"
																onChange={(event) =>
																	handleChangeInformation("address_one", event.target.value)
																}
																className="mt-1 capitalize px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
																placeholder="Jason Alexander"
															/>
														</label>
													</div>
													<div className="flex flex-col min-w-[320px] ">
														<label className="block">
															<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
																Address Two
															</span>
															<input
																type="text"
																name="address_two"
																onChange={(event) =>
																	handleChangeInformation("address_two", event.target.value)
																}
																className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
																placeholder="you@example.com"
															/>
														</label>
													</div>
												</div>
												<div className="mt-8 flex md:flex-row flex-col md:items-center gap-8 md:gap-16 justify-center">
													<div className="flex flex-col min-w-[320px] ">
														<label className="block">
															<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
																Phone
															</span>
															<input
																type="number"
																name="phone_one"
																onChange={(event) =>
																	handleChangeInformation("phone_one", event.target.value)
																}
																className="mt-1 capitalize px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
																placeholder="Jason Alexander"
															/>
														</label>
													</div>
													<div className="flex flex-col min-w-[320px] ">
														<label className="block">
															<span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
																Phone Two
															</span>
															<input
																type="number"
																name="phone_two"
																onChange={(event) =>
																	handleChangeInformation("phone_two", event.target.value)
																}
																className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
																placeholder="you@example.com"
															/>
														</label>
													</div>
												</div>

												<div className="flex flex-row justify-around mt-6">
													{activeStep <= 3 && (
														<Button onClick={() => handleNext(false)}>
															<p className="mx-6">Back</p>
														</Button>
													)}
													<Button onClick={() => handleNext(true)}>
														{paymentLink ? (
															<a href={paymentLink}>Finish</a>
														) : (
															<p className="mx-6"> {activeStep === 2 ? "Finish" : "Next"}</p>
														)}
													</Button>
												</div>
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
