import * as React from 'react';
import FoodIcon from '../../img/favorite_food_icon.png';

interface ICategoriesContainerProps {}

const CategoriesContainer: React.FunctionComponent<ICategoriesContainerProps> = () => (
	<>
		<div className="section">
			<div className=" bg-orange-100 px-4 py-1 rounded-full w-fit flex items-center gap-2">
				<h1 className="capitalize text-base text-orange-500 font-semibold">Categories Food</h1>
				<img className="w-8 h-8 object-contain rounded-full" src={FoodIcon} alt="_food_icon" />
			</div>
		</div>
	</>
);

export default CategoriesContainer;
