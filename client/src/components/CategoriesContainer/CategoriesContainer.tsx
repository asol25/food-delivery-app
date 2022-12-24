import * as React from "react";
import FoodIcon from "../../img/favorite_food_icon.png";
import { IProducts } from "../../services/types/products";
import FoodProducts from "../FoodContainer/_FoodProducts";
import CategoriesMenuMobile from "./CategoriesMenuMobile";

interface ICategoriesContainerProps {
	products: IProducts[];
}

const CategoriesContainer: React.FunctionComponent<
	ICategoriesContainerProps
> = (props) => {
	const { products } = props;

	return (
		<>
			<div className="section" id="menu">
				<div className=" bg-orange-100 px-4 py-1 rounded-full w-fit flex items-center gap-2 section-container">
					<h1 className="capitalize text-base text-orange-500 font-semibold">
						Categories Food
					</h1>
					<img
						className="w-8 h-8 object-contain rounded-full"
						src={FoodIcon}
						alt="_food_icon"
					/>
				</div>
				{/* 
				<div className="md:flex md:flex-row items-center justify-around hidden">
					<CategoriesMenu />
					<CategoriesMenu />
					<CategoriesMenu />
					<CategoriesMenu />
					<CategoriesMenu />
					<CategoriesMenu />
					<CategoriesMenu />
					<CategoriesMenu />
				</div> */}

				<div className="md:hidden block">
					<CategoriesMenuMobile />
				</div>

				<div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-8 my-8">
					{products &&
						products.map((product: IProducts) => (
							<FoodProducts product={product} key={product.id} />
						))}
				</div>
			</div>
		</>
	);
};

export default CategoriesContainer;
