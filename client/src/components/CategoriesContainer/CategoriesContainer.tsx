import { title } from "process";
import * as React from "react";
import FoodIcon from "../../img/favorite_food_icon.png";
import { IProducts } from "../../services/types/products";
import FoodProducts from "../FoodContainer/_FoodProducts";
import ProductFilterSideBar from "./ProductFilterSidebar";

const PAGINATION = 10;
interface ICategoriesContainerProps {
	products: IProducts[];
	title: string;
	onGetProductsByLimit: (_limit: number) => void;
}

export type filterStateProducts = {
	categoryID: number;
	cost: number;
	rating: number;
};
const CategoriesContainer: React.FunctionComponent<ICategoriesContainerProps> = (props) => {
	const { products, title, onGetProductsByLimit } = props;
	const [filterStateProducts, setFilterStateProducts] = React.useState<filterStateProducts>({
		categoryID: 0,
		cost: 0,
		rating: 0,
	});

	const handleCleanFilterState = () => {
		setFilterStateProducts({
			categoryID: 0,
			cost: 0,
			rating: 0,
		});
	};
	const applyFilter = (state: typeof filterStateProducts, products: IProducts[]): IProducts[] => {
		let newProducts = [...products];

		if (state.categoryID !== 0) {
			newProducts = newProducts.filter(
				(product: IProducts) => product.categoryId === state.categoryID
			);
		}

		if (state.cost !== 0) {
			newProducts = newProducts.filter((product: IProducts) => product.cost <= state.cost);
		}

		if (state.rating !== 0) {
			newProducts = newProducts.filter((product: IProducts) => product.rating <= state.rating);
		}

		return newProducts;
	};
	const filterProducts = products
		? applyFilter(filterStateProducts, products)
		: ([] as IProducts[]);
	return (
		<>
			<div className="section" id="menu">
				<div className=" bg-orange-100 px-4 py-1 rounded-full w-fit flex items-center gap-2 section-container">
					<h1 className="capitalize text-base text-orange-500 font-semibold">{title}</h1>
					<img className="w-8 h-8 object-contain rounded-full" src={FoodIcon} alt="_food_icon" />
				</div>
				<div className="flex justify-end">
					<ProductFilterSideBar
						onFilter={setFilterStateProducts}
						cleanFilter={handleCleanFilterState}
					/>
				</div>

				<div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-8 my-8">
					{filterProducts &&
						filterProducts.map((product: IProducts) => (
							<FoodProducts
								product={product}
								key={product.id}
								title={title}
								products={filterProducts}
							/>
						))}
				</div>
				<div className="text-center">
					<button
						type="button"
						className="border border-black py-2 px-8 hover:text-white hover:bg-black "
						onClick={() => onGetProductsByLimit(PAGINATION)}
					>
						New More
					</button>
				</div>
			</div>
		</>
	);
};

export default CategoriesContainer;
