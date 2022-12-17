import * as React from "react";
import { IProducts } from "../../services/types/products";

interface IFoodProductsProps {
	product: IProducts;
}

const FoodProducts: React.FunctionComponent<IFoodProductsProps> = (props) => {
	const { product } = props;
	const [isStyleLove, setIsStyleLove] = React.useState<boolean>(false);

	const handleToggleStyleLove = () => {
		setIsStyleLove(!isStyleLove);
	};
	return (
		<>
			<div className="flex min-w-[200px] flex-col my-12 items-center gap-1">
				<div className="w-56 h-56">
					<img className="object-contain" src={product.thumbnail} alt="" />
				</div>
				<h3 className="text-xl md:text-2xl font-bold tracking-wide text-headingColor">
					{product.title}
				</h3>
				<p className="text-[12px] lg:text-sm text-light textGray font-semibold my-1 lg:my-3">
					{product.category}
				</p>
				<div className="flex items-center gap-2">
					<div
						className="rounded-full w-8 h-8 flex justify-center items-center"
						onClick={handleToggleStyleLove}
					>
						<i
							className={`ri-heart-fill  text-red-500 fill-red-600 ${isStyleLove && "love-filter"}`}
						/>
					</div>
					<p className="text-sm font-semibold text-headingColor">
						<span className="text-xs text-red-600">$</span> {product.cost}
					</p>
					<div className="rounded-full w-8 h-8 flex justify-center items-center bg-red-500">
						<i className="ri-add-line text-white cursor-pointer" />
					</div>
				</div>
			</div>
		</>
	);
};

export default FoodProducts;
