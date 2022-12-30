// routes
import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";
import axios from "axios";
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import "./App.css";
import { StyledChart } from "./components/chart";
import ScrollToTop from "./components/scroll-to-top";
// ----------------------------------------------------------------------

export default function App() {
	const { isAuthenticated, user } = useAuth0();

	React.useEffect(() => {
		let isChecked = true;

		if (isChecked && isAuthenticated) {
			const fetchVerified = async () => {
				const send = {
					email: user.email,
					name: user.name,
					picture: user.picture,
				};
				const verified = await axios.post(
					`${
						process.env.REACT_APP_SERVER_URL || "http://localhost:33714"
					}/employer/create/employer`,
					send
				);
				const { data, status } = await verified;

				if (status === 201) {
					localStorage.setItem(
						"verified",
						JSON.stringify({
							sender: data.sender,
							receiver: data.receiver,
						})
					);
				}
			};
			fetchVerified();
		}
		return () => {
			isChecked = false;
		};
	}, [isAuthenticated, user]);
	return (
		<>
			<ThemeProvider>
				<ScrollToTop />
				<StyledChart />
				<Router />
			</ThemeProvider>
		</>
	);
}
