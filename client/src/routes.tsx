/* eslint-disable no-prototype-builtins */
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React from "react";
import { useRoutes } from "react-router-dom";
import ApplicationPage from "./components/_ApplicaitonPage";
import MainContainer from "./components/_MainContainer";
import ProfileContainer from "./components/_ProfileContainer";

export default function Routes(): ReturnType<typeof useRoutes> {
	const { isAuthenticated, user } = useAuth0();

	React.useEffect(() => {
		let isChecked = true;

		if (isChecked && isAuthenticated) {
			const fetchVerified = async () => {
				const send = {
					email: user?.email,
					name: user?.name,
					picture: user?.picture,
				};
				const verified = await axios.post(
					`${process.env.REACT_APP_SERVER_URL || "http://localhost:33714"}/users/create/user`,
					send
				);
				const { data, status } = verified;

				if (status === 201) {
					localStorage.setItem(
						"currentUser",
						JSON.stringify({
							user: data,
						})
					);
				}
			};
			const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
			const isCheckedCurrentUser = currentUser.hasOwnProperty("user");
			let isCheckedUser;
			if (isCheckedCurrentUser) {
				isCheckedUser = user?.email?.includes(currentUser.user.email) === true;
			}

			if (!isCheckedCurrentUser && !isCheckedUser) {
				fetchVerified();
			}
		} else {
			localStorage.setItem("currentUser", JSON.stringify({}));
		}
		return () => {
			isChecked = false;
		};
	}, [isAuthenticated, user]);

	const routes = useRoutes([
		{
			path: "/",
			element: <ApplicationPage />,
			children: [
				{
					path: "/",
					element: <MainContainer />,
				},
				{
					path: "/profile",
					element: <ProfileContainer />,
				},
			],
		},
	]);
	return routes;
}
