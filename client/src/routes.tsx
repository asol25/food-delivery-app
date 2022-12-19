import { useRoutes } from "react-router-dom";
import ApplicationPage from "./components/_ApplicaitonPage";
import MainContainer from "./components/_MainContainer";
import ProfileContainer from "./components/_ProfileContainer";

export default function Routes(): ReturnType<typeof useRoutes> {
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
