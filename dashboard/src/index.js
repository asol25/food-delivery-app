import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
//
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<HelmetProvider>
		<BrowserRouter>
			<Auth0Provider
				domain={`${
					process.env.REACT_APP_VERCEL_ENV_AUTH0_DOMAIN ||
					"dev-i3evj9rk.us.auth0.com"
				}`}
				clientId={`${
					process.env.REACT_APP_VERCEL_ENV_CLIENT_ID ||
					"AGiJsvmFqI2hCZI1CWc7JOEpm4aw8drR"
				}`}
				redirectUri={`${window.location.origin}/dashboard/app`}
			>
				<App />
			</Auth0Provider>
		</BrowserRouter>
	</HelmetProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
