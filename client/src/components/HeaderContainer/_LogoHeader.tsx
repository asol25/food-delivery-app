import * as React from "react";

interface ILogoHeaderProps {}

const LogoHeader: React.FunctionComponent<ILogoHeaderProps> = () => (
	<>
		<div className="flex items-center">
			<img
				className="rounded-full w-10 h-10 object-cover cursor-pointer"
				src="https://img.freepik.com/premium-vector/good-food-logo-design_79169-10.jpg?w=2000"
				alt="food_logo"
			/>
			<h3 className="uppercase text-xl cursor-pointer font-semibold">food</h3>
		</div>
	</>
);

export default LogoHeader;
