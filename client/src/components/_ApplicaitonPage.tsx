import * as React from "react";
import { Outlet } from "react-router-dom";
import HeaderContainer from "./HeaderContainer/_HeaderContainer";

interface IApplicationPageProps {}

const ApplicationPage: React.FunctionComponent<IApplicationPageProps> = () => (
	<>
		<HeaderContainer />
		<Outlet />
	</>
);

export default ApplicationPage;
