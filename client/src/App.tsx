import "./App.css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/pagination";
import Routes from "./routes";

function App() {
	return (
		<>
			<div className="p-6 md:px-24 relative">
				<Routes />
			</div>
		</>
	);
}

export default App;
