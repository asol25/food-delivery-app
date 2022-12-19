import * as React from "react";
import { ProductsHook } from "../services/hook/productsHook";
import BannerContainer from "./BannerContainer/_BannerContainer";
import CategoriesContainer from "./CategoriesContainer/CategoriesContainer";
import FoodContainer from "./FoodContainer/_FoodContainer";

interface IMainContainerProps {}

const MainContainer: React.FunctionComponent<IMainContainerProps> = () => {
	const { products } = ProductsHook();
	return (
		<>
			<main className="main">
				<BannerContainer />
				<FoodContainer title={"Favorite"} products={products} />
				<FoodContainer title={"Top Sales"} products={products} />
				<FoodContainer title={"Discount"} products={products} />
				<CategoriesContainer products={products} />
			</main>
		</>
	);
};

export default MainContainer;
