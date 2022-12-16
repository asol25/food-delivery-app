import * as React from 'react';

interface INavContainerProps {
	handleToggle: () => void;
	toggleMenu: boolean;
}

const NavContainer: React.FunctionComponent<INavContainerProps> = (props) => {
	const { handleToggle, toggleMenu } = props;
	return (
		<>
			<nav
				className={
					'absolute md:hidden top-0 h-screen w-screen bg-black ' +
					(toggleMenu ? 'left-0' : 'left-[100em]')
				}
			>
				<i
					onClick={handleToggle}
					className="ri-close-circle-line absolute top-1 right-2 text-white text-2xl"
				></i>
				<ul className="nav_menu absolute top-2/4 left-2/4 cursor-pointer">
					<li className="p-4 text-l g text-white font-medium hover:text-green-500">Home</li>
					<li className="p-4 text-l g text-white font-medium hover:text-green-500">Menu</li>
					<li className="p-4 text-l g text-white font-medium hover:text-green-500">About</li>
					<li className="p-4 text-lg text-white font-medium hover:text-green-500">Contact</li>
				</ul>
			</nav>

			<nav>
				<ul className="hidden md:flex">
					<li className="p-4 text-l g text-black font-medium hover:text-green-500">Home</li>
					<li className="p-4 text-l g text-black font-medium hover:text-green-500">Menu</li>
					<li className="p-4 text-l g text-black font-medium hover:text-green-500">About</li>
					<li className="p-4 text-lg text-black font-medium hover:text-green-500">Contact</li>
				</ul>
			</nav>
			<i className="ri-shopping-basket-line text-2xl hidden md:block cursor-pointer"></i>
			<i className="ri-menu-line md:hidden text-2xl cursor-pointer" onClick={handleToggle}></i>
			<img
				className="w-10 h-10 rounded-full object-cover cursor-pointer"
				src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/241417729_1535542100142917_2261005721180754716_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=O5tG9ZYmpRsAX_pAGJq&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfCYKaQY8bF8coQJ7t9JydIHLjZPhHfbtI-QYjW3pUmsiA&oe=63A0E404"
				alt="avatar_picture"
			/>
		</>
	);
};

export default NavContainer;
