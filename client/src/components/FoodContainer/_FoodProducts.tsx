import * as React from 'react';
import PictureProducts from '../../img/c2.png';

interface IFoodProductsProps {}

const FoodProducts: React.FunctionComponent<IFoodProductsProps> = () => {
	return (
		<>
			<div className="flex min-w-[200px] flex-col my-12 items-center gap-1">
				<div className="w-56 h-56">
					<img className="object-contain" src={PictureProducts} alt=""></img>
				</div>
				<h3 className="text-xl md:text-2xl font-bold tracking-wide text-headingColor">Sandwich</h3>
				<p className="text-[12px] lg:text-sm text-light textGray font-semibold my-1 lg:my-3">
					Chocolate &amp; vanilla
				</p>
				<div className="flex items-center gap-2">
					<p className="text-sm font-semibold text-headingColor">
						<span className="text-xs text-red-600">$</span> 8.25
					</p>
					<div className="rounded-full w-8 h-8 flex justify-center items-center bg-red-500">
						<i className="ri-add-line text-white cursor-pointer"></i>
					</div>
				</div>
			</div>
		</>
	);
};

export default FoodProducts;
