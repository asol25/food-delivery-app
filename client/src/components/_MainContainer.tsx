import * as React from "react";
import { ProductsHook } from "../services/hook/productsHook";
import BannerContainer from "./BannerContainer/_BannerContainer";
import CategoriesContainer from "./CategoriesContainer/CategoriesContainer";
import { configTitleSection } from "../customs/configTitleSection";
import FoodContainer from "./FoodContainer/_FoodContainer";

interface IMainContainerProps {}

const MainContainer: React.FunctionComponent<IMainContainerProps> = () => {
	const { products, productsFavorite, handleGetProductsByLimit } = ProductsHook();

	return (
		<>
			<main className="main">
				<BannerContainer />
				<FoodContainer title={configTitleSection.Favorite} products={productsFavorite} />
				<FoodContainer title={configTitleSection.TopSales} products={products} />
				<FoodContainer title={configTitleSection.Discount} products={products} />
				<CategoriesContainer
					products={products}
					title={configTitleSection.Categories}
					onGetProductsByLimit={handleGetProductsByLimit}
				/>
			</main>
		</>
	);
};

export default MainContainer;
