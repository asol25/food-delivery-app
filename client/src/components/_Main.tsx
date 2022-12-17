import * as React from 'react';
import CategoriesContainer from './CategoriesContainer/CategoriesContainer';
import FoodContainer from './FoodContainer/_FoodContainer';

interface IMainContainerProps {}

const MainContainer: React.FunctionComponent<IMainContainerProps> = () => (
	<>
		<main className="main">
			<FoodContainer />
			<FoodContainer />
			<FoodContainer />
			<CategoriesContainer />
		</main>
	</>
);

export default MainContainer;
