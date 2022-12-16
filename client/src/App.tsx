import React from 'react';
import './App.css';
import BannerContainer from './components/BannerContainer/BannerContainer';
import HeaderContainer from './components/HeaderContainer/_HeaderContainer';

function App() {
	return (
		<>
			<div className="p-6 md:px-24">
				<HeaderContainer />
				<BannerContainer />
			</div>
		</>
	);
}

export default App;
