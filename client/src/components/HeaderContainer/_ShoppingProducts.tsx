/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import { useCount } from "../../customs/sub-total-context";
import { updateQuantityOrderProduct } from "../../services/apis/products";
import { ICreateOrderProductDto } from "../../services/types";
import { IOrder } from "../../services/types/products";

interface IShoppingProductProps {
	orderProduct: IOrder;
	deleteOrderDetailsProducts: (orderDetailsID: string | number) => Promise<void>;
}

const ShoppingProduct: React.FunctionComponent<IShoppingProductProps> = (props) => {
	const { dispatch } = useCount();
	const { orderProduct, deleteOrderDetailsProducts } = props;
	const [quantity, setQuantity] = React.useState<number>(orderProduct.quantity);
	const [cleanFetch, setCleanFetch] = React.useState<boolean>(false);
	const handleChangeQuantity = (operator: boolean) => {
		if (operator && quantity > 1) {
			setQuantity(quantity - 1);
			setCleanFetch(true);
			return dispatch({
				type: "decrement",
				value: orderProduct.product.cost,
			});
		}

		setQuantity(quantity + 1);
		setCleanFetch(true);
		return dispatch({
			type: "increment",
			value: orderProduct.product.cost,
		});
	};
	React.useEffect(() => {
		let isChecked = true;
		if (isChecked && cleanFetch) {
			const fetchSaveQuantity = async () => {
				const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
				const data: ICreateOrderProductDto = {
					key_user_id: currentUser.user.id,
					key_product_id: orderProduct.productId,
					key_quantity: quantity,
				};
				if (data) {
					await updateQuantityOrderProduct(data);
					setCleanFetch(false);
				}
			};

			fetchSaveQuantity();
		}

		return () => {
			isChecked = false;
			setCleanFetch(false);
		};
	}, [cleanFetch]);
	return (
		<>
			{orderProduct !== null && (
				<div className="flex flex-row gap-3 justify-center md:justify-start items-center my-6">
					<img
						className="w-24 h-24 object-contain"
						src={orderProduct.product.thumbnail}
						alt={orderProduct.product.title}
					/>
					<div>
						<p>{orderProduct.product.title}</p>
						<div className="flex flex-row gap-2 items-center">
							<span
								className="px-3 bg-gray-200 cursor-pointer"
								onClick={() => handleChangeQuantity(true)}
							>
								-
							</span>
							{quantity}
							<span
								className="px-3 bg-gray-200  cursor-pointer"
								onClick={() => handleChangeQuantity(false)}
							>
								+
							</span>
							$ {orderProduct.product.cost}
							<div
								className="cursor-pointer"
								onClick={() => {
									deleteOrderDetailsProducts(orderProduct.id);
								}}
							>
								<DeleteIcon />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ShoppingProduct;
