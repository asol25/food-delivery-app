import * as React from "react";
import FoodIcon from "../../img/favorite_food_icon.png";
import CategoriesMenu from "./CategoriesMenu";
import CategoriesMenuMobile from "./CategoriesMenuMobile";
import CategoryProducts from "./CategoryProducts";

interface ICategoriesContainerProps {}

const CategoriesContainer: React.FunctionComponent<ICategoriesContainerProps> = () => (
	<>
		<div className="section" id="menu">
			<div className=" bg-orange-100 px-4 py-1 rounded-full w-fit flex items-center gap-2 section-container">
				<h1 className="capitalize text-base text-orange-500 font-semibold">Categories Food</h1>
				<img className="w-8 h-8 object-contain rounded-full" src={FoodIcon} alt="_food_icon" />
			</div>

			<div className="md:flex md:flex-row items-center justify-around hidden">
				<CategoriesMenu />
				<CategoriesMenu />
				<CategoriesMenu />
				<CategoriesMenu />
				<CategoriesMenu />
				<CategoriesMenu />
				<CategoriesMenu />
				<CategoriesMenu />
			</div>

			<div className="md:hidden block">
				<CategoriesMenuMobile />
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6  items-center gap-8 my-8">
				<CategoryProducts />
				<CategoryProducts />
				<CategoryProducts />
				<CategoryProducts />
				<CategoryProducts />
				<CategoryProducts />
				<CategoryProducts />
				<CategoryProducts />
				<CategoryProducts />
				<CategoryProducts />
				<CategoryProducts />
				<CategoryProducts />
			</div>
		</div>
	</>
);

export default CategoriesContainer;
