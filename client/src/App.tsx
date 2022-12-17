import React from 'react';
import './App.css';
import BannerContainer from './components/BannerContainer/_BannerContainer';
import HeaderContainer from './components/HeaderContainer/_HeaderContainer';
import MainContainer from './components/_Main';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';

function App() {
	return (
		<>
			<div className="p-6 md:px-24 relative">
				<HeaderContainer />
				<BannerContainer />
				<MainContainer />
			</div>
		</>
	);
}

export default App;
