import { Rating } from "@mui/material";
import * as React from "react";
import FoodProducts from "../FoodContainer/_FoodProducts";

interface ICategoryProductsProps {}

const CategoryProducts: React.FunctionComponent<ICategoryProductsProps> = (props) => {
	const [isStyleLove, setIsStyleLove] = React.useState<boolean>(false);

	const handleToggleStyleLove = () => {
		setIsStyleLove(!isStyleLove);
	};
	return (
		<>
			<div className="flex flex-col">
				<img
					className="w-56 h-56 w-56 h-56 object-contain"
					src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fburger2.png?alt=media&token=b256ed7a-fe35-4051-9bf5-24f39b79f2b2"
					alt=""
				/>
			</div>
			{/* <div className="flex flex-col text-left mt-8 min-w-[160px] max-w-[200px] mx-auto justify-start relative lg:w-190 p-4 bg-white bg-cardOverlay backdrop-blur-md rounded-3xl drop-shadow-lg">
				<img
					className="w-[100px] h-[100px] object-contain absolute top-[-50px] left-1/2 absolute-center-left"
					src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fburger2.png?alt=media&token=b256ed7a-fe35-4051-9bf5-24f39b79f2b2"
					alt=""
				/>

				<div
					className="rounded-full w-8 h-8 flex justify-center items-center absolute top-4 right-2"
					onClick={handleToggleStyleLove}
				>
					<i
						className={`ri-heart-fill  text-red-500 fill-red-600 ${isStyleLove && "love-filter"}`}
					/>
				</div>
				<h4 className="text-base font-bold mt-10 tracking-wide text-headingColor">Burger Bistro</h4>
				<Rating size="small" name="half-rating" defaultValue={2.5} precision={0.5} />
				<p className="text-sm font-semibold text-headingColor">
					<span className="text-xs text-red-600">$</span> 7.5
				</p>
			</div> */}
		</>
	);
};

export default CategoryProducts;
