import * as React from "react";
import { ProductsHook } from "../services/hook/productsHook";
import CategoriesContainer from "./CategoriesContainer/CategoriesContainer";
import FoodContainer from "./FoodContainer/_FoodContainer";

interface IMainContainerProps {}

const MainContainer: React.FunctionComponent<IMainContainerProps> = () => {
	const { products } = ProductsHook();
	return (
		<>
			<main className="main">
				<FoodContainer title={"Favorite"} products={products} />
				<FoodContainer title={"Top Sales"} products={products} />
				<FoodContainer title={"Discount"} products={products} />
				<CategoriesContainer />
			</main>
		</>
	);
};

export default MainContainer;
