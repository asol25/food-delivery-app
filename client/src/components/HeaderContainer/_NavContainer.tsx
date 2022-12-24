/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";
import LoginButton from "./_LoginButton";
import LogoutButton from "./_LogoutButton";

interface INavContainerProps {
	handleToggle: () => void;
	toggleMenu: boolean;
}

const NavContainer: React.FunctionComponent<INavContainerProps> = (props) => {
	const { handleToggle, toggleMenu } = props;
	const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

	return (
		<>
			<nav
				className={`absolute md:hidden top-0 h-full w-full bg-black z-10 ${
					toggleMenu ? "left-0" : "left-[100em]"
				}`}
			>
				<i
					onClick={handleToggle}
					className="ri-close-circle-line absolute top-1 right-2 text-white text-2xl"
				/>
				<ul className="nav_menu absolute top-[300px] left-2/4 cursor-pointer">
					<li className="p-4 text-l g text-white font-medium hover:text-green-500">
						Home
					</li>
					<li className="p-4 text-l g text-white font-medium hover:text-green-500">
						Menu
					</li>
					<li className="p-4 text-l g text-white font-medium hover:text-green-500">
						About
					</li>
				</ul>
			</nav>

			<nav>
				<ul className="hidden md:flex items-center justify-center cursor-pointer">
					<li className="p-4 text-l g text-black font-medium hover:text-green-500">
						Home
					</li>
					<li className="p-4 text-l g text-black font-medium hover:text-green-500">
						<a href="#menu">Menu</a>
					</li>
					<li className="p-4 text-l g text-black font-medium hover:text-green-500">
						About
					</li>
				</ul>
			</nav>
			<i className="ri-shopping-basket-line text-2xl hidden md:block cursor-pointer" />
			<i
				className="ri-menu-line md:hidden text-2xl cursor-pointer"
				onClick={handleToggle}
			/>
			{isAuthenticated ? (
				<LogoutButton logout={logout} user={user} />
			) : (
				<LoginButton loginWithRedirect={loginWithRedirect} />
			)}
		</>
	);
};

export default NavContainer;
