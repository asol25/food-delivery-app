/* eslint-disable no-plusplus */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useRoutes } from "react-router-dom";
import io from "socket.io-client";

// layouts

import React from "react";
import axios from "axios";
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import BlogPage from "./pages/BlogPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import EmployerPage from "./pages/Employer";
import LoginPage from "./pages/LoginPage";
import MessengerPage from "./pages/Messenger";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import UserPage from "./pages/UserPage";

// ----------------------------------------------------------------------

const socket = io("http://localhost:33714", {
	transports: ["websocket", "polling", "flashsocket"],
	autoConnect: false,
});

export default function Router() {
	const { isAuthenticated, user } = useAuth0();
	if (isAuthenticated) {
		socket.auth = {
			username: user,
		};
		socket.connect();
	}

	socket.on("disconnect", () => {
		console.log("🔥: A user disconnected");
	});

	const routes = useRoutes([
		{
			path: "/dashboard",
			element: <DashboardLayout />,
			children: [
				{ element: <Navigate to="/dashboard/app" />, index: true },
				{ path: "app", element: <DashboardAppPage /> },
				{ path: "user", element: <UserPage /> },
				{ path: "employer", element: <EmployerPage /> },
				{
					path: "messenger",
					element: <MessengerPage socket={socket} />,
				},
				{ path: "products", element: <ProductsPage /> },
				{ path: "blog", element: <BlogPage /> },
			],
		},
		{
			path: "login",
			element: <LoginPage />,
		},
		{
			element: <SimpleLayout />,
			children: [
				{ element: <Navigate to="/dashboard/app" />, index: true },
				{ path: "404", element: <Page404 /> },
				{ path: "*", element: <Navigate to="/404" /> },
			],
		},
		{
			path: "*",
			element: <Navigate to="/404" replace />,
		},
	]);

	return routes;
}
